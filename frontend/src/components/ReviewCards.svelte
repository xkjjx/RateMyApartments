<script>
    import ReviewCard from "./ReviewCard.svelte";
    export let reviews;
</script>

<div class="container mt-5">
    <h1>Reviews</h1>
    {#each reviews as review, index (index)}
      <ReviewCard {review} />
    {/each}
</div>