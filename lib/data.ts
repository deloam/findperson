export type Telefone = {
  id?: number; // Optional, for existing records
  numero: string;
  tipo?: string;
};

export type Endereco = {
  id?: number; // Optional, for existing records
  logradouro: string;
  numero?: string;
  bairro?: string;
  cidade: string;
  uf: string;
  cep?: string;
};

export type Person = {
  id?: number; // Add id for database records
  nome: string;
  cpf: string;
  parentesco: string;
  mae?: string;
  nascimento?: string;
  profissao?: string;
  isPrincipal: boolean;
  downloaded: boolean;
  telefones?: Telefone[]; // New field
  enderecos?: Endereco[]; // New field
};

export const clientData: Person[] = [
  {
    nome: "RAIMUNDA HELENA DO ROSARIO FERREIRA",
    cpf: "281.038.742-72",
    parentesco: "Principal",
    mae: "MARIA ROSA DO ROSARIO FERREIRA",
    nascimento: "20/07/1968",
    profissao: "Auxiliar nos serviços de alimentação",
    isPrincipal: true,
    downloaded: false,
    telefones: [
      { numero: "99999-9999", tipo: "celular" },
      { numero: "8888-8888", tipo: "residencial" },
    ],
    enderecos: [
      {
        logradouro: "MARCILIO DIAS",
        numero: "995",
        bairro: "JULIAO RAMOS",
        cidade: "MACAPA",
        uf: "AP",
        cep: "68908-200",
      },
    ],
  },
  {
    nome: "MARIA ROSA DO ROSARIO FERREIRA",
    cpf: "844.127.982-91",
    parentesco: "Mãe",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "RENATA FERREIRA MONTEIRO",
    cpf: "553.326.172-91",
    parentesco: "Sobrinha",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "GISELLY FERREIRA DA SILVA",
    cpf: "003.824.202-84",
    parentesco: "Sobrinha",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "ROSILENE DO ROSARIO FERREIRA",
    cpf: "395.050.492-34",
    parentesco: "Irmã",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "ROSA MARIA FERREIRA DA SILVA",
    cpf: "672.330.582-53",
    parentesco: "Irmã",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "RAIMUNDO NONATO DO ROSARIO FERREIRA",
    cpf: "227.983.662-91",
    parentesco: "Irmão",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "RUAN PATRICK DO ROSARIO FERREIRA",
    cpf: "046.418.432-01",
    parentesco: "Sobrinho",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "ROSINEIDE ROSARIO FERREIRA",
    cpf: "721.042.602-72",
    parentesco: "Irmã",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "LUIS PAULO DO ROSARIO FERREIRA",
    cpf: "967.303.822-87",
    parentesco: "Irmão",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "RAIMUNDO SERGIO DO ROSARIO FERREIRA",
    cpf: "288.627.082-20",
    parentesco: "Irmão",
    isPrincipal: false,
    downloaded: false,
  },
  {
    nome: "ANA PATRICIA DO ROSARIO FERREIRA",
    cpf: "875.738.902-06",
    parentesco: "Irmã",
    isPrincipal: false,
    downloaded: false,
  },
];