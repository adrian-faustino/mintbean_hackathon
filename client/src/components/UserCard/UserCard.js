import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GitHub_API, resultLimit, CLIENT_ID, CLIENT_SECRET } from '../../constants';
import './UserCard.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
});


const UserCard = props => {
  const { login, avatar_url, html_url, followers_url, following_url, url } = props;

  const [followers, setFollowers] = useState('');
  const [repos, setRepos] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  
  const getFollowers = async () => {
    var myHeaders = new Headers();
    const authHeader = "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET);
    
    myHeaders.append("Authorization", authHeader);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('User =>', result)
        const { followers, public_repos, created_at } = result;
        const _createdDate = formatDate(created_at);
        setFollowers(followers);
        setRepos(public_repos);
        setCreatedAt(_createdDate);
      })
      .catch(error => console.log('error', error));
  }

// Helper
function formatDate(date) {
  let result = date
                .split('T')[0]
                .split('-');
  const [YEAR, MONTH, DAY] = result;
  const _toMonth = num_to_month(MONTH);
  return `${_toMonth} ${DAY}, ${YEAR}`;
}

function num_to_month(num) {
  return [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][num - 1];
}


  useEffect(() => { 
    url && getFollowers();
  }, [])


  const classes = useStyles();

  return (
    <div className="UserCard__outer-container">
      <Card className="UserCard__container">
        <CardActionArea
          className="UserCard__action-area">
          <CardMedia
            className="UserCard__media"
            image={avatar_url}
          />
          <CardContent
            className="UserCard__content">
            <Typography gutterBottom variant="h5" component="h2">
              {login}
            </Typography>
            <hr/>
            <Typography gutterBottom variant="h5" component="h2">
              {`Followers: ${followers}`}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {`Repos: ${repos}`}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {`Created at: ${createdAt}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          className="UserCard__actions">
          <Button
            className="UserCard__button"
            size="small" color="primary">
            <a 
              href={html_url}
              target="_blank">github
            </a>
          </Button>
        </CardActions>
      </Card>
    </div>
  )
};

export default UserCard;
