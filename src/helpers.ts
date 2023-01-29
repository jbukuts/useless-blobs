const randomNum = (min: number, max: number): number => Math.random() * (max - min) + min;

const giveOrTake = (value: number, deviation: number): number => randomNum(value - deviation, value + deviation);

const clamp = (value: number, min = 0, max = 1): number => Math.max(min, Math.min(value, max));

export { randomNum, giveOrTake, clamp };
