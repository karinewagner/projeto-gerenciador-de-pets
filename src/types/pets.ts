import type { ITutorContent } from "./tutors";

export interface IPetResponse {
    page: number,
    size: number,
    total: number,
    pageCount: number,
    content: IPetContent[];
}

export interface IPetContent {
    id: number,
    nome: string,
    raca: string,
    idade: number,
    foto?: IPetFoto
}

export interface IPetFoto {
    id: number,
    nome: string,
    contentType: string,
    url: string
}

export interface IPetPayload {
    nome: string;
    raca: string;
    idade: number;
}

export interface GetPetsParams {
    nome?: string;
    raca?: string;
    page: number;
    size: number;
}

export interface IPetDetailsResponse extends IPetContent {
    tutores: ITutorContent[];
}
