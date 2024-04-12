<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getApartmentInformation } from '../../../utils.js'

    const id = $page.params.apartment; 

    let info = {"name":""};

    onMount(async () => {
        info = await getApartmentInformation(id);
        page.set({ info });
    });

</script>

<h1>{info.name}</h1>
<p>{info.description}</p>