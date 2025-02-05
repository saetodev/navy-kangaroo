export function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function assert(condition: boolean, message: string) {
    if (condition) {
        return
    }
                            
    console.error(message)
    throw new Error(message)
}
