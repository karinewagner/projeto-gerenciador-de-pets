export interface ITutorsResponse {
    page: number,
    size: number,
    total: number,
    pageCount: number,
    content: ITutorContent[];
}

export interface ITutorContent {
    id: number,
    nome: string,
    email: string,
    telefone: string,
    endereco: string,
    cpf: number,
    foto?: ITutorFoto
}

export interface ITutorFoto {
    id: number,
    nome: string,
    contentType: string,
    url: string
}