const randomNum = (min: number, max: number): number => Math.random() * (max - min) + min;

const giveOrTake = (value: number, deviation: number): number => randomNum(value - deviation, value + deviation);

export { randomNum, giveOrTake };