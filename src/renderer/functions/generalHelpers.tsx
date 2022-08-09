export function clean(text: string) : string {
  return text.toLowerCase().trim();
}

export function pxToNum(text: string) : number {
  return +text.replace("px","");
}

export function breakIntoLines(element: Element) : string[][] {
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
  //                          ! WARNING !                         \\
  //--------------------------------------------------------------\\
  // DO NOT USE THIS FUNCTION FOR A NON COURIER NEW FONT. ONLY    \\
  // USE FOR THE MAIN PART OF THE SCREENPLAY. This function makes \\
  // assumptions dependent on courier new that almost certainly   \\
  // will not hold for other fonts.                               \\
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
  const maxBoxWidth = pxToNum(window.getComputedStyle(element, null).getPropertyValue('max-width'));
  const charWidth = pxToNum(window.getComputedStyle(element, null).getPropertyValue('font-size')) * .6; //This assumes courier new font
  const charsPerLine = Math.floor(maxBoxWidth / charWidth);
  const wordsAsList = element.textContent ? element.textContent.trim().split(" ") : [] //TODO: Are there any realistic scenarios where trimming here is harmful?
  let currentChar = 0;
  let currentLine = 0;
  let lineList : string[][] = [[]];
  for (const word of wordsAsList) {
    currentChar += word.length;
    if (currentChar !== charsPerLine) {currentChar += 1}
    if (currentChar <= charsPerLine) {
      lineList[currentLine].push(word);
    } else if (word.length > charsPerLine) {
      let wordLines: string[][] = [[]];
      let currentWordLine = 0;
      while (true) {
        wordLines[currentWordLine].push(word.slice(currentWordLine*charsPerLine,(currentWordLine + 1)* charsPerLine))
        if ((currentWordLine + 1)* charsPerLine > word.length) {break}
      }
      lineList = lineList.concat(wordLines);
    } else {
      currentChar = word.length + 1;
      currentLine++;
      lineList.push([word]);
    }
  }

  return lineList;
}

export function getCurrentLine(element: Element) : number[] {
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
  //                          ! WARNING !                         \\
  //--------------------------------------------------------------\\
  // DO NOT USE THIS FUNCTION FOR A NON COURIER NEW FONT. ONLY    \\
  // USE FOR THE MAIN PART OF THE SCREENPLAY. This function makes \\
  // assumptions dependent on courier new that almost certainly   \\
  // will not hold for other fonts.                               \\
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
  const lines = breakIntoLines(element);
  const caretPos = getSelection()?.anchorOffset;
  let lineCounter = 0;
  let total = 0;

  if (!caretPos && caretPos != 0) {
    throw new Error("Bad input. Signal should only be possible to receive from a div where input is possible.");
  }

  lineLoop: for (const line of lines) {
    for (const word of line) {
      total += word.length + 1;
      if (total >= caretPos) {
        break lineLoop;
      }
    }
    lineCounter++;
  }

  return [lineCounter,lines.length - 1];
}
