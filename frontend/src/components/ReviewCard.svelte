<script>
    import Leases from './Leases.svelte';
    export let review;
</script>

<style>
    .dark-blue-header {
      background-color: #004085; /* A darker blue color */
      color: white;
    }

    a { 
      color: inherit;
      background-color: inherit;
      font-size: inherit;
      font-weight: inherit;
      font-style: inherit;
      text-decoration: inherit;
      text-transform: inherit;
      letter-spacing: inherit;
    }
</style>

<div class="card mb-3">
    <div class="card-header dark-blue-header">
      <h5 class="card-title">
        <a href='/reviews/{review.id}'>
          {review.title}
        </a>
      </h5>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="text-warning">
          <!-- Displaying stars based on the review rating -->
          {#each Array(5) as _, i (i)}
            <i class={`bi bi-star${i < review.rating ? '-fill' : ''}`}></i>
          {/each}
        </div>
        <small class="text-muted">Rating: {review.rating}/5</small>
      </div>
      <p class="card-text">{review.content}</p>
    </div>
    <div class="card-body">
      <Leases reviewId={review.id}/>
    </div>
  </div>