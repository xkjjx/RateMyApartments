<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];
</script>

<nav class="nav">
    {#each navItems as { name, path }}
        <a  href={path} class="nav-item">{name}</a>
    {/each}
</nav>

