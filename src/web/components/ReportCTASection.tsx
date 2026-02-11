import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";

const ReportCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/30" />
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/80 p-10 text-center shadow-lg backdrop-blur md:p-14">
          <p className="text-primary font-display text-sm md:text-base uppercase tracking-[0.3em] mb-4">
            Denúncia imediata
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-5">
            Avistou fogo ou fumaça suspeita?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-10">
            Sua denúncia ajuda a acionar as equipes locais mais rápido e impede que o fogo se espalhe.
          </p>
          <Button asChild variant="fire" size="xl" className="rounded-full">
            <Link to={routes.report}>Denunciar agora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReportCTASection;
