// =============================================================================
// lib/scoring/engine.ts
// Definição da interface ScoringStrategy para o motor de classificação.
// Representa o contrato das regras de priorização e pontuação social do SIGAH.
// =============================================================================

import { FamilyRegistration } from "@/types/family";

/**
 * Detalhe de pontuação de um critério de classificação individual.
 */
export interface ScoreDetail {
  /** Nome curto do critério (ex: "Mulher Chefe de Família") */
  criterionName: string;
  /** Pontuação atribuída para este critério */
  score: number;
  /** Descrição detalhada do critério ou do enquadramento */
  description: string;
  /** Indica se a família atendeu ao critério */
  matched: boolean;
}

/**
 * Resultado completo do processamento de pontuação de uma família.
 */
export interface ScoringResult {
  /** Pontuação total acumulada */
  totalScore: number;
  /** Detalhamento por critério avaliado */
  details: ScoreDetail[];
  /** Timestamp do processamento (ISO 8601) */
  calculatedAt: string;
}

/**
 * Interface de Estratégia de Classificação.
 * Segue o Strategy Pattern para permitir diferentes regras de pontuação
 * (ex: acúmulo de critérios, pontuação ponderada ou sorteio puro).
 */
export interface ScoringStrategy {
  /** Identificador único da estratégia (ex: "accumulative", "weighted") */
  readonly id: string;
  /** Nome amigável da estratégia */
  readonly name: string;
  
  /**
   * Calcula a pontuação e gera os detalhes de classificação para um cadastro.
   *
   * @param registration - O cadastro familiar a ser avaliado.
   * @returns O resultado consolidado da pontuação.
   */
  calculate(registration: FamilyRegistration): ScoringResult;
}
