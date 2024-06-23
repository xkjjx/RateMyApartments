<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getReview, MonthYearToPSQLDate, addLease, validateToken, getFloorplansByApartmentId } from '../../../utils.js';
    import ReviewCard from '../../../components/ReviewCard.svelte';
  import { add } from 'date-fns';

    let sign_month = '';
    let sign_year = '';
    let start_month = '';
    let start_year = '';
    let end_month = '';
    let end_year = '';
    let rent = '';
    let floorplan = '';
    let water_included = false;
    let electricity_included = false;
    let parking_cost = '';
    let parking_covered = false;

    const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
    ];

    let floorplans = [];

    const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - 25 + i).toString());

    let addingLeaseInformation = false;
    let loading = true;
    let reviewByUser = false;
    let review = {};
    const review_id = $page.params.review;
    onMount(async () => {
        try{
            review = await getReview(review_id);
            let user = await validateToken();
            floorplans = await getFloorplansByApartmentId(review.apartment_id);
            if (review.user_id == user){
                reviewByUser = true;
            }
            loading = false;
        } catch (error) {
            console.error(error);
        }
    });

    function addLeaseInformationButtonTrue(){
        addingLeaseInformation = true;
    }

    async function addLeaseInformationButtonFalse(){
        addingLeaseInformation = false;
    }

    async function handleSubmit(event){
        event.preventDefault();
        let leaseInformation = {
            "review_id": review_id,
            "sign_date": MonthYearToPSQLDate(sign_month, sign_year),
            "start_date": MonthYearToPSQLDate(start_month, start_year),
            "end_date": MonthYearToPSQLDate(end_month, end_year),
            "rent": rent,
            "floorplan_id": floorplan.id,
            "water_included": water_included,
            "electricity_included": electricity_included,
            "parking_cost": parking_cost,
            "parking_covered": parking_covered
        }
        
        let response = await addLease(leaseInformation);

        if (response.status == 200){
            window.location.reload();
        }
        else{
            alert("Failed to add lease information");
            console.error(response);
        }
    }
</script>


{#if loading}
    <div class="container text-center pt-5">
        <h1>Loading review...</h1>
    </div>
{:else}
    <div class="container mt-5">
        <ReviewCard {review} />
        {#if !addingLeaseInformation && reviewByUser}
        <button class="btn btn-primary" on:click={addLeaseInformationButtonTrue}>Add Lease</button>
        {/if}
        {#if addingLeaseInformation}
        <div class="card shadow-lg p-5">
            <h2 class="text-2xl font-bold mb-4">Lease Form</h2>
            <form on:submit={handleSubmit}>
              <div class="form-group mb-4">
                <label for="sign_date" class="block text-gray-700">Signing Date</label>
                <div class="flex space-x-2">
                  <select id="sign_month" bind:value={sign_month} class="form-control border rounded py-2 px-3">
                    <option value="" disabled selected>Month</option>
                    {#each months as month}
                      <option value={month.value}>{month.name}</option>
                    {/each}
                  </select>
                  <select id="sign_year" bind:value={sign_year} class="form-control border rounded py-2 px-3">
                    <option value="" disabled selected>Year</option>
                    {#each years as year}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="form-group mb-4">
                <label for="start_date" class="block text-gray-700">Lease Start Date</label>
                <div class="flex space-x-2">
                  <select id="start_month" bind:value={start_month} class="form-control border rounded py-2 px-3">
                    <option value="" disabled selected>Month</option>
                    {#each months as month}
                      <option value={month.value}>{month.name}</option>
                    {/each}
                  </select>
                  <select id="start_year" bind:value={start_year} class="form-control border rounded py-2 px-3">
                    <option value="" disabled selected>Year</option>
                    {#each years as year}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="form-group mb-4">
                <label for="end_date" class="block text-gray-700">Lease End Date</label>
                <div class="flex space-x-2">
                  <select id="end_month" bind:value={end_month} class="form-control border rounded py-2 px-3">
                    <option value="" disabled selected>Month</option>
                    {#each months as month}
                      <option value={month.value}>{month.name}</option>
                    {/each}
                  </select>
                  <select id="end_year" bind:value={end_year} class="form-control border rounded py-2 px-3">
                    <option value="" disabled selected>Year</option>
                    {#each years as year}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="form-group mb-4">
                <select id="floorplan" bind:value={floorplan} class="form-control border rounded py-2 px-3">
                  <option value="" disabled selected>Select Floorplan</option>
                  {#each floorplans as floorplan}
                    <option value={floorplan}>{floorplan.name}</option>
                  {/each}
              </div>
              <div class="form-group mb-4">
                <label for="rent" class="block text-gray-700">Rent</label>
                <input type="number" step="0.01" id="rent" bind:value={rent} class="form-control border rounded w-full py-2 px-3" placeholder="Enter Rent">
              </div>
              <div class="form-group mb-4">
                <label for="water_included" class="block text-gray-700">Water Included</label>
                <input type="checkbox" id="water_included" bind:checked={water_included} class="form-check-input">
              </div>
              <div class="form-group mb-4">
                <label for="electricity_included" class="block text-gray-700">Electricity Included</label>
                <input type="checkbox" id="electricity_included" bind:checked={electricity_included} class="form-check-input">
              </div>
              <div class="form-group mb-4">
                <label for="parking_cost" class="block text-gray-700">Parking Cost</label>
                <input type="number" step="0.01" id="parking_cost" bind:value={parking_cost} class="form-control border rounded w-full py-2 px-3" placeholder="Enter Parking Cost">
              </div>
              <div class="form-group mb-4">
                <label for="parking_covered" class="block text-gray-700">Covered Parking</label>
                <input type="checkbox" id="parking_covered" bind:checked={parking_covered} class="form-check-input">
              </div>
              <button type="submit" class="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
          </div>
        {/if}
    </div>
{/if}