interface IFieldType {
    id: number
    title: string
    hours: number
    coast: number
    field: IField
}
interface IField {
    id: number
    photo: any
    name: string
    address: string
    phone: string
    time_start: string
    time_end: string
    all_time: boolean
    rating: number
    views: number
    num_phone_see: number
    text: string
    tags: {
        id: number
        icon: string
        name: string
    }[]
}

interface ISelect {
    name: string
    value: string | number
}
