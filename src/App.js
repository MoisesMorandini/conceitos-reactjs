import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    });    
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Meu titulo ${ Date.now() }`,
      url: `Minha url ${ Date.now() }`,
      techs: ["NodeJs", "React"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);  
      const repositoryRemoved = repositories.findIndex(repository => repository.id===id);
      const repos = repositories;
      repos.splice(repositoryRemoved, 1);
      setRepositories([...repos]);
    } catch (error) {
      console.log('Falha') 
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository=>
            (
              <li key={repository.id}>
                {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            )
          )
        }
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
