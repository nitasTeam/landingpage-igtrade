import { useParams, Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getPostBySlug, type BlogPost } from '@/lib/blog';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPost() {
            if (!slug) {
                setError('No slug provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const loadedPost = await getPostBySlug(slug);

                if (!loadedPost) {
                    setError('Blog post not found');
                    setLoading(false);
                    return;
                }

                setPost(loadedPost);
                setError(null);
            } catch (err) {
                console.error('Error loading blog post:', err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D98C4]"></div>
                    <p className="mt-4 text-slate-600">Loading blog post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
                    <p className="text-slate-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#1D98C4] hover:bg-[#1787b0] text-white font-medium rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Header/Hero Section */}
            <section className="relative pt-32 pb-16 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-50">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70"></div>
                </div>

                <div className="relative max-w-4xl mx-auto z-10">
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-slate-500 hover:text-[#1D98C4] font-medium mb-8 transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shadow-sm group-hover:border-[#1D98C4] transition-colors">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        </div>
                        Back to Blog
                    </Link>

                    {/* Meta Top */}
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mb-6">
                        <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-[#1D98C4]" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-8 font-bold leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    {post.author && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{post.author}</p>
                                <p className="text-xs text-slate-500">Author</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Image */}
            {post.image && (
                <section className="px-4 -mt-8 mb-12 relative z-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-900/5 aspect-[16/8] bg-slate-100 relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="px-4 pb-24">
                <div className="max-w-3xl mx-auto">
                    <article className="prose prose-lg prose-slate hover:prose-a:text-[#1D98C4] max-w-none prose-headings:font-serif prose-headings:font-bold prose-img:rounded-2xl prose-img:shadow-lg">
                        <MarkdownRenderer content={post.content} />
                    </article>

                    {/* Footer / Share / Back */}
                    <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-slate-500 italic">
                            Thanks for reading!
                        </p>
                        <Link
                            to="/blog"
                            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Read More Articles
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
