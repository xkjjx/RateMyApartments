<script>
    import { onMount } from 'svelte';
    import { login } from '../../utils'

    let loginFailed = false;
    async function loginFrontend() {
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        let response = await login(username, password);
        document.querySelector('input[type="text"]').value = '';
        document.querySelector('input[type="password"]').value = '';
        console.log(response)
        if(response.status == 200){
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