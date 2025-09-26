'''
# CloudSec360 - Plataforma de Segurança e Compliance Multi-Cloud

**Autor Principal:** Dário Newton (Desenvolvido por Manus AI)

[![CI/CD](https://github.com/manus-ai/cloudsec360-example/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/manus-ai/cloudsec360-example/actions)

O CloudSec360 é uma plataforma SaaS (Software as a Service) unificada, projetada para simplificar a segurança e o compliance em ambientes multi-cloud (AWS, Azure, GCP). A solução oferece uma abordagem "all-in-one" que substitui a necessidade de múltiplas ferramentas, focando em auditoria, monitoramento contínuo, remediação assistida e treinamento prático de equipes.

## Visão Geral do Projeto

- **Monitoramento em Tempo Real:** Conecta-se aos provedores de nuvem para coletar e analisar metadados de segurança.
- **Auditoria de Compliance:** Automatiza a verificação de conformidade com frameworks como LGPD, GDPR, NIST e CIS.
- **Simulação de Incidentes:** Permite a execução de cenários de ataque controlados para treinar equipes.
- **Dashboard Intuitivo:** Oferece uma visão centralizada com scores de segurança, alertas e relatórios.

## Arquitetura Técnica

Este projeto é um **monorepo** gerenciado com `npm workspaces`, contendo as seguintes partes:

- **`/apps/frontend`**: A aplicação do dashboard, construída com **React (Vite)**, **TailwindCSS** e componentes **shadcn/ui**.
- **`/apps/backend`**: A API serverless, construída com **Node.js**, **TypeScript**, e o **Serverless Framework** para deploy na AWS Lambda.
- **`/packages/ui`**: Um pacote de componentes React compartilhados.
- **`/infra`**: Scripts de **Terraform** para gerenciar a infraestrutura base (ex: buckets S3).
- **`/.github/workflows`**: Workflows de **GitHub Actions** para CI/CD.

![Arquitetura](https://i.imgur.com/example.png) <!-- Placeholder para um diagrama de arquitetura -->

## Pré-requisitos

- Node.js (v20.x ou superior)
- NPM (v9.x ou superior)
- Conta AWS com credenciais configuradas localmente.
- Serverless Framework CLI (`npm install -g serverless`)
- Vercel CLI (`npm install -g vercel`)
- Terraform CLI

## Guia de Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd cloudsec360
    ```

2.  **Instale as dependências:**
    Execute o comando na raiz do projeto. Ele instalará as dependências de todos os workspaces.
    ```bash
    npm install
    ```

### Executando o Frontend (Localmente)

O frontend é uma aplicação React (Vite) que pode ser executada em um servidor de desenvolvimento local.

```bash
# A partir da raiz do projeto
npm run dev:frontend
```

Acesse [http://localhost:5173](http://localhost:5173) em seu navegador.

### Executando o Backend (Localmente)

O backend pode ser executado localmente usando o plugin `serverless-offline`, que simula o ambiente da AWS Lambda e API Gateway.

```bash
# A partir da raiz do projeto, navegue até o backend
cd apps/backend

# Inicie o servidor offline
serverless offline start
```

Os endpoints da API estarão disponíveis em `http://localhost:3000`.

## Deploy

O projeto está configurado com CI/CD para deploy automático na branch `main`.

-   **Backend**: O workflow `.github/workflows/deploy-backend.yml` é acionado por qualquer push na pasta `apps/backend`. Ele usa o Serverless Framework para fazer o deploy das funções Lambda e da API na AWS.

-   **Frontend**: O workflow `.github/workflows/deploy-frontend.yml` é acionado por qualquer push na pasta `apps/frontend`. Ele usa a Vercel CLI para construir e fazer o deploy do site na Vercel.

### Configuração de Secrets

Para que o deploy automático funcione, você precisa configurar os seguintes secrets no seu repositório GitHub (`Settings > Secrets and variables > Actions`):

-   `AWS_ACCESS_KEY_ID`: Sua chave de acesso da AWS.
-   `AWS_SECRET_ACCESS_KEY`: Sua chave secreta da AWS.
-   `VERCEL_TOKEN`: Seu token de acesso da Vercel.
-   `VERCEL_PROJECT_ID`: O ID do seu projeto na Vercel.
-   `VERCEL_ORG_ID`: O ID da sua organização na Vercel.

## Estrutura do Projeto

```
/CloudSec360
|
|-- .github/workflows/       # Workflows de CI/CD
|-- apps/
|   |-- backend/             # API Serverless (Node.js, Lambda)
|   `-- frontend/            # Dashboard (React, Vite, Tailwind)
|-- infra/                   # Infraestrutura como Código (Terraform)
|-- packages/
|   `-- ui/                  # Componentes React compartilhados
|-- .gitignore
|-- package.json             # Raiz do monorepo
`-- README.md
```
'''
