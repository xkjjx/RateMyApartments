<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { addApartment, getApartmentsInArea, deleteApartment } from '../../../utils.js'
    import { getAreaName } from '../../../utils.js'
    import ApartmentCards from '../../../components/ApartmentCards.svelte';


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

</script>


<div class="container text-center pt-5">
    <h1>Apartments in {name.name}</h1>
    <ApartmentCards apartments={apartments} areaId={id}/>
</div>


<!-- {#if isAdmin}
    <button on:click={addApartmentFirst}>Add Apartment</button>
{/if} -->

<!-- {#if addApartmentMode}
    <form on:submit|preventDefault={addApartmentFrontend}>
        <input type="text" placeholder="Name" id="name" required>
        <input type="text" placeholder="Description" id="description" required>
        <input type="text" placeholder="Address" id="address" required>
        <input type="text" placeholder="Google Map Link" id="gmap" required>
        <input type="text" placeholder="Apple Map Link" id="amap" required>
        <button type="submit">Submit</button>
    </form>
{/if} -->
