let a = 3
function foo(a) {
    a = 5;
    console.log(a)
    return a
}

const aa = foo(a)

console.log(a)
console.log(aa)