import { getDatabase, getPage, getBlocks } from '$lib/notion';
import { upload, exists } from '$lib/scw';
import path from 'path'
import stream from 'stream';
import request from 'request';

export async function get() {
	const posts = await getEnrichedPosts(process.env.NOTION_DATABASE, [
		{
			property: 'Date',
			direction: 'descending'
		}
	]);

	if (posts) {
		return {
			body: posts,
			headers: {
				'Cache-Control': 'max-age=3600'
			}
		};
	} else {
		return {
			status: 404
		};
	}
}

async function getEnrichedPosts(databaseId, sorts = []) {
	const posts = await getDatabase(databaseId, sorts);
	return await Promise.all(posts.map((post) => enrichPost(post)));
}

async function enrichPost(post) {
	const page = await getPage(post.id);
	const blocks = await getBlocks(post.id);


	// Retrieve block children for nested blocks (one level deep), for example toggle blocks
	// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
	const childBlocks = await Promise.all(
		blocks
			.filter((block) => block.has_children)
			.map(async (block) => {
				return {
					id: block.id,
					children: await getBlocks(block.id)
				};
			})
	);

	const childDatabases = await Promise.all(
		blocks
			.filter((block) => block.type == 'child_database')
			.map(async (block) => {
				return {
					id: block.id,
					children: await getEnrichedPosts(block.id)
				};
			})
	);

	const blocksWithChildrenAndImages = await Promise.all(
		blocks.map(async (block) => {
			if (block.type == 'image' && block.image.type !== 'external') {
				block = await cacheImage(block)
			}
			// Add child blocks if the block should contain children but none exists
			if (block.has_children && !block[block.type].children) {
				block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children;
			} else if (block.type == 'child_database') {
				block[block.type]['children'] = childDatabases.find((x) => x.id === block.id)?.children;
			}
			return block;
		}));

	return {
		page,
		blocks: blocksWithChildrenAndImages
	};
}

async function cacheImage(block) {
	const url = block.image.file.url;
	const key = getKey(block.id, url);
	const image = { ...block.image, file: { url: "https://cdn.matsimitsu.com/" + key}}
	const newBlock = { ...block, image}

	// Short-circut if we already have the image for this block
	if (await exists(key)) { return newBlock }

	// Otherwise download the image and pass it to S3
	const pass = new stream.PassThrough();
	request(url).pipe(pass);
	await upload(key, pass);

	return newBlock
}

function getKey(id, urlStr) {
	const url = new URL(urlStr)
	const baseName = path.basename(url.pathname)
	return `huis/images/${id}/${baseName}`
}
