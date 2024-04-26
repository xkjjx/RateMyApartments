<script>
    export let area;
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

<a href="/area/{area.id}" class="text-decoration-none">
    <div class="card" href=/area/{area.id}>
        <div class="card-body">
            <h5 class="card-title">{area.name}</h5>
            <p class="card-text">Learn about {area.name}</p>
        </div>
    </div>
</a>
