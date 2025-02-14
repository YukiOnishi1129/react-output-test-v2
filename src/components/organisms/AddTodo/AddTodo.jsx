import { InputForm } from "../../atoms";
import styles from "./style.module.css";

export const AddTodo = ({ addInputValue, onChangeTodo, handleAddTodo }) => (
  <>
    <h2 className={styles.subTitle}>{"ADD TODO"}</h2>
    <InputForm
      inputValue={addInputValue}
      placeholder={"New Todo"}
      handleChangeValue={onChangeTodo}
      handleKeyDown={handleAddTodo}
    />
  </>
);
