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
  constructor(props : suggestProps) {
    super(props);
    this.state = {
      selected: null,
      suggestions: this.getSuggestions()
    }
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

  render(): React.ReactNode {
    return (
      <div className="suggestionbox">
        {
          this.state.suggestions.map((suggestion) => {
            return (
              <span className="suggestion" key={suggestion}>{suggestion}</span>
            )
          })
        }
      </div>
    )
  }

  componentDidUpdate() {
    this.setState({
      suggestions: this.getSuggestions()
    })
  }
}
