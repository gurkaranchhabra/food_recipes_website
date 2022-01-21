import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const[search,setSearch] = useState('chicken');
  const[results,setResults] = useState([]);

  const API_ID = '7ac5eab6';
  const API_KEY = 'a707d1b78ab46ad44ca90b0af2affe70';
  const searchURL = `https://api.edamam.com/search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`;

  useEffect(() => {
    axios.get(searchURL).then(res => {
      setResults(res.data.hits)
    })
  },[])

  const onInputChange = (e) => {
        setSearch(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
      axios.get(searchURL).then(res => {
        setResults(res.data.hits)
      })
  }

  return(
    <div className="App">
      <form onSubmit={(e) => onSubmitForm(e)}>
      <input
          type="text"
          className="searchBox"
          placeholder="Search Your Recipe..."
          value={search}
          onChange={(e) => onInputChange(e)}
        />
        <button type='submit' className='searchButton'>Search</button>
      </form>
        <div className="posts">
      {results.length > 0 ? results.map(res => {
        return(
          <div className="recipes">
            <a href={res.recipe.url}>
              <img src={res.recipe.image}/>
              </a>
              <h3>{res.recipe.label}</h3>
              <a href={res.recipe.url}>
                <button>View link</button>
              </a>
          </div>
        )
      }): ''}
      </div>
    </div>
  );
}

export default App;
