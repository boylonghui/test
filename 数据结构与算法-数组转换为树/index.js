var data = [
    {"parent_id": 0, "id":'a', "value": "xxx"},
    {"parent_id": 1, "id":'b', "value": "xxx"},
    {"parent_id": 4, "id":'c', "value": "xxx"},
    {"parent_id": 3, "id":'d', "value": "xxx"},
    {"parent_id": 2, "id":'e', "value": "xxx"},
    {"parent_id": 1, "id":'f', "value": "xxx"}
]

var obj = {
    a: {
        value: 'xxx',
        children: {
            b: {
                value: 'xxx',
                e: {
                    value: 'xxx',
                    children: {
                    //...
                    }
                },
                f: {
                    value: 'xxx',
                    children: {
                    //...
                    }
                }
            },
            c: {
                value: 'xxx',
                children: {
                //...
                }
            },
        }
    }
}

function toTree(data) {
    data.sort((a, b) => {
        return a.parent_id - b.parent_id;
    })
    let tree = {}

    let prev = tree;
    let current = tree;
    let currentIndex = 0;
    let node = data.shift();
    const getChildren = () => {
        while (node) {
            if (node.parent_id !== currentIndex) {
                prev = current;
                console.log('prev______')
                console.log(prev)
                for (let key in prev) {
                    if (key === 'undefined') {
                        break;
                    }
                    console.log(key)
                    console.log(prev[key])
                }
                current = prev[key].children;
                currentIndex++;
                getChildren()
            } else {
                current[node.id] = {};
                current[node.id].value = node.value;
                current[node.id].children = {};
                node = data.shift();
            }
        }
    }
    getChildren();
    console.log(tree)
    return tree;
}

console.log(toTree(data));