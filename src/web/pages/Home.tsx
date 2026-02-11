import Header from "@/components/Header";
import HeroSectionHome from "@/components/HeroSectionHome";
import StatsSection from "@/components/StatsSection";
import SDGSection from "@/components/SDGSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Denuncie Queimadas - Proteja Nossas Florestas</title>
        <meta
          name="description"
          content="Plataforma para denúncia de queimadas e incêndios florestais no Brasil. Ajude a proteger nossas florestas reportando focos de incêndio."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSectionHome />
          <StatsSection />
          <SDGSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
