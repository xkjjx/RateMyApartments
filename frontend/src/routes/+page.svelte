<script>
    import { onMount } from 'svelte';
    import { getAreas } from '../utils.js';

    let areas = [];
    onMount(async () => {
        areas = await getAreas();
    });
</script>

<h1>Rate My Apartments</h1>
<h2>List of locations:</h2>
    
    {#each areas as area}
        <a href="/area/{area.id}">
            <h3>{area.name}</h3>
        </a>
    {/each}

