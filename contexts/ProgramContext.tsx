// =============================================================================
// contexts/ProgramContext.tsx
// Contexto para disponibilizar a configuração do programa habitacional ativo.
// Permite que componentes leiam a configuração e se adaptem dinamicamente.
// =============================================================================

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ProgramConfig } from "@/lib/programs/types";

interface ProgramContextProps {
  config: ProgramConfig;
}

const ProgramContext = createContext<ProgramContextProps | undefined>(undefined);

interface ProgramProviderProps {
  config: ProgramConfig;
  children: ReactNode;
}

/**
 * Provider que envolve a aplicação/rotas dinâmicas do programa ativo.
 */
export function ProgramProvider({ config, children }: ProgramProviderProps) {
  return (
    <ProgramContext.Provider value={{ config }}>
      {children}
    </ProgramContext.Provider>
  );
}

/**
 * Hook customizado para obter a configuração do programa ativo.
 * Lança um erro caso seja consumido fora de um ProgramProvider.
 */
export function useProgram() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgram must be used within a ProgramProvider");
  }
  return context.config;
}
export default ProgramContext;
