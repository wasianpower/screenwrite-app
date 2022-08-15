import React from "react";

interface suggestProps {
  value: string,
  options: string[]
}

interface suggestState {
  selected: number | null, //this can just be a number since you cant have something selected and be typing at the same time
  suggestions: string[]
}

export default class SuggestionBox extends React.Component<suggestProps,suggestState> {

  suggestionHolder: string[]

  constructor(props : suggestProps) {
    super(props);
    this.state = {
      selected: null,
      suggestions: this.getSuggestions()
    }
    this.suggestionHolder = this.getSuggestions()
  }

  selectUp() {
    const newSelected = this.state.selected ? this.state.selected + 2 : 0;
    this.setState({
      selected: newSelected,
    })
    return newSelected
  }

  getSuggestions() {
    const inputValue = this.props.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? this.props.options : this.props.options.filter(option => option.toLowerCase().slice(0, inputLength) === inputValue);
  }

  _handleMouseMove(evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    this.setState({
      selected: parseInt((evt.target as Element).id.replace("SUGGESTION-",""))
    })
  }

  _makeSelection() {
    if (this.state.selected) {
      return (this.state.suggestions[this.state.selected])
    } else {
      return null;
    }
  }

  render(): React.ReactNode {
    return (
      <div className="suggestionbox">
        {
          this.state.suggestions.map((suggestion) => {
            const className = (this.state.selected == this.state.suggestions.indexOf(suggestion)) ? "suggestion-selected" : "suggestion"
            return (
              <span
              className={className}
              key={this.state.suggestions.indexOf(suggestion)}
              id={"SUGGESTION-" + this.state.suggestions.indexOf(suggestion)}
              onMouseMove={evt => this._handleMouseMove(evt)}>{suggestion}</span>
            )
          })
        }
      </div>
    )
  }

  componentDidUpdate(previousProps: any,previousState: any) {
    if (this.state.suggestions != this.getSuggestions() && this.props != previousProps) {
      this.setState({
        suggestions: this.getSuggestions()
      })
    }
  }
}
