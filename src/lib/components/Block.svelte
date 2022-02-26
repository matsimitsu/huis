<script>
	import Text from '$lib/components/Text.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import Image from '$lib/components/Image.svelte';
	import Table from '$lib/components/Table.svelte';
	import File from '$lib/components/File.svelte';

	export let block = {};
	const { type } = block;
	const value = block[type];
	console.log(block);
</script>

{#if type == 'paragraph'}
	<p>
		<Text text={value.text} />
	</p>
{:else if type == 'heading_1'}
	<h1>
		<Text text={value.text} />
	</h1>
{:else if type == 'heading_2'}
	<h2>
		<Text text={value.text} />
	</h2>
{:else if type == 'heading_3'}
	<h3>
		<Text text={value.text} />
	</h3>
{:else if type == 'bulleted_list_item' || type == 'numbered_list_item'}
	<li>
		<Text text={value.text} />
	</li>
{:else if type == 'divider'}
	<hr />
{:else if type == 'image'}
	<Image image={value} />
{:else if type == 'table'}
	<Table table={value} />
{:else if type == 'quote'}
	<blockquote>{value.text[0].plain_text}</blockquote>
{:else if type == 'child_database'}
	<Gallery gallery={value} />
{:else if type == 'file'}
	<File file={value} />
{/if}
