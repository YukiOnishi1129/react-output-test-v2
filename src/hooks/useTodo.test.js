import { describe, expect, test, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTodo } from "./useTodo.js";
import { INIT_TODO_LIST } from "../constants/data";

describe("Hooksテスト】useApp test", () => {
  describe("【関数テスト】onChangeAddInputValue", () => {
    test("【正常系】addInputValueを更新できること", () => {
      const expectValue = "テスト";
      // 引数
      const eventObject = {
        target: {
          value: expectValue,
        },
      };
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe("");
      // hooks関数の実行
      act(() => result.current.onChangeAddInputValue(eventObject));
      expect(result.current.addInputValue).toBe(expectValue);
    });
  });

  describe("【関数テスト】handleAddTodo", () => {
    // 予測値
    let expectTodoList = [];
    // 引数
    let eventObject = {
      target: {
        value: "テスト",
      },
      key: "Enter",
    };

    /**
     * beforeEach
     * test関数が実行される前に毎回実行される
     * 今回の場合はテスト対象に渡す引数を毎回初期化する
     */
    beforeEach(() => {
      // 引数の初期化
      eventObject = {
        target: {
          value: "テスト",
        },
        key: "Enter",
      };
    });

    test("【正常系】todoList, uniqueIdが更新されること、addInputValueがリセットされること", () => {
      // 予測値
      const expectTodoTitle = "Todo3";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = expectTodoTitle;

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe("");
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current.onChangeAddInputValue(eventObject));
      expect(result.current.addInputValue).toBe(expectTodoTitle);

      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current.handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されたこと
      expect(result.current.showTodoList).toEqual(expectTodoList);
      // 入力値(addInputValue)がリセットされたこと
      expect(result.current.addInputValue).toBe("");
    });
    test("【正常系】エンターキーを押していない場合、処理が発生しないこと", () => {
      // 予測値
      const expectTodoTitle = "Todo4";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = expectTodoTitle;
      eventObject.key = "";
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe("");
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current.onChangeAddInputValue(eventObject));
      expect(result.current.addInputValue).toBe(expectTodoTitle);
      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current.handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current.showTodoList).not.toEqual(expectTodoList);
      // 入力値(addInputValue)がリセットされない
      expect(result.current.addInputValue).not.toBe("");
    });
    test("【正常系】入力値がない場合、処理が発生しないこと", () => {
      // 予測値
      const expectTodoTitle = "Todo5";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = "";
      eventObject.key = "";
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe("");
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current.onChangeAddInputValue(eventObject));
      expect(result.current.addInputValue).toBe("");
      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current.handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current.showTodoList).not.toEqual(expectTodoList);
    });

    test("【正常系】検索キーワードがある場合", () => {
      // TODO: 確認1: 検索結果でshowTodoListが更新されること
    });

    describe("【関数テスト】handleDeleteTodo", () => {
      // 予測値
      let expectTodoList = [];

      beforeEach(() => {
        // 予測値を初期化
        expectTodoList = [];
      });

      test("【正常系】todoが削除されること", () => {
        // 引数
        const targetId = 1;
        const targetTitle = "テスト";
        // window.confirmをモック化
        // confirmでOKをクリックした場合
        // https://stackoverflow.com/questions/41732903/stubbing-window-functions-in-jest
        // window.confirm = jest.fn().mockImplementation(() => true);
        window.confirm = vi.fn().mockReturnValueOnce(true);
        // 予測値
        expectTodoList = INIT_TODO_LIST.filter((todo) => todo.id !== targetId);
        // hooks呼び出し
        const { result } = renderHook(() => useTodo());
        act(() => result.current.handleDeleteTodo(targetId, targetTitle));
        // 表示用TodoListが予想通り更新されないこと
        expect(result.current.showTodoList).toEqual(expectTodoList);
      });

      test("【正常系】confirmでキャンセルをクリックした場合、todoが削除されないこと", () => {
        // 引数
        const targetId = 1;
        const targetTitle = "テスト";
        // window.confirmをモック化
        // confirmでキャンセルをクリックした場合
        window.confirm = vi.fn().mockReturnValueOnce(false);
        // 予測値
        expectTodoList = INIT_TODO_LIST;
        // hooks呼び出し
        const { result } = renderHook(() => useTodo());
        act(() => result.current.handleDeleteTodo(targetId, targetTitle));
        // 表示用TodoListが予想通り更新されないこと
        expect(result.current.showTodoList).toEqual(expectTodoList);
      });

      test("【正常系】検索キーワードがある場合", () => {
        // TODO: 確認: 検索結果でshowTodoListが更新されること (showTodoListへもTodo削除処理の結果が反映されること)
      });
    });
  });

  describe("【関数テスト】handleSearchTodo", () => {
    test("【正常系】検索ワードがある場合、検索された結果が反映される", () => {
      // 予測値
      const expectValue = [INIT_TODO_LIST[0]];
      // 引数
      const eventObject = {
        target: {
          value: "Todo1",
        },
      };

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行
      act(() => result.current.handleChangeSearchKeyword(eventObject));
      // 結果判定
      expect(result.current.showTodoList).toEqual(expectValue);
    });
    test("【正常系】検索ワードがない場合、元のTodoリストが反映される", () => {
      // 予測値
      const expectValue = INIT_TODO_LIST;
      // 引数
      const eventObject = {
        target: {
          value: "",
        },
      };

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行
      act(() => result.current.handleChangeSearchKeyword(eventObject));
      // 結果判定
      expect(result.current.showTodoList).toEqual(expectValue);
    });
  });
});
