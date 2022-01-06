export type ReportObjectType = {
    uuid: string,
    publishedAt: string | Date,
    createdAt: string | Date,
    body: {
        bankBIC: string[],
        bankName: string,
        reportScore?: number,
        type?: {primary: string, 
            extended: string, 
            intermediate: string},
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