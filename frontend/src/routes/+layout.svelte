<script>
    import Nav from '../components/Nav.svelte';
    import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 10%;
        height: 100%;
        background-color: #005588;
    }

    .container {
        height: 100%;
        border-left: 2px solid black;
        border-right: 2px solid black;
        background-color: white;
    }

    @media (max-width: 768px) {
        .mainContainer {
            padding: 0;
            background-color: white;
        }
        .container{
            margin: 5px;
            border: 0;
            width: 100%
        }
    }
</style>

<Nav />
<div class="mainContainer">
    <div class="container">
        <slot />
    </div>
</div>
