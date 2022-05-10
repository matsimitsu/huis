export async function get() {
	const posts = await fetch('https://notion-cache.matsimitsu.com').then(response => response.json())

	if (posts) {
		return {
			body: posts.sort((a,b) => Date.parse(b.page.created_time) - Date.parse(a.page.created_time)),
		};
	} else {
		return {
			status: 404
		};
	}
}
