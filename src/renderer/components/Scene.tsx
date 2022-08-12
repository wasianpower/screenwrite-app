import { doc } from "prettier";
import React, { ReactNode } from "react";
import { breakIntoLines, clean, getCurrentLine } from "renderer/functions/generalHelpers";
import Action from "./Action";
import Slug from "./Slug";
import SuggestionBox from "./SuggestionBox";

interface SceneState {
  textBlocks: ReactNode[],
  currentBlock : number,
  nextElementId: number,
  suggestionBox: null|ReactNode
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
      currentBlock: 0,
      nextElementId: 2,
      suggestionBox: null
    }
  }

  // Methods \\

  addTextBlock(textBlock : ReactNode, current : HTMLElement, focus : boolean = true, index : number = this.state.textBlocks.length) : ReactNode[] {
    //TODO: System for managing ID numbers, making sure they are in order.
    this.state.textBlocks.splice(index, 0, textBlock);
    this.setState({});
    if (focus) {
      setTimeout(() => {
        console.log(document.getElementById(index.toString()));
        this.changeInputDiv(current,false);
      }, 0)
    }
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
    const nextElemId = up ?(+element.id.split("-")[1] - 1).toString() : (+element.id.split("-")[1] + 1).toString();
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
    const keypress = clean(evt.key);
    let caretCurrentLine;
    switch (keypress) {
      case ("enter"): { //TODO: Make this correspond to the right key in config/keybinds.json instead of a constant.
        evt.preventDefault();
        const element = evt.target as Element;
        const selection = getSelection();
        if (!selection || ! element) {
          throw new Error("Selection or target element is null.");
          break;
        }
        if (!element.textContent || element.textContent.trim().length === 0) {
          console.log(<SuggestionBox value="I" options={["INT.", "EXT.", "I/E."]}/>)
          this.setState({
            suggestionBox: <SuggestionBox value={element.textContent ? element.textContent : ""} options={["INT.", "EXT.", "I/E."]}/>
          })
        } else if (!element.textContent || (selection && selection.focusOffset == selection.anchorOffset && selection.anchorOffset == clean(element.textContent).length)) {
          this.addTextBlock(<Action id={this.state.nextElementId.toString()}/>,evt.target as HTMLElement) // TODO: Make this insert in the correct place instead of just at the end.
          //TODO: Wow the ID system is FUCKED
          //TODO: Just so so so fucked
          this.setState({
            nextElementId: this.state.nextElementId + 1
          });
          console.log(this.state);
        }
        break;
      }
      case ("tab"): {
        evt.preventDefault();
        break;
      }
      case ("arrowup"): {
        caretCurrentLine = getCurrentLine(evt.target as Element); //TODO: Make the caret go the correct place in the next input when going up or down
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
        {this.state.suggestionBox}
      </div>
    )
  }

  componentDidMount() {
    this.state.textBlocks.push(< Slug id="0"/>);
    this.state.textBlocks.push(< Action id="1" />);
    this.setState({});
  }
}
