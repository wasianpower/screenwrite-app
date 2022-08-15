import React from "react";
import SuggestionBox from "renderer/components/SuggestionBox";
import { clean } from "renderer/functions/generalHelpers";


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
  focused: boolean,
  suggestions: string[]
}

interface TextProps {
  className: string,
  id: string,
  options?: string[],
  additional?: object
}

export default class WorkingText extends React.Component<TextProps,TextState> {

  // Non state variables \\


  // Constructor \\

  constructor(props : TextProps) {
    super(props);
    this.state = {
      content: "",
      inputting: false,
      additional: {},
      mousedown: false,
      focused: false,
      suggestions: []
    }
    console.log(this.props.options);
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

  _handleChange(evt: React.FormEvent<HTMLSpanElement>) : void {
    const contentRaw = evt.currentTarget.textContent
    this.setState({
      content: contentRaw ? contentRaw : ""
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

  _handleKeydown(evt: React.KeyboardEvent<HTMLSpanElement>) : void {
    if (clean(evt.key) === "enter") {
      evt.preventDefault();
    }

  }


  // 'Public' methods \\

  getLength() : number {
    return this.state.content.length
  }

  // Hooks \\

  render() {
      return (
        <div>
          <span className={this.props.className}
          id={this.props.className.toUpperCase() + "-" + this.props.id}
          onInput={evt => this._handleChange(evt)}
          onMouseDown={evt => this._mouseDown(evt)}
          onMouseUp={evt => this._mouseUp(evt)}
          onMouseMove={evt => this._highlightProtocol(evt)}
          onBlur={evt => {this._haltInput(evt); this._handleDefocus(evt)}}
          contentEditable={this.state.inputting}
          suppressContentEditableWarning={true}
          onMouseEnter={evt => this._handleMouseEnter(evt)}
          onMouseLeave={evt => this._handleDefocus(evt)}
          onFocus={evt => this._handleFocus(evt)}
          onKeyDown={evt => this._handleKeydown(evt)}
          ></span>
          <SuggestionBox value={this.state.content ? this.state.content : ""} options={this.props.options ? this.props.options : []}/>
        </div>
      )
  }

}
