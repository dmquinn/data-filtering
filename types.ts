export type ReportObjectType = {
    uuid: string,
    publishedAt: string,
    createdAt: string,
    body: {
        bankBIC: string[],
        bankName: string,
        reportScore?: number,
        type?: string,
    },
    }

export type DocType = {
    primary: boolean,
    extended: boolean,
    intermediate: boolean,
}
export type PublishedType= {
    yes?: boolean,
    no?: boolean,
}