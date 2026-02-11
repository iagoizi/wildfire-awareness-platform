const StatsSection = () => {
  const stats = [
    {
      number: "47.531",
      description: "focos de",
      highlight: "queimada",
      suffix: "em todo o país em 2025 (INPE)",
    },
    {
      number: "242",
      description: "pessoas multadas pelo Ibama por",
      highlight: "incêndios criminosos",
      suffix: "em 2024",
    },
  ];

  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-cream-muted uppercase tracking-widest text-center mb-20">
          Cada árvore em chamas é<br />
          um futuro que se apaga
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.2}s` }}
            >
              <p className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-4">
                {stat.number}
              </p>
              <p className="text-cream-muted text-base md:text-lg">
                {stat.description}{" "}
                <span className="text-primary font-medium">{stat.highlight}</span>
                {" "}{stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
