import {PaletteThing} from './paletteThing';

export default (image_prefix, album_count, palette_count) => {
  const container = document.createElement('album-covers');
  container.setAttribute('name', image_prefix);
  
  for (let i = 0; i < album_count; i++) {
    const inner = document.createElement('album-cover');
    const img = new Image();
    img.onerror = (e) => {
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEsCAQAAACoWRFeAAAAE0lEQVR42mP8/59xFI2iUTRwCADjklbzl/Hm4gAAAABJRU5ErkJggg==';
    }
    img.onload = () => {
      inner.appendChild(PaletteThing(img, palette_count));
    }
    img.src = `./assets/${image_prefix}${i}.jpg`;
    img.style.width = "300px";
    img.style.height = "300px";
    inner.style.display = 'inline-block';
    inner.style.minHeight = '360px';
    inner.style.margin = '4px';
    inner.style.border = 'solid 1px gray';
    // console.log('zzz', img)
    inner.appendChild(img);
    container.appendChild(inner)

  }
  return container;
}
