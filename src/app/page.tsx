import Contato from "@/components/content/homepage/Contato";
import Galeria from "@/components/content/homepage/Galeria";
import Intro from "@/components/content/homepage/Intro";
import Menu from "@/components/content/homepage/Menu";
import Slider from "@/components/content/homepage/Slider";
import Local from "@/components/content/homepage/local";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import PubliSlider from "@/components/publi/Slider";
import Cortes from "@/data/Cortes";
import Itens from "@/data/Menu";
import React, { ReactNode } from 'react';




export default function App() {
    
  return (
    <main>
        <Header></Header>
        
        <Intro/>
            <div className='py-8'>
                <iframe scrolling='no' frameBorder='0' width='320' height='50' src="https://melbanusd.top/I?tag=d_2732171m_33637c_&site=2732171&ad=33637" ></iframe>
            </div>
        <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">
            <div className="w-1/2 max-md:w-full">
                <Local></Local>
            </div>
            <div className="w-1/2 max-md:w-full">
                <Menu itens={Itens}></Menu>
            </div>
        </section>
        <div className="flex w-full max-md:w-[380px] object-contain">
        <iframe scrolling='no' frameBorder='0' width='320' height='50' src="https://melbanusd.top/I?tag=d_2732171m_66983c_&site=2732171&ad=66983" ></iframe>
        </div>
        <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">
            <Galeria cortes={Cortes}></Galeria>
            <Slider cortes={Cortes}></Slider>
        </section>
        <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">
            <Contato></Contato>
        </section>
        <PubliSlider></PubliSlider>
        <Footer></Footer>
    </main>
  )
}
