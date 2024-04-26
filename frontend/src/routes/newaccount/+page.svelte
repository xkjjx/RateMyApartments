<script>
    import { onMount } from 'svelte';
    import { addUser } from '../../utils'

    let accountCreationFailed = false;
    async function addUserFrontend(){
        let email = document.querySelector('input[type="text"]').value;
        let name = document.querySelectorAll('input[type="text"]')[1].value;
        let password = document.querySelectorAll('input[type="password"]')[0].value;
        let confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
        if (password !== confirmPassword){
            accountCreationFailed = true;
            return;
        }
        let response = await addUser(email, password, name);
        if (response === -1){
            accountCreationFailed = true;
        }
        else{
            window.location.href = '/';
        }
    }
</script>

<!-- <h1>Register</h1>
<input type="text" placeholder="Email" />
<input type="text" placeholder="Name" />
<input type="password" placeholder="Password" />
<input type="password" placeholder="Confirm Password" />
<button on:click={addUserFrontend}>Register</button>
{#if accountCreationFailed}
    <p>Account creation failed. Please try again.</p>
{/if} -->

<div class="container pt-5 mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="mb-3">Register</h2>
            <form>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Email" />
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Full Name" />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Password" />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Confirm Password" />
                </div>
                <button type="button" class="btn btn-primary" on:click={addUserFrontend}>Create Account</button>
            </form>
            {#if accountCreationFailed}
                <p class="alert alert-danger mt-2">Account creation failed</p>
            {/if}
        </div>
    </div>
</div>