import React from 'react';
import generateBlobPath from '../index';
import { BlobProps } from '../src/types';
import defaultValues from '../src/defaults';

const Blob = (props: BlobProps) => {
    const {
        fill, 
        stroke, 
        style, 
        className,
        verts,
        width,
        height,
        irregularity,
        spikiness,
        boundingShape,
        smoothing
    } = props;

    return (
        <svg
          style={{
            ...style
          }}
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          overflow="visible"
        >
          <path
            style={{ transition: ".2s" }}
            d={generateBlobPath({
              verts,
              width: width,
              height: height,
              irregularity,
              spikiness,
              boundingShape,
              smoothing
            })}
            fill={fill}
            stroke={stroke}
            strokeWidth="3"
          />
        </svg>
      );
}

Blob.defaultProps = {
  fill: "black",
  stroke: "transparent",
  style: undefined,
  className: undefined,
  ...defaultValues,
  smoothing: 1
}

export default Blob;