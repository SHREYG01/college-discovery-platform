import { CtaSection } from "@/components/home/cta-section";
import { Hero } from "@/components/home/hero";
import { getFeaturedColleges } from "@/services/college.service";

export default async function HomePage() {
  const featuredColleges = await getFeaturedColleges(3);

  return (
    <>
      <Hero featuredColleges={featuredColleges} />
      <CtaSection />
    </>
  );
}
