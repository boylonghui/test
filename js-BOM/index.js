const item = document.querySelector('.item')
console.log(item.offsetWidth)
console.log(getComputedStyle(item).width)
console.log(item.getBoundingClientRect().width)