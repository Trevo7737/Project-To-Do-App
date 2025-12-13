import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Study", completed: false },
    { id: 2, text: "Go to School", completed: true },
    { id: 3, text: "Workout", completed: true },
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
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-blue-100 w-1/2 h-125 rounded-2xl shadow-xl/20 p-6">
        <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2 uppercase ">
          To do app
        </h1>

        <div className="flex mb-4 gap-2">
          <input
            className="flex-1 border-none border-amber-60 rounded-lg px-3 py-2 hover:outline-none"
            placeholder="Add a new todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3"
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
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </label>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                {editId === todo.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border rounded-lg px-3 py-1 text-black"
                    />
                    <button
                      onClick={() => {
                        modifyTodo(todo.id, editText);
                        setEditId(null);
                        setEditText("");
                      }}
                      className="bg-green-500 text-white mr-2 px-3 py-1 rounded-lg hover:bg-green-600"
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
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
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
  );
}
