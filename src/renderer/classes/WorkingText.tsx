import React from "react";


//||||||||||||||||||||||||||||||||||||||||||||||\\
//               !IMPORTANT NOTE!               \\
//||||||||||||||||||||||||||||||||||||||||||||||\\
// This class, and the others in the 'classes'  \\
// folder are not meant to be used directly,    \\
// but rather extended/implemented by other,    \\
// more usable classes. Highly recommend not    \\
// putting this class directly into anything.   \\
//||||||||||||||||||||||||||||||||||||||||||||||\\


interface TextState {
  content: string,
  inputting: boolean,
  additional: object,
  mousedown: boolean,
  focused: boolean
}

interface TextProps {
  className: string,
  id: string,
  additional?: object
}

export default class WorkingText extends React.Component<TextProps,TextState> {

  // Non state variables \\

  inputRef: React.RefObject<unknown>;

  // Constructor \\

  constructor(props : TextProps) {
    super(props);
    this.state = {
      content: "boop",
      inputting: false,
      additional: {},
      mousedown: false,
      focused: false
    }
    this.inputRef = React.createRef();
  }

  // 'Private' methods \\

  _startInput(_evt: any) : void { //TODO: make the type of evt in all of these not any? maybe? idk i can think of a scenario where that actually throws a problem
    this.setState({
      inputting: true
    })
  }

  _haltInput(_evt: any) : void {
    this.setState({
      inputting: false
    })
  }

  _handleChange(evt: any) : void {
    this.setState({
      content: evt.target.value
    })
  }

  _highlightProtocol(evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) : void {
    if (this.state.mousedown) {
      this._haltInput(evt);
    }
  }

  _mouseDown(_evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) : void {
    this.setState({
      mousedown: true
    })
  }

  _mouseUp(evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) : void {
    this.setState({
      mousedown: false
    })
    this._startInput(evt);
  }

  _handleMouseEnter(evt : any) : void {
    const highlighting = window.getSelection();
    if (!highlighting?.toString()) {
      this._startInput(evt);
    } else {
      this._haltInput(evt);
    }
  }

  _handleMouseExit(evt: any) : void{
    if (!this.state.focused) {
      this._haltInput(evt);
    }
  }

  _handleFocus(_evt: any) : void {
    this.setState({
      focused: true
    })
  }

  _handleDefocus(_evt : any) : void {
    this.setState({
      focused: false
    })
  }

  // 'Public' methods \\

  getLength() : number {
    return this.state.content.length
  }

  // Hooks \\

  render() {
      return (
        <span className={this.props.className}
        id={this.props.className.toUpperCase() + "-" + this.props.id}
        onChange={evt => this._handleChange(evt)}
        onMouseDown={evt => this._mouseDown(evt)}
        onMouseUp={evt => this._mouseUp(evt)}
        onMouseMove={evt => this._highlightProtocol(evt)}
        onBlur={evt => {this._haltInput(evt); this._handleDefocus(evt)}}
        contentEditable={this.state.inputting}
        suppressContentEditableWarning={true} //TODO: Figure out how bad this warning is and if its gonna fuck me up down the line
        onMouseEnter={evt => this._handleMouseEnter(evt)}
        onMouseLeave={evt => this._handleDefocus(evt)}
        onFocus={evt => this._handleFocus(evt)}
        > {this.state.content} </span>
      )
  }
}
