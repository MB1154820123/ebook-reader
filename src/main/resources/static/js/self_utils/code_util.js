function beautifyCode(code){
    let dom = document.createElement("div");
    let results = "";
    dom.innerHTML = daa(code) // 仅清除选中的标签属性
    dom.innerHTML = dlm1(dom.outerHTML) // 删除span、内层path
    dom.innerHTML = dlm2(dom.outerHTML) // 删除外层svg
    dom.innerHTML = tct(dom) // 处理代码块中的标签
    dom.innerHTML = psm(dom.outerHTML) // 恢复pre、code标签属性
    dom.innerHTML = cs(dom.outerHTML) // 清理特殊字符串边角料 空标记、<!-- -->、"、&lt;xx&gt; ...
    dom.innerHTML = dealWrap(dom.outerHTML) // 换行处理
    // dom.innerHTML = aw(dom.outerHTML) // 添加换行
    // dom.innerHTML = dw(dom.outerHTML) // 删除换行
    clearAllTextNode(dom) //【清理div和pre中的边角料:即清除文本节点】
    // 遍历dom，筛选出pre
    let domList = dom.childNodes;
    for (let i = 0; i < domList.length ; i++) {
        if (domList[i].nodeType == 3) {
            results += "";
        } else {
        results += domList[i].innerHTML+"\n";
        }
    }
    return results
}

// 处理换行的通法
function dealWrap(code){
    code = code.replace(/([ ]+(?!;))/g," ");
    code = code.replace(/([\n]+(?!;))/g,"\n");
    // 加前行
    code = code.replace(/(^[A-Z]|[ @][A-Z]|(?!pr)int(?!erface)|[ ]*public|private|\/\*\*)/g,"\n$1");
    // 加后行
    code = code.replace(/(;[ ]*|[ ]*\{)/g,"$1\n");
    // 减后行
    code = code.replace(/(,|>[ ]*|@interface|new|private|\/\*\*[^\n]*|public|class|int|out\.pr|extends)(\n)/g,"$1");
    // 减前行
    // code = code.replace(/([ ]*public)()/g,"$1");
    // 多行保一行
    code = code.replace(/[\n]{2,}/g,"\n");
    return code;
}


// 添加换行 addWrap aw
function aw(code){
    code = code.replace(/(\t|\{(?![0-9])|}(?!["])|：|&gt;(?=( |&lt;)+)|\*\/|\/\/[^ ]*)/g,"$1\n") // 后换行 (?!&lt;);(?!&quot;)|
    code = code.replace(/(\/\/|\*\/|[0-9];|String)/g,"\n$1") // 前加行 "|
    return code
}

// 删除换行 delWrap dw
function dw(code){
    code = code.replace(/(&|\/\/|](?!;)|\{\\n)(\n|[ ]*)/g,"$1") // 后减行
    code = code.replace(/(\n|[ ]*)(";)/g,"$2") // 前减行
    return code
}

// 清理边角料 clearScrap cs
function cs(code) {
    code = code.replace(/(<!-- -->|<[a-z]*[0-9]?><\/[a-z]*[0-9]?>)/g,"") //
    return code
}

// 删除任何匹配到的标签的任何属性 delAllAttr daa
function daa(code){
        code = code.replace(/(<)([/]?)(div|pre|article)([ ]+)([^>]*)(>)/g,"$1$2$3$6"); // 原：[a-z]*
        return code
}
// 仅对code标签内部的内容进行实体转义
function tct(parent){
    let entitiesStr = "";
        // 先变换code中所有元素的左右标签为实体字符
    let childs = parent.children;
    for (let i = 0; i < childs.length ; i++) {
        let c = childs[i].outerHTML.substring(0,4);
        if ( c.includes("<pre") ) {
            entitiesStr+=childs[i].outerHTML.replace(/</g,"&lt;").replace(/>/g,"&gt;")
        } else {
            entitiesStr+=childs[i].outerHTML
        }
    }
    // 恢复pre、code的字符
    entitiesStr = entitiesStr.replace(/(&lt;)([/]?)(pre(?=&gt;&lt;))/g,"<$2$3") // 恢复左pre
    entitiesStr = entitiesStr.replace(/(&lt;)([/]?)(code)/g,"<$2$3") // 恢复左code
    entitiesStr = entitiesStr.replace(/((?!&gt;&lt;)pre)(&gt;)/g,"$1>") // 恢复右pre
    entitiesStr = entitiesStr.replace(/(code)(&gt;)/g,"$1>") // 恢复右code
    parent.innerHTML = entitiesStr
        return entitiesStr
}
// 处理标签delOriginalCodeMark dlm  <pre code svg path>
function dlm1(code){
    code = code.replace(/(<)([/]?)(link|path)([^>]*)(>)/g,""); // 删除原span、pre
    return code
}
function dlm2(code){
    code = code.replace(/(<)([/]?)(svg)([^>]*)(>)/g,""); // 删除原span、pre
    return code
}
// 处理标签 pre code processCodeMark psm
function psm(code){
    // 恢复前pre  tabindex="1"
    code = code.replace(/<pre>/g,"\"<pre class=\"language-javascript\">");
    // 只能渲染第一个: code = code.replace(/<pre>/g,"\"<pre><span t=\"1\" class=\"code_stl_trigger\" style=\"user-select: none\">切换主题</span>");
    // 恢复前code
    code = code.replace(/(<code>)/g,"<code class=\"language-javascript\">")
    return code
}

// 转换实体到字符 entitiesToChar etc
function etc(content){
    content = content.replace("&lt;","<")
    content = content.replace("&gt;",">")
    content = content.replace("&quot;",'"')
    return content
}







//***********************************************************



// 处理制表符 dealCodeLineTab dlt
function dlt(code){
    code = code.replace(/([\t]*)/g,""); // 删除多余的制表符
    code = code.replace(/([\n]+)/g,"\n"); // 删除多余的行
    return code
}
// 处理关键词 dealFrontCodeKeyword dfd
function dfd(code){
    let keys = ["private","replace","public","String ","//","}"];
    for (let i = 0; i < keys.length ; i++) {
        let re_str = "("+keys[i]+")";
        let re = new RegExp(re_str, "g");
        code = code.replace(re,"\n$1");
    }
    return code
}
// 处理关键词 dealEndCodeKeyword ded
function ded(code){
    let keys = [";"]; // (?<!&gt|&lt)
    for (let i = 0; i < keys.length ; i++) {
        let re_str = "("+keys[i]+")";
        let re = new RegExp(re_str, "g");
        code = code.replace(re,"$1\n");
    }
    return code
}




