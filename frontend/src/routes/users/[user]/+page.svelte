<script>
    import { onMount } from "svelte";
    import { getReviewsByUser, getUserNameById } from "../../../utils";
    import ReviewCards from "../../../components/ReviewCards.svelte";
    import { page } from '$app/stores';

    let loading = true;
    let reviews = [];
    let name = "";
    onMount(async () => {
        name  = await getUserNameById($page.params.user);
        reviews = await getReviewsByUser($page.params.user);
        loading = false;
    });
</script>


{#if loading}
<div class="container text-center pt-5">
    <h1>Loading reviews...</h1>
</div>
{:else}
<div class="container mt-5">

    <h1>{name}'s Reviews</h1>

    {#if reviews.length === 0}
        <p>No reviews found for this user.</p>
    {:else}
        <ReviewCards {reviews} />
    {/if}
</div>
{/if}