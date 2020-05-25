 // 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

 /**
  * 问题拆解
  * 1. 怎么构建链表
  * 2. 怎么实现这里的功能
  * 数组的使用场景：随机访问
  * 链表的使用场景：除随机访问外的所有场景（一般是增删改查）
  * JS中，数组的增删改查不会很慢，因为JS可以使用splice方法。该方法在进行增删改查的时候，只会访问指定的数组项，因此速度不会慢。
  * 由于JS中的数组被实现成为了对象，所以在进行其它操作的时候可能会很慢，这个时候呢使用链表是一个更好的选择。
  */

function Node(value, next) {
    this.value = value;
    this.next = next;
}

function linkedList() {
    
}

function merge(linkedList1, linkedList2) {

}