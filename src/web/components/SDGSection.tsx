import { Leaf, Wind, Globe } from "lucide-react";

const SDGSection = () => {
  const sdgs = [
    {
      number: "13",
      icon: Wind,
      title: "Ação Climática",
      description:
        "Combater as mudanças climáticas através da identificação e denúncia de focos de queimadas que contribuem para o aumento de emissões de gases do efeito estufa.",
      color: "from-blue-600 to-blue-700",
    },
    {
      number: "15",
      icon: Leaf,
      title: "Proteger a Vida Terrestre",
      description:
        "Conservar e restaurar ecossistemas terrestres, protegendo florestas e toda a fauna de incêndios florestais através da mobilização coletiva.",
      color: "from-green-600 to-green-700",
    },
  ];

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-primary font-display text-lg md:text-xl uppercase tracking-wider mb-4">
            Objetivos de Desenvolvimento Sustentável
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Alinhamento com a ONU
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Nossa plataforma está comprometida com os Objetivos de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas.
          </p>
        </div>

        {/* SDG Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sdgs.map((sdg, index) => {
            const IconComponent = sdg.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${sdg.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-5xl md:text-6xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {sdg.number}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
                    {sdg.title}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {sdg.description}
                  </p>
                </div>

                {/* Bottom border accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${sdg.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Ao denunciar queimadas, você contribui diretamente para o alcance desses objetivos globais de sustentabilidade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
