import client from '$lib/pocketbase'

export async function GET() {
	const posts = await client.records.getFullList("house_updates", 200, { filter: "public=true", sort: "-date", expand: "files"});
	if (posts) {
		return new Response(JSON.stringify(posts))
	} else {
		return new Response({}, { status: 404 })
	}
}
