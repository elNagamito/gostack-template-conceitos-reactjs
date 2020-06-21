import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api.js";

function App() {

  const [repositories, setRepo] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepo(response.data)
    })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      techs: ['NodeJS', 'React', 'ReactNative']
    });

    const repository = response.data;
    setRepo([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id);

    const repoList = repositories.filter(repoList => repoList.id !== id)
    setRepo([...repoList]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}> 
            <div id="listContainer">
              <h4>{repository.title}</h4>
              <div id="techs">
              {repository.techs.map(techs =>
                  <h5 id='techName'>{techs}</h5>
              )}
              </div>
            </div>
            <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
