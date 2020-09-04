import javascriptImage from './assets/js.jpg';
import {TextBlock, ImageBlock, TitleBlock, ColumnsBlock} from './classes/blocks';

export const model = [
  new TitleBlock('Конструктор сайтов на чистом JavaScript!', {
    tag: 'h1',
    styles: 'background: linear-gradient(to right, #ff0099, #493240); color: #fff; padding: 1.5rem; text-align: center; overflow: hidden;'
  }),
  new ImageBlock(javascriptImage, {
    styles: 'padding: 1rem; display: flex; justify-content: center; margin: 1rem; flex-flow: row nowrap;',
    alt: 'alt text',
    imageStyles: 'width: 500px; height: auto;'
  }), 
  new TextBlock('Магия? Нет! Это JavaScript!', {
    styles: 'background: linear-gradient(to left, #f2994a, #f2c94c); font-weight: bold; padding: 1rem; text-align: center;  overflow: hidden;'
  }), 
  new ColumnsBlock([
    'Приложение на чистом JavaScript без использования библиотек',
    'Динамическая генерация контента',
    'Собран с использованием Webpack'
  ], {
    styles: 'padding: 1rem 0; margin: 0; color: #fff; background: linear-gradient(to bottom, #8e2de2, #4a00e0); font-weight: bold;'
  })
];