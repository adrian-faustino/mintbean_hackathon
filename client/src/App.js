import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

/** Views **/
import { TestView } from './views';
/** Components **/
import { UserCard } from './components';
/** Constants **/
import { GitHub_API, resultLimit, CLIENT_ID, CLIENT_SECRET } from './constants';
/** Reactstrap **/
import { Button, ButtonGroup } from 'reactstrap';


function App() {
  const [mostFollowers, setMostFollowers] = useState([]);
  const [oldestAccounts, setOldestAccounts] = useState([]);
  const [display, setDisplay] = useState('');

  var myHeaders = new Headers();
  const authHeader = "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET);
  
  myHeaders.append("Authorization", authHeader);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  // Get list of users with most stars
  // useEffect(async () => {
  //   const response = await axios.get(
  //     GitHub_API + '/search/users?q=' +
  //     'stars:>10000'
  //   );
  //   const users = response.data.items;
  //   // console.log('List of users', users);
  //   console.log('One user', users[0])
  //   setMostFollowers(users);
  // }, []);

  // get oldest accounts
  const handleOldestAccounts = async e => {
    e.preventDefault();
    setDisplay('OLDEST_ACCOUNTS');
    if (oldestAccounts.length !== 0) return;
    // const query = GitHub_API + '/users?since=1';
    // console.log(query)
    // const response = await axios.get(query);
    // const users = response.data.items;
    // console.log('List of users', users);
    // setMostFollowers(users);


    const query = GitHub_API + '/search/users?q=' + 'created:<2008-01-21&sort=created&order=desc';
    console.log('Query', query);
    fetch(query, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('List =>', result);
        setOldestAccounts(result.items)
      })
      .catch(error => console.log('error', error));
  };

  const handleMostRepos = async e => {
    e.preventDefault()
    console.log(requestOptions)
  };

  const handleMostFollowers = async e => {
    e.preventDefault();
    setDisplay('MOST_FOLLOWERS');
    if (mostFollowers.length !== 0) return;
    const query = GitHub_API + '/search/users?q=' + 'followers:%3E100&sort=followers&order=desc&';

    fetch(query, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('List =>', result);
        setMostFollowers(result.items)
      })
      .catch(error => console.log('error', error));
  }


  // Render logic
  const displayMostFollowers = mostFollowers.map(user => {
    return (
      <UserCard {...user} key={user.node_id}></UserCard>
    )
  })

  const displayOldestAccounts = oldestAccounts.map(user => {
    return (
      <UserCard {...user} key={user.node_id}></UserCard>
    )
  })

  return (
    <div className="App">
      {/* <TestView /> */}
      <div className="App__title">
        <h1>GitHub Hall of Fame</h1>
      </div>

      <ButtonGroup className="App__buttonGroup">
        <Button
          onClick={handleMostRepos}>
          Most repos
        </Button>
        <Button
          onClick={handleMostFollowers}>
          Most followers
        </Button>
        <Button
          onClick={handleOldestAccounts}>
          Oldest Accounts
        </Button>
      </ButtonGroup>

      
      <section className="App__results-container">
        {display === "MOST_FOLLOWERS" && 
          displayMostFollowers}
        {display === "OLDEST_ACCOUNTS" &&
          displayOldestAccounts}
      </section>
    </div>
  );
}

export default App;
