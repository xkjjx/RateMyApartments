<script>
    export let showModal = false;
    export let apartments;
    export let areaId;
    import { addApartment, getApartmentsInArea } from "../utils";


    let name = "";
    let description = "";
    let address = "";
    let gmap = "";
    let amap = "";

    function toggleModal() {
      showModal = !showModal;
    }

    async function addApartmentFrontend() {
        await addApartment(name, address, description, gmap, amap, areaId);
        name = "";
        description = "";
        address = "";
        gmap = "";
        amap = "";
        toggleModal();
        apartments = await getApartmentsInArea(areaId);
    }

  </script>
  
  {#if showModal}
  <div class="modal show" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header content-center">
          <h5 class="modal-title">Add Apartment</h5>
          <button type="button" class="btn-close" aria-label="Close" on:click={toggleModal}></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
            <input type="text" class="form-control" placeholder="Name" id="name" required bind:value={name}>
            </div>
            <div class="mb-3">
            <textarea placeholder="Description" class="form-control" id="description" required bind:value={description}></textarea>
            </div>
            <div class="mb-3">
            <input type="text" class="form-control" placeholder="Address" id="address" required bind:value={address}>
            </div>
            <div class="mb-3">
            <input type="text" class="form-control" placeholder="Google Maps Link" id="gmap" required bind:value={gmap}>
            </div>
            <div class="mb-3">
            <input type="text" class="form-control" placeholder="Apple Maps Link" id="amap" required bind:value={amap}>
            </div>
            <button type="submit" class="btn btn-primary w-50" on:click={addApartmentFrontend}>Submit</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={toggleModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
  {/if}
  
  <style>
    .modal.show {
      display: block; /* Ensure the modal displays when showModal is true */
    }
  </style>
  