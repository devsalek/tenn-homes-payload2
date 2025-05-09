import { Header } from '../_layouts/header'

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-white">
        <Header />
      </div>
      <main>{children}</main>
    </div>
  )
}
