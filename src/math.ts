import defaultOptions from './defaults';
import { clamp, giveOrTake, randomNum } from './helpers';
import { CreatePolygon, Point } from './types';

const UNIT_CIRCLE = 2 * Math.PI;

/**
 * Calculates a list of random angles that sum to 2 PI.
 * @param {number} steps - Number of angles to return.
 * @param {number} irr - Affects deviation between angles from their average.
 */
const randomAngleSteps = (steps: number, irr: number): number[] => {
  const standardAngle = UNIT_CIRCLE / steps;

  let cumulativeSum = 0;
  const angles = [...new Array(steps)].map(() => {
    const angle = giveOrTake(standardAngle, irr);
    cumulativeSum += angle;
    return angle;
  });

  // normalize to fit in the unit circle
  cumulativeSum /= UNIT_CIRCLE;
  return angles.map((angle) => angle / cumulativeSum);
};

/**
 * Calculates point of intersection for a line drawn from the center of shape.
 * Point returned is always in the first quandrant.
 * @param {number} angle - Angle which line is caster from center.
 * @param {number} heightRadius - The vertical radius.
 * @param {number} widthRadius - The horizontal radius.
 * @param {string} type - What bounding shape will be (ellipsis or rectangle).
 */
const calculateIntersectionPoint = (angle: number, heightRadius: number, widthRadius: number, type: string): Point => {
  let x;
  let y;
  const tan = Math.abs(Math.tan(angle));

  if (type === 'rectangle') {
    x = widthRadius;
    y = tan * x;
    if (y > heightRadius) {
      y = heightRadius;
      x = y / tan;
    }
  } else {
    const ab = widthRadius * heightRadius;
    const bottom = Math.sqrt(heightRadius ** 2 + widthRadius ** 2 * tan ** 2);
    x = ab / bottom;
    y = (ab * tan) / bottom;
  }

  return [x, y];
};

/**
 * Creates an array of points [x,y] for a random polygon.
 * @param {CreatePolygon} options - Parameters to create random polygon.
 * @param {number} options.verts - Number of vertices results array with contain.
 * @param {number} options.width - Width in pixels the polygon will conform to.
 * @param {number} options.height - Height in pixel the polygon will conform to.
 * @param {number} options.irregularity - Affects deviation between angles from their average.
 * @param {number} options.spikiness - Percentage each vertices will deviate from the edge of the bounding shape.
 * @param {string} options.boundingShape - The shape the resulting vertices will fit inside.
 */
const createPolygon = (options: CreatePolygon = {}): Point[] => {
  const { verts, width, height, irregularity, spikiness, boundingShape } = {
    ...defaultOptions,
    ...options
  };

  if (verts < 3 || height <= 0 || width <= 0) return [];

  const [wRadius, hRadius] = [width / 2, height / 2];
  const calcIrr = clamp(irregularity) * (UNIT_CIRCLE / verts);
  const angleSteps = randomAngleSteps(verts, calcIrr);

  let angle = randomNum(0, UNIT_CIRCLE);
  return angleSteps.map((currAngle) => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const [x, y] = calculateIntersectionPoint(angle, hRadius, wRadius, boundingShape);

    // distance formula
    const maxRadius = Math.sqrt(x ** 2 + y ** 2);
    const spikeDelta = clamp(spikiness) * maxRadius;
    const radius = Math.min(maxRadius, giveOrTake(maxRadius, spikeDelta));

    const point: Point = [(wRadius + radius * cos).toDecimal(2), (hRadius + radius * sin).toDecimal(2)];
    angle += currAngle;
    return point;
  });
};

/**
 * Uses bezier interpolation to calculate the controls points of a cubic bezier curve.
 * @param {Point} p0 - The point before our line segment.
 * @param {Point} p1 - First point of line segment.
 * @param {Point} p2 - Second point of line segment.
 * @param {Point} p3 - The point after our line segment.
 * @param {number} smoothVal - Coefficient by which control points should align.
 */
const calculateControl = (p0: Point, p1: Point, p2: Point, p3: Point, smoothVal: number): [Point, Point] => {
  smoothVal = clamp(smoothVal, 0, 1);

  const [x0, y0] = p0;
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = p3;

  const xc1 = (x0 + x1) / 2.0;
  const yc1 = (y0 + y1) / 2.0;
  const xc2 = (x1 + x2) / 2.0;
  const yc2 = (y1 + y2) / 2.0;
  const xc3 = (x2 + x3) / 2.0;
  const yc3 = (y2 + y3) / 2.0;

  const len1 = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
  const len2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  const len3 = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));

  const k1 = len1 / (len1 + len2);
  const k2 = len2 / (len2 + len3);

  const xm1 = xc1 + (xc2 - xc1) * k1;
  const ym1 = yc1 + (yc2 - yc1) * k1;

  const xm2 = xc2 + (xc3 - xc2) * k2;
  const ym2 = yc2 + (yc3 - yc2) * k2;

  const ctrl1X = (xm1 + (xc2 - xm1) * smoothVal + x1 - xm1).toDecimal(2);
  const ctrl1Y = (ym1 + (yc2 - ym1) * smoothVal + y1 - ym1).toDecimal(2);

  const ctrl2X = (xm2 + (xc2 - xm2) * smoothVal + x2 - xm2).toDecimal(2);
  const ctrl2Y = (ym2 + (yc2 - ym2) * smoothVal + y2 - ym2).toDecimal(2);

  return [
    [ctrl1X, ctrl1Y],
    [ctrl2X, ctrl2Y]
  ];
};

/**
 * Helper that returns all cubic bezier curves controls points for a given polygon.
 * @param {Point[]} polygonPoints - Points [x,y] that make up a polygon.
 * @param {number} smoothing - Coefficient by which control points should align.
 */
const allControlPoints = (polygonPoints: Point[], smoothing: number) => {
  const loopedPoints = [
    polygonPoints[polygonPoints.length - 1],
    ...polygonPoints,
    polygonPoints[0],
    polygonPoints[1]
  ] as Point[];

  return loopedPoints.slice(1, -2).map((point, index) => {
    const before = loopedPoints[index];
    const a = point;
    const b = loopedPoints[index + 2];
    const after = loopedPoints[index + 3];
    const controlPoints = calculateControl(before, a, b, after, smoothing);
    return controlPoints;
  });
};

export { createPolygon, allControlPoints };
