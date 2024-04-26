<script>
    export let apartments;
    import ApartmentCard from "./ApartmentCard.svelte";
</script>

<div class="list-group">
    {#each apartments as apartment}
        <ApartmentCard apartment={apartment} />
    <!-- {#if isAdmin}
        <button on:click={deleteApartmentFrontend(apartment.id)}>Delete</button>
    {/if} -->
    {/each}
</div>