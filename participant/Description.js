import React, { Component } from 'react'
import { connect } from 'react-redux'

import { finishDescription } from './actions'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import { ReadJSON, LineBreak, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text

const actionCreators = {
  finishDescription
}
const mapStateToProps = ({ description, is_finish_description, groupSize, maxGrazingNum }) => ({
  description,
  is_finish_description,
  groupSize,
  maxGrazingNum
})

class Description extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      slideIndex: 0,
    }
  }

  handleSlideIndex(value) {
    this.setState({
      slideIndex: value,
    })
  }

  handleNext() {
    this.setState({
      slideIndex: this.state.slideIndex + 1,
    })
  }

  handleBack() {
    this.setState({
      slideIndex: this.state.slideIndex - 1,
    })
  }

  render() {
    const { description, is_finish_description, groupSize, maxGrazingNum } = this.props
    if (!is_finish_description && this.state.slideIndex == description.length) {
      this.props.finishDescription()
    }
    let descList = [
      <div>
        <CardHeader
          title={multi_text["description"]["card"][0]}
          subtitle={multi_text["description"]["card"][1] + (description.length + 1) + "/" + (description.length + 1)}
        />
        <CardText expandable={false}>
          <p>{multi_text["description"]["card"][2]}</p>
          <div style={{textAlign: "center"}}>
            <CircularProgress size={140} thickness={5.0}/> 
          </div>
        </CardText>
      </div>
    ]
    return (
      <div>
        <Card style={{marginBottom: "5%"}}>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideIndex.bind(this)}
          >
            {
              description.map((desc, index) => (
                <div key={"div-" + String(index)}>
                  <CardHeader
                    key={"header-" + String(index)}
                    title={multi_text["description"]["card"][0]}
                    subtitle={multi_text["description"]["card"][1] + (index+1) + "/" + (description.length + 1)}
                  />
                  <CardText key={"text-" + String(index)} expandable={false}>
                    {(desc.id == 2) ? InsertVariable(desc.text, { groupNum: groupSize, grazingNum: maxGrazingNum }, null).split('\n').map(line => <p key={"text-lines-" + String(line)}>{line}</p>)
                    : desc.text.split('\n').map(line => <p key={"text-lines-" + String(line)}>{line}</p>)}
                  </CardText>
                </div>
              )).concat(descList)
            }
          </SwipeableViews>
        </Card>
        <RaisedButton
          label={multi_text["description"]["button"][0]}
          style={{float: "left"}}
          onClick={this.handleBack.bind(this)}
          disabled={this.state.slideIndex == 0}
        />
        <RaisedButton
          label={multi_text["description"]["button"][1]}
          style={{float: "right"}}
          onClick={this.handleNext.bind(this)}
          primary={true}
          disabled={this.state.slideIndex == description.length}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(Description)
