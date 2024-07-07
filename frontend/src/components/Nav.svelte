<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Cookies from 'js-cookie';
    import { validateToken, getUserNameById, logout, clearLocalStorage } from '../utils';
    
    let navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    let userName = null;

    onMount(() => {
        let sessionToken = Cookies.get('session_token');
        if (sessionToken){
            validateToken().then(async (userIdResponse) => {
                if (userIdResponse !== -1) {
                    userName = await getUserNameById(userIdResponse);
                }
                else{
                    Cookies.remove('session_token');
                    clearLocalStorage();
                }
            });
        }
        else{
            clearLocalStorage();
        }
    });

    async function logoutFrontend(){
        await logout();
        Cookies.remove('session_token');
        clearLocalStorage();
        window.location.href = '/';
    }
</script>


<style>
    .navbar {
        background-color: #002254; /* A darker blue color */
        padding: 1% 8%;
    }

    .navbar-brand {
        color: white;
    }

    .navbar-text {
        color: white;
    }
    .btn {
        color: white;
    }
</style>

<nav class="navbar">
    <div class="container-fluid">
        <div class="justify-content-start">
            <a href="/" class="navbar-brand">Rate My Apartments</a>
            {#if userName}
                <span class="navbar-text">Hello, {userName}!</span>
            {:else}
                <span class="navbar-text">Guest</span>
            {/if}
        </div>
        <div class="d-flex">
            {#each navItems as { name, path }}
                <a href={path} class="btn btn-outline-secondary me-3">{name}</a>
            {/each}
            {#if userName}
                <button on:click={logoutFrontend} class="btn btn-outline-primary me-3">Logout</button>
            {:else}
                <button on:click={() => goto('/loginview')} class="btn btn-outline-primary me-3">Login</button>
                <button on:click={() => goto('/newaccount')} class="btn btn-outline-primary me-3">Register</button>
            {/if}
        </div>
    </div>
</nav>



