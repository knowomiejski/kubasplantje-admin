const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key]; // Inferred type is T[K]
}

const  setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
    obj[key] = value;
}

export default {getProperty, setProperty}