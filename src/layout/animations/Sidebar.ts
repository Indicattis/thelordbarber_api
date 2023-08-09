const animateSidebar = {
    start: {
        x: "800px",
        opacity: 0.1,
    },
    visible: {
        x: "0px",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            damping: 50,
            stiffness: 1900,
        }
    },
    end: {
        x: "800px",
        opacity: 0.5,
    }
}

export default animateSidebar