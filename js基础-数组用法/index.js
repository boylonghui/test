var arr = new Array(100).fill(null);
console.log(arr)
console.log(Object.keys(arr).map(item => {
    return 100 - item
}))

// var arr = new Array(100).keys();
// console.log(Array.from(arr));