export interface IPetResponsePage {
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
    foto: IPetFoto
}

export interface IPetFoto {
    id: number,
    nome: string,
    contentType: string,
    url: string
}