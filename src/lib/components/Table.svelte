<script>
	import Text from '$lib/components/Text.svelte';

	export let table = {};
	const rows = table.children;
</script>

<table class="w-full my-8">
	{#each rows as row (row.id)}
		<tr>
			{#each row.table_row.cells as cell}
				<td class="border-b p-2"><Text text={cell} /></td>
			{/each}
		</tr>
	{/each}
</table>
