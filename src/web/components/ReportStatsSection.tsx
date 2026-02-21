import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { startOfWeek, endOfWeek, subWeeks, isWithinInterval } from "date-fns";

interface StatsData {
  nacional: {
    focosINPE: string;
    multasIbama: string;
  };
  plataforma: {
    registradas: number;
    recebidas: number;
    emAnalise: number;
    encaminhadas: number;
    resolvidas: number;
  };
}

interface FireSpot {
  id: number;
  estado: string;
  cidade: string;
  endereco: string;
  referencia: string | null;
  info: string | null;
  status: string;
  createdAt: string;
}

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
  const [stats, setStats] = useState<StatsData | null>(null);
  const [weeklyData, setWeeklyData] = useState<{ week: string; reports: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setIsLoading(true);
        const [statsResponse, firesResponse] = await Promise.all([
          api.get<StatsData>("/stats"),
          api.get<FireSpot[]>("/fires"),
        ]);

        setStats(statsResponse.data);

        // Map weekly values based on actual creation dates (last 8 weeks)
        const allFires = firesResponse.data;
        const now = new Date();
        const last8Weeks = Array.from({ length: 8 }, (_, i) => {
          // Compute dates retroactively so week 8 is the current week
          const d = subWeeks(now, 7 - i);
          return {
            start: startOfWeek(d, { weekStartsOn: 0 }), // considering Sunday as week start
            end: endOfWeek(d, { weekStartsOn: 0 }),
            label: `S${i + 1}`,
            reports: 0,
          };
        });

        allFires.forEach((fire) => {
          const fireDate = new Date(fire.createdAt);
          const matchedWeek = last8Weeks.find((w) =>
            isWithinInterval(fireDate, { start: w.start, end: w.end })
          );
          if (matchedWeek) {
            matchedWeek.reports++;
          }
        });

        setWeeklyData(
          last8Weeks.map((w) => ({ week: w.label, reports: w.reports }))
        );
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealData();
  }, []);

  const summaryStats = [
    {
      label: "Denúncias registradas",
      value: stats?.plataforma.registradas || 0,
      note: "total histórico",
    },
    {
      label: "Em análise",
      value: stats?.plataforma.emAnalise || 0,
      note: "aguardando validação",
    },
    {
      label: "Encaminhadas aos órgãos",
      value: stats?.plataforma.encaminhadas || 0,
      note: "fluxo oficial",
    },
    {
      label: "Resolvidas",
      value: stats?.plataforma.resolvidas || 0,
      note: "ações concluídas",
    },
  ];

  const statusData = [
    {
      status: "Recebidas",
      count: stats?.plataforma.recebidas || 0,
      color: "hsl(var(--fire-coral))",
    },
    {
      status: "Em análise",
      count: stats?.plataforma.emAnalise || 0,
      color: "hsl(var(--fire-orange))",
    },
    {
      status: "Encaminhadas",
      count: stats?.plataforma.encaminhadas || 0,
      color: "hsl(var(--forest-green))",
    },
    {
      status: "Resolvidas",
      count: stats?.plataforma.resolvidas || 0,
      color: "hsl(var(--cream))",
    },
  ];

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
                {isLoading ? (
                  <Skeleton className="h-10 w-24 mt-3 bg-muted/60" />
                ) : (
                  <p className="mt-3 text-4xl font-display text-gradient-fire">
                    {stat.value.toLocaleString('pt-BR')}
                  </p>
                )}
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
                <span className="text-xs uppercase tracking-[0.25em] text-cream-muted">Total Histórico</span>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-end gap-2 px-4 pb-2">
                  {[1, 2, 3, 4].map(idx => <Skeleton key={idx} className="flex-1 bg-muted/50" style={{ height: `${Math.random() * 80 + 20}%` }} />)}
                </div>
              ) : (
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
              )}

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

              {isLoading ? (
                <div className="h-56 flex items-center justify-center">
                  <Skeleton className="w-full h-40 bg-muted/30" />
                </div>
              ) : (
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
              )}

              <p className="mt-3 text-xs text-muted-foreground">
                Atualizado em tempo real. Dados extraídos das inserções oficiais na plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportStatsSection;
