import generateBlobPath, { createPolygon, generatePathString } from '../index';
import defaults from '../src/defaults';
import { CreateBlob, CreatePolygon, Point } from '../src/types';

const { verts, width, height } = defaults;
const testBounds = (x: number, y: number, width: number, height: number) =>
  x >= 0 && x <= width && y >= 0 && y <= height;
const CUSTOM_OPTIONS = {
  verts: 50,
  width: 800,
  height: 800,
  boundingShape: 'rectangle'
};

describe('index - ', () => {
  describe('createPolygon', () => {
    it('can create a random polygon with no options supplied', () => {
      const points = createPolygon();
      expect(points.length).toBe(verts);
      expect(points.every(([x, y]: Point) => testBounds(x, y, width, height))).toBe(true);
    });

    it('can create a random polygon with options supplied', () => {
      const points = createPolygon(CUSTOM_OPTIONS as CreatePolygon);
      expect(points.length).toBe(CUSTOM_OPTIONS.verts);
      expect(points.every(([x, y]: Point) => testBounds(x, y, CUSTOM_OPTIONS.width, CUSTOM_OPTIONS.height))).toBe(true);
    });

    it('will return empty array for bad values', () => {
      let points = createPolygon({ width: -100 });
      expect(points.length).toBe(0);

      points = createPolygon({ height: -100 });
      expect(points.length).toBe(0);

      points = createPolygon({ verts: 2 });
      expect(points.length).toBe(0);
    });
  });

  describe('generatePathString', () => {
    it('can generate path string without smoothing option', () => {
      const points = createPolygon();
      const path = generatePathString(points);
      expect(path).not.toBe('');
    });

    it('can generate path string with smoothing option', () => {
      const points = createPolygon();
      const path = generatePathString(points, 1);
      expect(path).not.toBe('');
    });

    it('will return empty string if not enough points supplied', () => {
      const path = generatePathString(
        [
          [10, 10],
          [20, 20]
        ],
        1
      );
      expect(path).toBe('');
    });
  });

  describe('generateBlobPath', () => {
    it('can generate path string without option', () => {
      const path = generateBlobPath();
      expect(path).not.toBe('');
    });

    it('can generate path string with option', () => {
      const path = generateBlobPath({ ...CUSTOM_OPTIONS, smoothing: 0.5 } as CreateBlob);
      expect(path).not.toBe('');
    });

    it('can still return path string for bad smoothing', () => {
      const path = generateBlobPath({ ...CUSTOM_OPTIONS, smoothing: 1.5 } as CreateBlob);
      expect(path).not.toBe('');
    });
  });
});
