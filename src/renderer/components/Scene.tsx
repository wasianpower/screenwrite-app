import React, { ReactNode } from "react";
import { breakIntoLines, clean, getCurrentLine } from "renderer/functions/generalHelpers";
import Action from "./Action";
import Slug from "./Slug";

interface SceneState {
  textBlocks: ReactNode[],
  currentBlock : number
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
      textBlocks: [],
      currentBlock: 0
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

  changeInputDiv(element: HTMLElement, up: boolean) : Element|null {
    const nextElemId = up ? (+element.id.split("-")[1] - 1).toString() : (+element.id.split("-")[1] + 1).toString();
    const nextEditableId = document.getElementById(nextElemId)?.className.toUpperCase() + "-" + nextElemId;
    console.log(nextEditableId);
    const nextEditableElement  = document.getElementById(nextEditableId);
    if (nextEditableElement) {
      if (nextEditableElement.contentEditable) {
        element.blur();
        element.contentEditable = "false";
        nextEditableElement.contentEditable = "true";
        nextEditableElement.focus();
        return nextEditableElement;
      }
    }
    return null;
  }

  handleKeydownEvent(evt: React.KeyboardEvent<HTMLDivElement>) {
    console.log(evt.key)
    const keypress = clean(evt.key);
    let caretCurrentLine;
    switch (keypress) {
      case ("enter"): {
        evt.preventDefault();
        console.log(breakIntoLines(evt.target as Element));
        console.log(getCurrentLine(evt.target as Element));
        break;
      }
      case ("tab"): {
        evt.preventDefault();
        break;
      }
      case ("arrowup"): {
        caretCurrentLine = getCurrentLine(evt.target as Element);
        if (caretCurrentLine[0] === 0) {
          const element = (evt.target as HTMLElement)
          if (this.changeInputDiv(element,true)) {
            evt.preventDefault();
          }
        }
        break;
      }
      case ("arrowdown"): {
        caretCurrentLine = getCurrentLine(evt.target as Element);
        if (caretCurrentLine[0] === caretCurrentLine[1]) {
          const element = (evt.target as HTMLElement)
          if (this.changeInputDiv(element,false)) {
            evt.preventDefault();
          }
          break;
        }
      }
    }
  }

  // React hooks \\

  render() {
    let counter = 0
    return (
      <div className="scene" onKeyDown={evt => this.handleKeydownEvent(evt)}>
        {
        this.state.textBlocks.map(block =>
          <div key={counter++}>
          {block}
          </div>)
          }
      </div>
    )
  }

  componentDidMount() {
    this.state.textBlocks.push(< Slug id="0"/>);
    this.state.textBlocks.push(< Action id="1" />);
    this.setState({});
  }
}
