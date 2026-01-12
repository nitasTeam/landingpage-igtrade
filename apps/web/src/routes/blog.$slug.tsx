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
        <div className="min-h-screen bg-white pt-20">
            {/* Header */}
            <section className="py-12 px-4 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-4xl mx-auto">
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-[#1D98C4] hover:text-[#1787b0] font-medium mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 font-bold leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-600">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        {post.author && (
                            <span className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                {post.author}
                            </span>
                        )}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Image */}
            {post.image && (
                <section className="px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto rounded-2xl shadow-lg"
                        />
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <article className="prose prose-lg max-w-none">
                        <MarkdownRenderer content={post.content} />
                    </article>
                </div>
            </section>

            {/* Back to Blog */}
            <section className="px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link
                        to="/blog"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#1D98C4] hover:bg-[#1787b0] text-white font-medium rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Posts
                    </Link>
                </div>
            </section>
        </div>
    );
}
