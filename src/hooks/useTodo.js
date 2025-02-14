import { useState, useMemo } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../constants/data.js";

export const useTodo = () => {
  /* todolist */
  const [originTodoList, setOriginTodoList] = useState(INIT_TODO_LIST);
  /* add input title */
  const [addInputValue, setAddInputValue] = useState("");
  /* todo採番ID */
  const [uniqueId, setUniqueId] = useState(INIT_UNIQUE_ID);
  /* 検索キーワード */
  const [searchKeyword, setSearchKeyword] = useState("");
  /* 表示用TodoList */
  const showTodoList = useMemo(() => {
    return originTodoList.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      const regexp = new RegExp("^" + searchKeyword, "i");
      return todo.title.match(regexp);
    });
    // useMemoの第二引数([originTodoList, searchKeyword])に依存して処理が実行される
    // originTodoListとsearchKeywordの値が変更される度にfilterの検索処理が実行
    // ただし結果が前回と同じならキャッシュを返却し処理は実行されない(無駄な処理を省いている)
    // 詳しくはuseMemoを調べてください。
  }, [originTodoList, searchKeyword]);

  /* actions */
  /**
   * addInputValueの変更処理
   * @param {*} e
   */
  const onChangeAddInputValue = (e) => setAddInputValue(e.target.value);

  /**
   * Todo新規登録処理
   * @param {*} e
   */
  const handleAddTodo = (e) => {
    //  エンターキーが押された時にTodoを追加する
    if (e.key === "Enter" && addInputValue !== "") {
      const nextUniqueId = uniqueId + 1;
      // Todo追加処理
      // 元の配列を破壊しないように配列のコピーを作成して、その値でstateを更新する
      // pushでの配列追加は元の配列の値を変更するのでエラーになる

      // concatの処理
      // setOriginTodoList(
      //   // concatとpushの違い
      //   // https://kskpblog.com/javascript-array-add/
      //   todoList.concat({
      //     id: nextUniqueId,
      //     title: addInputValue,
      //   })
      // );

      // スプレッド構文の処理
      const newTodoList = [
        ...originTodoList,
        {
          id: nextUniqueId,
          title: addInputValue,
        },
      ];
      setOriginTodoList(newTodoList);

      // 採番IDを更新
      setUniqueId(nextUniqueId);
      // todo追加後、入力値をリセット
      setAddInputValue("");
    }
  };

  /**
   * Todo削除処理
   * @param { number } targetId
   * @param { string }targetTitle
   */
  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
      // 削除するid以外のtodoリストを再編集
      // filterを用いた方法
      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId);

      // 削除するTodoの配列番号を取り出してspliceで削除する方法もある
      // const newTodoList = [...todoList];
      // const deleteIndex = newTodoList.findIndex((todo) => todo.id === targetId);
      // newTodoList.splice(deleteIndex, 1);

      // todoを削除したtodo listで更新
      setOriginTodoList(newTodoList);
    }
  };

  /**
   * 検索キーワード更新処理
   * @param {*} e
   */
  const handleChangeSearchKeyword = (e) => setSearchKeyword(e.target.value);

  const states = {
    addInputValue,
    searchKeyword,
    showTodoList,
  };

  const actions = {
    onChangeAddInputValue,
    handleAddTodo,
    handleDeleteTodo,
    handleChangeSearchKeyword,
  };

  return [states, actions];
};
