<script>
    export let apartment;
    import { createEventDispatcher,onMount } from "svelte";
    let isAdmin = false;


    const dispatch = createEventDispatcher();

    function handleDelete() {
        dispatch("delete",{id:apartment.id});
    }

    onMount(async () => {
        isAdmin = localStorage.getItem('isAdmin');
        if(isAdmin == "true"){
            isAdmin = true;
        } else {
            isAdmin = false;
        }
    });
</script>

<style>
    .card {
        border: none !important; /* Remove borders */
        background-color: #003366; /* Dark blue color */
        color: white; /* White text color */
        width: 200px;
        display: flex;
    }
    .card:hover {
        background-color: #002244; /* Slightly darker blue on hover */
    }

    a h5{
        text-decoration: none;
        color: white;
    }

    a p{
        text-decoration: none;
        color: white;
    }
</style>

<!-- This is a corrected version of your Svelte card component with Bootstrap -->
<div class="card">
    <div class="card-body">
        <!-- Clickable title and description using Svelte binding for the ID -->
        <a href={`/apartments/${apartment.id}`} class="text-decoration-none">
            <h5 class="card-title">{apartment.name}</h5>
            <p class="card-text">{apartment.description}</p>
        </a>
        <!-- External links for maps -->
        <p class="card-text">
            <a href={apartment.google_maps_link} target="_blank" rel="noopener noreferrer">
                Google Maps
            </a>
        </p>
        <p class="card-text">
            <a href={apartment.apple_maps_link} target="_blank" rel="noopener noreferrer">
                Apple Maps
            </a>
        </p>
    </div>
    <!-- Delete button with event handling in Svelte -->
    {#if isAdmin}
    <button on:click={handleDelete} class="btn btn-danger">Delete</button>
    {/if}
</div>