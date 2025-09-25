# Sistema de Chamados

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-2.57.4-3ECF8E?logo=supabase)
![Styled Components](https://img.shields.io/badge/styled--components-6.1.19-DB7093?logo=styled-components)
![Axios](https://img.shields.io/badge/Axios-1.12.2-5A29E4?logo=axios)
![ESLint](https://img.shields.io/badge/ESLint-9.33.0-4B32C3?logo=eslint)

---

## 🚀 O que é?

O **Sistema de Chamados** é uma plataforma web desenvolvida para a MIP Construtora, com o objetivo de gerenciar solicitações de suporte técnico (chamados) feitas por funcionários e atendidas pelo time de TI. O sistema organiza o fluxo de atendimento, desde a abertura do chamado até sua conclusão, promovendo eficiência, rastreabilidade e transparência.

---

## 🛠️ Stack Utilizada

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Estilização:** [styled-components](https://styled-components.com/) (tema customizado)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Roteamento:** [React Router DOM v7](https://reactrouter.com/en/main)
- **Backend as a Service:** [Supabase](https://supabase.com/) (DB, Auth, Storage)
- **HTTP Requests:** [Axios](https://axios-http.com/)
- **Lint:** [ESLint](https://eslint.org/)

---

## 🎯 Objetivo

- Automatizar o fluxo de atendimento de chamados de TI.
- Proporcionar transparência e rastreabilidade.
- Facilitar o cadastro e gerenciamento de membros do time de TI.
- Melhorar a comunicação entre funcionários e equipe de suporte.

---

## ⚙️ Funcionalidades

- **Abertura de chamados** por funcionários, com detalhamento do problema e preferência de contato.
- **Visualização da fila de espera** dos chamados em tempo real.
- **Login e rotas protegidas** para administradores e membros de TI.
- **Cadastro de membros de TI** (com upload de imagem de perfil).
- **Gestão de chamados:** atribuição, acompanhamento, conclusão e repasse de chamados.
- **Notificações por e-mail** (integração via API/Proxy).

---

## 📁 Estrutura de Pastas

- `src/pages/Func`: Telas do funcionário (realizar chamado, fila de espera)
- `src/pages/Admin`: Telas do administrador (login, cadastro de membro TI)
- `src/pages/IT`: Telas do time de TI (login, meus chamados, todos os chamados)
- `src/components`: Componentes reutilizáveis e modais
- `src/contexts`: Contexto global do Supabase
- `src/hooks`: Hooks customizados para lógica de fila, atribuição, conclusão e repasse de chamados
- `src/lib`: Integração com Axios para envio de e-mails
- `src/styles`: Temas e estilos globais

---

## 🏁 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis do Supabase em `src/contexts/supabaseContext.tsx` (URL e API Key).
3. Inicie o projeto:
   ```bash
   npm run dev
   ```
4. Acesse via navegador em `http://localhost:5173` (ou porta definida pelo Vite).

---

## ⚠️ Observações Importantes

- **Configuração do Supabase:** Informe corretamente a URL e a API Key do seu projeto Supabase.
- **Envio de E-mails:** O endpoint de envio de e-mails está como placeholder. Configure um proxy/backend real para envio.
- **Segurança:** Rotas sensíveis são protegidas, mas recomenda-se reforçar autenticação/autorização em produção.
- **Imagens:** Upload de imagens de perfil dos membros de TI é feito via Supabase Storage.

---

Desenvolvido por Thiago Cunha.
