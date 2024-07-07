<script>
    import { onMount } from "svelte";
    import { getLeasesByReviewId, PSQLDateToMonthYear, getFloorplanById } from "../utils";
    export let reviewId;
    let leases = [];

    let loading = true;
    onMount(async () => {
        leases = await getLeasesByReviewId(reviewId);
        for (let i = 0; i < leases.length; i++){
            leases[i].floorplan = await getFloorplanById(leases[i].floorplan_id);
        }
        loading = false;
    });

    function includedUtilitiesString(lease){
        let includedUtilitiesString = "";
        if (lease.electricity_included){
            includedUtilitiesString += "Electricity, ";
        }
        if (lease.water_included){
            includedUtilitiesString += "Water, ";
        }
        if(includedUtilitiesString == ""){
            return "Electricity and Water not Included";
        }
        return includedUtilitiesString.slice(0, -2) + " Included";
    }

    function parkingString(lease){
        if (!lease.parking_included && lease.parking_cost){
            return "$" + lease.parking_cost;
        }
        else if (!lease.parking_included && !lease.parking_cost){
            return "Not Included";
        }
        else{
            return "Included";
        }
    }
</script>

{#if loading}
<div class="container text-center pt-5">
    <h3>Loading leases...</h3>
</div>
{:else}
{#if leases.length !== 0}
<div class="container text-center pt-5">
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Lease Start Date</th>
                        <th scope="col">Lease End Date</th>
                        <th scope="col">Date Signed</th>
                        <th scope="col">Floorplan</th>
                        <th scope="col">Included Utilities</th>
                        <th scope="col">Rent</th>
                        <th scope="col">Parking</th>
                    </tr>
                </thead>
                <tbody>
                    {#each leases as lease}
                        <tr>
                            <td>{PSQLDateToMonthYear(lease.start_date)}</td>
                            <td>{PSQLDateToMonthYear(lease.end_date)}</td>
                            <td>{PSQLDateToMonthYear(lease.sign_date)}</td>
                            <td>{lease.floorplan.name}</td>
                            <td>{includedUtilitiesString(lease)}</td>
                            <td>{"$" + lease.rent}</td>
                            <td>{parkingString(lease)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    {/if}
{/if}
