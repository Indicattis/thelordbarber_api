

export interface MenuItemModel{
    id: number
    name: string
    image: string
    icon: string
    desc: string
    link: string
}

const Itens: MenuItemModel[] = [
    {
        id: 1,
        name: "Agendar",
        image: "/home/home--1.jpeg",
        icon: "IconClockPlus",
        desc: "Clique e marque seu horário!",
        link: "/agendamento"

    },
    {
        id: 2,
        name: "instagram",
        image:  "/home/home--3.jpg",
        icon: "IconBrandInstagram",
        desc: "Conheça nosso Instagram!",
        link: "https://www.instagram.com/rayan_barber01/"
    },
    {
        id: 3,
        name: "minha agenda",
        image:  "/home/home--2.jpeg",
        icon: "IconUserCircle",
        desc: "Veja seus horários!",
        link: "/usuario"
    }
]

export default Itens;