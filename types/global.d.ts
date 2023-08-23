interface IFieldType {
    id: number
    title: string
    hours: number
    coast: number
    field: IField
    lat: number
    lng: number
    field_id?: number
    address?: string
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

interface IUserInfo {
    id: number
    password: string
    last_login: string
    is_superuser: boolean
    first_name: string
    last_name: string
    email: string
    is_staff: boolean
    is_active: boolean
    date_joined: string
    is_owner: boolean
    name: string
    phone: string
    photo: string
    cashback: number
    money: number
    date_birthday: string
}
