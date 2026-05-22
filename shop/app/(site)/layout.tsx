import SiteHeader from '@/components/SiteHeader'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mt-[100px]">
      {children}
      </div>
      <footer>Footer</footer>
    </>
  )
}