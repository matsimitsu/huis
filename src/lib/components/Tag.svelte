<script>
	export let tag = {};

	let classes = ['mr-1 rounded rounded-full px-2 py-1 text-xs'];
	switch (tag.color) {
		case 'brown':
			classes.push('text-amber-500 bg-amber-50');
			break;
		case 'yellow':
			classes.push('text-yellow-500 bg-yellow-50');
			break;
		case 'blue':
			classes.push('text-blue-500 bg-blue-50');
			break;
		case 'red':
			classes.push('text-red-500 bg-red-50');
			break;
		case 'green':
			classes.push('text-green-500 bg-green-50');
			break;
		case 'purple':
			classes.push('text-purple-500 bg-purple-50');
			break;
		case 'pink':
			classes.push('text-pink-500 bg-pink-50');
			break;
		default:
			classes.push('text-gray-500 bg-gray-50');
			break;
	}
</script>

<span class={classes.join(' ')}>{tag.name}</span>
