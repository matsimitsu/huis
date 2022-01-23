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
	import Tag from '$lib/components/Tag.svelte';

	export let posts = [];
</script>

<div class="mx-auto px-4 max-w-6xl py-24">
	<h1 class="text-5xl tracking-tight font-extrabold text-slate-900 text-center">
		<span class="mx-auto block md:inline">Bouwnummer 9</span>
		<span class="mx-auto block text-teal-600 md:inline">Updates</span>
	</h1>
	<main class="mt-12 mx-auto p-6 pb-12 max-w-4xl text-base leading-relaxed">
		{#each posts as post (post.page.id)}
			<article class="py-6 md:grid md:grid-flow-col md:grid-cols-4 border-t mt-12">
				<div
					class="hidden md:flex md:col-start-1 md:row-start-1 md:items-center md:self-start md:mt-3 md:text-md md:space-x-1 text-slate-600"
				>
					<FormattedDate date={post.page.properties?.Date?.date?.start || post.page.created_time} />
				</div>
				<div class="md:col-span-3 md:col-start-2">
					<header>
						<h1
							class="mt-4 text-slate-800 text-4xl font-extrabold tracking-tight leading-tight md:mt-0"
						>
							<Text text={post.page.properties.Name.title} />
						</h1>
						<div class="mt-1 text-sm flex items-center">
							<span class="inline md:hidden mr-1">
								<FormattedDate
									date={post.page.properties?.Date?.date?.start || post.page.created_time}
								/>
							</span>
							{#each post.page.properties.Tags.multi_select as tag}
								<Tag {tag} />
							{/each}
						</div>
					</header>
					<div class="prose mt-8">
						{#each post.blocks as block (block.id)}
							<Block {block} />
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</main>
</div>
