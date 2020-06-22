import React, { useState } from 'react';
import axios from 'axios';

/** Components **/
import { TestComponent } from '../../components';
/** Reactstrap **/
import { Button } from 'reactstrap';
/** Constants **/
import { testGreeting, GitHub_API, resultLimit } from '../../constants';
import UserCard from '../../components/UserCard/UserCard';

const TestView = () => {
  const [results, setResults] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const getRepos = async e => {
    e.preventDefault();
    const response = await axios.get(GitHub_API);
    setResults(response.data);
    console.log('Clicked', response.data);
  };

  const handleChange = e => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.get(
      GitHub_API + `/users?q={${searchQuery}}`
    )
    .then(response => {
      const users = response.data
      console.log(users)
      setUsers(users)
    })
    .catch(err => console.log('Error!', err));
  }

  const displayState = JSON.stringify(results);
  const displayUsers = users.map(user => {
    return <UserCard key={user.node_id} {...user}></UserCard>
  })

  return (
    <div>
      From View.js
      <h1>{testGreeting}</h1>
      <TestComponent />
      <Button
        onClick={getRepos}>
        Get Endpoints
      </Button>


      <form onSubmit={handleSubmit}>
        <input
        value={searchQuery}
        onChange={handleChange}/>
        <button type="submit">search</button>
      </form>

      {displayUsers}
    </div>
  )
}

export default TestView


// stars `/search/repositories?q=stars:>100000`