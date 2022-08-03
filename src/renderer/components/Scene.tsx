import React, { ReactNode } from "react";
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

  handleKeyboardEvent(evt) {}

  // React hooks \\

  render() {
    return (
      <div className="scene">
        {this.state.textBlocks.map(block => <div >
          {block}
          </div>)}
      </div>
    )
  }

  componentDidMount() {
    this.state.textBlocks.push(< Slug />);
    this.state.textBlocks.push(< Action className={""} id={0} additional={}  />);
    this.setState({});
  }
}
