<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { addApartment, getApartmentsInArea } from '../../../utils.js'
    import { getAreaName } from '../../../utils.js'


    const id = $page.params.area; 
    let isAdmin = false;
    let addApartmentMode = false;
    let apartments = [];
    let name = ""
    onMount(async () => {
        apartments = await getApartmentsInArea(id);
        name = await getAreaName(id);
        isAdmin = localStorage.getItem('isAdmin');
        if(isAdmin == "true"){
            isAdmin = true;
        } else {
            isAdmin = false;
        }
    });

    async function addApartmentFrontend(){
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const address = document.getElementById('address').value;
        const gmap = document.getElementById('gmap').value;
        const amap = document.getElementById('amap').value;
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('address').value = '';
        document.getElementById('gmap').value = '';
        document.getElementById('amap').value = '';
        await addApartment(name, address ,description, gmap, amap, id);
        apartments = await getApartmentsInArea(id);
        addApartmentMode = false;
    }

    async function addApartmentFirst(){
        addApartmentMode = true;
    }
</script>

<h1>Apartments in {name.name}:</h1>
    
    {#each apartments as apartment}
        <a href="/apartments/{apartment.id}">
            <h2>{apartment.name}</h2>
        </a>
        <p>{apartment.description}</p>
    {/each}

{#if isAdmin}
    <button on:click={addApartmentFirst}>Add Apartment</button>
{/if}

{#if addApartmentMode}
    <form on:submit|preventDefault={addApartmentFrontend}>
        <input type="text" placeholder="Name" id="name" required>
        <input type="text" placeholder="Description" id="description" required>
        <input type="text" placeholder="Address" id="address" required>
        <input type="text" placeholder="Google Map Link" id="gmap" required>
        <input type="text" placeholder="Apple Map Link" id="amap" required>
        <button type="submit">Submit</button>
    </form>
{/if}
