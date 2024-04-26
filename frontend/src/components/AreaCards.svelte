<script>
    import AreaCard from './AreaCard.svelte';
    export let areas;
</script>



<div class="list-group">
    {#each areas as area}
        <AreaCard area={area} />
    {/each}
</div>