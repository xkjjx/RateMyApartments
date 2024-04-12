<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getApartmentsInArea } from '../../../utils.js'
    import { getAreaName } from '../../../utils.js'

    const id = $page.params.area; 

    let apartments = [];
    let name = ""
    onMount(async () => {
        apartments = await getApartmentsInArea(id);
        name = await getAreaName(id);
        page.set({ apartments });
    });
</script>

<h1>Apartments in {name.name}:</h1>
    
    {#each apartments as apartment}
        <a href="/apartments/{apartment.id}">
            <h2>{apartment.name}</h2>
        </a>
        <p>{apartment.description}</p>
    {/each}