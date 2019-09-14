import React, { Fragment, Component} from 'react';
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react';
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
        term: '',
        currentPage: 1,
        charactersPerPage: 10
    };

      this.searchHandler = this.searchHandler.bind(this);
      this.handleClick = this.handleClick.bind(this);
    
  }

  componentDidMount() {
    axios.get(`https://breakingbadapi.com/api/characters`)
      .then(res => {
        const characters = res.data;
        this.setState({ characters });
      })


  }

  handleClick(event){
    this.setState({currentPage: Number(event.target.id)});
  }

  searchHandler(event){
    this.setState({
      term: event.target.value,
      currentPage: 1
    })
  }

  render(){
    const {term, characters, currentPage, charactersPerPage} = this.state;
    var result = characters.filter(searchingFor(this.state.term));
    var indexOfLastCharacters = currentPage * charactersPerPage;
    var indexOfFirstCharacters = indexOfLastCharacters - charactersPerPage;
    var currentPageCharacters = result.slice(indexOfFirstCharacters, indexOfLastCharacters);

    var pageNumbers = [];
    for (let i = 1; i <= Math.ceil(result.length / charactersPerPage); i++){
      pageNumbers.push(i);
    }

    var renderPagerNumbers = pageNumbers.map(number => {
      return(
        <Button id={number} onClick={this.handleClick}>{number}</Button>
      );

    });
    

    return(
      <div className="container">
        <form>
          <Input icon='search' placeholder="Pesquisar" type="text" onChange={this.searchHandler} value={term}/>
        </form>
        <div>{renderPagerNumbers}</div>
        {currentPageCharacters.map(characters => {
          return(
             //<div class="ui card">
               <Card id="card">
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
              //</div>
          )
        }
        )}

      </div>    
      )
  }
  
}
  export default App;