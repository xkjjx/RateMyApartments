<script>
    import { onMount } from 'svelte';
    import { login,setLocalStorageWithUsernameValues, clearLocalStorage } from '../../utils'

    let loginFailed = false;
    async function loginFrontend() {
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        let response = await login(username, password);
        document.querySelector('input[type="text"]').value = '';
        document.querySelector('input[type="password"]').value = '';
        if(response.status == 200){
            await setLocalStorageWithUsernameValues(username);
            window.location.href = '/';
        } else {
            loginFailed = true;
        }
    }
</script>

<input type="text" placeholder="Username" />
<input type="password" placeholder="Password" />
<button on:click={loginFrontend}>Login</button>
{#if loginFailed}
    <p>Login failed</p>
{/if}