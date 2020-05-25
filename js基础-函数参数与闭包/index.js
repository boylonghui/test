function test(a, b){
    console.log(a, b)
    return {
        test: function(a, b){
            return test(a, b)
        }
    }
}

var a = test(111, 112); 
a.test(121); 
a.test(131)

var b = test(211).test(212).test(213)

var c = test(311).test(321, 322)
a.test()