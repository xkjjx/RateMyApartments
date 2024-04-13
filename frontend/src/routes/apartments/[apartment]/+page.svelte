<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getApartmentInformation, postReview, getReviews } from '../../../utils.js'
    import { get } from 'svelte/store';
    import Cookies from 'js-cookie';

    const id = $page.params.apartment; 

    let info = {"name":""};
    let reviews = [];

    onMount(async () => {
        info = await getApartmentInformation(id);
        reviews = await getReviews(id);
    });

    async function addReview() {
        let sessionToken = Cookies.get('session_token');
        if (!sessionToken){
            alert("Please log in to add a review");
            return;
        }
        // let name = document.querySelector('input[placeholder="Name"]').value;
        // let email = document.querySelector('input[placeholder="Email"]').value;
        let title = document.querySelector('input[placeholder="Title"]').value;
        let rating = document.querySelector('input[placeholder="Rating"]').value;
        let review = document.querySelector('textarea').value;
        // document.querySelector('input[placeholder="Name"]').value = "";
        // document.querySelector('input[placeholder="Email"]').value = "";
        document.querySelector('input[placeholder="Title"]').value = "";
        document.querySelector('input[placeholder="Rating"]').value = "";
        document.querySelector('textarea').value = "";
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
        let response = (await postReview(request)).json();
        if(response.status == 200){
            reviews = await getReviews(id);
        } else {
            alert("Failed to add review");
        }
    }

</script>

<h1>{info.name}</h1>
<p>{info.address}</p>
<p>{info.description}</p>

<h2>Reviews</h2>

{#each reviews as review}
    <div>
        <h3>{review.title}</h3>
        <p>{review.content}</p>
        <p>Rating: {review.rating}</p>
    </div>
{/each}

<!-- <div>
    <input type="text" placeholder="Name">
    <input type="text" placeholder="Email">
</div> -->
<div>
    <input type="text" placeholder="Title">
    <input type="number" placeholder="Rating">
</div>
<textarea rows="4" cols="50"></textarea>
<button on:click={addReview}>Add Review</button>
