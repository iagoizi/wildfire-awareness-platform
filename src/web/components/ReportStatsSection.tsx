import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const summaryStats = [
  {
    label: "Denúncias registradas",
    value: "3.482",
    note: "ultimos 12 meses",
  },
  {
    label: "Em análise",
    value: "1.260",
    note: "aguardando validação",
  },
  {
    label: "Encaminhadas aos órgãos",
    value: "1.924",
    note: "fluxo oficial",
  },
  {
    label: "Resolvidas",
    value: "1.118",
    note: "ações concluídas",
  },
];

const statusData = [
  {
    status: "Recebidas",
    count: 3482,
    color: "hsl(var(--fire-coral))",
  },
  {
    status: "Em análise",
    count: 1260,
    color: "hsl(var(--fire-orange))",
  },
  {
    status: "Encaminhadas",
    count: 1924,
    color: "hsl(var(--forest-green))",
  },
  {
    status: "Resolvidas",
    count: 1118,
    color: "hsl(var(--cream))",
  },
];

const weeklyData = [
  { week: "S1", reports: 318 },
  { week: "S2", reports: 402 },
  { week: "S3", reports: 355 },
  { week: "S4", reports: 466 },
  { week: "S5", reports: 521 },
  { week: "S6", reports: 489 },
  { week: "S7", reports: 572 },
  { week: "S8", reports: 505 },
];

const statusChartConfig = {
  count: {
    label: "Denúncias",
    color: "hsl(var(--fire-coral))",
  },
};

const weeklyChartConfig = {
  reports: {
    label: "Denúncias",
    color: "hsl(var(--fire-orange))",
  },
};

const ReportStatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_hsl(var(--forest-green-dark))_0%,_hsl(var(--secondary))_45%,_hsl(var(--background))_85%)] py-24">
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-fire-orange/20 blur-[140px]" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <p className="text-primary font-display text-xs md:text-sm uppercase tracking-[0.35em]">
            Transparência em tempo real
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-cream">
            O caminho das denúncias, do envio à resposta
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Veja como a comunidade está mobilizada e como cada denúncia avança dentro do fluxo oficial.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.45fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {summaryStats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-lg backdrop-blur animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-cream-muted">
                  {stat.label}
                </p>
                <p className="mt-3 text-4xl font-display text-gradient-fire">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-semibold text-cream">Distribuição por status</h3>
                <span className="text-xs uppercase tracking-[0.25em] text-cream-muted">Últimos 12 meses</span>
              </div>
              <ChartContainer config={statusChartConfig} className="h-64 w-full">
                <BarChart data={statusData} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="status" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={32} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {statusData.map((item) => (
                      <Cell key={item.status} fill={item.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-cream-muted">
                {statusData.map((item) => (
                  <div key={item.status} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-semibold text-cream">Ritmo semanal de denúncias</h3>
                <span className="text-xs uppercase tracking-[0.25em] text-cream-muted">Últimas 8 semanas</span>
              </div>
              <ChartContainer config={weeklyChartConfig} className="h-56 w-full">
                <LineChart data={weeklyData} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={32} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="var(--color-reports)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "var(--color-reports)" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ChartContainer>
              <p className="mt-3 text-xs text-muted-foreground">
                Atualizado em fev/2026. Dados ilustrativos para demonstração de layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportStatsSection;
