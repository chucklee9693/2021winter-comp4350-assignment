import { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  appbar: {
    background : '#525252',
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    marginBottom: "10px"
  },
}

class TitleBar extends Component {

  render() {
    return (
      <AppBar style={styles.appbar} position="static">
        <Toolbar>
          <Typography variant="h4">
            COMP4350 Assignment
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default TitleBar