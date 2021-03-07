import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {connect} from "react-redux";
import {
  setTag,
} from '../actions/searchBox'

const styles = {
  paper: {
    backgroundColor: '#dedede',
    margin: '50px 25%',
  },
  input: {
    width: 'calc(100% - 47.97px)',
    padding: '0px 20px',
  },
}
class SearchBox extends Component {

  handleTagInput = (event) => {
    this.props.setTag(event.target.value)
  }

  render() {
    return (
      <Paper style={styles.paper}>
        <InputBase
          style={styles.input}
          placeholder="Search tags"
          inputProps={{ 'aria-label': 'search stack overflow tags' }}
          onChange={this.handleTagInput}
        />
        <IconButton 
          onClick={() => { alert('clicked') }} 
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTag: (item) => {
        dispatch(setTag(item))
    },
  }
}

function mapStateToProps(state) {
  return {
      tag: state.searchBox.tag,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);