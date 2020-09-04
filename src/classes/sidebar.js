import {TextBlock, TitleBlock, ImageBlock, ColumnsBlock} from './blocks';

export class Sidebar {
  constructor(selector, update) {
    this.root = document.querySelector(selector);
    this.update = update;
    this.fileReader = new FileReader();
    this.init();
  }

  init() {
    this.root.addEventListener('submit', this.addBlock.bind(this));
    this.root.innerHTML = this.templates;
    this.root.querySelector('#add-column-btn').addEventListener('click', this.addColumn.bind(this));
  }

  addBlock(event) {
    event.preventDefault();
    const type = event.target.name;
    const styles = event.target.styles.value;
    switch(type) {
      case 'text': {
        const value = event.target.value.value;
        this.update(new TextBlock(value, {styles}));
        break;
      }
        
      case 'title': {
        const value = event.target.value.value;
        const tag = event.target.tag.value;
        this.update(new TitleBlock(value, {styles, tag}));
        break;
      }
        
      case 'image': {
        const onImageLoad = () => {
          this.fileReader.removeEventListener('load', onImageLoad);
          this.update(new ImageBlock(this.fileReader.result, {styles, imageStyles, alt}));
        }
       
        const imageStyles = event.target['image-styles'].value;
        const alt = event.target.alt.value;
        const image = event.target.value.files[0];
        this.fileReader.addEventListener('load', onImageLoad);
        this.fileReader.readAsDataURL(image);
        break;
      }
        
      case 'columns': {
        const columnInputs = event.target.querySelectorAll('input[name="value"]');
        const values = Array.from(columnInputs)
          .slice()
          .filter((columnInput) => !!(columnInput.value.trim()))
          .map((columnInput) => columnInput.value);
        this.update(new ColumnsBlock(values, {styles}));
        this.resetColumns();
        break; 
      }  
    } 
    
    this.clearInputs(...event.target.querySelectorAll('input'));
  }

  addColumn() {
    const columnsForm = this.root.querySelector('form[name="columns"]');
    const newColumnInput = columnsForm.querySelector('.form-group').cloneNode(true);
    newColumnInput.querySelector('input').value = '';
    const columnsStyleInput = columnsForm.querySelector('input[name="styles"]').parentNode;
    columnsForm.insertBefore(newColumnInput, columnsStyleInput);
  }

  resetColumns() {
    const columnsForm = this.root.querySelector('form[name="columns"]');
    const addedColumns = Array.from(this.root.querySelectorAll('form[name="columns"] .form-group'));
    addedColumns.slice(1, addedColumns.length - 1).forEach((column) => columnsForm.removeChild(column));
  }

  clearInputs(...inputs) {
    inputs.forEach((input) => input.value = '');
  }

  get templates() {
    return [
      this.textFormTemplate,
      this.titleFormTemplate,
      this.imageFormTemplate,
      this.columnsFormTemplate
    ].join('');
  }

  get textFormTemplate() {
    return `
      <form name="text">
        <h5>Текст</h5>
        <div class="form-group">
          <input class="form-control form-control-sm" name="value" placeholder="значение"></input>
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="стили блока">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Создать</button>
      </form>
      <hr/>
    `;
  }

  get titleFormTemplate() {
    return `
      <form name="title">
        <h5>Заголовок</h5>
        <div class="form-group">
          <input class="form-control form-control-sm" name="value" placeholder="значение"></input>
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="tag" placeholder="тег"></input>
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="стили блока">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Создать</button>
      </form>
      <hr/>
    `;
  }

  get imageFormTemplate() {
    return `
      <form name="image">
        <h5>Изображение</h5>
        <div class="form-group">   
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile04" name="value">
            <label class="custom-file-label" for="inputGroupFile04">Файл</label>
          </div> 
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="image-styles" placeholder="стили изображения">
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="стили блока">
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="alt" placeholder="alt-текст">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Создать</button>
      </form>
      <hr/>
    `;
  }

  get columnsFormTemplate() {
    return `
      <form name="columns">
        <h5>Колонки</h5>
        <div class="form-group">
          <input class="form-control form-control-sm" name="value" placeholder="значение"></input>
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="стили блока">
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="add-column-btn">+ Колонка</button>
        <button type="submit" class="btn btn-primary btn-sm">Создать</button>
      </form>
      <hr/>
    `;
  }
}