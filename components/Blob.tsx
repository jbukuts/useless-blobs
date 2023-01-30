import React from 'react';
import generateBlobPath from '../index';
import defaultValues from '../src/defaults';
import { BlobProps } from '../src/types';

const Blob = (props: BlobProps) => {
  const { fill, stroke, style, pathStyle, className, width, height, ...rest } = props;

  return (
    <svg
      data-testid='useless-blob'
      style={{ ...style }}
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      overflow='visible'>
      <path
        style={pathStyle}
        d={generateBlobPath({ width, height, ...rest })}
        fill={fill}
        stroke={stroke}
        strokeWidth='3'
      />
    </svg>
  );
};

Blob.defaultProps = {
  fill: 'black',
  stroke: 'transparent',
  style: undefined,
  className: undefined,
  pathStyle: { transition: '.2s' },
  ...defaultValues,
  smoothing: 1
};

export default Blob;
