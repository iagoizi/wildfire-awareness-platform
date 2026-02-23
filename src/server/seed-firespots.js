const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Função para gerar uma foto base64 simulada (placeholder pequeno)
function generateMockPhoto() {
    // Base64 de uma imagem 1x1 pixel vermelha (apenas para simular)
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
}

async function main() {
    console.log("🔥 Iniciando seed de denúncias de queimadas via Prisma...\n");

    const fireSpots = [
        {
            estado: 'Minas Gerais',
            cidade: 'Ouro Preto',
            endereco: 'Rodovia dos Inconfidentes, km 23',
            referencia: 'Próximo ao trevo de acesso ao distrito de Lavras Novas',
            email: 'usuario1@example.com',
            info: 'Grande incêndio próximo à área de preservação ambiental. Fumaça densa visível de longe.',
            photos: JSON.stringify([generateMockPhoto()]),
            status: 'Recebida',
            createdAt: new Date('2026-02-20T14:30:00')
        },
        {
            estado: 'São Paulo',
            cidade: 'Campinas',
            endereco: 'Estrada Municipal de acesso ao Bairro Sousas',
            referencia: 'Altura do km 5, próximo ao condomínio Colinas do Ermitage',
            email: 'testemunha.sp@example.com',
            info: 'Foco de incêndio em vegetação de encosta. Vento forte espalhando as chamas rapidamente.',
            photos: JSON.stringify([generateMockPhoto(), generateMockPhoto()]),
            status: 'Em Análise',
            createdAt: new Date('2026-02-19T10:15:00')
        },
        {
            estado: 'Mato Grosso',
            cidade: 'Alta Floresta',
            endereco: 'BR-163, km 845',
            referencia: 'Entre Alta Floresta e Guarantã do Norte',
            email: null,
            info: 'Queimada em área de pasto alcançando mata nativa. Aparentemente proposital.',
            photos: null,
            status: 'Encaminhada',
            createdAt: new Date('2026-02-18T16:45:00')
        },
        {
            estado: 'Minas Gerais',
            cidade: 'Mariana',
            endereco: 'Estrada de acesso ao distrito de Águas Claras',
            referencia: 'Próximo à antiga igreja de pedra',
            email: 'morador.mariana@example.com',
            info: 'Pequeno foco de incêndio em área de capim seco. Moradores tentando controlar.',
            photos: JSON.stringify([generateMockPhoto()]),
            status: 'Resolvida',
            createdAt: new Date('2026-02-17T08:20:00')
        },
        {
            estado: 'Goiás',
            cidade: 'Chapada dos Veadeiros',
            endereco: 'Parque Nacional da Chapada dos Veadeiros - Trilha dos Saltos',
            referencia: 'Próximo à cachoeira do Segredo',
            email: 'ecoturista@example.com',
            info: 'Fumaça avistada dentro do parque. Possível queimada iniciada por raio.',
            photos: JSON.stringify([generateMockPhoto(), generateMockPhoto(), generateMockPhoto()]),
            status: 'Em Análise',
            createdAt: new Date('2026-02-16T12:00:00')
        },
        {
            estado: 'Amazonas',
            cidade: 'Manaus',
            endereco: 'AM-010, km 34',
            referencia: 'Próximo ao ramal de acesso à comunidade do Pau Rosa',
            email: 'vigilante.am@example.com',
            info: 'Grande área de floresta em chamas. Necessário combate imediato.',
            photos: JSON.stringify([generateMockPhoto()]),
            status: 'Encaminhada',
            createdAt: new Date('2026-02-15T19:30:00')
        },
        {
            estado: 'Pará',
            cidade: 'Altamira',
            endereco: 'Transamazônica, km 178',
            referencia: 'Entre Altamira e Medicilândia',
            email: null,
            info: 'Queimada para limpeza de pasto atingindo área de floresta. Desmatamento ilegal suspeito.',
            photos: null,
            status: 'Em Análise',
            createdAt: new Date('2026-02-14T15:10:00')
        },
        {
            estado: 'Rio de Janeiro',
            cidade: 'Petrópolis',
            endereco: 'Estrada União-Indústria, altura do km 12',
            referencia: 'Próximo ao Museu Imperial',
            email: 'turista.rj@example.com',
            info: 'Pequeno incêndio em vegetação de encosta. Bombeiros já acionados.',
            photos: JSON.stringify([generateMockPhoto(), generateMockPhoto()]),
            status: 'Resolvida',
            createdAt: new Date('2026-02-13T11:25:00')
        },
        {
            estado: 'Minas Gerais',
            cidade: 'Belo Horizonte',
            endereco: 'Serra do Curral - Trilha do Pico',
            referencia: 'Topo da Serra do Curral',
            email: 'ciclista.bh@example.com',
            info: 'Fumaça vista do alto da serra. Possível início de incêndio na vegetação.',
            photos: JSON.stringify([generateMockPhoto()]),
            status: 'Resolvida',
            createdAt: new Date('2026-02-12T07:45:00')
        },
        {
            estado: 'Tocantins',
            cidade: 'Palmas',
            endereco: 'TO-050, km 22',
            referencia: 'Próximo ao Parque Estadual do Lajeado',
            email: 'viajante.to@example.com',
            info: 'Queimada em área de cerrado. Fogo se espalhando rapidamente com o vento.',
            photos: null,
            status: 'Encaminhada',
            createdAt: new Date('2026-02-11T13:50:00')
        },
        {
            estado: 'Mato Grosso do Sul',
            cidade: 'Bonito',
            endereco: 'MS-178, acesso ao Rio da Prata',
            referencia: 'Próximo à fazenda Cabeceira do Prata',
            email: null,
            info: 'Incêndio em área de pasto próximo a área turística.',
            photos: JSON.stringify([generateMockPhoto()]),
            status: 'Recebida',
            createdAt: new Date('2026-02-10T09:30:00')
        },
        {
            estado: 'Bahia',
            cidade: 'Lençóis',
            endereco: 'BA-142 - Acesso à Chapada Diamantina',
            referencia: 'Próximo ao Morro do Pai Inácio',
            email: 'guia.chapada@example.com',
            info: 'Fumaça intensa avistada próximo ao morro. Vento forte dificultando controle.',
            photos: JSON.stringify([generateMockPhoto(), generateMockPhoto()]),
            status: 'Encaminhada',
            createdAt: new Date('2026-02-09T16:15:00')
        },
        {
            estado: 'Minas Gerais',
            cidade: 'Itabirito',
            endereco: 'Estrada Real, trecho Itabirito-Ouro Preto',
            referencia: 'Próximo ao Pico do Itabirito',
            email: 'caminhante@example.com',
            info: 'Pequeno foco de incêndio em trilha turística. Aparentemente causado por descuido de visitantes.',
            photos: JSON.stringify([generateMockPhoto()]),
            status: 'Resolvida',
            createdAt: new Date('2026-02-08T14:00:00')
        },
        {
            estado: 'Espírito Santo',
            cidade: 'Domingos Martins',
            endereco: 'BR-262, km 94',
            referencia: 'Próximo ao Pico da Bandeira',
            email: 'montanhista.es@example.com',
            info: 'Incêndio em vegetação de altitude. Área de difícil acesso para combate.',
            photos: null,
            status: 'Em Análise',
            createdAt: new Date('2026-02-07T10:40:00')
        },
        {
            estado: 'Rondônia',
            cidade: 'Porto Velho',
            endereco: 'BR-364, km 212',
            referencia: 'Entre Porto Velho e Ariquemes',
            email: 'caminhoneiro@example.com',
            info: 'Grande queimada às margens da rodovia. Fumaça atrapalhando visibilidade no trânsito.',
            photos: JSON.stringify([generateMockPhoto(), generateMockPhoto()]),
            status: 'Resolvida',
            createdAt: new Date('2026-02-06T18:20:00')
        },
        {
            estado: 'Santa Catarina',
            cidade: 'Florianópolis',
            endereco: 'Morro da Cruz - Trilha Principal',
            referencia: 'Base do mirante panorâmico',
            email: 'residente.sc@example.com',
            info: 'Mesmo local da denúncia anterior. Verificado que não havia incêndio real.',
            photos: null,
            status: 'Resolvida',
            createdAt: new Date('2026-02-05T09:10:00')
        },
        {
            estado: 'Paraná',
            cidade: 'Foz do Iguaçu',
            endereco: 'BR-469 - Estrada do Parque Nacional',
            referencia: 'Km 18, próximo à entrada do parque',
            email: 'guarda.parque@example.com',
            info: 'Foco de incêndio controlado próximo à área de visitação. Brigada já acionada.',
            photos: JSON.stringify([generateMockPhoto()]),
            status: 'Em Análise',
            createdAt: new Date('2026-02-04T13:35:00')
        },
        {
            estado: 'Ceará',
            cidade: 'Guaramiranga',
            endereco: 'CE-065 - Serra de Baturité',
            referencia: 'Próximo ao Pico Alto',
            email: null,
            info: 'Queimada em área de mata atlântica serrana. Risco de expansão.',
            photos: JSON.stringify([generateMockPhoto(), generateMockPhoto()]),
            status: 'Encaminhada',
            createdAt: new Date('2026-02-03T16:50:00')
        }
    ];

    let createdCount = 0;
    let skippedCount = 0;

    for (const fireSpot of fireSpots) {
        try {
            // Verifica se já existe uma denúncia no mesmo local e data
            const existing = await prisma.fireSpot.findFirst({
                where: {
                    estado: fireSpot.estado,
                    cidade: fireSpot.cidade,
                    endereco: fireSpot.endereco
                }
            });

            if (existing) {
                console.log(`⏭️  Denúncia já existe: ${fireSpot.cidade}/${fireSpot.estado} - ${fireSpot.endereco}`);
                skippedCount++;
                continue;
            }

            await prisma.fireSpot.create({
                data: fireSpot
            });

            console.log(`✅ Denúncia criada: ${fireSpot.cidade}/${fireSpot.estado} - Status: ${fireSpot.status}`);
            createdCount++;
        } catch (error) {
            console.error(`❌ Erro ao criar denúncia em ${fireSpot.cidade}:`, error.message);
        }
    }

    console.log(`\n📊 Resumo:`);
    console.log(`   ✅ ${createdCount} denúncias criadas`);
    console.log(`   ⏭️  ${skippedCount} denúncias já existiam`);
    console.log(`   📝 Total no banco: ${createdCount + skippedCount}`);
}

main()
    .catch((e) => {
        console.error('❌ Erro durante seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
