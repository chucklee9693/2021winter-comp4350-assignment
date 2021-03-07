import { Component } from 'react';
import TitleBar from './components/TitleBar'
import SearchBox from './components/SearchBox'
import './styles/styles.css'

class App extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <SearchBox />
      </div>
    );
  }

}

export default App;
