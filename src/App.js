import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  reverseComplement = (query) => {
    query = query.replace(/[^atcgu]/gi, 'N');
    query = query.replace(/a/gi, '\\A');
    query = query.replace(/t/gi, '\\T');
    query = query.replace(/c/gi, '\\C');
    query = query.replace(/g/gi, '\\G');
    query = query.replace(/\\A/g, 'T');
    query = query.replace(/\\T/g, 'A');
    query = query.replace(/\\C/g, 'G');
    query = query.replace(/\\G/g, 'C');
    return query.split('').reverse().join('');
  };

  render() {
    const { query } = this.state;
    const reversed = this.reverseComplement(query);
    return (
      <div className="App">
        <header className="App-header">
          <p>Reverse Complement</p>
        </header>
        <article className="App-article">
          <p>Input your query DNA sequence (5' -> 3')</p>
          <textarea className="sequence-form" onInput={(e) => {
            this.setState({
              query: e.target.value
            });
          }}/>
          <p>Your reverse complement (5' -> 3')</p>
          <textarea className="sequence-form" value={reversed} readonly spellcheck="false"/>
        </article>
      </div>
    );
  }
};

