import { getDatabase, getPage, getBlocks } from '$lib/notion';

export async function get() {
  const posts = await getEnrichedPosts(process.env.NOTION_DATABASE, [
    {
      property: 'Date',
      direction: 'descending',
    },
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
    }
  }
}

async function getEnrichedPosts(databaseId, sorts = []) {
  const posts = await getDatabase(databaseId, sorts);
  return await Promise.all(posts.map(post => enrichPost(post)));
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
          children: await getBlocks(block.id),
        };
      })
  );

  const childDatabases = await Promise.all(
    blocks
      .filter((block) => block.type == "child_database")
      .map(async (block) => {
        return {
          id: block.id,
          children: await getEnrichedPosts(block.id),
        };
      })
  )

  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    } else if (block.type == "child_database") {
      block[block.type]["children"] = childDatabases.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    page,
    blocks: blocksWithChildren
  }
}
