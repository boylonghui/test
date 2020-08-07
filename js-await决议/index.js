// var p = function() {
//     return new Promise((resolve, reject) => {
//         resolve(1)
//     }).then(
//         res => {
//             console.log(res)
//             let data = res.data;
//             console.log('data', data)
//             return Promise.resolve(data)
//         },
//         err => {
//             console.log('err', err)
//         }
//     )
// }

// async function doIT() {
//     let res = await p();
//     console.log('res', res);
// }

// doIT()

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(2)
//     }, 1000)
//     setTimeout(() => {
//         console.log(3)
//     }, 1000)
//     resolve(3)
// }).then(res => {
//     console.log(4)
// }).then(res => {
//     console.log(5)
// }).then(res => {
//     console.log(6)
// })

new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve(1)
    })
    setTimeout(() => {
        console.log(2)
    })
}).then(res => {
    console.log(3)
})