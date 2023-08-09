

interface ColaboradorProps {
    children: any;
    font?: string;
    color?: string;
}

export default function Colaborador(props: ColaboradorProps) {
    return (
        <div
            className={`w-full 
        font-${props.font}
        text-${props.color}`}
        >
            {props.children}
        </div>
    );
}