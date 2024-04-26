<script>
    export let review;
</script>

<style>
    .dark-blue-header {
      background-color: #004085; /* A darker blue color */
      color: white;
    }
</style>

<div class="card mb-3">
    <div class="card-header dark-blue-header">
      <h5 class="card-title">{review.title}</h5>
    </div>
    <div class="card-body">
      <p class="card-text">{review.content}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="text-warning">
          <!-- Displaying stars based on the review rating -->
          {#each Array(5) as _, i (i)}
            <i class={`bi bi-star${i < review.rating ? '-fill' : ''}`}></i>
          {/each}
        </div>
        <small class="text-muted">Rating: {review.rating}/5</small>
      </div>
    </div>
  </div>