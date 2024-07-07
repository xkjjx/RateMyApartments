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
            // window.location.href = '/';
        } else {
            loginFailed = true;
        }
    }
</script>

<div class="container pt-5 mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="mb-3">Please Login</h2>
            <form>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Username" />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Password" />
                </div>
                <button type="button" class="btn btn-primary" on:click={loginFrontend}>Login</button>
            </form>
            {#if loginFailed}
                <p class="alert alert-danger mt-2">Login failed</p>
            {/if}
        </div>
    </div>
</div>