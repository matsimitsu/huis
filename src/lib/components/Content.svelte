<script>
	import Text from '$lib/components/Text.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import Image from '$lib/components/Image.svelte';
	import Table from '$lib/components/Table.svelte';
	import File from '$lib/components/File.svelte';
	import Youtube from '$lib/components/Youtube.svelte';

	export let post = {};

	const content = post.content
	const files = post["@expand"].files
</script>

{#each content.content as block}
	{#if block.type == 'paragraph'}
		<p>
			<Text text={block.content} />
		</p>
	{:else if block.type == 'heading_1'}
		<h1>
			<Text text={value.text} />
		</h1>
	{:else if block.type == 'heading_2'}
		<h2>
			<Text text={value.text} />
		</h2>
	{:else if block.type == 'heading_3'}
		<h3>
			<Text text={value.text} />
		</h3>
	{:else if block.type == 'bulleted_list_item' || block.type == 'numbered_list_item'}
		<li>
			<Text text={value.text} />
		</li>
	{:else if block.type == 'divider'}
		<hr />
	{:else if block.type == 'img'}
		<Image image={block.attrs} files={files}/>
	{:else if block.type == 'table'}
		<Table table={value} />
	{:else if block.type == 'quote'}
		<blockquote>{value.text[0].plain_text}</blockquote>
	{:else if block.type == 'panel'}
		<Gallery gallery={block} files={files} />
	{:else if block.type == 'file'}
		<File file={block.attrs} files={files}/>
	{:else if block.type == 'youtube'}
		<Youtube video={block.attrs} />
	{/if}
{/each}
