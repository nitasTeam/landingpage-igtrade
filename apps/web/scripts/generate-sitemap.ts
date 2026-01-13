// Script to generate sitemap.xml at build time
import { generateSitemapData } from '../src/lib/blog.server.js';
import fs from 'fs';
import path from 'path';

async function generateSitemap() {
    try {
        const sitemap = await generateSitemapData();
        const publicDir = path.join(process.cwd(), 'public');
        const sitemapPath = path.join(publicDir, 'sitemap.xml');

        fs.writeFileSync(sitemapPath, sitemap);
        console.log('✓ Sitemap generated successfully at public/sitemap.xml');
    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
