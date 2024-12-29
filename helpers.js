function getRandomElementFromSet(set) {
    const length = set.size;
    const randomIndex = Math.floor(Math.random() * length);

    let i = 0;
    for (let element of set) {
        if (i == randomIndex) {
            return element;
        }
        i++;
    }
}

export {getRandomElementFromSet};