import albums from './image-palettes2';
import picker from './canvas-picker';

(()=>{
  const container = document.createElement('main');
  document.body.appendChild(container);
  container.appendChild(picker('./assets/image1.jpg'));
  container.appendChild(albums('image',12,5));
  container.appendChild(albums('bowie',36,5));
})();