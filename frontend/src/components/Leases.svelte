<script>
    import { onMount } from "svelte";
    import { getLeasesByReviewId, PSQLDateToMonthYear } from "../utils";
    export let reviewId;
    let leases = [];
    onMount(async () => {
        leases = await getLeasesByReviewId(reviewId);
        console.log(leases);
    });
</script>

{#if leases.length !== 0}
<div class="container text-center pt-5">
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Lease Start Date</th>
                <th scope="col">Lease End Date</th>
                <th scope="col">Date Signed</th>
                <th scope="col">Rent</th>
            </tr>
        </thead>
        <tbody>
            {#each leases as lease}
                <tr>
                    <td>{PSQLDateToMonthYear(lease.start_date)}</td>
                    <td>{PSQLDateToMonthYear(lease.end_date)}</td>
                    <td>{PSQLDateToMonthYear(lease.sign_date)}</td>
                    <td>{lease.rent}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
{/if}