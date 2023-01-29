
import React from 'react';
import { createPolygon, generatePathString } from 'useless-blobs';
import { useEffect, useState } from 'react';
import { Slider, Toggle, CustomBlob } from './components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './App.css';

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

const App = () => {
  const [verts, setVerts] = useState(12);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [irregularity, setIrregularity] = useState(0.5);
  const [spikiness, setSpikiness] = useState(0.5);
  const [smoothing, setSmoothing] = useState(1);
  const [shape, setShape] = useState(false);
  const [debug, setDebug] = useState(false);

  const [path, setPath] = useState('');
  const [points, setPoints] = useState([]);

  const buildABlob = () => {
    const polygonPoints = createPolygon({
      verts,
      width,
      height,
      irregularity,
      spikiness,
      boundingShape: shape ? 'ellipsis' : 'rectangle',
    });
    setPoints(polygonPoints);
    setPath(generatePathString(polygonPoints, smoothing));
  };

  const randomBlob = () => {
    setVerts(Math.floor(getRandomNumber(3,50)));
    setWidth(Math.floor(getRandomNumber(100,500)));
    setHeight(Math.floor(getRandomNumber(100,500)));
    setIrregularity(getRandomNumber(0,1).toDecimal(1));
    setSpikiness(getRandomNumber(0,1).toDecimal(1));
    setSmoothing(getRandomNumber(0,1).toDecimal(1));
    setShape(Math.random() > 0.5 ? 'ellipsis' : 'rectangle');
    buildABlob();
  }

  useEffect(() => {
    buildABlob();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verts, height, width, irregularity, spikiness, smoothing, shape, debug])

  return (<>
    <header>
      <h1 className='text-5xl font-bold text-center mt-10 mb-10'>Build-A-Blob</h1>
    </header>
    <main>
      <div className='demo'>
        <CustomBlob {...{
          width, 
          height, 
          boundingShape: shape ? 'ellipsis' : 'rectangle', 
          fill: 'blue', 
          stroke: 'black', 
          debug, 
          polygonPoints: points, 
          pathString: path,
          className: 'blob'
        }}/>

        <div className='options-grid'>
          <Slider title='Vertices' min={3} max={50} value={verts} setter={setVerts} />
          <Slider title='Smoothing' min={0} max={1} value={smoothing} setter={setSmoothing} step='.1' />
          <Slider title='Height' min={100} max={500} value={height} setter={setHeight} suffix='px' step='5'/>
          <Slider title='Width' min={100} max={500} value={width} setter={setWidth} suffix='px' step='5'/>
          <Slider title='Irregularity' min={0} max={1} value={irregularity} setter={setIrregularity}step='.1' />
          <Slider title='Spikiness' min={0} max={1} value={spikiness} setter={setSpikiness} step='.1' />
          
          <Toggle title='Bounding Shape' value={shape} setter={setShape}/>
          <Toggle title='Debug' value={debug} setter={setDebug}/>
          
          <button onClick={buildABlob}>Refresh</button>
          <button onClick={randomBlob}>Random</button>
        </div>
      </div>

      <SyntaxHighlighter language="jsx" style={vs} className='code' wrapLongLines>
        {`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" overflow="visible"><path d="${path}" fill="blue" stroke="black" stroke-width="3"></path></svg>`}
      </SyntaxHighlighter>
    </main>
    </>
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
