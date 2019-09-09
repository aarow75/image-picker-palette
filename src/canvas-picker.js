import {ImageThing, ImageThingInverted} from './imageThing';
import {PaletteThing} from './paletteThing';

// The canvas method
export default (src) =>{
    const container = document.createElement('canvas-picker');
    container.style.width = "500px"; // based on the 250px width + the color preview
    container.style.display = "block";
    container.style.border = "solid 1px gray";
    container.setAttribute('src', src)
    container.appendChild(
      ImageThing(
        src, 
        container, 
        () => { container.appendChild(PaletteThing(document.querySelector('canvas'), 5)) }
      )
    );
    return container;
}
