import { render } from './view/html-util.js';
import { TodoListView } from './view/TodoListView.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { TodoListModel } from './model/TodoListModel.js';

export class App {
  // 1. TodoListの初期化
  constructor({
    formElement,
    formInputElement,
    todoListContainerElement,
    todoCountElement,
  }) {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();

    this.formElement = formElement;
    this.formInputElement = formInputElement;
    this.todoListContainerElement = todoListContainerElement;
    this.todoCountElement = todoCountElement;

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{id:number, completed: boolean}}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }
  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{id:number}}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  /**
   * todoListModelの状態が変化したときに呼ばれるリスナー関数
   */
  handleChange() {
    const todoCountElement = this.todoCountElement;
    const todoListContainerElement = this.todoListContainerElement;
    const todoItems = this.todoListModel.getTodoItems();
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, todoListContainerElement);
    todoCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
  }

  mount() {
    this.todoListModel.onChange(this.handleChange);
    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.formInputElement.value.length === 0)
        return alert('文字を入力して下さい');
      this.handleAdd(this.formInputElement.value);
      this.formInputElement.value = '';
    });
  }

  unmount() {
    this.todoListModel.removeEventListener('change', this.handleChange);
  }
}
