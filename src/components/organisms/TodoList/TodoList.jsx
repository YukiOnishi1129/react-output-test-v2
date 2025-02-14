import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./style.module.css";

export const TodoList = ({ todoList, handleDeleteTodo }) => (
  <ul className={styles.list}>
    {todoList.map((todo) => (
      <li key={todo.id} className={styles.todo}>
        <span className={styles.task}>{todo.title}</span>
        <div className={styles.far}>
          {/* https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react-ja */}
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="lg"
            onClick={() => handleDeleteTodo(todo.id, todo.title)}
          />
        </div>
      </li>
    ))}
  </ul>
);
