import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { GithubFeed } from "@/components/github";
import { SkillsSection } from "@/components/SkillsSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/AuroraBackground";
import { getPostsForSeries } from "@/lib/blog";

/**
 * Homepage - Main landing page for jordanhindo.dev
 * Displays hero, skills, about, projects, blog, and contact sections
 */
export default async function HomePage() {
  const allPosts = await getPostsForSeries('asset-hatch');
  const featuredPosts = allPosts.slice(0, 3); // Get first 3 for now, or pick specific ones later

  return (
    <>
      {/* Aurora background - fixed, subtle effect */}
      <AuroraBackground />

      {/* Fixed navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        {/* Static GitHub feed - not sticky, positioned between hero and skills */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GithubFeed />
        </div>
        <SkillsSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection posts={featuredPosts} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
