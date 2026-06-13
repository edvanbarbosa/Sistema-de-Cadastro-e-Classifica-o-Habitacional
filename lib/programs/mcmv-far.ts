// =============================================================================
// lib/programs/mcmv-far.ts
// Implementação concreta da configuração do programa Minha Casa Minha Vida - FAR.
// Define as regras de cotas, prazos, elegibilidade e identidade visual.
// =============================================================================

import { ProgramId } from "@/types/program";
import { ProgramConfig } from "./types";

export const mcmvFarConfig: ProgramConfig = {
  id: "mcmv-far" as ProgramId,
  name: "Minha Casa Minha Vida — FAR",
  slug: "mcmv-far",
  
  // Tema visual e branding
  theme: {
    primaryColor: "#003366", // Azul escuro característico
    accentColor: "#eab308",  // Amarelo/âmbar de destaque
    sidebarColor: "#0f172a", // Slate escuro 900
    logoUrl: "/assets/logo-mcmv-far.png",
    shortName: "MCMV-FAR",
  },
  
  // Módulos e seções habilitadas na UI (Feature Flags)
  enabledSections: {
    cadastro: true,
    classificacao: true,
    sorteio: true,
    suplencia: true,
    convocacao: true,
    empreendimentos: true,
    unidades: true,
    auditoria: true,
    relatorios: true,
    integracaoCadUnico: true,
    cotasVagas: true,
    prazosProcessuais: true,
  },
  
  // Orientação do cadastro
  formType: "family",
  
  // Terminologia textual
  labels: {
    beneficiario: "Candidato",
    unidade: "Unidade",
    cadastro: "Inscrição",
    classificacao: "Classificação",
    empreendimento: "Empreendimento",
  },
  
  // Parâmetros de Cotas e Reservas de Vagas (RF011, RF012, RF029)
  quotas: {
    minVulnerabilidadePercent: 50,      // Mínimo de 50% para Bolsa Família/BPC/Microcefalia
    minIdosoPercent: 3,                 // Reserva de 3% para idosos
    minPcdPercent: 3,                   // Reserva de 3% para PCD
    maxAreaRiscoPercent: 20,            // Limite de 20% para famílias de áreas de risco
    maxAreaRiscoWithPMRRPercent: 30,    // Limite estendido para 30% caso o município possua PMRR
  },
  
  // Prazos e Monitoramento de Processos (RF017, RF063)
  deadlines: {
    documentacaoDias: 120,              // 120 dias para encaminhar documentação ao Agente Financeiro
    assinaturaContratoDias: 60,         // 60 dias para assinatura após a convocação
    validadePesquisaMeses: 24,          // Validade da pesquisa de enquadramento da Caixa (24 meses)
    validadeCadastroMeses: 24,          // Exigência de atualização cadastral a cada 24 meses
  },
  
  // Critérios de Renda e Elegibilidade (RF003, RF004, RF066)
  eligibility: {
    maxRendaFamiliar: 264000,           // Limite de renda bruta familiar mensal: R$ 2.640,00 (em centavos)
    faixaRendaPadrao: "Faixa 1 Urbano",
    desconsiderarBeneficios: [
      "bpc",
      "bolsa_familia",
      "auxilio_doenca",
      "auxilio_acidente",
      "seguro_desemprego",
    ],
  },
};
export default mcmvFarConfig;
