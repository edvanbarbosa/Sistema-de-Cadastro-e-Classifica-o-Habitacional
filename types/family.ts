// =============================================================================
// types/family.ts
// Tipagem para membros da família, cadastro familiar completo,
// composição social, renda e documentos.
// =============================================================================

// ---------------------------------------------------------------------------
// Enums auxiliares
// ---------------------------------------------------------------------------

/** Grau de parentesco com o responsável familiar. */
export type Parentesco =
  | "responsavel"
  | "conjuge"
  | "filho"
  | "filha"
  | "pai"
  | "mae"
  | "irmao"
  | "irma"
  | "avo"
  | "neto"
  | "neta"
  | "outro";

/** Gênero do membro da família. */
export type Genero = "masculino" | "feminino" | "outro" | "nao_informado";

/** Estado civil do membro. */
export type EstadoCivil =
  | "solteiro"
  | "casado"
  | "uniao_estavel"
  | "divorciado"
  | "viuvo"
  | "separado";

/** Situação de deficiência (PcD). */
export type TipoDeficiencia =
  | "nenhuma"
  | "fisica"
  | "auditiva"
  | "visual"
  | "intelectual"
  | "multipla";

/** Situação de escolaridade. */
export type Escolaridade =
  | "sem_escolaridade"
  | "fundamental_incompleto"
  | "fundamental_completo"
  | "medio_incompleto"
  | "medio_completo"
  | "superior_incompleto"
  | "superior_completo"
  | "pos_graduacao";

// ---------------------------------------------------------------------------
// Membro da Família
// ---------------------------------------------------------------------------

/** Dados de um membro individual da composição familiar. */
export interface FamilyMember {
  /** ID interno do membro (gerado pelo backend) */
  id: string;
  /** Nome completo */
  nomeCompleto: string;
  /** CPF (apenas dígitos, 11 caracteres) */
  cpf: string;
  /** Data de nascimento (ISO 8601) */
  dataNascimento: string;
  /** Gênero */
  genero: Genero;
  /** Grau de parentesco com o responsável */
  parentesco: Parentesco;
  /** Estado civil */
  estadoCivil: EstadoCivil;
  /** Escolaridade */
  escolaridade: Escolaridade;
  /** Tipo de deficiência, se aplicável */
  deficiencia: TipoDeficiencia;
  /** Renda individual mensal em centavos (BRL) */
  rendaMensal: number;
  /** NIS (Número de Identificação Social) — pode ser nulo */
  nis: string | null;
  /** Indica se é o responsável pelo cadastro */
  isResponsavel: boolean;
}

// ---------------------------------------------------------------------------
// Endereço
// ---------------------------------------------------------------------------

/** Endereço residencial da família. */
export interface Endereco {
  /** Logradouro (rua, avenida, etc.) */
  logradouro: string;
  /** Número */
  numero: string;
  /** Complemento (apto, bloco, etc.) */
  complemento: string;
  /** Bairro */
  bairro: string;
  /** Cidade */
  cidade: string;
  /** UF (2 caracteres) */
  uf: string;
  /** CEP (apenas dígitos, 8 caracteres) */
  cep: string;
}

// ---------------------------------------------------------------------------
// Dados Socioeconômicos
// ---------------------------------------------------------------------------

/** Situação de moradia atual da família. */
export type SituacaoMoradia =
  | "aluguel"
  | "cedido"
  | "proprio"
  | "irregular"
  | "coabitacao"
  | "situacao_rua"
  | "outro";

/** Dados socioeconômicos da família. */
export interface DadosSocioeconomicos {
  /** Renda familiar total mensal em centavos (BRL) */
  rendaFamiliarTotal: number;
  /** Quantidade de membros da família */
  quantidadeMembros: number;
  /** Renda per capita mensal em centavos (calculada pelo backend) */
  rendaPerCapita: number;
  /** Situação de moradia atual */
  situacaoMoradia: SituacaoMoradia;
  /** Valor do aluguel atual em centavos (se aplicável) */
  valorAluguel: number | null;
  /** Tempo de residência no município (em meses) */
  tempoResidenciaMunicipio: number;
  /** Família é beneficiária do Bolsa Família / Auxílio Brasil */
  isBeneficiarioProgramaSocial: boolean;
  /** Família está inscrita no CadÚnico */
  isInscritoCadUnico: boolean;
  /** Família já foi beneficiada com programa habitacional anteriormente */
  isBeneficiadoAnterior: boolean;
}

// ---------------------------------------------------------------------------
// Documentos Anexados
// ---------------------------------------------------------------------------

/** Status de um documento enviado. */
export type DocumentStatus = "pendente" | "enviado" | "aprovado" | "rejeitado";

/** Documento anexado ao cadastro. */
export interface DocumentoAnexo {
  /** ID do documento */
  id: string;
  /** Tipo do documento (ex: "rg", "cpf", "comprovante_renda", "comprovante_residencia") */
  tipo: string;
  /** Nome do arquivo original */
  nomeArquivo: string;
  /** URL para download/visualização */
  url: string;
  /** Status de análise do documento */
  status: DocumentStatus;
  /** Data de envio (ISO 8601) */
  dataEnvio: string;
  /** Observação do analista (em caso de rejeição) */
  observacao: string | null;
}

// ---------------------------------------------------------------------------
// Integração CadÚnico
// ---------------------------------------------------------------------------

/** Status da integração com CadÚnico. */
export type CadUnicoStatus =
  | "nao_consultado"
  | "consultando"
  | "localizado"
  | "nao_localizado"
  | "divergente"
  | "erro";

/** Resultado da consulta CadÚnico para a família. */
export interface IntegracaoCadUnico {
  /** Status da consulta */
  status: CadUnicoStatus;
  /** Código familiar no CadÚnico (se localizado) */
  codigoFamiliar: string | null;
  /** Data da última consulta (ISO 8601) */
  dataUltimaConsulta: string | null;
  /** Mensagem descritiva do resultado */
  mensagem: string | null;
}

// ---------------------------------------------------------------------------
// Consentimento LGPD
// ---------------------------------------------------------------------------

/** Registro de consentimento LGPD do responsável familiar. */
export interface ConsentimentoLGPD {
  /** Se o consentimento foi dado */
  aceito: boolean;
  /** Data/hora do aceite (ISO 8601) */
  dataAceite: string | null;
  /** IP de origem no momento do aceite */
  ipOrigem: string | null;
  /** Versão do termo aceito */
  versaoTermo: string | null;
}

// ---------------------------------------------------------------------------
// Cadastro Familiar Completo
// ---------------------------------------------------------------------------

/** Status geral do cadastro familiar. */
export type RegistrationStatus =
  | "rascunho"
  | "enviado"
  | "em_analise"
  | "pendente_documentos"
  | "aprovado"
  | "reprovado"
  | "cancelado";

/**
 * Cadastro familiar completo — agrega todos os dados de uma inscrição.
 * Este é o tipo principal usado nas telas de cadastro e detalhamento.
 */
export interface FamilyRegistration {
  /** ID único do cadastro (gerado pelo backend) */
  id: string;
  /** ID do programa habitacional ao qual o cadastro pertence */
  programId: string;
  /** Protocolo de inscrição visível ao cidadão */
  protocolo: string;
  /** Status do cadastro */
  status: RegistrationStatus;
  /** Data de criação (ISO 8601) */
  dataCriacao: string;
  /** Data da última atualização (ISO 8601) */
  dataAtualizacao: string;

  /** Responsável familiar (membro principal) */
  responsavel: FamilyMember;
  /** Demais membros da composição familiar */
  membros: FamilyMember[];

  /** Endereço residencial */
  endereco: Endereco;
  /** Dados socioeconômicos consolidados */
  dadosSocioeconomicos: DadosSocioeconomicos;
  /** Documentos anexados */
  documentos: DocumentoAnexo[];

  /** Status de integração com CadÚnico */
  integracaoCadUnico: IntegracaoCadUnico;
  /** Consentimento LGPD */
  consentimento: ConsentimentoLGPD;
}
