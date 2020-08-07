// 构造函数作为对象，绑定了一些属性
function A() {
    A.b = 2222
    this.a = 1;
    this.b = 2;
    this.c = 3;
}
A.b = 2;
A.c = 3;
new A();
console.log(A.b);