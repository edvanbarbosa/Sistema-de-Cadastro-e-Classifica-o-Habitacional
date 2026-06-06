// =============================================================================
// types/api.ts
// Tipos genéricos para comunicação com a API do backend.
// Respostas padronizadas, paginação, erros e enums de processo.
// =============================================================================

// ---------------------------------------------------------------------------
// Respostas genéricas
// ---------------------------------------------------------------------------

/**
 * Resposta padrão da API para operações que retornam um único recurso.
 * @template T - Tipo do dado retornado.
 */
export interface ApiResponse<T> {
  /** Indica se a requisição foi bem-sucedida */
  success: boolean;
  /** Dado retornado */
  data: T;
  /** Mensagem descritiva (sucesso ou informativa) */
  message: string | null;
}

/**
 * Resposta paginada da API para listagens.
 * @template T - Tipo dos itens da lista.
 */
export interface PaginatedResponse<T> {
  /** Indica se a requisição foi bem-sucedida */
  success: boolean;
  /** Lista de itens da página atual */
  data: T[];
  /** Metadados de paginação */
  pagination: PaginationMeta;
}

/** Metadados de paginação. */
export interface PaginationMeta {
  /** Página atual (1-indexed) */
  page: number;
  /** Quantidade de itens por página */
  perPage: number;
  /** Total de itens disponíveis */
  totalItems: number;
  /** Total de páginas */
  totalPages: number;
  /** Indica se há próxima página */
  hasNextPage: boolean;
  /** Indica se há página anterior */
  hasPreviousPage: boolean;
}

// ---------------------------------------------------------------------------
// Erros
// ---------------------------------------------------------------------------

/** Detalhe de um erro de validação em um campo específico. */
export interface FieldError {
  /** Nome do campo com erro */
  field: string;
  /** Mensagem descritiva do erro */
  message: string;
  /** Código do erro (para internacionalização) */
  code: string;
}

/** Resposta de erro padronizada da API. */
export interface ApiError {
  /** Indica falha (sempre false) */
  success: false;
  /** Mensagem de erro legível */
  message: string;
  /** Código HTTP do erro */
  statusCode: number;
  /** Código interno do erro (para rastreamento) */
  errorCode: string;
  /** Erros de validação por campo (quando aplicável) */
  fieldErrors: FieldError[] | null;
  /** Timestamp do erro (ISO 8601) */
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Enums de processo
// ---------------------------------------------------------------------------

/**
 * Etapas do processo habitacional.
 * Representa a fase atual de um candidato/família no fluxo.
 */
export enum ProcessStage {
  /** Inscrição aberta — cadastro em andamento */
  INSCRICAO = "inscricao",
  /** Validação documental — documentos em análise */
  VALIDACAO_DOCUMENTAL = "validacao_documental",
  /** Integração com bases externas (CadÚnico, etc.) */
  INTEGRACAO_EXTERNA = "integracao_externa",
  /** Classificação/hierarquização — pontuação calculada */
  CLASSIFICACAO = "classificacao",
  /** Aplicação de cotas */
  APLICACAO_COTAS = "aplicacao_cotas",
  /** Sorteio (quando aplicável) */
  SORTEIO = "sorteio",
  /** Lista de suplência */
  SUPLENCIA = "suplencia",
  /** Convocação do beneficiário */
  CONVOCACAO = "convocacao",
  /** Designação de unidade habitacional */
  DESIGNACAO_UNIDADE = "designacao_unidade",
  /** Pós-ocupação / Acompanhamento */
  POS_OCUPACAO = "pos_ocupacao",
  /** Processo finalizado */
  FINALIZADO = "finalizado",
}

/**
 * Ações de auditoria rastreadas pelo sistema.
 * Cada ação corresponde a um registro no log de auditoria.
 */
export enum AuditAction {
  // Cadastro
  CADASTRO_CRIADO = "cadastro_criado",
  CADASTRO_ATUALIZADO = "cadastro_atualizado",
  CADASTRO_CANCELADO = "cadastro_cancelado",

  // Documentos
  DOCUMENTO_ENVIADO = "documento_enviado",
  DOCUMENTO_APROVADO = "documento_aprovado",
  DOCUMENTO_REJEITADO = "documento_rejeitado",

  // Integração
  INTEGRACAO_CONSULTADA = "integracao_consultada",

  // Classificação
  CLASSIFICACAO_EXECUTADA = "classificacao_executada",
  PONTUACAO_RECALCULADA = "pontuacao_recalculada",

  // Sorteio
  SORTEIO_REALIZADO = "sorteio_realizado",

  // Convocação
  CONVOCACAO_ENVIADA = "convocacao_enviada",
  CONVOCACAO_ACEITA = "convocacao_aceita",
  CONVOCACAO_RECUSADA = "convocacao_recusada",

  // Unidade
  UNIDADE_DESIGNADA = "unidade_designada",
  UNIDADE_DESVINCULADA = "unidade_desvinculada",

  // Administração
  PERMISSAO_ALTERADA = "permissao_alterada",
  CONSENTIMENTO_REGISTRADO = "consentimento_registrado",
  EXPORTACAO_DADOS = "exportacao_dados",
}

// ---------------------------------------------------------------------------
// Registro de auditoria
// ---------------------------------------------------------------------------

/** Entrada individual no log de auditoria. */
export interface AuditLogEntry {
  /** ID do registro */
  id: string;
  /** Ação realizada */
  action: AuditAction;
  /** ID do usuário que realizou a ação */
  userId: string;
  /** Nome do usuário que realizou a ação */
  userName: string;
  /** ID do recurso afetado (cadastro, documento, etc.) */
  resourceId: string;
  /** Tipo do recurso afetado */
  resourceType: string;
  /** Descrição legível da ação */
  description: string;
  /** Metadados adicionais (JSON livre) */
  metadata: Record<string, unknown> | null;
  /** IP de origem */
  ipAddress: string;
  /** Timestamp da ação (ISO 8601) */
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Parâmetros de consulta
// ---------------------------------------------------------------------------

/** Parâmetros padrão para requisições de listagem paginada. */
export interface PaginationParams {
  /** Número da página (1-indexed) */
  page?: number;
  /** Quantidade de itens por página */
  perPage?: number;
  /** Campo para ordenação */
  sortBy?: string;
  /** Direção da ordenação */
  sortOrder?: "asc" | "desc";
  /** Termo de busca textual */
  search?: string;
}
