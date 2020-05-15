
// // 查询10万个有序数组符合要求的单词，要求符合要求的单词最多展示前10个
// const words = ['abcd', 'abca']

// function Node(val, isWord) {
//     this.val = val;
//     this.children = {};
//     this.isWord = isWord
// }

// function Trie() {
//     this.root = new Node(null, false)
// }

// Trie.prototype.insert = function(str) {
//     let curNode = this.root;
//     str = str.split('');
//     for (let i = 0; i < str.length; i++) {
//         const letter = str[i]
//         let hasLetter = curNode.children[letter]
//         if (!hasLetter) {
//             if (i === str.length - 1) {
//                 curNode.children[letter] = new Node(letter, true)
//             } else {
//                 curNode.children[letter] = new Node(letter, false)
//             }
//         }
//         curNode = curNode.children[letter];
//     }
// }
// Trie.prototype.search = function(word) {
//     word = word.split('');
//     let curNode = this.root;
//     for (let i = 0; i < word.length; i++) {
//         let letter = word[i];

//         // 前缀树中没有对应的字母，则说明该单词不在列表中
//         if (!curNode.children[letter]) {
//             return false;
//         }

//         // 前缀树中有对应的字母，则继续查下一个字母是否匹配
//         curNode = curNode.children[letter]

//         // 查到了最后一个字母
//         if (i === word.length - 1) {

//             // 查询的单词是列表中某些单词的一部分，不是全部
//             if (!curNode.isWord) {
//                 while (true) {
//                     for (let key in curNode.children) {
//                         word.push(key);
//                         curNode = curNode.children[key];
//                         // 找出第一个符合的字母即可
//                         break;
//                     }

//                     // 查询到了列表中某个单词的最后一个字母
//                     if (curNode.isWord) {
//                         break;
//                     }
//                 }
//             }
            
//             return word.join('');
//         }
//     }
// }

// // 每次建立的前缀树都是一个对象，只有一个root属性
// let tree = new Trie();

// // 通过insert方法不断插入元素
// words.forEach((word, index) => {
//     tree.insert(word, index)
// })

// console.log(tree)
// console.log(tree.search('abc'))

// 还可以考虑通过二分法进行查找
const list = new Array(100000).fill('abcdef');
function search(str) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let start = 0;
    let end = list.length - 1;
    let targetIndex = Math.ceil((start + end) / 2);
    let target = list[targetIndex];

    // 比较两个字符串
    let strList = str.split('')
    let targetList = target.split('');

    for (let i = 0; i < strList.length; i++) {
        let strLetter = strList[i]
        let targetLetter = targetList[i]
        if (strLetter !== targetLetter) {
            let strLetterIndex = letters.indexOf(strLetter)
            let targetLetterIndex = letters.indexOf(targetLetter);
            if (strLetterIndex > targetLetterIndex) {
                start = targetLetterIndex + 1;
            } else {
                end = targetLetterIndex - 1;
            }
            targetIndex = Math.ceil((start + end) / 2);
            break;
        }
    }
}


