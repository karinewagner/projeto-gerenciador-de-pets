import type { IPetContent } from "./pets";

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

export interface ITutorPayload {
    nome: string;
    email?: string;
    telefone?: string;
}

export interface GetTutorsParams {
    nome?: string;
    page: number;
    size: number;
}

export interface ITutorDetailsResponse extends ITutorContent {
    pets: IPetContent[];
}