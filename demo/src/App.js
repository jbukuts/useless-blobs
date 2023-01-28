import './App.css';
import { createPolygon, generatePathString } from 'useless-blobs';
import { useEffect, useState } from 'react';

const CustomBlob = (props) => {
  const {
    width,
    height,
    boundingShape,
    fill,
    stroke,
    debug,
    polygonPoints,
    pathString
  } = props;

  return (<div style={{ height: '500px', maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg
        style={{
          ...(debug && { border: "3px solid orange" }),
          ...(boundingShape !== "rectangle" && { borderRadius: "50%" }),
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
          polygonPoints.map(([x, y]) => (
            <circle cx={x} cy={y} r="3" stroke="red" fill="red" />
          ))}
      </svg>
  </div>);
};

const Slider = (props) => {
  const {max, min, setter, value, title, step, prefix, suffix } = props;
  
  return (<div>
    <p><b>{title}</b>: {prefix}{value}{suffix}</p>
    <input
      className='slider'
      title={title}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => setter(e.target.valueAsNumber)}
      {...(step && { step })}
    />
  </div>);
};

const App = () => {
  const [verts, setVerts] = useState(12);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [irregularity, setIrregularity] = useState(0.5);
  const [spikiness, setSpikiness] = useState(0.5);
  const [smoothing, setSmoothing] = useState(1);
  const [shape, setShape] = useState("rectangle");
  const [debug, setDebug] = useState(false);

  const [path, setPath] = useState('');
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const polygonPoints = createPolygon({
      verts,
      width,
      height,
      irregularity,
      spikiness,
      boundingShape: shape,
    });
    setPoints(polygonPoints);
    setPath(generatePathString(polygonPoints, smoothing));
  }, [verts, height, width, irregularity, spikiness, smoothing, shape, debug])

  return (
    <main>
      <h1 className='text-5xl font-bold text-center my-10'>Build-A-Blob</h1>
      <CustomBlob {...{
        width, 
        height, 
        boundingShape: shape, 
        fill: 'blue', 
        stroke: 'black', 
        debug, 
        polygonPoints: points, 
        pathString: path
      }}/>

      <div className='options-grid'>
        <Slider title='Vertices' min={3} max={50} value={verts} setter={setVerts} />
        <Slider title='Smoothing' min={0} max={1} value={smoothing} setter={setSmoothing} step='.1' />
        <Slider title='Height' min={100} max={500} value={height} setter={setHeight} suffix='px' />
        <Slider title='Width' min={100} max={500} value={width} setter={setWidth} suffix='px' />
        <Slider title='Irregularity' min={0} max={1} value={irregularity} setter={setIrregularity}step='.1' />
        <Slider title='Spikiness' min={0} max={1} value={spikiness} setter={setSpikiness} step='.1' />
        
        <div>
          <p><b>Bounding Shape</b></p>
          <select title='Bounding Shape' name="shape" onChange={(e) => setShape(e.target.value)}>
            <option value="rectangle">Rectangle</option>
            <option value="ellipsis">Ellipsis</option>
          </select>
        </div>
        
        <div>
          <p><b>Debug</b></p>
          <label className="switch">
            <input 
              title='Debug'
              type="checkbox"
              checked={debug}
              onChange={() => setDebug(!debug)} 
            />
            <span className="toggle"></span>
          </label>
        </div>
      </div>

      <div className='code-block'>
        <code>
            {`
              <svg width="343" height="406" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                <path d="${path}" fill="blue" stroke="black" stroke-width="3" style="transition: all 0.2s ease 0s;"></path>
              </svg>
            `}
        </code>
      </div>
    </main>
  );
}

CustomBlob.defaultProps = {
  fill: "red",
  stroke: undefined,
  className: undefined,
  style: {},
  debug: false,
};

export default App;
