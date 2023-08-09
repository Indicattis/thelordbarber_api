'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

type props = { }
 
export default function Local(props: props) {
  return (
    <div className="font-poppins w-full h-full flex items-center">

      <Carousel showThumbs={false} autoPlay emulateTouch swipeable infiniteLoop showArrows={false}>
        <Image src="/local/local--4.png" alt="" width={1000} height={100}/>
        <Image src="/local/local--7.png" alt="" width={1000} height={100}/>
        <Image src="/local/local--5.png" alt="" width={1000} height={100}/>
        <Image src="/local/local--8.png" alt="" width={1000} height={100}/>
        <Image src="/local/local--1.png" alt="" width={1000} height={100}/>
        <Image src="/local/local--6.png" alt="" width={1000} height={100}/>
      </Carousel>
    </div>
  );
}
