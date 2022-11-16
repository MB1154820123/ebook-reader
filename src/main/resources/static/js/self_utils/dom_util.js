var arr = new Array(0)

// 清空匹配到的元素内部的文本节点
function clearAllTextNode(parent){
    let c1s = parent.childNodes;
    for (let i = 0; i <c1s.length; i++) {
        if ( c1s[i].nodeType === 3 &&
            (c1s[i].parentElement.nodeName.includes("DIV")  ||
                c1s[i].parentElement.nodeName.includes("PRE") ||
                c1s[i].parentElement.nodeName.includes("ARTICLE")
            )) {
            parent.removeChild(c1s[i])
        } else {
            clearAllTextNode(c1s[i])
        }
    }
}

// 获取整个文件中的某一种元素
function getFullThisTypeElements(parent,query,className){
    let c2s = parent.children; // 所有的元素节点
    for (let i = 0; i < c2s.length; i++) {
        let bool = false;
        if ( c2s[i].nodeName = "PRE" ){
            bool = true;
        }else if ( c2s[i].nodeName = "CODE" ){
            bool = c2s[i].getAttribute("class").includes(className)?true:false
        }
        if ( c2s[i].nodeName == query && bool) {
            arr.push(c2s[i]);
        } else {
            getFullThisTypeElements(c2s[i],query)
        }
    }
    return arr
}
