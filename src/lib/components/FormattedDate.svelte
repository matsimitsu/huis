<script>
	import dayjs from "dayjs"
	import customParseFormat from "dayjs/plugin/customParseFormat"
	dayjs.extend(customParseFormat)

	export let date;
	let dayjsDate = dayjs(date, 'YYYY-MM-DD H:mm:ss')
</script>

<time datetime={dayjsDate.toISOString()}>{dayjsDate.toDate().toLocaleDateString()}</time>
