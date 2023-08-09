import Contato from "@/components/content/homepage/Contato";
import Galeria from "@/components/content/homepage/Galeria";
import Intro from "@/components/content/homepage/Intro";
import Menu from "@/components/content/homepage/Menu";
import Slider from "@/components/content/homepage/Slider";
import Local from "@/components/content/homepage/local";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Cortes from "@/data/Cortes";
import Itens from "@/data/Menu";





export default function App() {
    
  return (
    <Main>
        <Header/>
        <Intro/>
        <Container>
            <Case>
                <Local></Local>
            </Case>
            <Case>
                <Menu itens={Itens}></Menu>
            </Case>
        </Container>
        <Container title="Galeria">
            <Galeria cortes={Cortes}></Galeria>
            <Slider cortes={Cortes}></Slider>
        </Container>
        <Container title="Contato">
            <Contato></Contato>
        </Container>
    </Main>
  )
}

interface ContentProps {
    children: any
    title?: string
}

export function Container(props:ContentProps) {
    return (
        <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">
            {props.children}
        </section>
    )
}
export function Main (props: ContentProps) {
    return (
        <main className={`font-senthir relative min-h-[50vh] flex flex-col justify-between`}>
            {props.children}
        </main>
    )
}
export function Case (props: ContentProps) {
    return (
        <div className="w-full max-sm:w-full">
            {props.children}
        </div>
    )
}
export function Grid (props: ContentProps) {
    return (
        <div className="grid grid-cols-4
        max-sm:grid-cols-1
        max-md:grid-cols-2
        max-lg:grid-cols-3">
            {props.children}
        </div>
    )
}