import defaultOptions from './src/defaults';
import { allControlPoints, createPolygon } from './src/math';
import { CreateBlob, CreatePolygon, Point } from './src/types';

Number.prototype.toDecimal = function toDecimal(digits: number): number {
  return +this.toFixed(digits);
};

/**
 * Create path string for SVG of random blob.
 * @param {Point[]} points - Points [x,y] that make up a polygon.
 * @param {number} smoothing - Value [0,1] that affects how smoothed curved between points are.
 */
const generatePathString = (points: Point[], smoothing = 1): string => {
  if (points.length < 3) return '';

  const starting = `M ${points[0][0]} ${points[0][1]}`;
  const controls = allControlPoints(points, smoothing);
  return [...points, points[0]].slice(1).reduce((acc, curr, index) => {
    const [x, y] = curr;
    const [[a1, a2], [b1, b2]] = controls[index];
    return `${acc} C ${a1} ${a2}, ${b1} ${b2}, ${x} ${y}`;
  }, starting);
};

/**
 * Wrapper that accepts all options and returns path string for SVG of random blob.
 * @param {CreateBlob} options - Parameters for random blob.
 * @param {number} options.verts - Number of vertices results array with contain.
 * @param {number} options.width - Width in pixels the polygon will conform to.
 * @param {number} options.height - Height in pixel the polygon will conform to.
 * @param {number} options.irregularity - Affects deviation between angles from their average.
 * @param {number} options.spikiness - Percentage each vertices will deviate from the edge of the bounding shape.
 * @param {string} options.boundingShape - The shape the resulting vertices will fit inside.
 * @param {number} options.smoothing - Value [0,1] that affects how smoothed curved between points are.
 */
const generateBlobPath = (options: CreateBlob = {}): string => {
  const { smoothing, ...rest } = { ...defaultOptions, ...options };
  const points = createPolygon(rest as CreatePolygon);
  return generatePathString(points, smoothing);
};

export { createPolygon, generatePathString };
export default generateBlobPath;
