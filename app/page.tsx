import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Photography from "@/components/Photography";
import Projects from "@/components/Projects";
import SocialMedia from "@/components/SocialMedia";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Experience />
      <Projects />
      <SocialMedia />
      <Photography />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
