# Plataforma Web de Conscientização e Denúncia de Queimadas

![ODS 13 e 15](./docs/imgs/ods-13-15.png)

## 📋 Descrição Geral

Este projeto consiste em uma plataforma web integrada para conscientização ambiental e combate às queimadas criminosas. A solução é composta por duas frentes principais:

1. **Portal de Conteúdo e Educação**: Um blog informativo gerenciado por CMS com notícias, artigos, dados científicos e materiais educativos sobre queimadas, clima e sustentabilidade.

2. **Sistema de Denúncia de Incêndios**: Uma ferramenta prática que permite aos cidadãos reportarem crimes ambientais de forma eficiente, através do envio de localização geográfica e evidências fotográficas.

O sistema busca unir educação ambiental com ação cidadã, criando um ciclo virtuoso de conscientização, engajamento e fiscalização colaborativa.

## 🎯 Problema a Ser Solucionado

As queimadas criminosas representam uma grave ameaça ambiental no Brasil, causando:
- Destruição de biomas e perda de biodiversidade
- Impactos negativos na qualidade do ar e saúde pública
- Contribuição significativa para as emissões de gases de efeito estufa
- Prejuízos econômicos e sociais

**Relação com os Objetivos de Desenvolvimento Sustentável (ODS):**

- **[ODS 13 - Ação Contra a Mudança Global do Clima](https://sdgs.un.org/goals/goal13)**: O sistema contribui para a mitigação das mudanças climáticas ao combater uma das fontes de emissões de CO₂ e outros gases, além de promover conscientização sobre a relação entre queimadas e aquecimento global.

- **[ODS 15 - Vida Terrestre](https://sdgs.un.org/goals/goal15)**: A plataforma apoia a proteção, recuperação e uso sustentável dos ecossistemas terrestres, combatendo a degradação do solo e a perda de biodiversidade causadas pelos incêndios criminosos.

## 👥 Público-Alvo

| Grupo | Interesse/Função |
|-------|------------------|
| **Cidadãos em geral** | Buscam informações confiáveis e desejam contribuir com denúncias |
| **Comunidades locais** | Afetadas diretamente por queimadas ou em áreas de risco |
| **Educadores e estudantes** | Material didático sobre educação ambiental |
| **Organizações ambientais** | Divulgação de campanhas e mobilização social |
| **Órgãos públicos** | Dados e denúncias para subsidiar ações de fiscalização |
| **Jornalistas e pesquisadores** | Fontes de informação e dados sobre o tema |

## 🛠️ Tecnologias Previstas

### Frontend
- **HTML5**, **CSS3** e **JavaScript** (ES6+)
- **React.js** para interfaces dinâmicas
- **Tailwind CSS** para design responsivo

### Backend
- **Node.js** com **Express**
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens) para segurança

### CMS (Sistema de Gerenciamento de Conteúdo)
- **Strapi** ou **WordPress como headless CMS** ou ainda **CMS construído totalmente do zero** (a decidir).
- Editor de texto rico para publicação de artigos

### Funcionalidades Específicas
- **Upload de Imagens**: Processamento e armazenamento de evidências fotográficas
- **API de Denúncias**: Endpoints RESTful para envio e consulta de registros
- **Dashboard Administrativo**: Para gestão de conteúdo e denúncias

### Infraestrutura
- **Hospedagem**: Google Cloud e Hostinger
- **Versionamento**: Git e GitHub
- **Contêinerização**: Docker para ambiente de desenvolvimento

## 👨‍💻 Integrantes do Grupo

- **Arthur Norberto da Silveira**
- **Iago Izidório Lacerda**
- **Leandro Augusto Ferreira Santos**
- **Luiz Henrique de Carvalho**

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

*Este projeto é uma iniciativa de conscientização e ação ambiental, alinhada com a Agenda 2030 para o Desenvolvimento Sustentável da ONU.*