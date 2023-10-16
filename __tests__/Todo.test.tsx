import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../src/components/Todo';

describe('Todo', () => {
  test('renders todo item', () => {
    const mockTodo = {
      id: '1',
      text: 'Todo Item',
      category: 'Personal',
      onDeleteTodo: jest.fn(),
    };

    render(
      <Todo
        onAddTodo={jest.fn()}
        onSearchTodo={jest.fn()}
        onCopyTodo={jest.fn()}
        filteredTodos={[mockTodo]}
        setFilteredTodos={jest.fn()}
        onDeleteTodo={mockTodo.onDeleteTodo}
      />
    );

    const todoItem = screen.getByText('Todo Item');
    expect(todoItem).toBeInTheDocument();
  });

  test('copies todo text', () => {
    const mockTodo = {
      id: '1',
      text: 'Todo Item',
      category: 'Personal',
      onDeleteTodo: jest.fn(),
    };

    const copyTodoMock = jest.fn();
    jest.spyOn(navigator.clipboard, 'writeText');

    render(
      <Todo
        onAddTodo={jest.fn()}
        onSearchTodo={jest.fn()}
        onCopyTodo={copyTodoMock}
        filteredTodos={[mockTodo]}
        setFilteredTodos={jest.fn()}
        onDeleteTodo={mockTodo.onDeleteTodo}
      />
    );

    const copyBtn = screen.getByText('Copy');
    fireEvent.click(copyBtn);

    expect(copyTodoMock).toHaveBeenCalledWith('Todo Item');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Todo Item');
    expect(window.alert).toHaveBeenCalledWith('"Todo Item" copied to clipboard!');
  });

  // Add more tests for other functionalities as needed
});