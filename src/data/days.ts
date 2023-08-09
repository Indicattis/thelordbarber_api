
interface DaysModel {
    id: number,
    weekPoint: string,
    timeInit: string,
    timeEnd: string
}

const days: DaysModel[] = [
    {
        id: 1,
        weekPoint: 'segunda-feira',
        timeInit: '13:30',
        timeEnd: '20:00'
    },
    {
        id: 2,
        weekPoint: 'terça-feira',
        timeInit: '09:00–12:00',
        timeEnd: '13:30–20:00'
    },
    {
        id: 3,
        weekPoint: 'quarta-feira',
        timeInit: '09:00–12:00',
        timeEnd: '13:30–20:00'
    },
    {
        id: 4,
        weekPoint: 'quinta-feira',
        timeInit: '09:00–12:00',
        timeEnd: '13:30–20:00'
    },
    {
        id: 5,
        weekPoint: 'sexta-feira',
        timeInit: '09:00–12:00',
        timeEnd: '13:30–20:00'
    },
    {
        id: 6,
        weekPoint: 'sábado',
        timeInit: '09:30–12:00',
        timeEnd: '13:30–20:00'
    },
    {
        id: 7,
        weekPoint: 'domingo',
        timeInit: '',
        timeEnd: ''
    },
]