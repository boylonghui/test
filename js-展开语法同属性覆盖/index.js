let a = {
    a: 1,
    b: 2,
    c: 111
}
let b = {
    a: 3,
    b: 4
}
let c = {
    ...a,
    ...b
}
console.log(c)