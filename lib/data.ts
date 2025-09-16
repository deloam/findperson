export type Person = {
  nome: string;
  cpf: string;
  parentesco: string;
  mae?: string;
  nascimento?: string;
  profissao?: string;
  isPrincipal: boolean;
  downloaded: boolean; // Novo campo
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
