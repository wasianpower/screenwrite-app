/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import WorkingText from 'renderer/classes/WorkingText';



const ieOptions = ["INT.", "EXT.", 'I/E.']
console.log(ieOptions) //this is just because the unused flag was annoying me

function getSuggestions(value : string, options : string[]) {
  if (!value) {
    return []
  }
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  // return ieOptions;
  const suggestions = options.filter(option => option.toLowerCase().slice(0, inputLength) === inputValue);
  return suggestions.length === 0 ? options : suggestions ;
};
console.log(getSuggestions) //this is just because the unused flag was annoying me

interface SlugParts{
  sceneIe: WorkingText,
  sceneLocation: WorkingText,
  sceneTimeOfDay: WorkingText,
  suggestions: string[]
}

export default class Slug extends React.Component<{}, SlugParts> {
  constructor(props: Object) {
    super(props);
    this.state = {
      ie: "",
      location: "",
      time: "",
      suggestions: []
    };
  }

  changeIe = (evt: any) => {
    this.setState({
      ie: evt.target.value
    });
  }

  render(): React.ReactNode {
    return (
      <div className="slug">
        < WorkingText className='slug' additional={}/>
      </div>
    );
  }
}

