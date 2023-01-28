# Useless Blobs

Parametrized random SVG blob creation.

## Installation
 
```sh
npm install useless-blobs
```

## Generate SVG Path String

There are various helpers that exported in the case you want finer control.

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
| `width`         | Width in pixels of resulting shape                       | Any integer               | ✅        | 200        |
| `height`        | Height in pixels or resulting shape                      | Any integer               | ✅        | 200        |
| `irregularity`  | Affects deviation between angles of each point           | [0,1]                     | ✅        | .25        |
| `spikiness`     | Affect how much a point deviates from the bounding shape | [0,1]                     | ✅        | .5         |
| `boundingShape` | Defines shape points will be limited within              | `rectangle` or `ellipsis` | ✅        | `ellipsis` |
| `smoothing`     | Affects how jagged final curve will be                   | [0,1]                     | ✅        | 1          |


## React Component

There is also a React component exported to simplify use for React projects. 

```jsx
import Blob from 'useless-blobs/lib/components';

<Blob/>
// or
<Blob
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

It should be noted that for the React component all props follow the same name and requirements as the options table. 

## Example Blobs
<br/>

<svg width="239" height="235" xmlns="http://www.w3.org/2000/svg" overflow="visible" style=""><path d="M 111.65 15.76 C 163.93 6.39, 179.56 -16.2, 216.81 0.38 C 243.24 12.14, 236.95 35.84, 239 72.45 C 241.17 111.35, 243 117.43, 225.25 151.4 C 205.98 188.28, 201.59 194.32, 164.96 214.14 C 124.34 236.12, 111.6 246.74, 70.74 235 C 29.12 223.04, 10.2 205.15, 0 166.73 C -7.96 136.75, 29.51 133.75, 34.43 98.2 C 38.55 68.39, 2.57 52.57, 18.08 36.01 C 41.18 11.35, 64.56 24.2, 111.65 15.76" fill="blue" stroke="black" stroke-width="3" style="transition: all 0.2s ease 0s;"></path></svg>

<svg width="239" height="235" xmlns="http://www.w3.org/2000/svg" overflow="visible" style="border-radius: 50%;"><path d="M 165.16 226.09 C 140.03 194.85, 134.11 134.89, 123.82 137.1 C 113.56 139.3, 129.34 194.07, 124.06 234.91 C 123.34 240.44, 118.25 230.53, 111.82 229.85 C 101.1 228.72, 100.61 232.12, 89.76 231.3 C 83.04 230.79, 81.76 231.39, 76.69 227.2 C 67.27 219.41, 64.12 218.91, 60.78 207.33 C 55.99 190.74, 70.14 177.05, 60.44 170.86 C 49.01 163.56, 14.35 186.61, 18.53 180.35 C 26.29 168.73, 87.09 140.64, 84.31 135.1 C 81.51 129.53, 41.35 154.95, 7.38 158.14 C 0.59 158.78, 4.16 150.63, 2.79 142.75 C 0.48 129.51, -10.19 119.45, 0.01 115.9 C 36.04 103.34, 91.68 124.09, 95.25 110.53 C 98.79 97.1, 21.62 73.12, 14.22 61.91 C 9.65 54.98, 45.87 73.8, 71.31 74.24 C 76.57 74.33, 75.46 68.92, 75.62 62.97 C 76.33 36.42, 66.03 30.24, 73.06 9.24 C 76.18 -0.09, 90.68 -5.5, 95.92 2.31 C 111.94 26.19, 104.64 72.76, 115.59 72.63 C 126.84 72.5, 121.73 25.13, 140.33 1.8 C 146.97 -6.54, 153.73 4.26, 166.07 9.29 C 177.61 13.99, 187.65 11.29, 188.08 21.27 C 189.03 43.54, 181.27 49.07, 168.83 73.79 C 161.04 89.27, 146.91 92.39, 147.62 101.67 C 148.1 107.97, 159.48 102.86, 171.2 104.95 C 205.17 111.02, 225.93 105.75, 239 117.99 C 246 124.55, 214.16 129.36, 211.34 142.54 C 209.19 152.58, 236.23 163.03, 229.05 164.43 C 211.76 167.81, 195.4 159.41, 162.39 152.1 C 154.68 150.39, 145.61 141.14, 147.62 146.4 C 157.61 172.53, 179.67 184.34, 186.39 214.87 C 188.44 224.19, 171.31 233.73, 165.16 226.09" fill="blue" stroke="black" stroke-width="3" style="transition: all 0.2s ease 0s;"></path></svg>

<svg width="239" height="235" xmlns="http://www.w3.org/2000/svg" overflow="visible" style="border-radius: 50%;"><path d="M 185.33 160.57 C 185.33 160.57, 191.54 183.01, 191.54 183.01 C 191.54 183.01, 193.08 210.08, 193.08 210.08 C 193.08 210.08, 176.26 206.32, 176.26 206.32 C 176.26 206.32, 151.02 189.94, 151.02 189.94 C 151.02 189.94, 148.9 202.9, 148.9 202.9 C 148.9 202.9, 142.3 232.84, 142.3 232.84 C 142.3 232.84, 133.39 234.2, 133.39 234.2 C 133.39 234.2, 116.18 218.34, 116.18 218.34 C 116.18 218.34, 103.68 233.97, 103.68 233.97 C 103.68 233.97, 85.86 230.25, 85.86 230.25 C 85.86 230.25, 73.46 225.93, 73.46 225.93 C 73.46 225.93, 63.55 221.32, 63.55 221.32 C 63.55 221.32, 49.53 212.75, 49.53 212.75 C 49.53 212.75, 43.1 192.69, 43.1 192.69 C 43.1 192.69, 51.82 168.4, 51.82 168.4 C 51.82 168.4, 16.18 176.55, 16.18 176.55 C 16.18 176.55, 39.71 152.52, 39.71 152.52 C 39.71 152.52, 22.38 150.98, 22.38 150.98 C 22.38 150.98, 3.35 145.13, 3.35 145.13 C 3.35 145.13, 32.23 126.26, 32.23 126.26 C 32.23 126.26, 18.81 112.44, 18.81 112.44 C 18.81 112.44, 1.35 99.87, 1.35 99.87 C 1.35 99.87, 4.94 84.08, 4.94 84.08 C 4.94 84.08, 9.21 72.27, 9.21 72.27 C 9.21 72.27, 13.75 62.77, 13.75 62.77 C 13.75 62.77, 37.77 65.9, 37.77 65.9 C 37.77 65.9, 27.91 42.02, 27.91 42.02 C 27.91 42.02, 37.72 31.83, 37.72 31.83 C 37.72 31.83, 60.88 33.84, 60.88 33.84 C 60.88 33.84, 81.58 47.26, 81.58 47.26 C 81.58 47.26, 82.25 5.85, 82.25 5.85 C 82.25 5.85, 99.34 1.68, 99.34 1.68 C 99.34 1.68, 118.05 24.85, 118.05 24.85 C 118.05 24.85, 126.4 24.41, 126.4 24.41 C 126.4 24.41, 142.54 14.77, 142.54 14.77 C 142.54 14.77, 160.23 7.03, 160.23 7.03 C 160.23 7.03, 168.71 30.74, 168.71 30.74 C 168.71 30.74, 189.15 22.02, 189.15 22.02 C 189.15 22.02, 202.46 32.93, 202.46 32.93 C 202.46 32.93, 193.5 64.29, 193.5 64.29 C 193.5 64.29, 222.51 57.93, 222.51 57.93 C 222.51 57.93, 201.74 80.44, 201.74 80.44 C 201.74 80.44, 232.84 80.26, 232.84 80.26 C 232.84 80.26, 200.71 104.34, 200.71 104.34 C 200.71 104.34, 234.52 115.84, 234.52 115.84 C 234.52 115.84, 238.68 126.11, 238.68 126.11 C 238.68 126.11, 235.68 143.46, 235.68 143.46 C 235.68 143.46, 229.93 162.4, 229.93 162.4 C 229.93 162.4, 202.46 160.31, 202.46 160.31 C 202.46 160.31, 185.33 160.57, 185.33 160.57" fill="blue" stroke="black" stroke-width="3" style="transition: all 0.2s ease 0s;"></path></svg>