import React from 'react';
import generateBlobPath from '../index';
import { BlobProps } from '../src/types';

const Blob = (props: BlobProps) => {
    const {
        fill = 'black', 
        stroke = 'transparent', 
        style, 
        className,
        width,
        height,
        ...polygonProps
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
            d={generateBlobPath(polygonProps)}
            fill={fill}
            stroke={stroke}
            strokeWidth="3"
          />
        </svg>
      );

}

export default Blob;