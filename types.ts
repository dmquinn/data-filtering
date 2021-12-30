export type DataType = {
    uuid?: string,
    publishedAt: string,
    createdAt: string,
    body: {
        bankBIC: string[],
        bankName: string,
        reportScore?: number,
        type?: string,
    },
    map:any,
    }

