import { useState, useEffect } from 'react';
import todosData from '../../data/todos.json';

interface HomeProps {
  initialTodos: string[];
}

export default function Home({ initialTodos }: HomeProps) {
  const [todos, setTodos] = useState<string[]>(initialTodos);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/admin/config.yml');
      if (res.status === 200) {
        const updatedTodos = await res.json();
        setTodos(updatedTodos.todos);
      }
    };
    fetchTodos();
  }, []);

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      initialTodos: todosData.todos,
    },
  };
}