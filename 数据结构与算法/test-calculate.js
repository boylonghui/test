function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    let mid;
    while(low <= high) {
        mid = Math.floor((low + high) / 2);
        if (arr[mid] < target) {
            low = mid + 1;
        } else if(arr[mid] === target) {
            return mid;
        } else {
            high = mid - 1;
        }
    }
    return null;
}

console.log(binarySearch([1, 2, 3, 4], 3))

function bubbleSort(arr) {
    let len = arr.length;
    let temp;
    for (let i = len - 1; i >= 1; i--) {
        for (let j = i - 1; j >=0; j--) {
            if (arr[i] < arr[j]) {
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([1, 3, 5, 2, 4, 8, 2]))

function reserveBubbleSort(arr) {
    let len = arr.length;
    let temp;
    for (let i = 0; i < len; i++) {
        for(let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log(reserveBubbleSort([1, 3, 5, 2, 4, 8, 2]))

function quickSort(arr) {
    if (arr.length <= 1) { return arr }
    let start = arr[0];
    let arr1 = [];
    let arr2 = [];
    const len = arr.length;
    for(let i = 1; i < len; i++) {
        if (arr[i] <= start) {
            arr1.push(arr[i])
        } else {
            arr2.push(arr[i])
        }
    }
    return quickSort(arr1).concat(start).concat(quickSort(arr2))
}
console.log(quickSort([1, 3, 5, 2, 4, 8, 2]))

let graph = {}
graph.me = []
graph.node1 = []
graph.node2 = []
graph.node3 = []
graph.node4 = []

let searchList = [];
while (true) {
    let searchList = graph.me;
    for (let name in searchList) {
        if (name.indexOf('a') > -1) {
            return name;
        } else {
            searchList = [].push(graph.name)
        }
    }
}

function searchNameHasA(graph) {
    let searchQueue = [];
    
}