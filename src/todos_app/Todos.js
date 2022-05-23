import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodosHeader from "./TodosHeader";
const icon = {
  del: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  edit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
};

export default function Todos() {
  const [todoValue, setTodoValue] = useState("");
  const [List, setList] = useState(getListLocal());
  const [toggle, setToggle] = useState(true);
  const [mainTodo, setmainTodo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [Alert, setAlert] = useState("");

  function getListLocal() {
    const list = window.localStorage.getItem("list");
    console.log(list);
    if (list) {
      return JSON.parse(window.localStorage.getItem("list"));
    } else {
      return [];
    }
  }

  //add todos in the list
  const handleTodoAdd = () => {
    if (!todoValue) {
      alert("plzz add todo");
    } else if (todoValue && !toggle) {
      setList(
        List.map((todo) => {
          if (todo.id === editId) {
            return { ...todo, name: todoValue };
          }
          return todo;
        })
      );
      setToggle(true);
      remove(`${todoValue} is updated successfuly`);

      setTodoValue("");
      setEditId(null);
    } else {
      setList([
        ...List,
        { name: todoValue, id: new Date().getTime().toString() },
      ]);
      setTodoValue("");
      remove(`${todoValue} is added successfuly`);
    }
  };
  //edit the todo list
  const handleEdit = (index) => {
    const filterOneTodo = List.filter((todo) => todo.id === index);
    console.log(filterOneTodo);
    setToggle(false);
    setTodoValue(filterOneTodo[0].name);
    setEditId(index);
  };
  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(List));
    setmainTodo(List.reverse());
  }, [List]);

  //delete specific todo from the todo list
  const handleDelete = (index) => {
    setList(List.filter((todo) => todo.id !== index));
  };
  // clear all todo from the list
  const handleClear = () => {
    setList([]);
    remove("clear all todo from the list");
  };

  //set the value of input todos
  const onChangeValue = (value) => {
    setTodoValue(value);
  };
  const remove = (msg = "") => {
    setAlert(msg);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      remove();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [List]);

  return (
    <div className="text-white bg-slate-700 w-screen  overflow-hidden mx-auto   h-[100vh] grid place-items-center">
      <div>
        <input
          className="text-gray-200 pl-3 focus:outline-none bg-slate-400/50 w-[250px] h-[40px] text-lg rounded-l-md"
          type="text"
        />
      </div>
      <div className="sm:w-[400px] w-[330px] relative min-h-[500px] bg-slate-600 rounded-md shadow-md shadow-white">
        <TodosHeader />
        <div className="text-center bg-green-600/40 capitalize">
          <p>{Alert}</p>
        </div>
        <TodoInput
          add={handleTodoAdd}
          todoValue={todoValue}
          onChangeValue={onChangeValue}
          toggle={toggle}
        />
        <div className="w-full h-[400px] overflow-y-auto">
          {mainTodo.map((todo, index) => (
            <div
              className="bg-slate-700/50 mt-1 w-[300px] rounded-md py-1  px-3 text-lg mx-auto hover:bg-slate-500 odd:bg-slate-700 flex justify-between"
              key={todo.id}
            >
              {todo.name}
              <div className="flex items-center">
                <span
                  className="hover:text-red-600 cursor-pointer"
                  onClick={() => handleDelete(todo.id)}
                >
                  {icon.del}
                </span>
                <span
                  className="hover:text-indigo-600 cursor-pointer font"
                  onClick={() => handleEdit(todo.id)}
                >
                  {icon.edit}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="py-2 relative  left-[38%]">
          <button
            className=" bg-slate-500  hover:bg-indigo-600 transition-all duration-700 rounded-md px-4  uppercase"
            onClick={handleClear}
          >
            clear all
          </button>
        </div>
      </div>
      <p className="capitalize text-gray-400 font-black font-mono">
        developed by shipon islam
      </p>
    </div>
  );
}
