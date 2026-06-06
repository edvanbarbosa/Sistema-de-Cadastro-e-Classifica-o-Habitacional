// =============================================================================
// types/program.ts
// Tipagem central para programas habitacionais e sua configuração de UI.
// ProgramUIConfig é um objeto leve retornado pelo backend — não contém regras
// de negócio, percentuais de cota, critérios de pontuação nem prazos processuais.
// =============================================================================

/**
 * Identificador único de um programa habitacional.
 * Branded type para evitar atribuição acidental de strings genéricas.
 */
export type ProgramId = string & { readonly __brand: "ProgramId" };

/** Tipo de formulário de cadastro principal do programa. */
export type FormType = "family" | "property";

// ---------------------------------------------------------------------------
// Tema Visual
// ---------------------------------------------------------------------------

/** Configuração de tema visual aplicada por programa. */
export interface ProgramTheme {
  /** Cor primária do programa (hex, hsl ou CSS var) */
  primaryColor: string;
  /** Cor secundária/acento */
  accentColor: string;
  /** Cor de fundo da sidebar/navigation */
  sidebarColor: string;
  /** URL do logotipo do programa */
  logoUrl: string;
  /** Nome curto exibido na navbar */
  shortName: string;
}

// ---------------------------------------------------------------------------
// Feature Flags de UI
// ---------------------------------------------------------------------------

/**
 * Seções da interface que podem ser habilitadas/desabilitadas por programa.
 * Cada chave corresponde a uma área funcional da UI.
 *
 * ⚠ FeatureGate não é proteção real — todo endpoint do backend deve validar
 *   permissões independentemente.
 */
export interface ProgramEnabledSections {
  /** Módulo de cadastro de famílias */
  cadastro: boolean;
  /** Painel de classificação/hierarquização */
  classificacao: boolean;
  /** Módulo de sorteio */
  sorteio: boolean;
  /** Módulo de suplência */
  suplencia: boolean;
  /** Módulo de convocação */
  convocacao: boolean;
  /** Gestão de empreendimentos */
  empreendimentos: boolean;
  /** Gestão de unidades habitacionais */
  unidades: boolean;
  /** Logs de auditoria */
  auditoria: boolean;
  /** Relatórios */
  relatorios: boolean;
  /** Integração com CadÚnico */
  integracaoCadUnico: boolean;
  /** Exibição de cotas de vagas */
  cotasVagas: boolean;
  /** Exibição de prazos processuais */
  prazosProcessuais: boolean;
}

// ---------------------------------------------------------------------------
// Rótulos Customizáveis
// ---------------------------------------------------------------------------

/**
 * Rótulos de interface customizáveis por programa.
 * Permite que cada programa use terminologia própria sem alterar código.
 */
export interface ProgramLabels {
  /** Rótulo para o beneficiário (ex: "Família", "Candidato") */
  beneficiario: string;
  /** Rótulo para a unidade habitacional (ex: "Unidade", "Imóvel", "Lote") */
  unidade: string;
  /** Rótulo para o processo de cadastro (ex: "Inscrição", "Cadastro") */
  cadastro: string;
  /** Rótulo para o processo de classificação (ex: "Classificação", "Hierarquização") */
  classificacao: string;
  /** Rótulo para o empreendimento (ex: "Empreendimento", "Conjunto", "Residencial") */
  empreendimento: string;
}

// ---------------------------------------------------------------------------
// ProgramUIConfig — objeto principal
// ---------------------------------------------------------------------------

/**
 * Configuração de UI de um programa habitacional.
 *
 * Este objeto é retornado pelo backend e consumido pelo `ProgramContext`.
 * Não contém regras de negócio — apenas decisões de interface.
 */
export interface ProgramUIConfig {
  /** Identificador único do programa */
  id: ProgramId;
  /** Nome completo do programa (ex: "Minha Casa Minha Vida — FAR") */
  name: string;
  /** Slug usado na URL (ex: "mcmv-far") */
  slug: string;
  /** Configuração de tema visual */
  theme: ProgramTheme;
  /** Seções habilitadas para este programa (feature flags de UI) */
  enabledSections: ProgramEnabledSections;
  /** Tipo de formulário de cadastro principal */
  formType: FormType;
  /** Rótulos customizáveis da interface */
  labels: ProgramLabels;
}

// ---------------------------------------------------------------------------
// Listagem de programas
// ---------------------------------------------------------------------------

/** Resumo de um programa para listagem/seleção na landing page. */
export interface ProgramSummary {
  id: ProgramId;
  name: string;
  slug: string;
  /** Descrição curta para exibição na seleção de programa */
  description: string;
  /** URL do logotipo */
  logoUrl: string;
  /** Indica se o programa está ativo para novos cadastros */
  isActive: boolean;
}
