import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      queryType: false,
      copied: false
    };
  }

  reverseComplement = (query, queryType) => {
    if (!queryType) {
      query = query.replace(/a/gi, '\\A');
      query = query.replace(/t/gi, '\\T');
      query = query.replace(/\\T/g, 'A');
      query = query.replace(/\\A/g, 'T');
    } else {
      query = query.replace(/a/gi, '\\A');
      query = query.replace(/u/gi, '\\U');
      query = query.replace(/\\U/g, 'A');
      query = query.replace(/\\A/g, 'U');
    }
    query = query.replace(/c/gi, '\\C');
    query = query.replace(/g/gi, '\\G');
    query = query.replace(/\\G/g, 'C');
    query = query.replace(/\\C/g, 'G');
    return query.split('').reverse().join('');
  };

  queryTypeSet(queryType) {
    return (
      <p>Sequence Type : 
        <input type="radio" name="query-type" checked={queryType ? false : true} 
          onClick={(e) => {
            this.setState({
              query: this.state.query.split(/[^atcg]/gi).join(''),
              queryType: false
            });
          }}
          
        />DNA
        <input type="radio" name="query-type" checked={queryType ? true : false} 
          onClick={(e) => {
            this.setState({
              query: this.state.query.split(/[^aucg]/gi).join(''),
              queryType: true
            });
          }}
        />RNA
      </p>
    );
  }
  
  querySet(query, queryType) {
    if (!queryType) {
      return (
        <textarea className="sequence-form" spellcheck="false" value={query}
        onInput={(e) => {
          this.setState({
            query: e.target.value.split(/[^atcg]/gi).join('')
          });
        }}
        />
        );
      } else {
        return (
          <textarea className="sequence-form" spellcheck="false" value={query}
          onInput={(e) => {
            this.setState({
              query: e.target.value.split(/[^aucg]/gi).join('')
            });
          }}
          />
          );
        }
      }
      
  sequencePropertySet(query, queryType) {
    const nt = (query.split('').length);
    const ant = query.split(/[a]/gi).length - 1;
    const tnt = query.split(/[t]/gi).length - 1;
    const cnt = query.split(/[c]/gi).length - 1;
    const gnt = query.split(/[g]/gi).length - 1;
    const unt = query.split(/[u]/gi).length - 1;
    
    let GC;
    if (nt !== 0) {
      GC = (cnt + gnt) / nt * 100;
    } else {
      GC = 0;
    }
    GC = GC.toPrecision(3);

    if (!queryType) {
      return (
        <p>{nt} nt (A : {ant}, T : {tnt}, C : {cnt}, G : {gnt}) / GC : {GC}%</p>
      );
    } else {
      return (
        <p>{nt} nt (A : {ant}, U : {unt}, C : {cnt}, G : {gnt}) / GC : {GC}%</p>
      );
    } 
  }
      
  render() {
    const { query, queryType } = this.state;
    const reversed = this.reverseComplement(query, queryType);
    return (
      <div className="App">
        <header className="App-header">
          <p>Reverse Complement</p>
        </header>
        <article className="App-article">
          <p>Input your query sequence (5' -> 3')</p>
          {this.querySet(query, queryType)}
          {this.sequencePropertySet(query, queryType)}
          <Tabs>
            <TabList>
              <Tab className="tabarea">Reverse Complement</Tab>
              <Tab className="tabarea">Settings</Tab>
            </TabList>
            <TabPanel className="tabcontents">
              <p>Reverse complement (5' -> 3')</p>
              <textarea className="sequence-form reversed" value={reversed} readonly spellcheck="false"/>
              <CopyToClipboard text={reversed} onCopy={() => this.setState({copied: true})}>
                <button>Copy to clipboard</button>
              </CopyToClipboard>
            </TabPanel>
            <TabPanel className="tabcontents">
              <p>Settings</p>
              {this.queryTypeSet(queryType)}
            </TabPanel>
          </Tabs>
        </article>
      </div>
    );
  }
};
