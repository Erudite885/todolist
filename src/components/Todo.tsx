import React, { useState } from 'react';
import { v4 as uuid } from "uuid";

interface TodoItem {
  id: string;
  text: string;
  category: string;
  onDeleteTodo: (id: string) => void;
}

interface TodoProps {
  onAddTodo: (todo: TodoItem) => void;
  onSearchTodo: (text: string, category: string) => void;
  onCopyTodo: (text: string) => void;
    filteredTodos: TodoItem[];
      setFilteredTodos:React.Dispatch<React.SetStateAction<TodoItem[]>>;
  onDeleteTodo: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ onAddTodo, onSearchTodo, onCopyTodo, filteredTodos, setFilteredTodos, onDeleteTodo }) => {
  const [todoText, setTodoText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    //  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearchTodo(e.target.value, category);
  };

const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedCategory = e.target.value;
  setCategory(selectedCategory);
    onSearchTodo(searchText, selectedCategory);

};

  const handleAddTodo = () => {
    if (todoText.trim() !== '' && category.trim() !== '') {
      const newTodo: TodoItem = { id: uuid(), text: todoText, category, onDeleteTodo };
      onAddTodo(newTodo);
        setTodoText('');
        setCategory('');
        onSearchTodo('', '');
        setFilteredTodos(prevFilteredTodos => [newTodo, ...prevFilteredTodos])
    }
  };

  const handleCopyTodo = (text: string) => {
    onCopyTodo(text);
  };

  return (
    <div className="todoContainer">
      <input
        type="text"
        className="addTodoInput"
        placeholder="Add a new todo"
        value={todoText}
        onChange={handleInputChange}
      />
      <div className="categories">
              <select className="categoryOptions" value={category}
                  onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <button className="addTodoBtn" onClick={handleAddTodo}>
        Add Todo
      </button>
      <input
        type="text"
        className="searchInput"
        placeholder="Search todos"
        value={searchText}
        onChange={handleSearchInputChange}
      />
      <ul className="listItems">
        {filteredTodos.map((todo, index) => (
          <div className="listItemsContainer" key={todo.id || `todo-${index}`}>
            <li className="listItem">
              {todo.text} - {todo.category}
            </li>
            <div className='btnContainer'>
<button className="copyBtn" onClick={() => handleCopyTodo(todo.text)}>
              Copy
                </button>
             <button className="deleteBtn" onClick={() => onDeleteTodo(todo.id)}>
              Delete
            </button>
            </div>
            
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todo;