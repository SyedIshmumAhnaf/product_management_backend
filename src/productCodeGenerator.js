function longestIncreasingSubstring(inputName) {
    inputName = inputName.toLowerCase();
    let max = 'a';
    let finalString = "", draftString = "";
    let list = [], startIndexList = [], endIndexList = [];
    let currentIndex = 0, whiteSpaceCount = 0;
    let startIdx = null, endIdx = null;

    for (const letter of inputName) {
        if (letter===' ') {
            whiteSpaceCount++;
            currentIndex++;
            continue;
        }
        else if (letter > max) {
            draftString += letter;
            max = letter;
        } else {
            if (draftString.length > 0) {
                list.push(draftString);
                startIndexList.push(currentIndex-draftString.length-whiteSpaceCount);
                endIndexList.push(currentIndex-1-whiteSpaceCount);
            }
            draftString = letter;
            max = letter;
        }
        currentIndex++;
    }
    if (draftString.length > 0) {
        list.push(draftString);
        startIndexList.push(currentIndex-draftString.length-whiteSpaceCount);
        endIndexList.push(currentIndex-1-whiteSpaceCount);
    }
    let maxLength = 0;
    for (const word of list) {
        if (word.length > maxLength) {
            maxLength = word.length;
        }
    }
    for (const word of list) {
        if (word.length === maxLength) {
            finalString += word;
            if (startIdx===null) {
                startIdx=startIndexList[list.indexOf(word)];
            }
            else {
                endIdx=endIndexList[list.indexOf(word)];
            }
        }
    }
    return { finalString, startIdx, endIdx };
}


let inputName = "Alpha Sorter";
const { finalString, startIdx, endIdx } = longestIncreasingSubstring(inputName);
let rightHalf = startIdx+finalString+endIdx;
console.log(rightHalf);

