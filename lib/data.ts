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
    mae: "MARIA ROSA DO ROSARIO FERREIRA",
    nascimento: "31/05/1971",
    profissao: "Empregado doméstico diarista",
    isPrincipal: false,
    downloaded: false,
    telefones: [
      { numero: "9132574210", tipo: "residencial" },
      { numero: "91989801865", tipo: "celular" },
      { numero: "91987455820", tipo: "celular" },
      { numero: "6133152425", tipo: "NO" },
      { numero: "9132578806", tipo: "Não informado" },
      { numero: "9132984904", tipo: "Não informado" },
    ],
    enderecos: [
      { logradouro: "R UM", numero: "22", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-000" },
      { logradouro: "CJ PARAISO DOS PASSAROS", numero: "", bairro: "VAL DE CAES", cidade: "BELEM", uf: "PA", cep: "66000-001" },
      { logradouro: "R RIO TOCANTINS", numero: "22", bairro: "CJ PARAISO PASSAROS", cidade: "BELEM", uf: "PA", cep: "66000-000" },
      { logradouro: "R AMAZONAS", numero: "22", bairro: "VAL DE CAES", cidade: "BELEM", uf: "PA", cep: "66617-550" },
      { logradouro: "TV RIO TROMBETAS", numero: "22", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-485" },
      { logradouro: "AV PEDRO ALVARES CABRAL", numero: "2201", bairro: "TELEGRAFO SEM FIO", cidade: "BELEM", uf: "PA", cep: "66113-190" },
      { logradouro: "Q QUATRO", numero: "22", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-093" },
    ],
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
    mae: "MARIA ROSA DO ROSARIO FERREIRA",
    nascimento: "07/09/1976",
    profissao: "Cozinhador (conservação de alimentos)",
    isPrincipal: false,
    downloaded: false,
    telefones: [
      { numero: "9132574591", tipo: "residencial" },
      { numero: "9132575172", tipo: "residencial" },
      { numero: "91988532620", tipo: "celular" },
      { numero: "91980292832", tipo: "celular" },
      { numero: "91985150801", tipo: "NO" },
      { numero: "91998189344", tipo: "NO" },
      { numero: "91982683330", tipo: "Não informado" },
      { numero: "91984802616", tipo: "Não informado" },
      { numero: "91988017568", tipo: "Não informado" },
      { numero: "91985276207", tipo: "Não informado" },
      { numero: "91992500683", tipo: "Não informado" },
      { numero: "91984076943", tipo: "celular" },
    ],
    enderecos: [
      { logradouro: "R QUATORZE", numero: "302", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-004" },
      { logradouro: "TV RIO TROMBETAS", numero: "1", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-485" },
      { logradouro: "CJ PROVIDENCIA RUA QUATORZE", numero: "302", bairro: "VAL DE CAES", cidade: "BELEM", uf: "PA", cep: "66000-000" },
      { logradouro: "AV CONTORNO", numero: "", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-046" },
      { logradouro: "R OITO", numero: "342", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-102" },
      { logradouro: "R UM", numero: "21", bairro: "MARACANGALHA", cidade: "BELEM", uf: "PA", cep: "66110-000" },
      { logradouro: "TV BOA VISTA", numero: "31", bairro: "VAL DE CAES", cidade: "BELEM", uf: "PA", cep: "66617-240" },
      { logradouro: "PROVIDENCIA QUADRA 30 RUA 14", numero: "302", bairro: "VAL DE CANS", cidade: "BELEM", uf: "PA", cep: "66110-130" },
    ],
},]