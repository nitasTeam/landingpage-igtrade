import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    author?: string;
    tags?: string[];
}

export function useSEO({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    author,
    tags,
}: SEOProps) {
    useEffect(() => {
        const baseUrl = 'https://igtrade.id';
        const fullUrl = url ? `${baseUrl}${url}` : window.location.href;
        const imageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/infinity-globalindo-logo.svg`;

        // Update title
        if (title) {
            document.title = title;
        }

        // Update or create meta tags
        const updateMetaTag = (property: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, property);
                document.head.appendChild(element);
            }

            element.content = content;
        };

        // Standard meta tags
        if (description) {
            updateMetaTag('description', description);
        }

        // Open Graph tags
        if (title) {
            updateMetaTag('og:title', title, true);
        }
        if (description) {
            updateMetaTag('og:description', description, true);
        }
        updateMetaTag('og:image', imageUrl, true);
        updateMetaTag('og:url', fullUrl, true);
        updateMetaTag('og:type', type, true);

        if (type === 'article' && publishedTime) {
            updateMetaTag('article:published_time', publishedTime, true);
        }
        if (type === 'article' && author) {
            updateMetaTag('article:author', author, true);
        }

        // Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image');
        if (title) {
            updateMetaTag('twitter:title', title);
        }
        if (description) {
            updateMetaTag('twitter:description', description);
        }
        updateMetaTag('twitter:image', imageUrl);

        // Update canonical link
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = fullUrl;

        // Cleanup function
        return () => {
            // Reset to default title when component unmounts
            document.title = 'Infinity Globalindo';
        };
    }, [title, description, image, url, type, publishedTime, author, tags]);
}

// Component version for JSON-LD structured data
interface StructuredDataProps {
    data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        script.id = 'structured-data';

        // Remove existing structured data if any
        const existing = document.getElementById('structured-data');
        if (existing) {
            existing.remove();
        }

        document.head.appendChild(script);

        return () => {
            script.remove();
        };
    }, [data]);

    return null;
}
