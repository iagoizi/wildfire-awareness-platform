import heroImage from "@/assets/hero-fire-home.png";

const HeroSectionHome = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="relative z-10 container mx-auto px-6 text-center pt-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary font-display text-xl md:text-2xl lg:text-3xl font-semibold tracking-wider uppercase mb-4">
            Uma plataforma em prol do meio ambiente
          </p>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-bold text-foreground tracking-wide uppercase mb-24">
            Proteja o seu, o nosso futuro
          </h1>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 z-10">
        <p className="font-display text-xl md:text-2xl lg:text-3xl text-cream-muted uppercase tracking-widest text-center">
          Acompanhe, denuncie e combata<br />
          queimadas em tempo real
        </p>
      </div>
    </section>
  );
};

export default HeroSectionHome;
