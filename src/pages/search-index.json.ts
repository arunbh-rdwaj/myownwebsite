import { getCollection } from 'astro:content';

export async function GET() {
	const posts = await getCollection('blog');
	const index = posts.map((p) => ({
		id: p.id,
		title: p.data.title,
		description: p.data.description,
		category: p.data.category ?? '',
		tags: p.data.tags ?? [],
	}));
	return new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json' },
	});
}
