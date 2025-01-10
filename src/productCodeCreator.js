const crypto = require('crypto');

let startIdx = null, endIdx = null;

function substringGenerator(inputName) {
    inputName = inputName.toLowerCase();
    let max = 'a';
    let finalString = "", draftString = "";
    let list = [], startIndexList = [], endIndexList = [];
    let currentIndex = 0, whiteSpaceCount = 0;

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
                endIdx=endIndexList[list.indexOf(word)];
            }
            else {
                endIdx=endIndexList[list.indexOf(word)];
            }
        }
    }
    return { finalString, startIdx, endIdx };
}

function rightHalfGenerator(finalString, startIdx, endIdx) {
    return startIdx+finalString+endIdx;
} 

function hashFunction(substring, stringLength) {
    hashedString = crypto.createHash('sha256').update(substring).digest('hex').substring(0, stringLength);
    return hashedString;
}

function productCodeGenerator(inputName) {
    const { finalString, startIdx, endIdx } = substringGenerator(inputName);

    const leftCode = hashFunction(finalString, finalString.length);
    const rightCode = rightHalfGenerator(finalString, startIdx, endIdx);

    const productCode = leftCode+"-"+rightCode;
    return productCode;
}


//let inputName = "Alpha Sorter";
//productCodeGenerator(inputName);

module.exports = productCodeGenerator;