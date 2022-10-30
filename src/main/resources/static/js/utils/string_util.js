/**
 * @type util—javascript
 * @desc replace from old str to aim str by range
 * @time 2022/10/28 19:08
 * @author mabo
 * @param oldStr
 * @param left
 * @param right
 * @param aStr
 * @returns {*}
 */
function replaceString(oldStr,left,right,aStr){
    let lStr = oldStr.slice(0,left);
    let rStr = oldStr.slice(right,oldStr.length);
    let newStr = lStr + aStr + rStr;
    return newStr;
}


let replaceSelectionIgnoreMark = function (element,left,right,ml){
    let cns = element.childNodes;
    let index = rangeIndex(element,left,right)
    let le = 0;
    let mr = "",rs = "";
    for (let j = 0; j < index+1; j++) {
        if ( cns[j].nodeType == 3 ) { // 文本节点
            le += cns[j].length
        } else if ( cns[j].nodeType == 1 ) { // 元素节点
            le += cns[j].firstChild.length
        }
    }

    let thisLen = cns[index].textContent.length
    let end = thisLen - (le-right)
    let start = end - (right-left)
    if ( !ml.includes("<") ){
        mr = "</"+ml+">"
        ml = "<"+ml+">"
    } else {
    mr = "</"+ml.split(" ")[0].split("<")[1]+">";
    }
    let rpStr = replaceString(cns[index].textContent,start,end,ml+cns[index].textContent.slice(start,end)+mr);

    for (let k = 0; k <cns.length; k++) {
        if ( k == index ) {
            rs += rpStr;
        } else {
            if ( cns[k].nodeType == 3 ) { // 文本节点
                rs += cns[k].textContent
            } else if ( cns[k].nodeType == 1 ) { // 元素节点
                rs += cns[k].outerHTML
            }
        }
    }

    return rs

}


let clearMark = function(html,tag,id){
    let re_str = "(<)(b|span|mark)([ ]*)?(id=\""+id+"\"[^>]*)?(>)";
    let re = new RegExp(re_str, "g");
    let new_str = html.replace(re,"");
    console.log("@@@@@@@@@@HTML:"+html);
    console.log("@@@@@@@@@@TAG:"+tag);
    console.log("@@@@@@@@@@ID:"+id);
    console.log("@@@@@@@@@@RS:"+new_str);
    // let re_str1 = "(</span>)([^<>]*)(</span>)";
    // let re1 = new RegExp(re_str1, "g");
    // let new_str1 = new_str.replace(re1,"$1$2");
    return new_str
}

let rangeIndex = function(element,left,right){
    let index = 0;
    let lens = 0;
    let cns = element.childNodes;
    for (let i = 0;lens < right; i++) {
        if ( cns[i].nodeType == 3 ) { // 文本节点
            lens += cns[i].length
        } else if ( cns[i].nodeType == 1 ) { // 元素节点
            lens += cns[i].firstChild.length
        }
        index = i;
    }
    return index
}


let insertMark = function(element,left,right,tag){
    return replaceSelectionIgnoreMark(element,left,right,tag)
}


