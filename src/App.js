import React from 'react';
import Table from "./components/Table";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Table/>
        </div>
    );
  }
}