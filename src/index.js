import {model} from './model';
import {Site} from './classes/site';
import {Sidebar} from './classes/sidebar';
import './styles/main.css';

const site = new Site('#site');

const update = (newBlock) => {
  model.push(newBlock);
  site.render(model);
}

const sidebar = new Sidebar('#panel', update);

site.render(model);