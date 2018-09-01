import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repos from './components/Repos.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }


  componentWillMount() {
     var x = this.setState.bind(this);
    $.get('/repos', function(result) {
      console.log('what are my client side results', result)
      x({
        repos: result
      });
    });
  }

  

  search (term) {
    console.log(`${term} was searched`);

    var x = this.setState.bind(this);
    $.ajax({
      method: "POST",
      url: '/repos',
      data: {results:term}, 
      success: function(data) {
      $.get('/repos', function(result) {
        x({
          repos: result
        });
      });
    }
  });
}

  render () {
    
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/> 
        {this.state.repos.map(function(ele, i, arr) { 
          return <Repos element={ele}/>
         })}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));