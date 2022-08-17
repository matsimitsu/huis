import client from '$lib/pocketbase'

export async function GET() {
	const posts = await client.records.getFullList("posts", 200, { filter: "section=\"IZ53HF4cOCnCNYQ\" && public=true", sort: "-date", expand: "files"});
	if (posts) {
		return new Response(JSON.stringify(posts))
	} else {
		return new Response({}, { status: 404 })
	}
}
