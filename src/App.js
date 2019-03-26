import React from 'react';
import * as Actions from './actions/Actions'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
    };
  }
  render() {
    let countries = Actions.GetAll();
    console.log(countries);
    this.setState(
        countries,
    );
    return (
      <div className="App">
        <h1>hello worlds</h1>
      </div>
    );
  }
}
