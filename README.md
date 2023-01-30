# Useless Blobs

<p>
    <a href="https://www.npmjs.com/package/useless-blobs">
        <img src="https://img.shields.io/npm/v/useless-blobs">
    </a>
    <a href="https://github.com/jbukuts/useless-blobs/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/useless-blobs">
    </a>
</p>

Parametrized random SVG blob creation. Playground [here](https://jbukuts.github.io/useless-blobs/)

## Installation
 
```sh
npm install useless-blobs
```

## Generate SVG Path String

There are various helpers that are exported in case you want finer control.

```js
import generateBlobPath, { createPolygon, generatePathString } from 'useless-blobs';

const options = { 
    verts: 6, 
    width: 200, 
    height: 200, 
    irregularity: .25, 
    spikiness: .5, 
    boundingShape: 'ellipsis'
};
const smoothing = 1;

// will only generate an array of points
const polygonPoints = createPolygon(options);

// creates an svg path from an array of points and a smoothing value between them
const pathString = generatePathString(polygonPoints, smoothing);

// a helper that wraps the previous two functions into one
const otherPathString = generateBlobPath({...options, smoothing});

// no options are required
const defaultPathString = generateBlobPath();
```

The resulting path string from `generateBlobPath` or `generatePathString` can then be used within the `d` value of a `<path>` tag in an SVG as outline [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#curve_commands). 

### Options

| Option          | Description                                              | Allowed Values            | Optional | Default    |
|-----------------|----------------------------------------------------------|---------------------------|----------|------------|
| `verts`         | Number of vertices shape will contain                    | Any integer >= 3          | ✅        | 6          |
| `width`         | Width in pixels of resulting shape                       | Any integer > 0           | ✅        | 200        |
| `height`        | Height in pixels or resulting shape                      | Any integer > 0           | ✅        | 200        |
| `irregularity`  | Affects deviation between angles of each point           | [0,1]                     | ✅        | .25        |
| `spikiness`     | Affect how much a point deviates from the bounding shape | [0,1]                     | ✅        | .5         |
| `boundingShape` | Defines shape points will be limited within              | `rectangle` or `ellipsis` | ✅        | `ellipsis` |
| `smoothing`     | Affects how jagged final curve will be                   | [0,1]                     | ✅        | 1          |

## React Component

There is also a React component exported to simplify use for React projects. 

```jsx
import UselessBlob from 'useless-blobs/lib/components';

<UselessBlob />

// or

<UselessBlob
    fill='red'
    stroke='blue'
    verts={12}
    height={200}
    width={500}
    irregularity={0.5}
    spikiness={0.8}
    boundingShape='rectangle'
/>
```

It should be noted that for the React component all props follow the same name and requirements as the options table with additional props for:

| Option          | Description                                              | Allowed Values            | Optional | Default      |
|-----------------|----------------------------------------------------------|---------------------------|----------|--------------|
| `fill`          | What color to paint blob                                 | Any color                 | ✅       | `'black'`      |
| `stroke`        | Color of stroke around blob                              | Any color                 | ✅       | `'transparent'`|
| `style`         | In-line style object to apply to underlying `<svg>` tag  | React in-line style object| ✅       | `undefined`    |
| `pathStyle`     | In-line style object to apply to underlying `<path>` tag | React in-line style object| ✅       | `{ transition: '.25s' }`   |
| `className`     | CSS class to apply to underlying `<svg>` tag             | String                    | ✅       | `undefined`    |
