# Documentação de Interfaces - Wildfire Awareness Platform

Este documento descreve todas as telas desenvolvidas na plataforma de denúncia de queimadas, com seus respectivos designs responsivos e funcionalidades.

---

## 1. Home (Página Inicial)

A página inicial é o ponto de entrada da aplicação, apresentando informações sobre a plataforma, estatísticas ambientais e call-to-action para denúncias.

### Funcionalidades:
- **Hero Section**: Apresentação visual principal com mensagem de impacto
- **Seção de Estatísticas**: Dados animados sobre queimadas e impactos ambientais
- **Call-to-Action para Denúncia**: Botão destacado para incentivar denúncias
- **Seção ODS**: Conexão com Objetivos de Desenvolvimento Sustentável (ODS 13 e 15)
- **Navegação Principal**: Menu header com links para outras seções
- **Rodapé**: Footer com informações e links adicionais

### Versão Desktop

![Home Desktop](./imgs/home-desktop.jpeg)

*Tela principal em resolução desktop (≥1024px) com layout completo em uma coluna*

### Versão Mobile

![Home Mobile](./imgs/home-mobile.jpeg)

*Tela principal em resolução mobile (<768px) com layout otimizado para toque*

---

## 2. Denunciar Queimada (Página de Denúncia)

Página dedicada ao registro de novos focos de queimadas, com formulário interativo e informações sobre o processo.

### Funcionalidades:
- **Hero Section Específica**: Título e descrição do processo de denúncia
- **Seção de Estatísticas da Denúncia**: Números sobre denúncias recebidas e processadas
- **Formulário de Denúncia**: 
  - Campos de localização (estado, cidade, endereço, referência)
  - Informações do denunciante (email opcional)
  - Upload de fotos
  - Descrição detalhada do incidente
  - Validação em tempo real
- **Navegação Principal**: Menu header
- **Rodapé**: Footer com informações

### Versão Desktop

![Denúncia Desktop](./imgs/queimada-desktop.jpeg)

*Formulário de denúncia em layout desktop com visualização completa de todos os campos*

### Versão Mobile

![Denúncia Mobile](./imgs/queimada-mobile.jpeg)

*Formulário otimizado para dispositivos móveis com campos adaptados*

---

## 3. Artigos (Listagem)

Página que apresenta uma coleção de artigos informativos sobre prevenção, educação ambiental e impactos de queimadas.

### Funcionalidades:
- **Grid de Artigos**: 
  - Cards com imagem da capa (se disponível)
  - Título do artigo
  - Resumo/summary
  - Data de publicação
  - Link para leitura completa
- **Paginação ou Carregamento Infinito**: Para gerenciar múltiplos artigos
- **Estados de Carregamento**: Skeletons durante busca de dados
- **Tratamento de Erros**: Mensagens informativas em caso de falha
- **Navegação Principal**: Menu header
- **Rodapé**: Footer

### Versão Desktop

![Artigos Desktop](./imgs/artigos-desktop.jpeg)

*Grade de artigos em layout desktop exibindo múltiplos cards em colunas*

### Versão Mobile

![Artigos Mobile](./imgs/artigos-mobile.jpeg)

*Grade de artigos adaptada para mobile com uma coluna e cards redimensionados*

---

## 4. Detalhe do Artigo

Página de visualização completa de um artigo individual, com conteúdo formatado e opção de navegação.

### Funcionalidades:
- **Imagem de Capa**: Exibição da imagem principal do artigo
- **Metadados**: 
  - Título do artigo
  - Resumo
  - Data de publicação
  - Autor (se aplicável)
- **Conteúdo Formatado**: Renderização de HTML rich text
- **Botão de Voltar**: Navegação de retorno à lista de artigos
- **Estados de Carregamento**: Skeleton durante busca de dados
- **Tratamento de Erros**: Redirecionamento automático em caso de falha
- **Navegação Principal**: Menu header
- **Rodapé**: Footer

### Versão Mobile

![Detalhe do Artigo Mobile](./imgs/detalhe-artigo-mobile.jpeg)

*Visualização completa de um artigo em dispositivo móvel com layout otimizado*

---

## 5. Login CMS (Área Administrativa)

Página de autenticação para acesso à área administrativa de gerenciamento de conteúdo.

### Funcionalidades:
- **Formulário de Login**:
  - Campo de usuário
  - Campo de senha
  - Botão de envio
- **Validação de Credenciais**: Verificação no servidor
- **Tratamento de Erros**: Mensagens de erro claras para credenciais inválidas
- **Redirecionamento Automático**: Para a página de gestão após sucesso
- **Ícone Visual**: Lock icon para reforçar segurança
- **Design Minimalista**: Card centralizado sem header/footer extra

### Imagem

![Admin Login](./imgs/admin-login.jpeg)

*Tela de login administrativo com interface segura e clara*

---

## 6. CMS - Gerenciador de Artigos

Painel administrativo para criação, edição e exclusão de artigos.

### Funcionalidades:
- **Tabela/Lista de Artigos**:
  - Visualização de todos os artigos existentes
  - Colunas: título, slug, resumo, data de criação
  - Ações: editar e deletar
- **Modal de Criação/Edição**:
  - Campos: título, slug (auto-gerado), resumo, conteúdo, URL da imagem
  - Validação de campos obrigatórios
  - Salvamento via API
- **Dialog de Confirmação**: Para exclusão com segurança
- **Estados de Carregamento**: Indicadores visuais durante operações
- **Notificações**: Toast messages para confirmação de ações
- **Botão de Logout**: Para encerrar a sessão
- **Navegação Principal**: Menu header
- **Rodapé**: Footer

### Versão Desktop

![CMS Desktop](./imgs/crm-desktop.jpeg)

*Painel de administração em layout desktop com tabela completa de artigos*

### Versão Mobile

![CMS Mobile](./imgs/crm-mobile.jpeg)

*Painel de administração adaptado para mobile com interface simplificada*

---

## 7. Página 404 (Não Encontrada)

Página exibida quando o usuário tenta acessar uma rota inexistente.

### Funcionalidades:
- **Mensagem Amigável**: Informando que a página não foi encontrada
- **Botão de Retorno**: Link para voltar à página inicial
- **Navegação Principal**: Menu header (se aplicável)
- **Rodapé**: Footer

---

## Estrutura de Roteamento

```
/                          → Home
/denunciar-queimada        → Página de Denúncia
/artigos                   → Listagem de Artigos
/artigos/:id               → Detalhes do Artigo
/cms                       → Login CMS
/cms/artigos               → Gerenciador de Artigos (Protegido)
/*                         → 404 Não Encontrada
```

---

## Componentes Reutilizáveis

A plataforma utiliza os seguintes componentes principais em múltiplas telas:

### Componentes de Layout
- **Header**: Navegação principal com logo e menu
- **Footer**: Rodapé com informações e links adicionais
- **HeroSection**: Seções de destaque com imagem de fundo e texto
- **ScrollToTop**: Botão flutuante para retorno ao topo

### Componentes de Formulário
- **Input**: Campos de texto padrão
- **Textarea**: Campos de texto longo
- **Button**: Botões com variações de estilo
- **Label**: Rótulos de formulário
- **Form**: Componente principal do formulário

### Componentes de Conteúdo
- **Card**: Container padrão para conteúdo
- **Skeleton**: Placeholders de carregamento
- **Dialog**: Modais para ações importantes
- **AlertDialog**: Diálogos de confirmação

### Componentes de Feedback
- **Toast**: Notificações não-modais
- **Alert**: Alertas informativos

---

## Responsividade

A plataforma é totalmente responsiva com breakpoints:

- **Mobile**: < 768px (xs, sm)
- **Tablet**: 768px - 1024px (md, lg)
- **Desktop**: ≥ 1024px (xl, 2xl)

Todos os componentes se adaptam automaticamente a esses tamanhos de tela.

---

## Autenticação

O sistema utiliza:
- **JWT (JSON Web Tokens)** para autenticação na área administrativa
- **LocalStorage** para armazenamento do token
- **PrivateRoute** para proteção de rotas autenticadas
- **AuthContext** para gerenciamento global do estado de autenticação

---

## Integração com API

A plataforma comunica-se com a API backend para:

- **GET /articles**: Listar todos os artigos
- **GET /articles/:id**: Obter detalhes de um artigo
- **POST /articles**: Criar novo artigo
- **PUT /articles/:id**: Atualizar artigo existente
- **DELETE /articles/:id**: Deletar artigo
- **POST /auth/login**: Autenticar usuário
- **POST /firespots**: Criar nova denúncia de queimada

---

## Tecnologias Utilizadas

- **React 18+**: Framework principal
- **TypeScript**: Tipagem estática
- **React Router**: Roteamento
- **Tailwind CSS**: Estilização
- **Shadcn/ui**: Componentes UI
- **React Hook Form**: Gerenciamento de formulários
- **Axios**: Cliente HTTP
- **React Helmet**: Gerenciamento de metadados
- **Date-fns**: Formatação de datas
- **Lucide React**: Ícones

---

## Design System

A plataforma segue um design system coerente com:

- **Cores Primárias**: Laranja/Vermelho (alertar sobre incêndios) e tons verdejantes (esperança ambiental)
- **Tipografia**: Fonte display para títulos, sans-serif para corpo
- **Espaçamento**: Grid de 4px para consistência
- **Sombras**: Sombras sutis para elevação de elementos
- **Animações**: Transições suaves para feedback visual

---

## Acessibilidade

Considerações implementadas:

- ✓ Semântica HTML adequada
- ✓ Atributos ARIA onde necessário
- ✓ Contraste de cores WCAG AA
- ✓ Navegação por teclado
- ✓ Descrições de imagens (alt text)
- ✓ Labels associados em formulários

---

## Próximas Melhorias Sugeridas

1. **Analytics**: Integração com ferramentas de analytics para rastrear comportamento do usuário
2. **Busca Avançada**: Filtros mais sofisticados na listagem de denúncias
3. **Mapa Interativo**: Visualização geográfica de focos de queimadas
4. **Notificações em Tempo Real**: WebSocket para atualizações de denúncias
5. **Exportação de Dados**: Relatórios em PDF/Excel
6. **Multi-idioma**: Suporte a outros idiomas além do português
7. **Dark Mode**: Tema escuro opcional
8. **PWA**: Transformar em Progressive Web App para offline access
