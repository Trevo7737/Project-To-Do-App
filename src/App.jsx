import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Study", completed: false },
    { id: 2, text: "Go to School", completed: false },
    { id: 3, text: "Workout", completed: false },
  ]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const modifyTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setEditId(null);
  };

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full h-screen">
      <div className="col-span-5 row-span-5 ">
        <div className=" w-full h-[20%] my-4  flex justify-center items-center ">
          <h1 className="text-3xl text-teal-400 font-bold items-center w-[25%] shadow-xl/20 rounded-4xl  px-8 py-8  flex justify-center font-sans uppercase ">
            To do app
          </h1>
        </div>
        <div className="h-4/6 flex justify-center items-center ">
          <div className="bg-blue-100 w-3/4 h-auto overflow-auto  rounded-2xl shadow-xl/20 p-6">
            <div className="flex mb-4  items-center justify-center px-4">
              <input
                className="flex w-4/3 border-none  bg-amber-100 rounded-l-4xl font-light px-4 py-4 hover:outline-none  text-2xl"
                placeholder="Add a new todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onClick={(e) => setText(e.key("Enter"))}
              />
              <button
                onClick={addTodo}
                className="bg-blue-500 text-white  text-2xl px-8 py-4 rounded-r-4xl hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-8"
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5"
                    />
                    <span
                      className={`${
                        todo.completed ? "line-through text-gray-400" : " "
                      }`}
                    >
                      {todo.text}
                    </span>
                  </label>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white mr-2 px-8 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    {editId === todo.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="border rounded-lg px-3 py-1"
                        />
                        <button
                          onClick={() => {
                            modifyTodo(todo.id, editText);
                          }}
                          className="bg-green-500 text-white mr-2 px-8 py-1 rounded-lg hover:bg-green-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditId(todo.id);
                          setEditText(todo.text);
                        }}
                        className="bg-yellow-500  text-white  rounded-lg mr-2 px-8 py-1 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
