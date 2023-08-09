const animateJourney = {
    start: {
        y: "30px",
        opacity: 0,
    },
    visible: {
        y: "0px",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            damping: 20,
            stiffness: 900,
        }
    },
    end: {
        y: "10px",
        opacity: 0,
        transition: { duration: 0.5 },
    }
}

export default animateJourney