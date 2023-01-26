import { createPolygon, allControlPoints } from './src/math';
import { CreateBlob, Point } from './src/types';
import Blob from './components/Blob';

// eslint-disable-next-line no-extend-native
Number.prototype.toDecimal = function toDecimal(digits: number): number {
    return +this.toFixed(digits);
};

// will generate the path string for the svg path
const generatePathString = (
    points: Array<Point>,
    smoothing: number = 1
): string => {
    const starting = `M ${points[0][0]} ${points[0][1]}`;

    const controls = allControlPoints(points, smoothing);

    return [...points, points[0]].slice(1).reduce((acc, curr, index) => {
        const [x, y] = curr;
        const [[a1, a2], [b1, b2]] = controls[index];
        return `${acc} C ${a1} ${a2}, ${b1} ${b2}, ${x} ${y}`;
    }, starting);
};

// final helper that combines main functions
const generateBlobPath = (
    options: CreateBlob
): string => {
    const { smoothing = 1 } = options;
    const points = createPolygon(options);
    return generatePathString(points, smoothing);
};
  
export { createPolygon, generatePathString };
export default generateBlobPath;
  