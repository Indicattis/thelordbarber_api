interface ExpandProps {
    active: boolean,
    children:  any
}

export default function ExpandDown(props: ExpandProps) {
    if (props.active) {
        return props.children
    }
    else {
        return null
    }
}