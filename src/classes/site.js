export class Site {
  constructor(selector) {
    this.root = document.querySelector(selector);
  }

  render(model) {
    this.root.innerHTML = '';
    model.forEach((block) => {
      this.root.insertAdjacentHTML('beforeend', block.toHTML());
    });
  }
}