<script>
    import { onMount } from 'svelte';
    import { getAreas } from '../utils.js';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import AreaCard from '../components/AreaCard.svelte';
    import AreaCards from '../components/AreaCards.svelte';


    let areas = [];
    onMount(async () => {
        areas = await getAreas();
    });
</script>


<div class="container text-center pt-5">
    <h1 class="my-4">Locations</h1>
    <AreaCards {areas}/>
</div>



