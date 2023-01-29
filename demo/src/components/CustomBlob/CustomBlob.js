import React from 'react';

const CustomBlob = (props) => {
    const {
      width,
      height,
      boundingShape,
      fill,
      stroke,
      debug,
      polygonPoints,
      pathString,
      className
    } = props;
  
    return (<div className={className}>
        <svg
          style={{
            ...(debug && { border: "3px solid orange" }),
            ...(boundingShape !== "rectangle" && debug && { borderRadius: "50%" }),
          }}
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <path
            style={{ transition: ".2s" }}
            d={pathString}
            fill={fill}
            stroke={stroke}
            strokeWidth="3"
          />
          {debug &&
            polygonPoints.map(([x, y], index) => (
              <circle key={index} cx={x} cy={y} r="3" stroke="red" fill="red" />
            ))}
        </svg>
    </div>);
};

export default CustomBlob;