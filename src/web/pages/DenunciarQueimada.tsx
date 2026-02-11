import Header from "@/components/Header";
import ReportForm from "@/components/ReportForm";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import HeroSectionReport from "@/components/HeroSectionReport";
import ReportStatsSection from "@/components/ReportStatsSection";

const DenunciarQueimada = () => {
  return (
    <>
      <Helmet>
        <title>Denunciar Queimada - Denuncie Queimadas</title>
        <meta
          name="description"
          content="Reporte um foco de queimada ou incêndio florestal. Sua denúncia ajuda na proteção de nossas florestas."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
            <HeroSectionReport />
            <ReportStatsSection />
            <ReportForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DenunciarQueimada;
