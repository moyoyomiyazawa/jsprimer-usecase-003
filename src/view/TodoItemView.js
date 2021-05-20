import { element } from './html-util.js';

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li>
            <label>
              <input type="checkbox" id="checkbox" class="checkbox" checked/>
              <s>${todoItem.title}</s>
              <button class="delete">x</button>
            </label>
          </li>`
      : element`<li>
            <label>
              <input type="checkbox" class="checkbox">
              ${todoItem.title}
              <button class="delete">x</button>
            </label>
          </li>`;
    // チェックボックスがトグルしたときのイベントにリスナー関数を登録
    const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
    inputCheckboxElement.addEventListener('change', () => {
      // 指定したTodoアイテムの完了状態を反転させる
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });
    // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
    const deleteButtonElement = todoItemElement.querySelector('.delete');
    deleteButtonElement.addEventListener('click', () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
