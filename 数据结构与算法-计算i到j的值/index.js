// 一个数组，数组可能很大，计算i到j的值

const arr = Object.freeze([-2, 0, -9, 1, 6, 8])

let arr1 = [];
let sum = 0;

for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
    arr1[i].push(sum);
}

function getSum(i, j) {
    return arr1[j] - arr1[i-1]
}