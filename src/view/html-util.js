export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * HTML文字列からHTML要素を作成して返す
 * @param {string} html
 * @return {HTMLElement}
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

/**
 * HTML文字列からDOM Nodeを作成して返すタグ関数
 * @param {array} strings テンプレート文字列が${}で区切られた配列
 * @param {array} values ${}の評価値の配列
 * @return {Element}
 */
export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
  return htmlToElement(htmlString);
}

/**
 * コンテナ要素の中身をbodyElementで上書きする
 * @param {Element} bodyElement コンテナ要素の中身となる要素
 * @param {Element} containerElement コンテナ要素
 */
export function render(bodyElement, containerElement) {
  containerElement.innerHTML = '';
  containerElement.appendChild(bodyElement);
}