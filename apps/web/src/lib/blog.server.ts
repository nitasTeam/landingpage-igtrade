import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description?: string;
    image?: string;
    author?: string;
    tags?: string[];
    content: string;
}

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
    try {
        const files = await fs.readdir(CONTENT_DIR);
        const posts: BlogPost[] = [];

        for (const file of files) {
            if (file.endsWith('.md')) {
                const slug = file.replace('.md', '');
                const post = await getPostBySlug(slug);
                if (post) {
                    posts.push(post);
                }
            }
        }

        // Sort by date descending
        return posts.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const filePath = path.join(CONTENT_DIR, `${slug}.md`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            description: data.description,
            image: data.image,
            author: data.author,
            tags: data.tags,
            content,
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

// Get excerpt from content (first 150 characters)
export function getExcerpt(content: string, length = 150): string {
    const plainText = content
        .replace(/^#+\s+/gm, '') // Remove markdown headings
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
        .replace(/[*_~`]/g, '') // Remove formatting
        .trim();

    if (plainText.length <= length) {
        return plainText;
    }

    return plainText.substring(0, length).trim() + '...';
}

// Generate sitemap data for all blog posts
export async function generateSitemapData() {
    const posts = await getAllPosts();
    const baseUrl = 'https://igtrade.id';

    const staticPages = [
        { url: '/', lastmod: new Date().toISOString(), priority: '1.0', changefreq: 'weekly' },
        { url: '/about', lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'monthly' },
        { url: '/contact-us', lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'monthly' },
        { url: '/blog', lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
    ];

    const blogPosts = posts.map(post => ({
        url: `/blog/${post.slug}`,
        lastmod: post.date,
        priority: '0.7',
        changefreq: 'monthly',
    }));

    const allPages = [...staticPages, ...blogPosts];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date(page.lastmod).toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
}
