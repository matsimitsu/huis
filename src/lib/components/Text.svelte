<script>
	export let text = [];
</script>

{#each text as textItem}
	<span
		class:font-bold={textItem.annotations.bold}
		class:italic={textItem.annotations.italic}
		class:line-through={textItem.annotations.strikethrough}
		class:underline={textItem.annotations.underline}
		class="underline-offset-4"
	>
		{#if textItem.text.link}
			<a class="text-teal-600 decoration-2 hover:text-teal-400" href={textItem.text.link.url}>{textItem.text.content}</a>
		{:else if textItem.annotations.code}
			<code>{textItem.text.content}</code>
		{:else}
			{textItem.text.content}
		{/if}
	</span>
{/each}
