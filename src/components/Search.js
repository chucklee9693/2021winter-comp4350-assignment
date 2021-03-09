import { Component } from 'react';
import { connect } from "react-redux";

// import some necessary mui components
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Chip from '@material-ui/core/Chip';

// import actions
import { 
  setTag,
  setSearchClicked,
  setDataRetrieved,
  setResults,
  setResponseTime,
} from '../actions/search'

import InstructionCard from './InstructionCard'
import axios from "axios";


const styles = {
  paper: {
    display: 'flex',
    backgroundColor: '#ebebeb',
    margin: '50px 25%',
  },
  input: {
    width: 'calc(100% - 48px * 2)',
    padding: '0px 20px',
  },
  accordion: {
    margin: '8px',
  },
  accordionsummary: {
    backgroundColor: '#cccccc',
  },
  accordiondetails: {
    backgroundColor: '#ebebeb',
  },
  blockdisplay: {
    display: 'block'
  },
  flexdisplay: {
    display: 'flex'
  },
  divider:{
    border: '2px dashed #525252'
  },
  tag: {
    margin: '0px 4px 2px 0px',
    color: '#525252'
  }
}

class Search extends Component {

  componentWillUnmount() {
    this.resetComponent()
  }

  handleTagInput = (event) => {
    this.props.setTag(event.target.value)
  }

  resetComponent = () => {
    this.props.setTag("")
    this.props.setSearchClicked(false)
    this.props.setDataRetrieved(false)
    this.props.setResults([])
    this.props.setResponseTime("")
  }

  handleReset = () => {
    this.resetComponent()
  }

  handleSearch = () => {
    if (this.props.tag.trim() === "") {
      this.props.setSearchClicked(false)
      this.props.setTag("")
    }
    else {
      this.props.setSearchClicked(true)
      this.retrieveData()
    }
  }

  retrieveData = () => {
    this.props.setDataRetrieved(false)
    let results = []

    // this filter value ensures we get necessary information, i.e. body, answer, comments...
    const filterValue = '!2u1ayf0PbeASsUMztgNQI9yn00ut6WVLhCpMVT7PpD'

    // we only get the first 10 results after re-ordering
    const pageSize = 10;

    // 10 newest questions
    const tenNewestUrl = 'https://api.stackexchange.com/2.2/questions?pagesize=' + pageSize + '&order=desc&sort=creation&tagged=' + encodeURIComponent(this.props.tag) + '&site=stackoverflow&filter=' + filterValue


    const toDate = Math.round((new Date()).getTime()/1000)
    const fromDate = toDate - 7 * 24 * 60 * 60
    // 10 most voted questions in the past week
    const tenMostVotedUrl = 'https://api.stackexchange.com/2.2/questions?pagesize=' + pageSize + '&fromdate=' + fromDate + '&todate=' + toDate +'&order=desc&sort=votes&tagged=' + encodeURIComponent(this.props.tag) + '&site=stackoverflow&filter=' + filterValue

    // time stamp before request
    const beforeRequest = (new Date()).getTime()
    axios.all([
      axios.get(tenNewestUrl),
      axios.get(tenMostVotedUrl)
    ])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]

        responseOne.data.items.forEach(element => {
          results.push(element)
        })

        responseTwo.data.items.forEach(element => {
          results.push(element)
        })

        results.sort((a,b) => {
          return b.creation_date - a.creation_date
        })

        this.renderResults(results)

        // get time after receiving response
        const afterRequest = (new Date()).getTime()

        this.props.setResponseTime(String((afterRequest - beforeRequest)/1000))
        this.props.setDataRetrieved(true)
      })
    )
    .catch(errors => {
      console.error(errors)
    })
  }

  renderResults = (items) => {
    let results = []

    if (items.length === 0) {
      results.push(
        <div key="no result">
          <Typography variant="h6" style={{textAlign: 'center'}}>
            <b>No result found with tag - {this.props.tag}</b>
          </Typography>
        </div>
      )
    }
    else {
      items.forEach(element => {
        results.push(
          <div key={element.question_id}>

            <Accordion style={styles.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={element.question_id}
                style={styles.accordionsummary}
              >
                <div style={styles.blockdisplay}>

                  {/* question title */}
                  <Typography variant="h6">
                    <div dangerouslySetInnerHTML={{__html: element.title}} />
                  </Typography>

                  {/* tags on the question */}
                  { 
                    element.tags ? 
                    (
                      <div style={styles.flexdisplay}>
                        {this.renderTags(element.tags)}
                      </div>
                    ) : (
                      <div />
                    )
                  }
      
                    
                  {/* votes and creation date on question */}
                  <div style={styles.flexdisplay}>
                    <ThumbUpTwoToneIcon fontSize='small' />&nbsp;<Typography variant="body2">Vote: {element.score}</Typography>&emsp;
                    <DateRangeTwoToneIcon fontSize='small' />&nbsp;<Typography variant="body2">Creation Date: {this.formatDate(element.creation_date)}</Typography>
                  </div>

                </div>
              </AccordionSummary>

              <AccordionDetails style={styles.accordiondetails}>

                <div style={styles.blockdisplay}>

                  {/* question description */}
                  <Typography variant="h6"><b>Description</b></Typography>
                  <div dangerouslySetInnerHTML={{__html: element.body}} />

                  {/* comments on question */}
                  { 
                    element.comments ?
                    (
                      <div>
                        <hr style={styles.divider} />
                        <Typography variant="h6"><b>Comment(s) on Question</b></Typography>
                        {this.renderComments(element.comments)}
                      </div>
                    ) : (
                      <div />
                    )
                  }

                  {/* Answers */}
                  {
                    element.answer_count > 0 ?
                    (
                      <div>
                        {this.renderAnswers(element.answers)}
                      </div>
                    ) : (
                      <div />
                    )
                  }

                </div>

              </AccordionDetails>
            </Accordion>

          </div>
        )
      })
    }

    this.props.setResults(results)

  }

  renderTags = (tags) => {
    let result = []

    tags.forEach(element => {
      result.push(
        <div key={element}>
          <Chip style={styles.tag} variant="outlined" size="small" label={element}/>
        </div>
      )
    })

    return result
  }

  renderAnswers = (answers) => {
    let result = []
    let i = 0;
    answers.forEach(element => {
      i++;
      result.push(
        <div key={element.answer_id} style={styles.blockdisplay}>
          <hr style={styles.divider} />
          {/* answer body */}
          <Typography variant="h6"><b>Answer {i}</b></Typography>
          <div dangerouslySetInnerHTML={{__html: element.body}} />

          {/* votes and creation date on answer */}
          <div style={styles.flexdisplay}>
            <ThumbUpTwoToneIcon fontSize='small'/>&nbsp;<Typography variant="body2">Vote: {element.score}</Typography>&emsp;
            <DateRangeTwoToneIcon fontSize='small'/>&nbsp;<Typography variant="body2">Creation Date: {this.formatDate(element.creation_date)}</Typography>
          </div>

          <br />

          {/* comments on answer */}
          {
            element.comments ? 
            (
              <div>
                <Typography variant="h6"><b>Comment(s) on Answer {i}</b></Typography>
                {this.renderComments(element.comments)}
              </div>
            ) : (
              <div />
            )
          }

        </div>
      )
    })

    return result
  }

  renderComments = (comments) => {
    let result = []
    comments.forEach(element => {
      result.push(
        <div key={element.comment_id} style={styles.blockdisplay}>
          {/* comment body */}
          <div dangerouslySetInnerHTML={{__html: element.body}} />

          {/* votes and creation date on comment */}
          <div style={styles.flexdisplay}>
            <ThumbUpTwoToneIcon fontSize='small'/>&nbsp;<Typography variant="body2">Vote: {element.score}</Typography>&emsp;
            <DateRangeTwoToneIcon fontSize='small'/>&nbsp;<Typography variant="body2">Creation Date: {this.formatDate(element.creation_date)}</Typography>
          </div>

          <br />

        </div>

      )
    })

    return result
  }

  formatDate = (data) => {
    const date = new Date(data*1000)
    return date.toUTCString()
  }

  render() {
    return (
      <div>
        {/* search box */}
        <Paper style={styles.paper}>
          <InputBase
            style={styles.input}
            placeholder="Search tags"
            inputProps={{ 'aria-label': 'search stack overflow tags' }}
            value={this.props.tag}
            onChange={this.handleTagInput}
          />
          <IconButton
            disabled={this.props.tag === ""}
            onClick={this.handleReset}
            aria-label="reset"
          >
            <HighlightOffIcon />
          </IconButton>
          <hr />
          <IconButton
            onClick={this.handleSearch} 
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        
        { this.props.searchClicked ?
          (
            this.props.dataRetrieved ?
            (
              <Container maxWidth='xl'>
                {this.props.results}
                <Typography variant="h6" style={{textAlign: 'center'}}>
                  <b>This search took {this.props.responseTime} seconds.</b>
                </Typography>
              </Container>
            ) : (
              <div style={{ textAlign: "center" }}>
                <CircularProgress  />
              </div>
            )
          ) : (
            <InstructionCard />
          )
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTag: (item) => {
      dispatch(setTag(item))
    },
    setSearchClicked: (item) => {
      dispatch(setSearchClicked(item))
    },
    setDataRetrieved: (item) => {
      dispatch(setDataRetrieved(item))
    },
    setResults: (item) => {
      dispatch(setResults(item))
    },
    setResponseTime: (item) => {
      dispatch(setResponseTime(item))
    },
  }
}

function mapStateToProps(state) {
  return {
      tag: state.search.tag,
      searchClicked: state.search.searchClicked,
      dataRetrieved: state.search.dataRetrieved,
      results: state.search.results,
      responseTime: state.search.responseTime,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);