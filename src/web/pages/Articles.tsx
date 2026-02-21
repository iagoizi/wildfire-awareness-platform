import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Article {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

const Articles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setIsLoading(true);
                const response = await api.get<Article[]>("/articles");
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
                toast({
                    title: "Erro ao carregar artigos",
                    description: "Não foi possível carregar a lista de artigos. Tente novamente mais tarde.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [toast]);

    return (
        <>
            <Helmet>
                <title>Artigos - Conscientização sobre Queimadas</title>
                <meta
                    name="description"
                    content="Leia artigos informativos sobre meio ambiente, prevenção de queimadas e preservação das nossas florestas."
                />
            </Helmet>

            <div className="min-h-screen bg-background flex flex-col">
                <Header />

                <main className="flex-1 pt-32 pb-24">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto mb-16 text-center">
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase mb-6">
                                Artigos
                            </h1>
                            <p className="text-cream-muted text-lg md:text-xl max-w-2xl mx-auto">
                                Mantenha-se informado sobre a situação ambiental, aprenda sobre prevenção e entenda os impactos das queimadas em nosso ecossistema.
                            </p>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <Card key={i} className="bg-secondary/50 border-border overflow-hidden flex flex-col h-full">
                                        <Skeleton className="w-full h-48 rounded-none" />
                                        <CardHeader>
                                            <Skeleton className="h-6 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-2/3" />
                                        </CardContent>
                                        <CardFooter>
                                            <Skeleton className="h-10 w-32" />
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center py-20 bg-secondary/30 rounded-lg border border-border">
                                <p className="text-cream-muted text-lg">Nenhum artigo encontrado no momento.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 content-start">
                                {articles.map((article) => (
                                    <Card key={article.id} className="bg-secondary/50 border-border overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full group">
                                        {article.imageUrl ? (
                                            <div className="w-full h-48 overflow-hidden">
                                                <img
                                                    src={article.imageUrl}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 bg-muted flex items-center justify-center">
                                                <span className="text-muted-foreground font-display tracking-widest uppercase opacity-50 text-sm">Sem imagem</span>
                                            </div>
                                        )}
                                        <CardHeader>
                                            <div className="flex items-center text-xs text-primary mb-3 font-medium tracking-wider">
                                                <Calendar className="w-3 h-3 mr-1.5" />
                                                {format(new Date(article.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                                            </div>
                                            <CardTitle className="text-foreground text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                {article.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <CardDescription className="text-cream-muted text-base line-clamp-3">
                                                {article.summary}
                                            </CardDescription>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="link" className="p-0 h-auto text-primary hover:text-fire-orange font-semibold tracking-wide" asChild>
                                                <Link to={`/artigos/${article.id}`}>
                                                    Ler artigo completo <ArrowRight className="ml-2 w-4 h-4" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Articles;
