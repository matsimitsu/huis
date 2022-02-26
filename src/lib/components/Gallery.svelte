<script>
	import Image from '$lib/components/Image.svelte';

	export let gallery = {};
	const images = gallery.children.map((g) => g.blocks).flat();
</script>

<div class="grid grid-cols-3 gap-4 my-8">
	{#each images as image (image.id)}
		<div class="h-48 overflow-hidden not-prose">
			<Image
				image={image.image}
				className="object-cover h-48 block w-full not-prose hover:scale-110 transition-all duration-150"
			/>
		</div>
	{/each}
</div>
