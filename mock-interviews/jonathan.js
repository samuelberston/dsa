/**
 * 
 * 
 * 168. Excel Sheet Column Title
 * 
 * Original solution:
 * var convertToTitle = function(columnNumber) {
    // If 26 or less, single char, return that
    if (columnNumber <= 26) {
        return String.fromCharCode(columnNumber + 64);
    }

    // If greater than 26, divide by 26 (modulo) for first char
    // Second char is the quotient
    else if (columnNumber) {
        let result = "";
        const firstCharCode = Math.floor(columnNumber / 26);
        result += String.fromCharCode(firstCharCode + 64);

        const quotientCode = columnNumber % 26;
        result += String.fromCharCode(quotientCode + 64);
        return result;
    }
};

 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
    let result = '';
    while (columnNumber > 0) {
        columnNumber--; // 1-indexed
        result = String.fromCharCode((columnNumber % 26) + "A".charCodeAt(0)) + result;
        // Divide by 26 to move to next char
        columnNumber = Math.floor(columnNumber / 26);
    }

    return result
}

// 171. Excel Sheet Column Number
console.log("\n171. Excel Sheet Column Number");
process.stdout.write("TEST CASE 1: ");
const testCase1 = convertToTitle(27);
if (testCase1 === "AA") {
    console.log("PASS");
} else {
    console.log("FAIL");
}
process.stdout.write("TEST CASE 2: ");
const testCase2 = convertToTitle(701);
if (testCase2 === "ZY") {
    console.log("PASS");
} else {
    console.log("FAIL");
}



