<script>
	export let text = [];
	const textWithMarks = text.map((t) => {
		const markObject = {};
		for (const { type, ...rest } of t.marks || []) {
			markObject[type] = rest;
		}
		return { ...t, markTypes: markObject };
	});
</script>

{#each textWithMarks as textItem}
	<span
		class:font-bold={textItem.markTypes.bold}
		class:italic={textItem.markTypes.italic}
		class:line-through={textItem.markTypes.strikethrough}
		class:underline={textItem.markTypes.underline}
		class="underline-offset-4"
	>
		{#if textItem.markTypes.link}
			<a
				class="text-teal-600 decoration-2 hover:text-teal-400 cursor-pointer"
				href={textItem.markTypes.link.href}
			>
				{textItem.text}
			</a>
		{:else if textItem.markTypes.code}
			<code>{textItem.text}</code>
		{:else}
			{textItem.text}
		{/if}
	</span>
{/each}
