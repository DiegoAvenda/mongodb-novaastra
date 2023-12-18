<script>
	import { readings } from '$lib/utils/readings';
</script>

<h1>Readings</h1>

<br />

<div class="flex flex-col gap-3">
	{#each readings as reading}
		<div class="card w-96 bg-neutral text-neutral-content">
			<div class="card-body items-center text-center">
				<h2 class="card-title">{reading.title}</h2>
				<p>${reading.price}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Add to cart</button>
				</div>
			</div>
		</div>
	{/each}
</div>
