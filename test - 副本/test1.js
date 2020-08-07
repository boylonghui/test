// 1. 在 vuex 里，commit 和 dispatch 分别在什么场景下使用？
// commit用于同步场景，主要用于修改state
// dispatch用于异步的接口请求，在获取接口的数据以后，一般会需要修改state。一般来说，不会直接修改state，而是通过commit的形式提交，这样便于做状态管理。

typeof new RegExp(/123/)

// 2． 利用 vue 的双向绑定机制，在下面的 mounted 编写代码，删除 table.field1 属性，并添加 table.field2 属性，设置其值为 'value2'
export default {
    data () {
        return {
            table: {
                'field1': 'value1'
            }
        }
    },

    mounted () {
        this.table = {
            field2: 'value2'
        }
    }
}



// 3． 假设以下两个异步请求接口 cgi_a、cgi_b 返回结果均为整数，请编写代码输出 a 和 b 相加的值：
let p1 = axios.get('cgi_a')
let p2 = axios.get('cgi_b')
/*
p1.then((result) => {
    // result.data.a 是一个整数
})
p2.then((result) => {
    // result.data.b 是一个整数
})
*/
//
p1.then(res => {
    let a = res.data.a;
    p2.then(res => {
        let b = res.data.b;
        console.log(a + b)
    })
}).catch(err => {
    console.log(err)
})
Promise.all([p1, p2])

async function a() {
    try {
        let { a } = await p1;
        let { b } = await p2;
        console.log(a + b)
    } catch(err) {
        console.log(err)
    }
}



// 4. 上一个问题，在业务运行过程中可能出现哪些异常情况？请编写代码对相关异常进行适当处理


// 5． 实现一个函数，将对象或者数组进行深拷贝
function deepClone(arrayOrObj) {
    // 数组
    if (Array.isArray(arrayOrObj)) {
        let arr = []
        for (let i = 0; i < arrayOrObj.length; i++) {
            if (arrayOrObj[i] !== arrayOrObj && typeof arrayOrObj[i] !== 'object') {
                arr.push(arrayOrObj[i])
            } else if (arrayOrObj[i] !== arrayOrObj && typeof arrayOrObj[i] === 'object') {
                arr.push(deepClone(arrayOrObj[i]))
            } else {
                console.log('循环引用')
            }
        }
        return arr;
    }
        
    let obj = {}
    for (let key in arrayOrObj) {
        if (arrayOrObj[key] !== arrayOrObj && typeof arrayOrObj[i] !== 'object') {
            obj[key] = arrayOrObj[key]
        } else if (arrayOrObj[i] !== arrayOrObj && typeof arrayOrObj[i] === 'object') {
            obj[key] = deepClone(arrayOrObj[i])
        } else {
            console.log('循环引用')
        }
    }
    return obj;
}


// 6． 使用快速排序算法对数字数组 [5,2,3,7,9,1,4,2,6,0,8] 的元素进行由小到大排序
function quickSort(arr) {
    if (arr.length === 1) { return arr; }
    let arr1, arr2;
    let start = arr[0];
    const length = arr.length;
    for (let i = 1; i < length; i++) {
        if (arr[i] >= start) {
            arr2.push(arr[i])
        } else {
            arr1.push(arr[i])
        }
    }
    return quickSort(arr1).concat([start]).concat(quickSort(arr2))
}



// 7. 本地一个 10 万数据的英文人名有序数组，要求用户在输入时实时查询前置匹配的人名（超出 10 个时按顺序取前 10 个），请设计符合要求的查询算法
// let names = ['annali', 'beandou', 'lisani', 'wanngsi', 'wangwu', 'zhangliu', ...]
// 例如上面数组，用户输入 'wang' 时输出 ['wanngsi', 'wangwu']; 输入 'wangw' 时，输出 ['wangwu']
function getNames(names, search) {
    let targetNames
    names.forEach(name => {
        if (name.indexOf(search) > -1) {
            
        }
    })
}