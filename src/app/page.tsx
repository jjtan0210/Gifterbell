import { Footer } from "@/components/shared/footer";
import { HomeContent } from "@/components/home/home-content";
import { Navbar } from "@/components/shared/navbar";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  );
}
