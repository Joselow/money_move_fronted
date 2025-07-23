import dayjs from "dayjs";


export const currentDate = () => {
    const today = dayjs();
    // const formattedDate =  today.format('DD/MM/YYYY');

    return  today.format('YYYY-MM-DD')
}

export const formatDate = (date: string) => {
    const formattedDate =  dayjs(date).format('DD/MM/YYYY');
    return  formattedDate
}

// fin de mes
export const endOfMonth = () => {
    const today = dayjs();
    return today.endOf('month').format('YYYY-MM-DD')
}