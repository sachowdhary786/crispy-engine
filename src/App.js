import React from 'react';
import './App.css';

let searchTerm;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { repositories: [] };
  }

  render() {
    return (
      <div className="container">
        <h2>Repositories
      <form>
            <input type="text" className="searchbox" ref={(input) => { this.searchBox = input; }} />
            <button onClick={this.onClick}>Search</button>
          </form>
        </h2>
        <ul className="start">
          {this.state.repositories.map((item, index) => (
            <React.Fragment key={index}>
              <h3>
                {item.owner.login} / {item.name} <a href={item.owner.url} className="url">{item.owner.url}</a>
              </h3>
              <li className="bordered">
                <ul>
                  <li>
                    <p>{item.description}</p>
                    <h4 className="issues">Open Issues: <a href={'https://api.github.com/search/issues?q=repo:' + item.full_name}>{item.open_issues_count}</a></h4>
                    <h4>Number of watchers: <p>{item.watchers}</p></h4>
                    <h4>Last Push: <p>{item.pushed_at}</p></h4>
                  </li>
                </ul>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }

  onClick(event) {
    searchTerm = this.searchBox.value;
    let endpoint = 'https://api.github.com/search/repositories?&q=' + searchTerm;
    console.log(searchTerm);
    fetch(endpoint)
      .then(blob => blob.json())
      .then(response => {
        this.setState({ repositories: response.items });
      });
    event.preventDefault();
  }
}

export default App;
