<script>
    import { onMount } from "svelte";
    import { getReviewsByUser, getUserNameById } from "../../../utils";
    import ReviewCards from "../../../components/ReviewCards.svelte";
    import { page } from '$app/stores';


    let reviews = [];
    let name = "";
    console.log($page.params.user);
    onMount(async () => {
        name  = await getUserNameById($page.params.user);
        reviews = await getReviewsByUser($page.params.user);
    });
</script>

<div class="container mt-5">
    {#if name == ""}
        <h1>Loading...</h1>
    {:else}
        <h1>{name}'s Reviews</h1>
    {/if}

    {#if reviews.length === 0}
        <p>No reviews found for this user.</p>
    {:else}
        <ReviewCards {reviews} />
    {/if}
</div>