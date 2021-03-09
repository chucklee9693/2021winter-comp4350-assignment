import { Component } from 'react';
import TitleBar from './components/TitleBar'
import Search from './components/Search'
import './styles/styles.css'

class App extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <Search />
      </div>
    );
  }
}


export default App;
