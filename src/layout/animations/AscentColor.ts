const animateAscent = {
    start: {
        color: "#000000",
        opacity: 0.5,
    },
    visible: {
        color: "#db9b33",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            damping: 20,
            stiffness: 900,
        }
    },
    end: {
        color: "#000000",
        opacity: 0.5,
    }
}

export default animateAscent