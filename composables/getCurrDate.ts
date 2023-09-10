export const getCurrDate = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.toLocaleDateString()}`
}
