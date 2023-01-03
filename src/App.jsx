import { useState } from "react";
import Header from "./assets/components/Header";
import TodoComputed from "./assets/components/TodoComputed";
import TodoCreate from "./assets/components/TodoCreate";
import TodoFilter from "./assets/components/TodoFilter";
import TodoList from "./assets/components/TodoList";

const initialStateTodos = [
    { id: 1, title: "Complete Javascript Course", completed: true },
    { id: 2, title: "Go to the gym", completed: false },
    { id: 3, title: "10 minutes meditation", completed: false },
    { id: 4, title: "Pick up groceries", completed: false },
    { id: 5, title: "Complete todo app on Frontend Mentor", completed: false },
];

function App() {
    const [todos, setTodos] = useState(initialStateTodos);

    const createTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const countPendingTodo = todos.filter((todo) => !todo.completed).length;

    const [filter, setFilter] = useState("all");

    const sortComplete = () => {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')]
        "
        >
            <Header />

            <main className="container mx-auto mt-8 px-4">
                <TodoCreate createTodo={createTodo} />
                <TodoList
                    todos={sortComplete()}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                />
                <TodoComputed
                    countPendingTodo={countPendingTodo}
                    clearCompleted={clearCompleted}
                />
                <TodoFilter setFilter={setFilter} filter={filter} />
            </main>

            <footer className="mt-8 text-center dark:text-gray-400">
                {" "}
                drag and drop to reorder list
            </footer>
        </div>
    );
}

export default App;
