<script>
	export let video = {};
	let w = 635;
	$: h = Math.round((w * 9) / 16);

	const src = video.src.replace(
		'https://www.youtube.com/watch?v=',
		'https://www.youtube.com/embed/'
	);
</script>

<div bind:clientWidth={w} class="text-center">
	<iframe width={w} height={h} {src} title="Youtube video" allow="fullscreen" />
	{#if video.caption}
		<p class="text-gray-400 mt-1 text-sm">{video.caption}</p>
	{/if}
</div>
