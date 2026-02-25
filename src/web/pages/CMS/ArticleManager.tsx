import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Edit, LogOut, Plus, Trash2 } from "lucide-react";

interface Article {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string | null;
    publishedAt: string;
    createdAt: string;
}

interface ArticleForm {
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
}

const ArticleManager = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [formData, setFormData] = useState<ArticleForm>({
        title: "",
        slug: "",
        summary: "",
        content: "",
        imageUrl: "",
    });
    const { toast } = useToast();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            const response = await api.get<Article[]>("/articles");
            setArticles(response.data);
        } catch (error) {
            console.error("Error fetching articles:", error);
            toast({
                title: "Erro ao carregar artigos",
                description: "Não foi possível carregar a lista de artigos.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (editingArticle) {
                // Update existing article
                await api.put(`/articles/${editingArticle.id}`, formData);
                toast({
                    title: "Artigo atualizado!",
                    description: "O artigo foi atualizado com sucesso.",
                });
            } else {
                // Create new article
                await api.post("/articles", formData);
                toast({
                    title: "Artigo criado!",
                    description: "O artigo foi publicado com sucesso.",
                });
            }

            setIsDialogOpen(false);
            resetForm();
            fetchArticles();
        } catch (error: any) {
            console.error("Error saving article:", error);
            toast({
                title: "Erro ao salvar artigo",
                description: error.response?.data?.error || "Ocorreu um erro ao salvar o artigo.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (article: Article) => {
        setEditingArticle(article);
        setFormData({
            title: article.title,
            slug: article.slug,
            summary: article.summary || "",
            content: article.content,
            imageUrl: article.imageUrl || "",
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/articles/${id}`);
            toast({
                title: "Artigo deletado",
                description: "O artigo foi removido com sucesso.",
            });
            fetchArticles();
        } catch (error) {
            console.error("Error deleting article:", error);
            toast({
                title: "Erro ao deletar artigo",
                description: "Não foi possível remover o artigo.",
                variant: "destructive",
            });
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            summary: "",
            content: "",
            imageUrl: "",
        });
        setEditingArticle(null);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        resetForm();
    };

    return (
        <>
            <Helmet>
                <title>Gerenciar Artigos - CMS</title>
                <meta name="description" content="Gerenciamento de artigos do sistema" />
            </Helmet>

            <div className="min-h-screen bg-background flex flex-col">
                <Header />

                <main className="flex-1 pt-32 pb-24">
                    <div className="container mx-auto px-6">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-wide uppercase mb-2">
                                    Gerenciar Artigos
                                </h1>
                                <p className="text-cream-muted text-lg">
                                    Crie, edite e gerencie os artigos da plataforma
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button 
                                    variant="outline" 
                                    size="lg"
                                    onClick={() => {
                                        logout();
                                        toast({
                                            title: "Logout realizado",
                                            description: "Você foi desconectado com sucesso.",
                                        });
                                    }}
                                >
                                    <LogOut className="mr-2 w-5 h-5" />
                                    Sair
                                </Button>

                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="fire" size="lg" onClick={resetForm}>
                                        <Plus className="mr-2 w-5 h-5" />
                                        Novo Artigo
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {editingArticle ? "Editar Artigo" : "Novo Artigo"}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {editingArticle
                                                ? "Atualize as informações do artigo"
                                                : "Preencha os campos para criar um novo artigo"}
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Título *</Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => handleTitleChange(e.target.value)}
                                                placeholder="Digite o título do artigo"
                                                required
                                                disabled={isSaving}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="slug">
                                                Slug (URL amigável) *
                                            </Label>
                                            <Input
                                                id="slug"
                                                value={formData.slug}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, slug: e.target.value })
                                                }
                                                placeholder="titulo-do-artigo"
                                                required
                                                disabled={isSaving}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Gerado automaticamente a partir do título
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="imageUrl">URL da Imagem</Label>
                                            <Input
                                                id="imageUrl"
                                                value={formData.imageUrl}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, imageUrl: e.target.value })
                                                }
                                                placeholder="https://..."
                                                type="url"
                                                disabled={isSaving}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="summary">Resumo</Label>
                                            <Textarea
                                                id="summary"
                                                value={formData.summary}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, summary: e.target.value })
                                                }
                                                placeholder="Breve resumo do artigo (exibido no card)"
                                                rows={3}
                                                disabled={isSaving}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="content">Conteúdo Completo *</Label>
                                            <Textarea
                                                id="content"
                                                value={formData.content}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, content: e.target.value })
                                                }
                                                placeholder="Conteúdo completo do artigo..."
                                                rows={12}
                                                required
                                                disabled={isSaving}
                                                className="font-mono text-sm"
                                            />
                                        </div>

                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleDialogClose}
                                                disabled={isSaving}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button type="submit" variant="fire" disabled={isSaving}>
                                                {isSaving
                                                    ? "Salvando..."
                                                    : editingArticle
                                                    ? "Atualizar"
                                                    : "Criar Artigo"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-12">
                                <p className="text-cream-muted">Carregando...</p>
                            </div>
                        ) : articles.length === 0 ? (
                            <Card className="bg-secondary/30 border-border">
                                <CardContent className="text-center py-12">
                                    <p className="text-cream-muted text-lg mb-4">
                                        Nenhum artigo encontrado.
                                    </p>
                                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                                        Criar primeiro artigo
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {articles.map((article) => (
                                    <Card
                                        key={article.id}
                                        className="bg-secondary/50 border-border hover:border-primary/50 transition-colors"
                                    >
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <CardTitle className="text-foreground text-2xl mb-2">
                                                        {article.title}
                                                    </CardTitle>
                                                    <CardDescription className="flex items-center text-primary mb-3">
                                                        <Calendar className="w-4 h-4 mr-2" />
                                                        {format(
                                                            new Date(article.publishedAt),
                                                            "dd 'de' MMMM, yyyy",
                                                            { locale: ptBR }
                                                        )}
                                                    </CardDescription>
                                                    {article.summary && (
                                                        <p className="text-cream-muted text-sm line-clamp-2">
                                                            {article.summary}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleEdit(article)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="destructive" size="icon">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Confirmar exclusão?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Esta ação não pode ser desfeita. O artigo será
                                                                    permanentemente removido do sistema.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(article.id)}
                                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                >
                                                                    Deletar
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        </CardHeader>
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

export default ArticleManager;
