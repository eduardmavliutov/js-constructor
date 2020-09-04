import { getRow, getColumn } from '../utils';

class Block {
  constructor(value, options) {
    this.value = value,
    this.options = options
  }

  toHTML() {
    throw new Error('Метод должен быть реализован в дочернем классе!');
  }
}

export class TitleBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const {tag = 'h2', styles} = this.options;
    return getRow(getColumn(`<${tag}>${this.value}</${tag}>`), styles);
  }
}

export class TextBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const {styles} = this.options;
    return getRow(getColumn(`<p style="margin-bottom: 0;">${this.value}</p>`), styles);
  }
}

export class ColumnsBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const {styles} = this.options;
    const values = this.value.map((item) => getColumn(`<p style="margin-bottom: 0;">${item}</p>`));
    return getRow(`${values.join('')}`, styles);
  }
}

export class ImageBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }

  toHTML() {
    const {styles, imageStyles, alt} = this.options;
    return getRow(`<img src=${this.value} alt=${alt} style="${imageStyles}" class="img-fluid">`, styles);
  }
}