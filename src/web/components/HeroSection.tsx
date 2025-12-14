import heroImage from "@/assets/hero-fire.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-16">
        <div className="max-w-5xl mx-auto">
          {/* Subtitle */}
          <p className="text-primary font-display text-xl md:text-2xl lg:text-3xl font-semibold tracking-wider uppercase mb-4">
            Não seja espectador da destruição
          </p>
          
          {/* Main Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-bold text-foreground tracking-wide uppercase mb-24">
            Denuncie as queimadas
          </h1>
        </div>
      </div>

      {/* Bottom Quote */}
      <div className="absolute bottom-16 left-0 right-0 z-10">
        <p className="font-display text-xl md:text-2xl lg:text-3xl text-cream-muted uppercase tracking-widest text-center">
          Cada árvore em chamas é<br />
          um futuro que se apaga
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
