<script>
	import Image from '$lib/components/Image.svelte';

	export let gallery = {};
	export let files = []
</script>

<div class="grid grid-cols-3 gap-4 my-8">
	{#each gallery.content as image (image.attrs.id)}
		<div class="h-48 overflow-hidden not-prose">
			<Image
				image={image.attrs}
				className="object-cover h-48 block w-full not-prose hover:scale-110 transition-all duration-150"
			/>
		</div>
	{/each}
</div>
