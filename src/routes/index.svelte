<script context="module">
	export async function load({ fetch }) {
		const url = `/posts.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
				},
				maxage: 3600
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import Text from '$lib/components/Text.svelte';
	import Block from '$lib/components/Block.svelte';
	import FormattedDate from '$lib/components/FormattedDate.svelte';

	export let posts = [];
</script>

<div class="mx-auto px-4 max-w-2xl py-24">
	<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-center">
		<span class="mx-auto block xl:inline">Bouwnummer 9</span>
		<span class="mx-auto block text-teal-600 xl:inline">Updates</span>
	</h1>
	{#each posts as post (post.page.id)}
		<article class="p-5 mt-8 border-b rounded bg-white">
			<header>
				<h1 class="text-4xl font-bold text-gray-800">
					<Text text={post.page.properties.Name.title} />
				</h1>
				<div class="mt-1 text-sm flex items-center">
					<p class="text-gray-600">
						<FormattedDate
							date={post.page.properties?.Date?.date?.start || post.page.created_time}
						/>
					</p>
					{#each post.page.properties.Tags.multi_select as tag}
						<span class="ml-1 rounded rounded-full bg-gray-200 text-gray-500 px-2 py-1 text-xs"
							>{tag.name}</span
						>
					{/each}
				</div>
			</header>
			<div class="prose mt-8">
				{#each post.blocks as block (block.id)}
					<Block {block} />
				{/each}
			</div>
		</article>
	{/each}
</div>
