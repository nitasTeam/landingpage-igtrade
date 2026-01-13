import { getAllPosts } from '../src/lib/blog.server.js';
import fs from 'fs';
import path from 'path';

async function generateBlogData() {
    try {
        console.log('📦 Generating blog data...');
        const posts = await getAllPosts();

        // Ensure the directory exists
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        // Write the data to json
        const outputPath = path.join(publicDir, 'blog-data.json');

        // We only need the full content for individual post lookup, 
        // but for the listing we might want a lighter version.
        // For simplicity in this SPA approach, we'll dump everything 
        // and filter on the client, or we could create two files.
        // Let's create one master file for this size of blog.

        fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
        console.log(`✓ Blog data generated at ${outputPath} (${posts.length} posts)`);
    } catch (error) {
        console.error('❌ Error generating blog data:', error);
        process.exit(1);
    }
}

generateBlogData();
