// // 广度优先搜索
// let graph = {}
// graph.start = ['a', 'b', 'c']
// graph.a = []
// graph.b = []
// graph.fin = []

// function findMinNode(me) {
//     let searchQueue = [].concat(graph.me);
//     let hasSearchList = [];
//     while(searchQueue.numbers > 0) {
//         let node = graph.me.shift();
//         if (hasSearchList.indexOf(node) === -1) {
//             hasSearchList.push(node)
//             if (node.indexOf('a') > -1) {
//                 return node;
//             } else {
//                 searchQueue.concat(graph.node)
//             }
//         }
        
//     }
// }

// // 迪克斯特拉算法
// let graph = {}
// graph.start = {}
// graph.start.a = 1;
// graph.start.b = 2;
// graph.a = {}
// graph.a.aa = 1
// graph.a.ab = 2
// graph.b = {}
// graph.c = {}
// graph.final = null

// for (let key in graph.start) {
//     minCosts[key] = graph.start[key]
//     if (key === final) {
//         return graph.start.final
//     }
//     minCosts.final = Number.POSITIVE_INFINITY;
//     parents[key] = start;
//     parents.final = start;
// }

// while(true) {
//     let node = findMinCost(minCosts);
//     if (!graph.node) {
//         break;
//     }
//     let nodeCost = minCosts.node; 
//     let hasChecked = [];
    
//     if (hasChecked.indexOf(node) === -1) {
//         for (let key in graph.node) {
//             let cost = nodeCost + graph.node.key;
//             if (minCosts.key && minCosts.key > cost) {
//                 minCosts.key = cost;
//                 parents.key = node;
//             }
    
//             if (!minCosts.key) {
//                 minCosts.key = cost;
//                 parents.key = node;
//             }
//         }
//         hasChecked.push(node);
//     }
//     return minCosts.final;
// }

//算法
function getMaxValue(weights, values, limtWeight) {
    const numbers = weights.length;
    let arr = [];

    /**
     * 有物品没有背包、有背包没有物品两种情况都为0
     * 每个物品对应每个重量的背包都有一个值，因此每个物品以数组的形式存放每个重量的背包对应的值
     */
    for (let i = 0; i <= numbers; i++) { // 都是小于等于哦，为什么？
        arr[i] = [];
        for (let j = 0; j <= limtWeight; j++) { // 都是小于等于哦，为什么？
            if (i === 0 || j === 0) {
                arr[i][j] = 0
            }
        }
    }

    //这是什么意思呢？
    values.unshift(0)
    weights.unshift(0)

    for (let i = 1; i <= numbers; i++) { // 都是小于等于哦，为什么？
        for (let j = 1; j <= limtWeight; j++) { // 都是小于等于哦，为什么？
            if(weights[i] > j) {
                arr[i][j] = arr[i-1][j]
            } else {
                arr[i][j] = Math.max(arr[i-1][j], values[i] + arr[i-1][j - weights[i]]) // arr[i-1][j - w[i]]是i-1不是i
            }
            // console.log(arr[i][j])
        }
    }
    return arr[numbers][limtWeight]
}

function node(value, left, right) {
    this.value = value;
    this.left = null;
    this.right = null;
}
function rebuildBinaryTree(pre, vin) {
    const nodeNumbers = pre.length;
    let result;
    if (nodeNumbers === 1) {
        result = pre[0]
    } else {
        let root = result.root = {}
        root.value = pre[0];
        let startIndex = vin.indexOf(root);
        let leftTree = vin.splice(0, startIndex);
        let rightTree = vin.splice(startIndex + 1, nodeNumbers);
        root.left = rebuildBinaryTree(pre, leftTree);
        root.right = rebuildBinaryTree(pre, rightTree);
    }
}