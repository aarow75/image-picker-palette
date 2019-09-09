import dom from 'jsx-render';
import RgbQuant from 'rgbquant';//https://github.com/leeoniya/RgbQuant.js/
import nearest from 'nearest-color-shade';
import Color from 'color';

const PaletteThing = (canvas, paletteSize) => {
  paletteSize = paletteSize === undefined ? 16 : paletteSize; // default to a 16 color palette is none is defined
  let q = new RgbQuant({colors: paletteSize});
  q.sample(canvas);
  let palette = q.palette(true);
  let items = [];
  let textColors = [];
  let colors = {
    'red': Color('rgb(210, 38, 48)'), 
    'green': Color('rgb(80, 158, 47)'), 
    'blue': Color('rgb(0, 114, 206)'),
    'yellow':Color('rgb(242, 150, 31)')
  };

  for (let color in palette) {
    // console.log(palette[color]);
    let rgba = `rgb(${palette[color].join(',')})`;
    let hex = rgbToHex(palette[color][0], palette[color][1], palette[color][2]);
    let textColor = isBright(palette[color]) ? "black" : "white";
    // console.log(nearest(colors,Color(rgba)))
    textColors.push(textColor);
    items.push(<span key={color} style={{backgroundColor: rgba, width: 100 / paletteSize + '%', height: canvas.height / 5 + 'px', display:'inline-block', color: textColor}}>
      {/* <div>{rgba}</div> */}
      <small>{hex}</small>
      {/* <div>Nearest? {nearest(colors,Color(rgba)).color}</div> */}
    </span>);
  }
  let mainTextColor = mode(textColors);
  let contrastColor = mainTextColor === "black" ? "white" : "rgba(0,0,0,0.5)";
  return (
    <div>
      <div style={{display: 'flex', flex: '1 1 auto'}}>{items}</div>
      {/* <h1 style={{color: mainTextColor, position: 'absolute', left: (canvas.width / 2.8) + 'px' , top: (canvas.height / 2.8) + 'px', textShadow: `0 0 4px ${contrastColor}`}}>{mainTextColor}</h1> */}
    </div>
  )
}


const isBright = (color) => {
  return (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 > 186);
}


const mode = (arr) => {
  return arr.sort((a,b) => arr.filter(v => v===a).length - arr.filter(v => v===b).length).pop();
}

const componentToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export {PaletteThing};