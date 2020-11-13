// Place to put shareable functions that may be useful across the app

// Serialize data from a form into Json
const serialize = (target) => {
    const data = new FormData(target);
    const object = {};
    data.forEach(function (value, key) {
        object[key] = value;
    });
    return object;
}

export { serialize };
