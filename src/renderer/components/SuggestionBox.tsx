import React from "react";

interface suggestProps {
  value: string,
  options: string[]
}

interface suggestState {
  selected: number | null //this can just be a number since you cant have something selected and be typing at the same time
}

export default class SuggestionBox extends React.Component<suggestProps,suggestState> {
  constructor(props : suggestProps) {
    super(props);
    this.state = {
      selected: null
    }
  }

  selectUp() {
    const newSelected = this.state.selected ? this.state.selected + 2 : 0;
    this.setState({
      selected: newSelected,
    })
    return newSelected
  }

  render(): React.ReactNode {
    return (
      <div className="suggestionBox">
        {

        }
      </div>
    )
  }
}
