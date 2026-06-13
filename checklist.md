# Checklist de Implementação - SIGAH (Fundação)

Abaixo está o roteiro passo a passo para a implementação da fundação arquitetural do **Sistema Integrado de Gestão de Apoio Habitacional (SIGAH)**.

## 📋 Progresso das Etapas

- [x] **Etapa 1: A Base de Dados (Tipos do Domínio)**
  - [x] Passo 1: Criar `types/family.ts` (Tipagem para membros da família, renda e dados socioeconômicos)
  - [x] Passo 2: Criar `types/unit.ts` (Tipagem para unidades habitacionais, empreendimentos e blocos)
  - [x] Passo 3: Criar `types/process.ts` (Tipagem para status de etapas, prazos e logs de auditoria)

- [x] **Etapa 2: A Estrutura de Configuração (`lib/programs/`)**
  - [x] Passo 4: Criar `lib/programs/types.ts` (Interface `ProgramConfig` e sub-interfaces)
  - [x] Passo 5: Criar `lib/programs/mcmv-far.ts` (Implementação concreta com as regras do MCMV-FAR)
  - [x] Passo 6: Criar `lib/programs/index.ts` (Registro/Centralizador de programas ativos)

- [x] **Etapa 3: A Distribuição do Contexto (`contexts/` e `app/`)**
  - [x] Passo 7: Criar `contexts/ProgramContext.tsx` (Provider do programa ativo e hook `useProgram()`)
  - [x] Passo 8: Criar `contexts/UserContext.tsx` (Provider de perfil de usuário e hook `useUser()`)
  - [x] Passo 9: Criar a pasta de rota dinâmica `app/[programId]/`
  - [x] Passo 10: Criar `app/[programId]/layout.tsx` (Injeção dos providers de programa e usuário)

- [x] **Etapa 4: Controles de Exibição Visual (`components/`)**
  - [x] Passo 11: Criar `components/program/FeatureGate.tsx` (Componente de feature flag)

- [ ] **Etapa 5: Contratos para Algoritmos Complexos (`lib/`)**
  - [ ] Passo 12: Criar `lib/scoring/engine.ts` (Interface `ScoringStrategy` do motor de classificação)
  - [ ] Passo 13: Criar `lib/integrations/base.ts` (Interface `IntegrationAdapter` para bases de dados externas)

---

## 🛠️ Instruções para Execução
1. Realizar as tarefas na ordem sugerida para garantir compatibilidade de importações.
2. Manter a cobertura de tipos estrita do TypeScript.
3. Não criar referências a IDs de programas específicos em componentes globais.
