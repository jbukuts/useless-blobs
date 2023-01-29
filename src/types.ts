declare global {
  export interface Number {
    // eslint-disable-next-line no-unused-vars
    toDecimal(digits: number): number;
  }
}

export type Point = [number, number];

export interface CreatePolygon {
  verts?: number;
  width?: number;
  height?: number;
  irregularity?: number;
  spikiness?: number;
  boundingShape?: 'rectangle' | 'ellipsis';
}

export interface CreateBlob extends CreatePolygon {
  smoothing?: number;
}

export interface BlobProps extends CreateBlob {
  style?: object;
  fill?: string;
  stroke?: string;
  className?: string;
}
