<script>
	export let data;
</script>

<h1>Welcome {data.user.name}</h1>
<p>{data.user.address ? data.user.address : 'Enter your address'}</p>
<form method="post" action="?/editAddress">
	<input type="text" name="address" placeholder="Update address" />
	<button>Edit</button>
</form>
