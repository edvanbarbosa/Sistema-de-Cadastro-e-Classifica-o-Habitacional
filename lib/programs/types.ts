// =============================================================================
// lib/programs/types.ts
// Tipagem e interfaces para a configuração de negócios e UI dos programas.
// Estende os tipos globais para suportar as configurações de cotas, prazos,
// elegibilidade e interface do usuário de cada programa específico.
// =============================================================================

import {
  ProgramId,
  FormType,
  ProgramTheme,
  ProgramEnabledSections,
  ProgramLabels,
} from "@/types/program";

/**
 * Parâmetros de Cotas Legais para o programa (RF011, RF012, RF029).
 */
export interface ProgramQuotasConfig {
  /** Percentual mínimo de vagas para famílias em extrema vulnerabilidade (BBF/BPC) */
  minVulnerabilidadePercent: number;
  /** Percentual mínimo de vagas destinadas a idosos */
  minIdosoPercent: number;
  /** Percentual mínimo de vagas destinadas a pessoas com deficiência (PCD) */
  minPcdPercent: number;
  /** Percentual máximo padrão de vagas destinadas a áreas de risco */
  maxAreaRiscoPercent: number;
  /** Percentual máximo de vagas destinadas a áreas de risco caso haja PMRR */
  maxAreaRiscoWithPMRRPercent: number;
}

/**
 * Parametrização de Prazos e Monitoramentos do processo (RF017, RF063).
 */
export interface ProgramDeadlinesConfig {
  /** Limite de dias para o envio da documentação após o enquadramento */
  documentacaoDias: number;
  /** Limite de dias para a assinatura do contrato após a convocação */
  assinaturaContratoDias: number;
  /** Prazo de validade do resultado da pesquisa de enquadramento (em meses) */
  validadePesquisaMeses: number;
  /** Prazo de validade do cadastro sem atualização (em meses) */
  validadeCadastroMeses: number;
}

/**
 * Critérios de Renda e Elegibilidade do programa (RF003, RF004).
 */
export interface ProgramEligibilityConfig {
  /** Limite de renda bruta familiar mensal (em centavos de real) */
  maxRendaFamiliar: number;
  /** Faixa de renda padrão do programa (ex: "Faixa 1 Urbano") */
  faixaRendaPadrao: string;
  /** Lista de benefícios assistenciais a desconsiderar no cálculo da renda */
  desconsiderarBeneficios: string[];
}

/**
 * Configuração completa de um programa habitacional.
 *
 * Consolida as regras de negócio leves de validação visual e dados de UI.
 */
export interface ProgramConfig {
  /** Identificador único do programa */
  id: ProgramId;
  /** Nome completo do programa */
  name: string;
  /** Slug utilizado nas rotas e URLs (ex: "mcmv-far") */
  slug: string;
  /** Configuração do tema visual e identidade da marca */
  theme: ProgramTheme;
  /** Feature flags das seções e módulos habilitados na interface */
  enabledSections: ProgramEnabledSections;
  /** Tipo de formulário de cadastro (familiar ou imóvel) */
  formType: FormType;
  /** Rótulos específicos e terminologia textual da interface */
  labels: ProgramLabels;
  /** Configurações de cotas e reservas de vagas */
  quotas: ProgramQuotasConfig;
  /** Configurações de controle de prazos e ciclos */
  deadlines: ProgramDeadlinesConfig;
  /** Configurações de critérios de renda e elegibilidade do domínio */
  eligibility: ProgramEligibilityConfig;
}
