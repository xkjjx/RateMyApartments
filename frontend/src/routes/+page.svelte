<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { addApartment, getApartmentsInArea, deleteApartment, getAreaName } from '../utils.js'
    import ApartmentCards from '../components/ApartmentCards.svelte';

    let loading = true;
    const id = 1; 
    let isAdmin = false;
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
        loading = false;
    });

</script>

<style>
    .container{
        min-height: -webkit-fill-available;
    }
</style>

{#if loading}
    <div class="container text-center pt-5">
        <h1>Loading apartments in your area...</h1>
    </div>
{:else}
    <div class="container text-center pt-5">
        <h1>Apartments in {name.name}</h1>
        <ApartmentCards apartments={apartments} areaId={id}/>
    </div>
{/if}