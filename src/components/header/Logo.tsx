import Image from "next/image";

export default function Logo() {
  return (
    <div className="
    absolute left-3 
    p-2 
    cursor-pointer 
    h-full 
    flex items-center
    text-zinc-300
    "
    onClick={() => window.location.href = '/'}>
        <Image priority className="max-md:w-20" src="/img/logoNew.png" alt="" width={150} height={150}/>
    </div>
  )
}