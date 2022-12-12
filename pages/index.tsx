import Head from "next/head";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="z-0 snap-y snap-mandatory">
      <Head>
        <title>{`Ibrahim Ali`}</title>
      </Head>

      <Header />
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
