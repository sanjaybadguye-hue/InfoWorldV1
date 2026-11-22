import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Copy, Search, X } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface BlogSectionProps {
  onDiscussTopic: (topicTitle: string) => void;
}

type BlogCategory =
  | 'All Posts'
  | 'Infrastructure'
  | 'Business Software'
  | 'Nagpur & Culture'
  | 'Careers';

const CATEGORIES: BlogCategory[] = [
  'All Posts',
  'Infrastructure',
  'Business Software',
  'Nagpur & Culture',
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
      const response = await fetch('./api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json') || response.status === 404 || response.status === 405) {
        try {
          const existing = JSON.parse(localStorage.getItem('iwt_newsletter') ?? '[]') as string[];
          if (!existing.includes(trimmed)) {
            existing.push(trimmed);
            localStorage.setItem('iwt_newsletter', JSON.stringify(existing));
          }
        } catch {
          // Ignore storage errors
        }
        setNewsletterState({
          status: 'success',
          message: 'Subscribed to monthly engineering notes from InfoWorldtech Nagpur.',
        });
        setNewsletterEmail('');
        return;
      }

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
        status: 'success',
        message: 'Saved your email for InfoWorldtech Nagpur engineering notes.',
      });
      setNewsletterEmail('');
    }
  };

  return (
    <section id="blog" className="py-16 lg:py-24 bg-[#E9E5D8] border-b border-[#0E2427]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#0E2427]/15">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#196A52] mb-4">
              <span className="w-6 h-px bg-[#196A52]" aria-hidden="true" />
              <span>InfoWorldtech Journal · 2026</span>
            </div>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl tracking-tight text-[#0E2427] leading-[1.12] text-balance">
              Practical field notes from our{' '}
              <span className="italic font-normal text-[#196A52]">Nagpur practice.</span>
            </h2>
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-[#0E2427]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or authors..."
              aria-label="Search blog articles"
              className="w-full pl-10 pr-4 py-2.5 text-sm text-[#0E2427] bg-[#F6F4EC] border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52] focus:bg-white"
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
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#196A52] ${
                selectedCategory === category
                  ? 'bg-[#0E2427] text-white'
                  : 'bg-[#F6F4EC] text-[#0E2427]/80 hover:bg-white border border-[#0E2427]/12'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="mt-10 p-10 text-center bg-[#F6F4EC] border border-[#0E2427]/15 rounded-sm">
            <p className="text-base font-medium text-[#0E2427]">
              No articles matched "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Posts');
              }}
              className="mt-4 px-4 py-2 text-sm font-medium text-[#196A52] hover:underline cursor-pointer"
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
                className="group bg-[#F6F4EC] border border-[#0E2427]/15 rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] bg-[#D8D3C4] border-b border-[#0E2427]/12 overflow-hidden">
                    <SafeImage
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fallbackTitle={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#0E2427]/65">
                      <span className="font-mono uppercase tracking-wider text-[#196A52] font-medium">
                        {post.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mt-3 font-serif text-xl sm:text-2xl font-medium text-[#0E2427] leading-snug text-balance">
                      <button
                        type="button"
                        onClick={() => setActivePost(post)}
                        className="text-left hover:text-[#196A52] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                      >
                        {post.title}
                      </button>
                    </h3>

                    <p className="mt-2.5 text-sm text-[#0E2427]/75 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#0E2427]/10 flex items-center justify-between gap-4">
                  <div className="text-xs">
                    <p className="font-semibold text-[#0E2427]">{post.authorName}</p>
                    <p className="text-[#0E2427]/65">{post.authorRole}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePost(post)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#196A52] hover:text-[#135440] whitespace-nowrap shrink-0 cursor-pointer"
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
        <div className="mt-14 p-6 sm:p-8 bg-[#0E2427] rounded-sm text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white">
              Monthly Field Notes from{' '}
              <span className="italic text-[#DFA061]">infoworldtech.co.in</span>
            </h3>
            <p className="mt-1.5 text-sm text-slate-300">
              One practical digest per month on IT infrastructure, SAP Business One, custom software, and 2026 Nagpur careers.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@company.co.in"
                aria-label="Email address for monthly field notes"
                className="w-full sm:w-64 px-4 py-2.5 text-sm text-[#0E2427] bg-[#F6F4EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#DFA061]"
              />
              <button
                type="submit"
                disabled={newsletterState.status === 'submitting'}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#196A52] rounded-sm hover:bg-[#135440] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2427]/70 backdrop-blur-xs"
          onClick={() => setActivePost(null)}
        >
          <article
            className="bg-[#F6F4EC] border border-[#0E2427]/20 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] bg-[#D8D3C4] border-b border-[#0E2427]/12 overflow-hidden">
              <SafeImage
                src={activePost.coverImage}
                alt={activePost.coverAlt}
                fallbackTitle={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#0E2427]/65">
                  <span className="font-mono uppercase tracking-wider font-semibold text-[#196A52]">
                    {activePost.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.readTime}</span>
                </div>

                <button
                  type="button"
                  aria-label="Close article"
                  onClick={() => setActivePost(null)}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-sm border border-[#0E2427]/20 text-[#0E2427] hover:bg-[#E9E5D8] cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3
                id="blog-reader-title"
                className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-[#0E2427] leading-tight text-balance"
              >
                {activePost.title}
              </h3>

              <div className="mt-4 pb-6 border-b border-[#0E2427]/12 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <p className="font-semibold text-[#0E2427]">{activePost.authorName}</p>
                  <p className="text-xs text-[#0E2427]/65">{activePost.authorRole}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopySummaryLink(activePost)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0E2427] border border-[#0E2427]/20 rounded-sm hover:bg-[#E9E5D8] cursor-pointer"
                >
                  {copiedId === activePost.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#196A52]" aria-hidden="true" />
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

              <div className="mt-6 space-y-4 text-base text-[#0E2427]/85 leading-relaxed">
                {activePost.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#0E2427]/12 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-[#0E2427]/75">
                  Questions on this topic? Reach Sanjay Badguye and the Nagpur team.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const topic = activePost.title;
                    setActivePost(null);
                    onDiscussTopic(topic);
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#196A52] rounded-sm hover:bg-[#135440] transition-colors cursor-pointer"
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
