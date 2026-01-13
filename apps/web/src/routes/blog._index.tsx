import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/lib/blog.server'; // Type import is safe
import { useSEO } from '@/hooks/use-seo';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getExcerpt } from '@/lib/blog'; // We need a client-side version of this, or move it.
// Actually, getExcerpt in blog.server.ts is a pure utility function (string manipulation), 
// but importing it from a .server file might still trigger bundler issues if the file contains fs imports at the top.
// It's safer to inline the excerpt logic or move it to a shared utils file.


export default function BlogIndex() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPosts() {
            try {
                // Fetch the static JSON file generated at build time
                const response = await fetch('/blog-data.json');
                if (!response.ok) throw new Error('Failed to load blog data');

                const loadedPosts = await response.json();
                setPosts(loadedPosts);
            } catch (error) {
                console.error('Error loading blog posts:', error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    // SEO: Update meta tags for blog listing page
    useSEO({
        title: 'Blog - Latest Insights & Industry Updates | Infinity Globalindo',
        description: 'Discover the latest news, industry trends, and expert insights on global trade, import-export, and international business from the Infinity Globalindo team.',
        url: '/blog',
        type: 'website',
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D98C4]"></div>
                    <p className="mt-4 text-slate-600">Loading blog posts...</p>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70"></div>
                </div>

                <div className="relative max-w-7xl mx-auto text-center z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 tracking-wide uppercase">
                        Our Journal
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6 font-bold tracking-tight">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D98C4] to-[#146c8e]">Insights</span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Discover the latest news, industry trends, and updates from the Infinity Globalindo team.
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="pb-24 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl shadow-sm border border-slate-100 p-12">
                            <div className="bg-blue-50 p-4 rounded-full mb-4">
                                <Calendar className="w-8 h-8 text-[#1D98C4]" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No posts found</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                We haven't published any articles yet. Check back soon for updates!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    to={`/blog/${post.slug}`}
                                    className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <span className="text-4xl font-serif italic opacity-20">Ig</span>
                                            </div>
                                        )}

                                        {/* Date Badge */}
                                        <time
                                            dateTime={post.date}
                                            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1.5"
                                        >
                                            <Calendar className="w-3.5 h-3.5 text-[#1D98C4]" />
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </time>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-6 md:p-8">
                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-600 rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-[#1D98C4] transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <div className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {post.description || (post.content ? post.content.substring(0, 150) + '...' : '')}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                            {post.author ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700">{post.author}</span>
                                                </div>
                                            ) : (
                                                <span></span>
                                            )}

                                            <div className="flex items-center text-[#1D98C4] font-semibold text-sm group/btn">
                                                Read Post
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
