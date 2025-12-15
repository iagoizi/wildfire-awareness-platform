# 📦 Artefatos e Entregas

Este documento registra as evidências das funcionalidades implementadas, os códigos desenvolvidos e os resultados visuais alcançados até o momento no projeto **Wildfire Awareness Platform**.

---

## 🚀 Sprint 1: Estruturação e Interface Principal

### 1. Landing Page e Hero Section
**Descrição:** Desenvolvimento da página inicial responsiva, contendo a seção de destaque (Hero), apresentação do propósito da plataforma e botões de chamada para ação (CTA) para realizar denúncias.
- **Status:** ✅ Concluído
- **Responsável:** Luiz
- **Evidência no Código:**
  - [Página Inicial (Index.tsx)](https://github.com/iagoizi/wildfire-awareness-platform/blob/main/src/web/pages/Index.tsx)
  - [Arquivo de Estilos Globais (index.css)](https://github.com/iagoizi/wildfire-awareness-platform/blob/main/src/web/index.css)

### 2. Arquitetura de Componentes UI
**Descrição:** Implementação da biblioteca de componentes base (Design System) utilizando **Shadcn/UI** e **Tailwind CSS**. Isso inclui botões, inputs, cartões e elementos de layout reutilizáveis.
- **Status:** ✅ Concluído
- **Responsável:** Luiz e Iago
- **Evidência no Código:**
  - [Diretório de Componentes UI](https://github.com/iagoizi/wildfire-awareness-platform/tree/main/src/web/components/ui)
  - [Configuração do Tailwind (tailwind.config.ts)](https://github.com/iagoizi/wildfire-awareness-platform/blob/main/tailwind.config.ts)

### 3. Configuração de Roteamento (SPA)
**Descrição:** Configuração do `React Router Dom` para gerenciar a navegação da Single Page Application (SPA), permitindo transição entre telas sem recarregamento.
- **Status:** ✅ Concluído
- **Responsável:** Iago
- **Evidência no Código:**
  - [Configuração de Rotas (App.tsx)](https://github.com/iagoizi/wildfire-awareness-platform/blob/main/src/web/App.tsx)
  - [Entry Point (main.tsx)](https://github.com/iagoizi/wildfire-awareness-platform/blob/main/src/web/main.tsx)

---

## 📸 Evidências Visuais

Abaixo estão as capturas de tela demonstrando a interface rodando em ambiente local.

### Tela Inicial (Desktop)
> Visão geral da Landing Page com navegação e CTA principal.

![Screenshot da Home Desktop](./imgs/home-desktop.png)

### Responsividade (Mobile)
> Adaptação da interface para dispositivos móveis, garantindo acessibilidade em campo.

![Screenshot Mobile](./imgs/home-mobile.png)

