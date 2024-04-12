<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getApartmentInformation, postReview } from '../../../utils.js'

    const id = $page.params.apartment; 

    let info = {"name":""};

    onMount(async () => {
        info = await getApartmentInformation(id);
    });

    async function addReview() {
        console.log("Add Review");
        let name = document.querySelector('input[placeholder="Name"]').value;
        let email = document.querySelector('input[placeholder="Email"]').value;
        let title = document.querySelector('input[placeholder="Title"]').value;
        let rating = document.querySelector('input[placeholder="Rating"]').value;
        let review = document.querySelector('textarea').value;
        document.querySelector('input[placeholder="Name"]').value = "";
        document.querySelector('input[placeholder="Email"]').value = "";
        document.querySelector('input[placeholder="Title"]').value = "";
        document.querySelector('input[placeholder="Rating"]').value = "";
        document.querySelector('textarea').value = "";
        if (name == "" || email == "" || title == "" || rating == "" || review == "" || isNaN(rating) || rating < 1 || rating > 5){
            alert("Please fill out all fields correctly");
            return;
        }
        let request = {
            "user_id": 1,
            "title": title,
            "rating": rating,
            "review": review,
            "apartment_id": id
        }
        let response = (await postReview(request)).json();
    }

</script>

<h1>{info.name}</h1>
<p>{info.address}</p>
<p>{info.description}</p>

<h2>Reviews</h2>
<div>
    <input type="text" placeholder="Name">
    <input type="text" placeholder="Email">
</div>
<div>
    <input type="text" placeholder="Title">
    <input type="number" placeholder="Rating">
</div>
<textarea rows="4" cols="50"></textarea>
<button on:click={addReview}>Add Review</button>
