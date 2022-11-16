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


let processHtml = function(html){
        let content = document.getElementById("webPage");
        let title = html.split(/<title[^>]*>/)[1].split(/<\/title>/)[0].replace(/<[^>]*>/g,"").split("_")[0];
        $("#webTitle").text(title)
        html = dlm1(html) // 1. 删除link、内层path ：正常✅
        html = dlm2(html) // 2. 删除外层svg ：正常✅
        html = daa(html) // 3.删除指定标签的属性
        html = "<article"+html.split("<article")[1].split("</article>")[0]+"</article>"
        content.innerHTML = html;
        let pres = getFullThisTypeElements(content,"PRE");
        for (let i = 0; i < pres.length; i++) {
            let tempPre = document.createElement("pre");
            let code = document.createElement("code");
            tempPre.appendChild(code);
            // 4.剥离出原pre中的代码
            let pre = pres[i].outerHTML.replace(/<[^>]*>/g,"")
            // 5.遇到\t就换行
            pre = pre.replace(/([\t]+)/g,"\n$1")
            // 6.处理pre：添加换行
            pre = pre.replace(/((&gt;|;|\{|})(?=[ ]{2,}))/g,"$2\n")
            // 7.为代码块添加语言说明
            let type = 0;
            if ( pre.includes("&lt;") && pre.includes("xml") ) {
                type = 1;
            }
            if ( !pre.includes("&lt;") ) {
                type = 2;
            }
            if ( pre.includes("&lt;") && !pre.includes("xml") ) {
                type = 3;
            }
            switch ( type ) {
                case 1:
                    code.setAttribute("class", "language-xml")
                    break;
                case 2:
                    // 美化js代码
                    pre = js_beautify(pre,2,' '); // 美化代码
                    code.setAttribute("class", "language-javascript")
                    break;
                case 3:
                    code.setAttribute("class", "language-html")
                    break;
            }
            code.innerHTML = pre
            pres[i].parentElement.replaceChild(tempPre,pres[i]);
        }
        Prism.highlightAll(document.body)

        // 8.properties-mysql换行
        content.innerHTML = content.innerHTML.replace(/([^=\.{ -<])(jdbc(?!Connection))/g,"$1<br>$2")
        content.innerHTML = content.innerHTML.replace(/([^\{/\u4e00-\u9fa5])(resources)/g,"$1<br>$2")
        // 9.properties-spring换行
        content.innerHTML = content.innerHTML.replace(/([^\.>-])(spring)/g,"$1<br>$2")
        // 10.删除空段
        content.innerHTML = content.innerHTML.replace(/<p>&nbsp;<\/p>/g,"")
}


