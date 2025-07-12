import dayjs from "dayjs";


export const currentDate = () => {
    const today = dayjs();
    const formattedDate =  today.format('DD/MM/YYYY');

    return  formattedDate
}

export const formatDate = (date: string) => {
    const formattedDate =  dayjs(date).format('DD/MM/YYYY');
    return  formattedDate
}