// =============================================================================
// app/[programId]/layout.tsx
// Layout dinâmico por programa habitacional.
// Obtém a configuração correspondente ao programId da URL, injeta o
// ProgramProvider e o UserProvider para toda a árvore de componentes.
// =============================================================================

import { notFound } from "next/navigation";
import { getProgramConfigBySlug } from "@/lib/programs";
import { ProgramProvider } from "@/contexts/ProgramContext";
import { UserProvider } from "@/contexts/UserContext";

interface ProgramLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    programId: string;
  }>;
}

/**
 * Layout principal do escopo de cada programa habitacional.
 * Resolve o programId dinamicamente e valida sua existência contra o registro.
 */
export default async function ProgramLayout({ children, params }: ProgramLayoutProps) {
  const { programId } = await params;
  
  // Resolve a configuração do programa com base no slug da URL
  const config = getProgramConfigBySlug(programId);

  // Se o programa não existir ou não estiver registrado, retorna 404
  if (!config) {
    notFound();
  }

  return (
    <ProgramProvider config={config}>
      <UserProvider>
        {/*
          Estrutura principal da tela do programa.
          O theme do programa (primaryColor, sidebarColor) pode ser injetado
          ou aplicado dinamicamente usando inline styles ou variáveis CSS.
        */}
        <div 
          className="min-h-screen flex flex-col"
          style={{
            // Disponibiliza as cores do programa como variáveis locais
            "--program-primary": config.theme.primaryColor,
            "--program-accent": config.theme.accentColor,
            "--program-sidebar": config.theme.sidebarColor,
          } as React.CSSProperties}
        >
          {children}
        </div>
      </UserProvider>
    </ProgramProvider>
  );
}
