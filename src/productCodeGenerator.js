

const productCodeGenerator = (name) => {
    const hash = require('crypto').createHash('md5').update(name).digest('hex').substring(0, 8);
    const longestSubstring = name.split('').reduce((result, char, index, array) => {
        if (index === 0 || char > array[index - 1]) {
            result.current += char;
            if (result.current.length > result.longest.length) {
                result.longest = result.current;
            }
        } else {
            result.current = char;
        }
        return result;
    }, { current: '', longest: '' }).longest;

    const startIndex = name.toLowerCase().indexOf(longestSubstring);
    const endIndex = startIndex + longestSubstring.length - 1;

    console.log(`${hash}-${startIndex}${longestSubstring}${endIndex}`);
    console.log('a'>'A');
    return `${hash}-${startIndex}${longestSubstring}${endIndex}`;
};

productCodeGenerator('alpha sorter');

function longestIncreasingSubstring(inputName) {
    inputName = inputName.toLowerCase();
    let max = 'a';
    let finalString = "";
    let draftString = "";
    let list = [];

    for (const letter of inputName) {
        if (letter===' ') {
            continue;
        }
        else if (letter > max) {
            draftString += letter;
            max = letter;
        } else {
            if (draftString.length > 0) {
                list.push(draftString);
            }
            draftString = letter;
            max = letter;
        }
    }
    if (draftString.length > 0) {
        list.push(draftString);
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
        }
    }
    console.log(list)
    return finalString;
}

// Example usage
let inputName = "Alpha Sorter";
//inputName = "s  a   m  s  u n g"
const result = longestIncreasingSubstring(inputName);
console.log(result);
