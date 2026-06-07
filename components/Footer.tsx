export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border py-8 mt-24">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[var(--text-muted)]">
        <span>Designed by <a className="text-foreground font-semibold" href="https://melodyonyeocha.framer.website">Melocoder</a> </span>
        <span className="text-xs opacity-50">© {new Date().getFullYear()} Allename Anthony</span>
      </div>
    </footer>
  )
}
