# Planejamento das Sprints - Plataforma de Denúncia de Queimadas

## 📋 Visão Geral do Projeto

**Quadro Kanban:** [Acesse o quadro de atividades aqui](https://github.com/users/iagoizi/projects/2)

**Duração do Projeto:** Novembro 2025 - Fevereiro 2026  
**Total de Sprints:** 5 (0-4)  
**Metodologia:** Scrum com sprints de 2 semanas

---

## 🎯 Objetivos por Sprint

### **Sprint 0 - SETUP** (Concluída)
**Período:** 10/11/2025 - 28/11/2025  
**Objetivo Principal:** Configuração do ambiente de desenvolvimento e infraestrutura básica

**Tarefas Realizadas:**
- ✅ [BE] Setup Mailtrap (enhancement) #32
- ✅ [BE] Setup servidor (enhancement) #33
- ✅ [BE] Setup GCP (enhancement) #24
- ✅ [BE] Setup banco de dados (enhancement) #35
- ✅ [FE] Setup estrutura inicial do projeto (enhancement) #36
- ✅ [FE] Setup deploy automático (enhancement) #37
- ✅ [FE] Styleguide - Botões (enhancement) #3
- ✅ [FE] Styleguide - Inputs (enhancement) #4
- ✅ [FE] Styleguide - Input de Data (enhancement) #6
- ✅ [FE] Styleguide - Tipografia (enhancement) #38

**Entregáveis:** Ambiente de desenvolvimento configurado, repositório estruturado, styleguide inicial

---

### **Sprint 1 - Formulário de Denúncias** (Em Andamento)
**Período:** 29/11/2025 - 19/12/2025  
**Objetivo Principal:** Implementação completa do sistema de registro de denúncias (CU-01)

**Tarefas Atuais:**
- [ ] Formulário de denúncia #2
- [ ] Outras tarefas relacionadas ao formulário de denúncia (lista completa no quadro Kanban)

**Objetivos Específicos:**
1. Frontend do formulário com todas as seções
2. Backend para recebimento e armazenamento de denúncias
3. Validação de dados no cliente e servidor
4. Upload de imagens com preview
5. Geração de protocolo único
6. Envio de email de confirmação (Mailtrap)

**Entregáveis Esperados:** 
- Formulário funcional para registro de denúncias
- API REST para denúncias
- Sistema de upload de imagens
- Banco de dados com tabela de denúncias

---

### **Sprint 2 - Landing Page** (Próxima)
**Período:** 20/12/2025 - 09/01/2026  
**Objetivo Principal:** Desenvolvimento da landing page pública e sistema de visualização de conteúdo

**Objetivos Específicos:**
1. Landing page responsiva com informações sobre o projeto
2. Sistema de visualização de artigos (CU-02)
3. Sistema de busca básico (CU-03)
4. Menu de navegação completo
5. Página "Sobre" e "Como funciona"
6. Integração com redes sociais

**Casos de Uso Atendidos:** CU-02, CU-03 (parcialmente)

---

### **Sprint 3 - Blog de Notícias** (Futura)
**Período:** 10/01/2026 - 30/01/2026  
**Objetivo Principal:** Implementação do CMS para publicação de conteúdo educativo

**Objetivos Específicos:**
1. Painel administrativo para gestão de conteúdo
2. Editor WYSIWYG para artigos (CU-04)
3. Sistema de categorias e tags
4. Comentários nos artigos (opcional)
5. SEO básico para artigos
6. Sistema de rascunhos e agendamento

**Casos de Uso Atendidos:** CU-04 (completo), CU-03 (completo)

---

### **Sprint 4 - Correção de Bugs, Ajustes e Deploy** (Futura)
**Período:** 31/01/2026 - 20/02/2026  
**Objetivo Principal:** Finalização do projeto, testes e deploy em produção

**Objetivos Específicos:**
1. Testes de usabilidade e correção de bugs
2. Otimização de performance
3. Implementação de segurança adicional
4. Deploy em ambiente de produção
5. Documentação final do projeto
6. Treinamento para administradores (se aplicável)

**Entregáveis Finais:** Plataforma completa em produção, documentação técnica, manual do usuário

---

## 📊 Roadmap do Produto

```mermaid
timeline
    title Roadmap de Desenvolvimento
    section Sprint 0
        Nov 2025 : Setup & Infraestrutura
                  Ambiente dev
                  Banco de dados
    section Sprint 1
        Dez 2025 : Sistema de Denúncias
                  Formulário completo
                  API de denúncias
    section Sprint 2
        Jan 2026 : Landing Page
                  Conteúdo público
                  Sistema de busca
    section Sprint 3
        Jan 2026 : Blog & CMS
                  Painel admin
                  Editor de artigos
    section Sprint 4
        Fev 2026 : Finalização
                  Testes & Deploy
                  Documentação
```

---

## 🎯 Metas de Entrega por Sprint

| Sprint | Funcionalidades Principais | Entregáveis | Status |
|--------|---------------------------|-------------|---------|
| 0 | Infraestrutura | Ambiente configurado | ✅ Concluída |
| 1 | Denúncias | Formulário funcional | 🔄 Em andamento |
| 2 | Conteúdo Público | Landing page + visualização | ⏳ Planejada |
| 3 | CMS | Painel admin + editor | ⏳ Planejada |
| 4 | Finalização | Plataforma em produção | ⏳ Planejada |

---

## 👥 Distribuição de Responsabilidades

### **Backend (BE)**
- Setup de servidores e bancos de dados
- APIs REST para denúncias e conteúdo
- Integrações com serviços externos (email, armazenamento)
- Segurança e autenticação

### **Frontend (FE)**
- Interfaces de usuário responsivas
- Formulários e validação no cliente
- Consumo de APIs
- Experiência do usuário (UX)

### **Full Stack**
- Integração frontend/backend
- Deploy e configuração de ambiente
- Testes end-to-end

---

*Última atualização: 13/12/2025*  
*Próxima revisão: 19/12/2025*

**Link para acompanhamento:** [Quadro Kanban do Projeto](https://github.com/users/iagoizi/projects/2)