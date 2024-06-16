<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { addApartment, getApartmentsInArea, deleteApartment,getAreaName } from '../../../utils.js'
    import ApartmentCards from '../../../components/ApartmentCards.svelte';


    const id = $page.params.area; 
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
    });

</script>


<div class="container text-center pt-5">
    <h1>Apartments in {name.name}</h1>
    <ApartmentCards apartments={apartments} areaId={id}/>
</div>