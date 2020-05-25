var a = 3;
function change(a) { 
a = 4; 
}
change(a)
console.log(a);



var user = {
    age:30
}
function change2(user) { 
    user.age = 40; 
}
change2(user);
console.log(user.age);

function change3(user) { 
    user = {
        age:50
    } 
}
change3(user);
console.log(user.age);