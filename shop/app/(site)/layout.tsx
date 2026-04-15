export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>🌿 Site Header</header>
      {children}
      <footer>Footer</footer>
    </>
  )
}