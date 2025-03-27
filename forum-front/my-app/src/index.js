import React from 'react';
import ReactDOM from 'react-dom/client'; // Измените импорт
import './index.css';
import App from './App';

// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Используем createRoot() вместо render()
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
