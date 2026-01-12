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

interface BlogData {
    posts: BlogPost[];
}

let blogDataCache: BlogData | null = null;

// Fetch blog data from the pre-generated JSON file
export async function getAllPosts(): Promise<BlogPost[]> {
    if (blogDataCache) {
        return blogDataCache.posts;
    }

    try {
        const response = await fetch('/blog-data.json');
        if (!response.ok) {
            console.error('Failed to fetch blog data');
            return [];
        }

        blogDataCache = await response.json();
        return blogDataCache?.posts || [];
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return [];
    }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug) || null;
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
