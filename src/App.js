import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import './style.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
      this.state = {
      characters: [],
    };
  }

    componentDidMount() {
      axios.get(`https://breakingbadapi.com/api/characters`)
        .then(res => {
          const characters = res.data;
          this.setState({ characters });
        })
    }

    render(){
      return(
        <div className='container'>
        {this.state.characters.map((characters) =>{
          return(
            <Card>
              <Image src={characters.img} wrapped ui={false}/>
            
            <Card.Content>
              <Card.Header>{characters.name}</Card.Header>
              <Card.Meta>{characters.nickname}</Card.Meta>
              <Card.Meta>{characters.birthday}</Card.Meta>
              <Card.Description>{characters.occupation}</Card.Description>
            </Card.Content>
          </Card>
  
          );
  
        })}
  
        </div>
  
  
  
      );
    }

    



  }
