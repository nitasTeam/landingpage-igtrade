const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const OUTPUT_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blog-data.json');

async function generateBlogData() {
    try {
        console.log('Generating blog data...');

        // Ensure content directory exists
        if (!fsSync.existsSync(CONTENT_DIR)) {
            console.log('Content directory does not exist, creating empty blog data...');
            if (!fsSync.existsSync(OUTPUT_DIR)) {
                fsSync.mkdirSync(OUTPUT_DIR, { recursive: true });
            }
            fsSync.writeFileSync(OUTPUT_FILE, JSON.stringify({ posts: [] }, null, 2));
            console.log('✓ Empty blog data generated');
            return;
        }

        const files = await fs.readdir(CONTENT_DIR);
        const posts = [];

        for (const file of files) {
            if (file.endsWith('.md')) {
                const slug = file.replace('.md', '');
                const filePath = path.join(CONTENT_DIR, file);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const { data, content } = matter(fileContent);

                posts.push({
                    slug,
                    title: data.title || 'Untitled',
                    date: data.date || new Date().toISOString(),
                    description: data.description,
                    image: data.image,
                    author: data.author,
                    tags: data.tags,
                    content,
                });
            }
        }

        // Sort by date descending
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Ensure output directory exists
        if (!fsSync.existsSync(OUTPUT_DIR)) {
            fsSync.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        // Write to public directory
        await fs.writeFile(OUTPUT_FILE, JSON.stringify({ posts }, null, 2));

        console.log(`✓ Generated blog data with ${posts.length} post(s)`);
    } catch (error) {
        console.error('Error generating blog data:', error);
        process.exit(1);
    }
}

generateBlogData();
