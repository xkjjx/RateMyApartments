<script>
    export let apartments;
    export let areaId;
    import ApartmentCard from "./ApartmentCard.svelte";
    import { deleteApartment, getApartmentsInArea } from "../utils";
    import Modal from "./AddApartmentModal.svelte";
    import { onMount } from "svelte";
    let isAdmin = false;
    let showModal = false;

    async function deleteApartmentFrontend(event){
        await deleteApartment(event.detail.id);
        apartments = await getApartmentsInArea(areaId);
    }

    function openModal() {
        showModal = true;
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

<div class="list-group">
    {#each apartments as apartment}
        <ApartmentCard apartment={apartment} on:delete={deleteApartmentFrontend}/>
    {/each}
    {#if isAdmin}
        <div class="mt-3">
            <button class="btn btn-primary w-50" on:click={openModal}>Add Apartment</button>
        </div>
    {/if}
    <Modal bind:showModal={showModal} {areaId} bind:apartments={apartments}/>
</div>