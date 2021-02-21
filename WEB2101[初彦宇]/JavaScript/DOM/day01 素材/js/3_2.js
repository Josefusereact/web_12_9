/* function getChildren2(parent) {
    var iterator = document.createNodeIterator(
        parent, NodeFilter.SHOW_ALL, null, false
    );
    var node;
    while ((node = iterator.nextNode()) != null) {
        console.log(node);
        node.nodeType != 3 ? node.nodeName : node.nodeValue;
    }
}

window.onload = function () {
    console.time("iterator1");
    getChildren2(document.body);
    console.timeEnd('iterator1');
} */


function getChildren(parent) {

    var children = parent.childNodes;
    console.log(parent.nodeType != 3 ? parent.nodeName : parent.nodeValue);

    for (var i = 0; i < children.length; i++) {
        // console.log(children[i].nodeType != 3 ? children[i].nodeName : children[i].nodeValue);
        getChildren(children[i]);
    }

}

window.onload = function () {
    console.log('开始执行');
    getChildren(document.body);
    console.log('执行结束');
}