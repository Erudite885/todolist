import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  test('renders todo list', () => {
    render(<App />);
    const todoListElement = screen.getByText(/Todo List/i);
    expect(todoListElement).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<App />);
    const addTodoInput = screen.getByPlaceholderText('Add a new todo');
    const addTodoBtn = screen.getByText('Add Todo');

    fireEvent.change(addTodoInput, { target: { value: 'New Todo' } });
    fireEvent.click(addTodoBtn);

    const todoItem = screen.getByText('New Todo');
    expect(todoItem).toBeInTheDocument();
  });

  test('deletes a todo', () => {
    render(<App />);
    const addTodoInput = screen.getByPlaceholderText('Add a new todo');
    const addTodoBtn = screen.getByText('Add Todo');
    const deleteBtn = screen.getByText('Delete');

    fireEvent.change(addTodoInput, { target: { value: 'New Todo' } });
    fireEvent.click(addTodoBtn);

    const todoItem = screen.getByText('New Todo');
    expect(todoItem).toBeInTheDocument();

    fireEvent.click(deleteBtn);

    expect(todoItem).not.toBeInTheDocument();
  });

  // Add more tests for other functionalities as needed
});