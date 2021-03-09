import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin: '0px 25%',
    backgroundColor: '#ebebeb',
  }
}

class InstructionCard extends Component {

  render() {
    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6">
            <b>Tips</b>
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                Enter a tag you want to search then click the search button.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                To search with multiple tags, use a semi-colon to separate each tag. <br /> For example, searching with A;B will return questions that have tags of both A and B.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Passing more than 5 tags will always return 0 result.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                The search will return a merged list of up to 10 newest questions and 10 most voted questions in the past week related to the tag(s) sorted by creation date descendingly.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                The response time will be shown below the questions.
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    )
  }
}

export default InstructionCard