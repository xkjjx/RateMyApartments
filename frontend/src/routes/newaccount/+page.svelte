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

<h1>Register</h1>
<input type="text" placeholder="Email" />
<input type="text" placeholder="Name" />
<input type="password" placeholder="Password" />
<input type="password" placeholder="Confirm Password" />
<button on:click={addUserFrontend}>Register</button>
{#if accountCreationFailed}
    <p>Account creation failed. Please try again.</p>
{/if}