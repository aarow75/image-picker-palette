import css from './image-palettes.css'
import {PaletteThing} from './paletteThing';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener('load', e => resolve(img));
    img.addEventListener('error', () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
    img.src = url;
  });
}
export default (image_prefix, album_count, palette_count) => {
  const container = document.createElement('image-palettes');
  for (let i = 0; i < album_count; i++) {
    const inner = document.createElement('image-palette');
    inner.setAttribute('name', `${image_prefix} ${i}`);
    inner.style.order = i;

    loadImage(`./assets/${image_prefix}${i}.jpg`)
        .then(img => {
          inner.appendChild(img);
          inner.appendChild(PaletteThing(img, palette_count));
          container.appendChild(inner);
        })
        .catch(error => console.error(error));
  }
  return container;
}