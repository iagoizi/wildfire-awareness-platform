const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Iniciando seed de artigos via Prisma...\n");

    const articles = [
        {
            title: 'O Impacto das Queimadas na Biodiversidade da Amazônia',
            slug: 'impacto-queimadas-biodiversidade-amazonia',
            summary: 'Como os recentes incêndios florestais estão afetando a fauna e flora local de forma irreversível nas áreas mais densas da floresta.',
            content: 'A Amazônia abriga a maior biodiversidade do planeta. No entanto, as queimadas, muitas vezes provocadas para expansão agrícola, têm devastado habitats inteiros. Animais de médio e grande porte, bem como insetos essenciais para a polinização, são as principais vítimas diretas. Além disso, a destruição da flora endêmica causa um desequilíbrio na cadeia alimentar que pode levar décadas para ser revertido. Especialistas alertam que, se o ritmo continuar, espécies ainda não descobertas pela ciência podem ser extintas.',
            imageUrl: 'https://images.unsplash.com/photo-1595822359409-eacbf562a048?q=80&w=800&auto=format&fit=crop'
        },
        {
            title: 'Dicas Práticas para Prevenção de Incêndios Florestais',
            slug: 'dicas-praticas-prevencao-incendios-florestais',
            summary: 'Pequenas atitudes no dia a dia podem ajudar a evitar grandes tragédias. Veja o que você pode fazer.',
            content: 'A prevenção é a ferramenta mais eficaz contra incêndios florestais. 1. Não jogue bitucas de cigarro em rodovias ou matas. 2. Evite fogueiras em acampamentos fora de áreas designadas e certifique-se de apagá-las completamente com água e terra. 3. Não solte balões, pois além de crime ambiental, são uma das principais causas de incêndios fora de controle. 4. Mantenha terrenos limpos, sem acúmulo de lixo ou folhas secas. A conscientização de toda a comunidade é fundamental para proteger nossos biomas.',
            imageUrl: 'https://images.unsplash.com/photo-1629858564177-d64eebbb8bc3?q=80&w=800&auto=format&fit=crop'
        },
        {
            title: 'Tecnologia no Combate ao Fogo: Satélites e IA',
            slug: 'tecnologia-combate-fogo-satelites-ia',
            summary: 'Como o INPE e outras organizações estão utilizando inteligência artificial para prever e detectar focos de incêndio.',
            content: 'A tecnologia tem se tornado a maior aliada das brigadas de incêndio e agências ambientais. O uso de imagens de satélite atualizadas quase em tempo real permite a detecção precoce de focos de calor. Atualmente, algoritmos de Inteligência Artificial processam esses gigabytes de imagens diariamente para emitir alertas automáticos. Essa precisão reduz o tempo de resposta das equipes, evitando que pequenos focos se transformem em megaincêndios.',
            imageUrl: 'https://images.unsplash.com/photo-1521743015525-47d3d2dc5fbb?q=80&w=800&auto=format&fit=crop'
        }
    ];

    let successCount = 0;

    for (const article of articles) {
        try {
            // Verificar se artigo já existe
            const existing = await prisma.article.findUnique({
                where: { slug: article.slug }
            });

            if (existing) {
                console.log(`⏭️  Artigo já existe: "${article.title}"`);
                continue;
            }

            // Criar novo artigo
            await prisma.article.create({
                data: article
            });

            console.log(`✅ Artigo criado: "${article.title}"`);
            successCount++;
        } catch (error) {
            console.error(`❌ Erro ao criar artigo "${article.title}":`, error.message);
        }
    }

    console.log(`\n✨ Seed finalizado! ${successCount} artigo(s) foi/foram criado(s).`);
}

main()
    .catch((e) => {
        console.error('🚨 Erro durante o seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

