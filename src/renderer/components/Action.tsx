import React from "react";
import WorkingText from "renderer/classes/WorkingText";

interface actionState {
  paragraphs: string[]
}

interface actionProps {
  id: string
}

export default class Action extends React.Component<actionProps,actionState> {
  render() {
    return (
      <div className="action" id={this.props.id}>
        <WorkingText className="action" id={this.props.id}/>
      </div>
    )
  }
}
