function deepCloneRegExp(regExp) {
    if (Object.prototype.toString.call(regExp) === '[object RegExp]') {
        let result = new regExp.constructor(regExp.source, regExp.flags);
        result.lastIndex = regExp.lastIndex;
        return result;
    }
}

console.log(deepCloneRegExp(/abc/g));