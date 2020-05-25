var data = [
    {"parent_id": 0, "id":'a', "value": "xxx"},
    {"parent_id": 1, "id":'b', "value": "xxx"},
    {"parent_id": 4, "id":'c', "value": "xxx"},
    {"parent_id": 3, "id":'d', "value": "xxx"},
    {"parent_id": 2, "id":'e', "value": "xxx"},
    {"parent_id": 1, "id":'f', "value": "xxx"}]


function toTree(data) {
    data.sort((a, b) => {
        return  a.parent_id - b.parent_id;
    })
    let currentIndex = 0;
    let currentItem = data.shift();
    let tree = {}
    tree.children = {};
    let current = tree;
    for (let i = 0; i < data.length; i++) {
        let node = data[i]
        if (node.parent_id === currentIndex) {
            tree[node.id] = node.value;

        }
    }
    return tree;
}