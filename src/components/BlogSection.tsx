import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Copy, Search, X } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface BlogSectionProps {
  onDiscussTopic: (topicTitle: string) => void;
}

type BlogCategory = 'All Posts' | 'Nagpur & Culture' | 'IT Products' | 'Engineering' | 'Careers';

const CATEGORIES: BlogCategory[] = [
  'All Posts',
  'Nagpur & Culture',
  'IT Products',
  'Engineering',
  'Careers',
];

export function BlogSection({ onDiscussTopic }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesQuery =
      !normalizedQuery ||
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.excerpt.toLowerCase().includes(normalizedQuery) ||
      post.authorName.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  const handleCopySummaryLink = async (post: BlogPost) => {
    const shareUrl = `${window.location.origin}/#blog-${post.slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(post.id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(post.id);
      window.setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterState({
        status: 'error',
        message: 'Please enter a valid work or personal email address.',
      });
      return;
    }

    setNewsletterState({ status: 'submitting', message: '' });
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setNewsletterState({
          status: 'error',
          message: data.error ?? 'Unable to subscribe right now.',
        });
        return;
      }

      setNewsletterState({
        status: 'success',
        message: data.message ?? 'Subscribed to InfoWorldtech engineering notes.',
      });
      setNewsletterEmail('');
    } catch {
      setNewsletterState({
        status: 'error',
        message: 'Network error while subscribing. Please try again.',
      });
    }
  };

  return (
    <section id="blog" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-700 mb-2">
              InfoWorldtech Journal · 2026
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Engineering notes, product design logs, and perspectives from Nagpur.
            </h2>
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or authors..."
              aria-label="Search blog articles"
              className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="mt-10 p-10 text-center bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-base font-medium text-slate-800">
              No articles matched "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Posts');
              }}
              className="mt-4 px-4 py-2 text-sm font-medium text-blue-700 hover:underline cursor-pointer"
            >
              Reset blog filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                id={`blog-${post.slug}`}
                className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] bg-slate-200 border-b border-slate-200 overflow-hidden">
                    <SafeImage
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fallbackTitle={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-blue-700">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-bold text-slate-900 leading-snug text-balance">
                      <button
                        type="button"
                        onClick={() => setActivePost(post)}
                        className="text-left hover:text-blue-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                      >
                        {post.title}
                      </button>
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-200/80 flex items-center justify-between gap-4">
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">{post.authorName}</p>
                    <p className="text-slate-500">{post.authorRole}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePost(post)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Monthly Engineering Dispatch Subscription */}
        <div className="mt-14 p-6 sm:p-8 bg-slate-900 rounded-xl text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-wide">
              Monthly Engineering Notes from Nagpur
            </h3>
            <p className="mt-1.5 text-sm text-slate-300">
              Receive one practical digest per month covering PulseERP updates, architecture trade-offs, and 2026 fresher hiring windows.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@company.co.in"
                aria-label="Email address for monthly engineering notes"
                className="w-full sm:w-64 px-4 py-2.5 text-sm text-slate-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                disabled={newsletterState.status === 'submitting'}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {newsletterState.status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {newsletterState.message && (
              <p
                role="status"
                className={`mt-2 text-xs ${
                  newsletterState.status === 'error' ? 'text-rose-300' : 'text-emerald-300'
                }`}
              >
                {newsletterState.message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-reader-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setActivePost(null)}
        >
          <article
            className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] bg-slate-100 border-b border-slate-200 overflow-hidden">
              <SafeImage
                src={activePost.coverImage}
                alt={activePost.coverAlt}
                fallbackTitle={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">{activePost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.readTime}</span>
                </div>

                <button
                  type="button"
                  aria-label="Close article"
                  onClick={() => setActivePost(null)}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3
                id="blog-reader-title"
                className="mt-3 font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight text-balance"
              >
                {activePost.title}
              </h3>

              <div className="mt-4 pb-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">{activePost.authorName}</p>
                  <p className="text-xs text-slate-500">{activePost.authorRole}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopySummaryLink(activePost)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  {copiedId === activePost.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Article Link</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed">
                {activePost.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-600">
                  Have questions about this architecture or role?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const topic = activePost.title;
                    setActivePost(null);
                    onDiscussTopic(topic);
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Message the Nagpur Team
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
