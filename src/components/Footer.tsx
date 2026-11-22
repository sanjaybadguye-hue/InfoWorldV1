export function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-200">
          <div>
            <a href="#top" className="font-display text-lg font-bold tracking-tight text-slate-900">
              InfoWorldtech.co.in
            </a>
            <p className="mt-1.5 text-sm text-slate-600">
              IT Products &amp; Engineering Services · Nagpur, Maharashtra · Established 2026
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <a href="#offerings" className="hover:text-slate-900 transition-colors">
              IT Products
            </a>
            <a href="#services" className="hover:text-slate-900 transition-colors">
              Services
            </a>
            <a href="#team" className="hover:text-slate-900 transition-colors">
              Team &amp; Careers
            </a>
            <a href="#blog" className="hover:text-slate-900 transition-colors">
              Blog
            </a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 InfoWorldtech Pvt. Ltd. All rights reserved.</p>
          <p>IT Park Road, Nagpur 440022 · hello@infoworldtech.co.in</p>
        </div>
      </div>
    </footer>
  );
}
