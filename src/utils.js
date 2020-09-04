export function getRow(content, styles = '') {
  return `
    <div class="row" style="${styles}">
      ${content}
    </div>
  `;
}

export function getColumn(content) {
  return `
    <div class="col-sm">
      ${content}
    </div>
  `;
}