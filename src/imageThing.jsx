import dom from 'jsx-render';

const width = 250;
const height = 250;
const myX = 1;
const myY = 1;

const cursorStyle = {
  width:'5px',
  height: '5px',
  display: 'inline-block',
  backgroundColor: 'lime',
  position: 'absolute',
  top: myY + 'px',
  left: myX + 'px',
  zIndex: '1'
}

const imageStyle = {
  width: width + 'px',
  height: height + 'px',
  position: 'absolute'
}

const pickedStyle = {
  width: width + 'px',
  height: height + 'px',
  position: 'absolute',
  display: 'inline-block'
}

const containerStyle = Object.assign({
  position:'relative',
}, pickedStyle)

const ImageThing = (src,container, callback) => {
  let canvas = document.createElement( 'canvas' );
  // let canvas = new OffscreenCanvas(width, height);
  let canvasContext = canvas.getContext( '2d' );
  canvas.width = width; 
  canvas.height = height; 
  canvas.style.cursor = 'crosshair';
  container.appendChild( canvas );
  let img = new Image();
  img.src = src;
  img.onload = () => {
    canvasContext.drawImage(img, 0, 0, width, height);
    let data = canvasContext.getImageData(myX, myY, width, height).data;
    let pickedColor = 'rgba(' + data[0] + ', ' + data[1] +
    ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    document.querySelector(`img[src='${src}']`).style.display = 'none';
    // canvasContext.putImageData(invertedImageData(canvasContext.getImageData(myX, myY, width, height)), 0, 0); // invert the image
    container.appendChild(PickedThing(pickedColor));
    callback();
  }
  canvas.addEventListener('mousemove', pick);
  return (
    <img src={src} style={imageStyle} />
  )
}

const PickedThing = (pickedColor) => {
  let newAttr = pickedColor ? {backgroundColor: pickedColor} : {};
  return(
    <a-picked-thing style={Object.assign(pickedStyle, newAttr)}></a-picked-thing>
  )
}

const invertedImageData = (imageData) => {
  for (var i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i]     = 255 - imageData.data[i];     // red
    imageData.data[i + 1] = 255 - imageData.data[i + 1]; // green
    imageData.data[i + 2] = 255 - imageData.data[i + 2]; // blue
  }
  return imageData;
}

const invertedData = (data) => {
  for (var i = 0; i < data.length; i += 4) {
    data[i]     = 255 - data[i];     // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  return data;
}

const invertedRGBA = (data) => {
  let idata = invertedData(data);
  return 'rgba(' + idata[0] + ', ' + idata[1] + ', ' + idata[2] + ', ' + (idata[3] / 255) + ')';
}

const pick = (event) => {
  let x = event.layerX;
  let y = event.layerY;
  let canvas = event.target;
  let ctx = canvas.getContext('2d');
  let data = ctx.getImageData(x, y, width, height).data;
  let pickedColor = 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';;
  // console.log(`${x}, ${y}`,pickedColor);
  let pickedBox = document.querySelector('canvas ~ a-picked-thing');
  pickedBox.innerText = pickedColor;
  pickedBox.style.color = invertedRGBA(data);
  pickedBox.style.backgroundColor = pickedColor;
}

export {ImageThing}