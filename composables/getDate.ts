export const getDateFromDateTime = (date: string) => {
    if(!date) return ''
    const [day, month] = date.split('.').map(Number)
    return `${day} ${getMontes?.[month-1]}`
}