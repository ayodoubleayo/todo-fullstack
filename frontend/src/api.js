const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const API = {
  TODOS: `${BACKEND}/api/todos`
};
