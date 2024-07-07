<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getApartmentInformation, postReview, getReviews, getApartmentPhotoUrl } from '../../../utils.js'
    import { get } from 'svelte/store';
    import Cookies from 'js-cookie';
    import ReviewCards from '../../../components/ReviewCards.svelte';

    const id = $page.params.apartment; 

    let loading = true;
    let info = {"name":""};
    let reviews = [];
    let newTitle = "";
    let newRating = "";
    let newContent = "";
    let img_url = "";

    let addReviewPressed = false;

    onMount(async () => {
        info = await getApartmentInformation(id);
        reviews = await getReviews(id);
        img_url = await getApartmentPhotoUrl(id);
        loading = false;
    });

    function addReviewPressedTrue(){
        addReviewPressed = true;
    }

    async function addReview() {
        let sessionToken = Cookies.get('session_token');
        if (!sessionToken){
            alert("Please log in to add a review");
            return;
        }
        let title = newTitle;
        let rating = newRating;
        let review = newContent;
        newTitle = "";
        newRating = "";
        newContent = "";
        if (title == "" || rating == "" || review == "" || isNaN(rating) || rating < 1 || rating > 5){
            alert("Please fill out all fields correctly");
            return;
        }
        let request = {
            "title": title,
            "rating": rating,
            "review": review,
            "apartment_id": id
        }
        let response = await postReview(request);
        console.log(response);
        if(response != -1){
            window.location.href = `/reviews/${response.id}`;
        }
        else{
            alert("Failed to add review");
        }
    }

</script>

<style>
    .rating {
      display: inline-flex;
      direction: rtl; /* Right-to-left to allow filling stars from right to left */
    }
    .rating input {
      display: none; /* Hide the radio button itself */
    }
    .rating label {
      font-size: 1.5rem; /* Larger star icons */
      color: #fff4d2; /* Gold color for stars */
      cursor: pointer;
    }
    .rating label:hover,
    .rating label:hover ~ label,
    .rating input:checked ~ label {
      color: #e0a800; /* Darker shade when hovered or selected */
    }

    #main-image-container {
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center;
    }

    .img-fluid {
        width: 75%;
        height: auto
    }
</style>


{#if loading}
    <div class="container text-center pt-5">
        <h1>Loading apartment information...</h1>
    </div>
{:else}
    <div class="container mt-5">
        <h1>{info.name}</h1>
        <h4>{info.address}</h4>
        <p>{info.description}</p>
    </div>

    <div class="container mt-5" id="main-image-container">
        <img src={img_url} alt="Apartment" class="img-fluid">
    </div>

    <div class="container mt-5">
        <h2>Reviews</h2>
    </div>

    <div class="container mt-5">
        {#if !addReviewPressed}
            <button type="button" class="btn btn-primary" on:click={addReviewPressedTrue}>Add Review</button>
        {:else}
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Title" bind:value={newTitle}>
            </div>
            <div class="mb-3">
                <div class="rating">
                    {#each Array(5) as _, i (i)}
                        <input type="radio" id="star{5-i}" name="rating" bind:group={newRating} value={5-i} />
                        <label for="star{5-i}" class="bi bi-star-fill"></label>
                    {/each}
                </div>
            </div>
            <div class="mb-3">
                <textarea class="form-control" rows="4" placeholder="Enter your review here..." bind:value={newContent}></textarea>
            </div>
            <button type="button" class="btn btn-primary" on:click={addReview}>Submit</button>
        {/if}
    </div>
{/if}

<ReviewCards bind:reviews={reviews}/>


