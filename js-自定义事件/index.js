var event = new Event('build')
var ele = document.querySelector('.box')
console.log(ele)
ele.addEventListener('build', function(e) {
    console.log(e)
}, false);

// ele.dispatchEvent(event);
window.dispatchEvent(event)