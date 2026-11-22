import { ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0E2427] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/12">
          <div className="flex items-center gap-3.5">
            <span className="w-9 h-9 inline-flex items-center justify-center border border-white/25 rounded-sm font-serif text-lg font-semibold text-[#DFA061]">
              i.
            </span>
            <div>
              <a
                href="#top"
                className="font-mono text-xs tracking-[0.18em] uppercase font-semibold text-white block"
              >
                InfoWorldtech.co.in
              </a>
              <p className="text-xs text-slate-400 mt-0.5">
                IT Infrastructure &amp; Business Software · Nagpur, India
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-sm text-slate-300"
          >
            <a href="#offerings" className="hover:text-white transition-colors">
              Solutions
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#partners" className="hover:text-white transition-colors">
              Partners
            </a>
            <a href="#team" className="hover:text-white transition-colors">
              Team &amp; Careers
            </a>
            <a href="#blog" className="hover:text-white transition-colors">
              Blog
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 InfoWorldtech · Nagpur, India · Attn: Sanjay Badguye ·{' '}
            <a href="mailto:sales@infoworldtech.co.in" className="text-[#DFA061] hover:underline">
              sales@infoworldtech.co.in
            </a>
          </p>

          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-slate-300 hover:text-white transition-colors self-start sm:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
