import React, { Fragment, Component} from 'react';
import { Card, Icon, Image, Input } from 'semantic-ui-react';
import axios from 'axios';
import './style.css';


  function searchingFor(term){
    return function(x){
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }




class App extends Component {
  constructor(props){
    super(props);
      this.state = {
      characters: [],
        term: ''
    };

      this.searchHandler = this.searchHandler.bind(this);
    
  }

  componentDidMount() {
    axios.get(`https://breakingbadapi.com/api/characters`)
      .then(res => {
        const characters = res.data;
        this.setState({ characters });
      })


  }

  searchHandler(event){
    this.setState({term: event.target.value})
  }

  render(){
    const {term, characters} = this.state;
    return(
      <div className="container">
        <form>
          <input type="text" onChange={this.searchHandler} value={term}/>
        </form>
        {characters.filter(searchingFor(this.state.term)).map(characters => {
          return(
             <div class="ui card">
               <Card>
                      <Image src={characters.img} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{characters.name}</Card.Header>
                        <Card.Meta>
                          <span><Icon name='birthday'/> {characters.birthday} | <Icon name="user"/>{characters.nickname}</span>
                        </Card.Meta>
                        <Card.Description>
                          {characters.occupation}
                        </Card.Description>
                      </Card.Content>
                    </Card>
              </div>
          )
        }
        )}
      </div>    )
  }
  
}
  export default App;