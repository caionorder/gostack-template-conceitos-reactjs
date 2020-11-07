import React, { useState, useEffect } from 'react';

// API
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect( () => {
    api.get('repositories').then(response => {
        setRepositories(response.data)
    })
  } , [] )

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
        title: `Repository test - ${Date.now()}`,
        url: 'https://github.com....',
        techs: ["Node.js", "..."]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id != id 
    ))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositories => (
          <li key={repositories.id}>
            {repositories.title}
            <button onClick={() => handleRemoveRepository(repositories.id)}> Remover </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
