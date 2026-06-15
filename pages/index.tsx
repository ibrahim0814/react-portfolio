import Head from "next/head";
import Link from "next/link";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="z-0 snap-y snap-mandatory">
      <Head>
        <title>{`Ibrahim Ali (Darugar)`}</title>
      </Head>

      {/* <Header /> */}
      <Link
        href="/blog"
        className="fixed right-6 top-5 z-30 text-sm uppercase tracking-widest text-gray-500 transition-colors hover:text-white"
      >
        Blog
      </Link>
      {/* Hero */}
      <section id="hero" className="snap-center">
        <Hero />
      </section>
      {/* About */}
      <section id="about" className="snap-center">
        <About />
      </section>
      {/* Experience */}
      {/* Skills */}
      {/* Projects */}
      {/* Contact Me */}
    </div>
  );
}
