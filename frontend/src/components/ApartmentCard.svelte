<script>
    export let apartment;
</script>

<style>
    .card {
        border: none !important; /* Remove borders */
        background-color: #003366; /* Dark blue color */
        color: white; /* White text color */
        width: 25%;
        display: flex;
    }
    .card:hover {
        background-color: #002244; /* Slightly darker blue on hover */
    }
</style>

<a href="/apartments/{apartment.id}" class="text-decoration-none">
    <div class="card" href=/area/{apartment.id}>
        <div class="card-body">
            <h5 class="card-title">{apartment.name}</h5>
            <p class="card-text">{apartment.description}</p>
            <p class="card-text">
            <a href={apartment.google_maps_link}>
                Google Maps
            </a>
            </p>
            <p class="card-text">
            <a href={apartment.apple_maps_link}>
                Apple Maps
            </a>
            </p>
        </div>
    </div>
</a>