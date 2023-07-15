export const getTimeWithDuration = (time: string, duration: number) => {
    let [minutes, ] = time.split(':').map(Number)
    const sum = minutes + duration
    let res = `${sum}`
    if(sum < 10)
        res = '0' + res
    return res + ':00'
}