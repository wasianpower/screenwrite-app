import React, { ReactNode } from "react";
import { breakIntoLines, clean, getCurrentLine, pxToNum } from "renderer/functions/generalHelpers";
import Action from "./Action";
import Slug from "./Slug";

interface SceneState {
  textBlocks: ReactNode[]
}

interface SceneProps {
  sceneNumber: number
}

export default class Scene extends React.Component<SceneProps,SceneState> {


  // Non state variables \\

  sceneRef = React.createRef();

  // Constructor \\

  constructor(props : SceneProps) {
    super(props);
    this.state = {
      textBlocks: []
    }
  }

  // Methods \\

  addTextBlock(textBlock : ReactNode, index? : number) : ReactNode[] {
    if (!index) {
      index = this.state.textBlocks.length
    }
    this.state.textBlocks.splice(index, 0, textBlock);
    this.setState({});
    return this.state.textBlocks
  }

  replaceTextBlock(textBlock : ReactNode, index? : number) : ReactNode[] {
    if (!index) {
      index = this.state.textBlocks.length
    }
    this.state.textBlocks.splice(index, 1, textBlock);
    this.setState({});
    return this.state.textBlocks
  }

  handleKeydownEvent(evt: React.KeyboardEvent<HTMLDivElement>) {
    console.log(evt.key)
    const keypress = clean(evt.key);
    if (keypress === "enter") {
      evt.preventDefault();
      console.log(breakIntoLines(evt.target as Element));
      console.log(getCurrentLine(evt.target as Element));
    } else if (keypress === "tab" ) {
      evt.preventDefault();
    }
  }

  // React hooks \\

  render() {
    let counter = 0
    return (
      <div className="scene" onKeyDown={evt => this.handleKeydownEvent(evt)}>
        {this.state.textBlocks.map(block =>
          <div key={counter++}>
          {block}
          </div>)}
      </div>
    )
  }

  componentDidMount() {
    this.state.textBlocks.push(< Slug />);
    this.state.textBlocks.push(< Action />);
    this.setState({});
  }
}
