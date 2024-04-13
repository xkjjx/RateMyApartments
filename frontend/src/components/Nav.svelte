<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Cookies from 'js-cookie';
    import { validateToken, getUserNameById } from '../utils';
    
    let navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    let userName = null;

    onMount(() => {
        let sessionToken = Cookies.get('session_token');
        console.log(sessionToken);
        if (sessionToken){
            validateToken().then(async (userIdResponse) => {
                if (userIdResponse !== -1) {
                    userName = await getUserNameById(userIdResponse);
                }
            });
        }
    });
</script>

<nav class="nav">
    {#each navItems as { name, path }}
        <a  href={path} class="nav-item">{name}</a>
    {/each}
    {#if userName}
        <span>Hello, {userName}!</span>
        <button on:click={() => goto('/')}>Logout</button>
    {:else}
        <button on:click={() => goto('/loginview')}>Login</button>
    {/if}
</nav>

