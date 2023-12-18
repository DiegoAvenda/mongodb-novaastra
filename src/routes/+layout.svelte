<script>
	import '../app.css';
	import Navbar from '../lib/components/navbar.svelte';
	export let data;
</script>

<Navbar image={data.image} />
<slot />
