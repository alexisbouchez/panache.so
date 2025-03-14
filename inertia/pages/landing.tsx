import Marquee from '~/components/marquee'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Hero from '~/components/hero'

export default function Home() {
  return (
    <>
      <Marquee />
      <Header />
      <main className="max-w-4xl mx-auto w-full min-h-[calc(100vh-49px-85px-60px)] py-12">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
