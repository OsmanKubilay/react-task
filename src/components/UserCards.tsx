
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }



const Users: React.FC = () => {
  const [user, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch(e => {console.log(e.message)})
  }, []);

  return (
    <div>
      <Typography  paragraph>
        Users List
      </Typography>
     
      
      <Grid container spacing={4}>
        {user.map((users) => {
          return (
            <Grid item sm={3}>
              <Card >
                <CardContent>
                  <Typography  gutterBottom key={users.name}>
                    Name: {users.name}
                  </Typography>
                  <Typography key={users.email}>
                    Email: {users.email}
                  </Typography>
                  <Button variant="outlined" color="primary" size="medium">
                    <Link to={`https://jsonplaceholder.typicode.com/users/${users.id}`}>Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Users;
