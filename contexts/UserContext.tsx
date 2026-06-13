// =============================================================================
// contexts/UserContext.tsx
// Contexto de autenticação, sessão de usuário e controle de permissões por perfil.
// Gerencia perfis: gestor, assistente_social, agente_financeiro e auditor.
// =============================================================================

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/** Perfil de acesso do usuário no sistema. */
export type UserProfile = "gestor" | "assistente_social" | "agente_financeiro" | "auditor";

/** Dados do usuário logado. */
export interface User {
  id: string;
  name: string;
  email: string;
  profile: UserProfile;
}

interface UserContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

/**
 * Provider que gerencia a sessão e perfil do usuário logado.
 */
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Hook para obter dados do usuário e de autenticação.
 */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

/**
 * Hook utilitário para checagem contextual de permissões de auditoria e operações (RF076).
 */
export function usePermissions() {
  const { user } = useUser();

  /**
   * Verifica se o usuário atual tem permissão para realizar uma ação ou acessar um recurso.
   *
   * @param action - Nome da ação ou recurso (ex: "read", "cadastro_criar", "logs_visualizar")
   */
  const hasPermission = (action: string): boolean => {
    if (!user) return false;

    // Gestor público possui acesso total
    if (user.profile === "gestor") return true;

    switch (user.profile) {
      case "assistente_social":
        return [
          "read",
          "cadastro_visualizar",
          "cadastro_criar",
          "cadastro_editar",
          "trabalho_social",
        ].includes(action);

      case "agente_financeiro":
        return [
          "read",
          "cadastro_visualizar",
          "validacao_documental",
          "contrato_gerar",
          "contrato_assinar",
          "pesquisa_enquadramento",
        ].includes(action);

      case "auditor":
        return [
          "read",
          "cadastro_visualizar",
          "logs_visualizar",
          "relatorios_gerar",
        ].includes(action);

      default:
        return false;
    }
  };

  return { hasPermission };
}
export default UserContext;
