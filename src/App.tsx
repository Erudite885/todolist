import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';

interface TodoItem {
  id: string;
  text: string;
  category: string;
  onDeleteTodo: (id: string) => void;
}

const App: React.FC = () => {
  // Load todos from local storage on component mount
  const initialTodos: TodoItem[] = JSON.parse(localStorage.getItem('todos') || '[]') || [];
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>(initialTodos);

  // Save todos to local storage whenever todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo:TodoItem) => {

    setTodos(prevTodos => [todo, ...prevTodos]);
    setFilteredTodos(prevFilteredTodos => [todo, ...prevFilteredTodos]);
   
  };

  const searchTodo = (text: string, category: string) => {
   const filtered = todos.filter(todo =>
     todo?.text?.toLowerCase().includes(text.toLowerCase()) &&
     (category === '' || todo?.category === category)
);
setFilteredTodos(filtered);


  };

  const copyTodo = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`"${text}" copied to clipboard!`);
  };

  const deleteTodo = (id: string) => {
  const updatedTodos = todos.filter(todo => todo.id !== id);
  setTodos(updatedTodos);
  setFilteredTodos(updatedTodos);
};

  return (
    <div className="appContainer">
      <h1 className="appHeader">Todo List</h1>
      <Todo
  onAddTodo={addTodo}
  onSearchTodo={searchTodo}
        onCopyTodo={copyTodo}
        setFilteredTodos={setFilteredTodos}
  filteredTodos={filteredTodos}
  onDeleteTodo={deleteTodo}
/></div>
  );
};

export default App;
