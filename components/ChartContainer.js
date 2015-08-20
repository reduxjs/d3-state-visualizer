import React from 'react';
import Textarea from 'react-textarea-autosize';
import pretty from 'json-pretty';
import { assign } from 'lodash/object'

class ChartContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: props.appState,
      prettyAppState: pretty(assign({}, props.appState))
    }
  }

  onTextAreaChange(e) {
    if (!e.target.value) return;

    try {
      const appState = JSON.parse(e.target.value);
      const prettyAppState = pretty(assign({}, appState));

      this.setState({ appState, prettyAppState });
      e.target.value = prettyAppState;
    } catch (err) {
    }
  }

  render() {
    const Chart = React.cloneElement(React.Children.only(this.props.children), {
      state: this.state.appState
    })

    return (
      <div>
        <h3>Tweak your application state below...</h3>
        <Textarea
          defaultValue={this.state.prettyAppState}
          onChange={this.onTextAreaChange.bind(this)}
          cols={100}
          minRows={5}
          maxRows={40}
          style={{ fontSize: '0.8em' }}
          ></Textarea>

        <h3>Watch the collapsible tree below update accordingly ☺</h3>
        {Chart}
      </div>
    )
  }
}

export default ChartContainer;
