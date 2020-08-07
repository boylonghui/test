let arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]];
// console.log(arr)

/**
 * 冒泡排序
 */
function selectSort(arr) {
    let a = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            a++;
        }
    }
    return arr;
}

// console.log(someSort([1, 3, 4, 1, 2, 5, 6, 7, 3, 2, 1, 4, 5, 12, 23, 1, 2, 3]))

/**
 * 
 * @param { arr } Array
 * 快排
 */
function quickSort(arr) {
    // 注意不要忘了arr.length === 0的情况
    if (arr.length === 1 || arr.length === 0) return arr;
    let a = arr[0];
    let arr1 = [];
    let arr2 = [];
    for (let i = 1; i < arr.length; i++) {
        let b = arr[i];
        if (b >= a ) {
            arr2.push(b)
        } else {
            arr1.push(b)
        }
    }
    return quickSort(arr1).concat(a).concat(quickSort(arr2))
}

// console.log(quickSort([1, 3, 4, 1, 2, 5, 6, 7, 3, 2, 1, 4, 5, 12, 23, 1, 2, 3]))

function bubbleSort(arr) {
    let done = true;
    for (let i = 0; i < arr.length - 1; i++) {
        // j不是从i开始的，j也一直都是从0开始的
        // 这里是优化点1，j的最大值随着外层的循环可以不断减小
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j+1], arr[j]]
                done = false;
            }
        }
        // 优化点2
        if (done) break;
    }
    return arr;
}
// console.log(bubbleSort([1, 3, 4, 1, 2, 5, 6, 7, 3, 2, 1, 4, 5, 12, 23, 1, 2, 3]))

function mergeSort(arr) {
    if (arr.length < 2) return arr;
    let i = Math.floor(arr.length / 2);
    let left = arr.slice(0, i);
    let right = arr.slice(i, arr.length);
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] >= right[0]) {
            result.push(right.shift())
        } else {
            result.push(left.shift())
        }
    }
    while (left.length > 0) {
        result.push(left.shift())
    }
    while (right.length > 0) {
        result.push(right.shift())
    }
    return result;
}

console.log(mergeSort([1, 3, 4, 1, 2, 5, 6, 7, 3, 2, 1, 4, 5, 12, 23, 1, 2, 3]))