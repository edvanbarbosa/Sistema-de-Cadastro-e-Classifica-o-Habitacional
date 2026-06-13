// =============================================================================
// lib/programs/index.ts
// Registro central e mapeamento dos programas habitacionais ativos no SIGAH.
// Mapeia os slugs e ids para suas respectivas configurações dinâmicas de UI e negócio.
// =============================================================================

import { ProgramId } from "@/types/program";
import { ProgramConfig } from "./types";
import { mcmvFarConfig } from "./mcmv-far";

/**
 * Mapa de registro de configurações de programas ativos.
 * Mapeia o id do programa para a sua instância de configuração.
 */
export const programsRegistry: Record<string, ProgramConfig> = {
  "mcmv-far": mcmvFarConfig,
};

/**
 * Lista de todos os programas habitacionais configurados no sistema.
 */
export const activePrograms: ProgramConfig[] = Object.values(programsRegistry);

/**
 * Obtém a configuração de um programa pelo seu ID único.
 *
 * @param id - ID do programa (ex: "mcmv-far")
 * @returns O objeto de configuração ou undefined caso não seja localizado.
 */
export function getProgramConfigById(id: string): ProgramConfig | undefined {
  return programsRegistry[id];
}

/**
 * Obtém a configuração de um programa pelo seu slug de URL.
 *
 * @param slug - Slug utilizado nas URLs (ex: "mcmv-far")
 * @returns O objeto de configuração ou undefined caso não seja localizado.
 */
export function getProgramConfigBySlug(slug: string): ProgramConfig | undefined {
  return activePrograms.find((program) => program.slug === slug);
}

export * from "./types";
export * from "./mcmv-far";
