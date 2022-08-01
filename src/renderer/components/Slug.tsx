/* eslint-disable @typescript-eslint/ban-types */
import { type } from 'os';
import React from 'react';

interface SlugParts{
  ie: string,
  location: string,
  time: string,
  suggestions: string[]
}

const ieOptions = ["INT.", "EXT.", 'I/E.']

// const getSuggestions = (value : string) => {
//   if (!value) {
//     return []
//   }
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//   // return ieOptions;
//   const suggestions = ieOptions.filter(option => option.toLowerCase().slice(0, inputLength) === inputValue);
//   return suggestions.length === 0 ? ieOptions : suggestions ;
// };

// // const shouldRenderSuggestions = (value : string, reason) => {
// //   console.log(reason);
// //   console.log(typeof(reason));
// //   const logic = (reason !== 'escape-pressed' && reason !== 'input-blurred');
// //   console.log(logic);
// //   console.log(typeof(logic))
// //   return logic;
// // }

// // function shouldRenderSuggestions(value, reason) {
// //   return value.trim().length > 2;
// // }

// const getSuggestionValue = (suggestion : string) => suggestion;
// const renderSuggestion = (suggestion : string) => (
//   <span>
//     {suggestion}
//   </span>
// );


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

  // onSuggestionsFetchRequested = ({ value }) => {
  //   this.setState({
  //     suggestions: getSuggestions(value)
  //   });
  // };

  // onSuggestionsClearRequested = () => {
  //   this.setState({
  //     suggestions: []
  //   });
  // };

  changeIe = (event) => {
    this.setState({
      ie: event.target.value
    });
  }

  render(): React.ReactNode {
    return (
      <div className="slug">
      </div>
    );
  }
}
