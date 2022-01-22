<script>
	import Text from '$lib/components/Text.svelte';

	export let image = {};
	export let className = '';
	const src = image.type === 'external' ? image.external.url : image.file.url;
</script>

<figure>
	<img {src} alt={image.caption} class={className} />
	{#if image.caption}
		<figcaption class="text-center"><Text text={image.caption} /></figcaption>
	{/if}
</figure>
