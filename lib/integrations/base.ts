// =============================================================================
// lib/integrations/base.ts
// Definição da interface IntegrationAdapter para bases de dados externas.
// Padroniza a validação, consulta e exportação de dados com CadÚnico, Caixa, etc.
// =============================================================================

/**
 * Resultado padrão de uma operação de validação de dados de integração.
 */
export interface IntegrationValidationResult {
  /** Indica se os dados estão consistentes e válidos na base externa */
  isValid: boolean;
  /** Lista de inconsistências ou erros encontrados */
  errors?: string[];
  /** Código descritivo do resultado (ex: "NIS_ACTIVE", "CPF_DIVERGENT") */
  codeCode?: string;
}

/**
 * Interface genérica para adaptadores de integração externa (Adapter Pattern).
 * Cada base de dados governamental ou externa (ex: CadÚnico, Caixa) deve
 * implementar esta interface.
 *
 * @template TRequest - Tipo do dado enviado para a base externa (ex: CPF ou NIS)
 * @template TResponse - Tipo do dado retornado pela base externa
 */
export interface IntegrationAdapter<TRequest, TResponse> {
  /** Identificador único do adaptador de integração (ex: "cadunico", "caixa") */
  readonly id: string;
  /** Nome amigável do sistema integrado (ex: "Cadastro Único Federal") */
  readonly name: string;

  /**
   * Valida a consistência de um cadastro local contra a base de dados externa.
   *
   * @param data - Dados locais a serem validados.
   */
  validate(data: TRequest): Promise<IntegrationValidationResult>;

  /**
   * Consulta e retorna informações detalhadas a partir de um identificador.
   *
   * @param identifier - CPF, NIS ou outro código de busca.
   */
  fetch(identifier: string): Promise<TResponse>;

  /**
   * Exporta ou transmite dados locais para processamento na base de dados externa.
   *
   * @param data - Dados a serem exportados.
   */
  export(data: TRequest): Promise<{
    success: boolean;
    externalId?: string;
    message?: string;
  }>;
}
