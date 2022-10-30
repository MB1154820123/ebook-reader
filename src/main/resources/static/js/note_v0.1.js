            // 全局变量
            var responseValue;

            /**
             * @desc 新的实现：添加noteId、渲染元素
             * @time 2022/10/21 9:07
             * @author mabo
             */

            /**
             * @type javascript data-warp-tool
             * @desc 获取子字符串位于父字符串的起始下标位置
             * @time 2022/10/21 9:09
             * @author mabo
             * @param str
             * @param subStr
             * @returns {*[]}
             */
            function foo(str, subStr) {
                const result = [];
                for (let index = 0; index < str.length; index++) {
                    const temp = str.slice(index, index + subStr.length)
                    if (temp === subStr) {
                        result.push(index)
                    }
                }
                return result;
            }

            /**
             * @type javascript bus-ebookReader-insert
             * @desc 为划线内容添加笔记Id
             * @time 2022/10/21 9:13
             * @author mabo
             * @Type {addNoteId}
             */
            var addNoteId = (function(cr,type){
                var selection = window.getSelection();
                let srange = selection.getRangeAt(0);
                // 声明笔记
                let node;
                let did;
                // 构建id：第一步
                // 段Id
                let duan = selection.focusNode.parentElement.parentElement;
                let duans = document.getElementsByClassName("duan");
                for (let i = 0; i < duans.length; i++) {
                    if ( duans[i] == duan ) {
                        did = i;
                    }
                }
                // 创建一个空笔记元素
                switch ( type ){
                    case "b":
                        node = document.createElement("b");
                        node.setAttribute("style","color:"+cr);
                        break;
                    case "mark":
                        node = document.createElement("mark");
                        node.setAttribute("style","background-color:"+cr);
                        break;
                    default:
                        node = document.createElement("b");
                        node.setAttribute("style","color:orange;");
                        break;
                }
                // 为空笔记元素添加后续js脚本的指引
                node.setAttribute("onmouseover","selectNote(this,'1')");
                node.setAttribute("onclick","addNote(this,'2')");
                // 为空笔记元素添加内容
                node.innerHTML = selection;
                // 覆盖替换内容
                selection.deleteFromDocument();
                srange.insertNode(node);
                // 构建id：第二步
                // 替换域、样式
                console.log("STR:"+selection.focusNode.parentElement.innerText);
                console.log("SLC:"+selection.toString());

                let ind = foo(selection.focusNode.parentElement.innerText,selection.toString())[0];
                let left = ind;
                let right = ind+selection.toString().length;
                console.log("ind:"+ind);
                console.log("left:"+left);
                console.log("right:"+right);
                let color = node.getAttribute("style").split("color:")[1].charAt(0);
                let tag = node.outerHTML.charAt(1);
                // 构建id：第三步
                // 整合id信息
                node.setAttribute("id",did+"-"+left+":"+right+"-"+tag+"-"+color);

                console.log("ID:"+did+"-"+left+":"+right+"-"+tag+"-"+color);
                /**
                 * ***********************************************************后台交互业务：
                 */
                    let params = {
                        "notesId":node.getAttribute("id"),
                        "creatorId":10001
                    }
                    noResponseAjax("addNote",params);
            });

            /**
             * @type javascript bus-ebookReader-read
             * @desc 通过noteId所展示的信息，补全当前页面的dom信息
             * @time 2022/10/21 9:16
             * @author mabo
             * @param noteId
             */
            var renderNote = function(noteId){
                let did = parseInt(noteId.split("-")[0]);
                let left =  parseInt(noteId.split("-")[1].split(":")[0]);
                let right = parseInt(noteId.split("-")[1].split(":")[1]);
                let tag = noteId.split("-")[2]=='b'?'b':"mark";
                let color;
                switch (noteId.split("-")[3]){
                    case "r":color = "red";
                        break;
                    case "b":color = "blue";
                        break;
                    case "g":color = "green";
                        break;
                    default:color = "orange";
                        break;
                }
                let mr = "</"+tag+">";
                let style =  tag=="mark"?" id="+noteId+" style=background-color:"+color+";color:white;":" id="+noteId+" style=color:"+color+";";
                let script = " onmouseover=selectNote(this,'1') onclick=addNote(this,'2')"
                // 为笔记元素添加后续js脚本的指引
                let ml = "<"+tag+style+script+">";
                let range = document.createRange();
                // 取段
                let dn = document.getElementsByClassName("duan")[did].innerHTML;
                // 设置领域
                let startNode = document.getElementsByClassName("duan")[did];
                let endNode = document.getElementsByClassName("duan")[did];
                range.setStart(startNode,0); // 当end节点的偏移量为0或1时， 0表示以左边第一个字符开始为起始点，1表示，以右边最后一个字符结束为起始点
                range.setEnd(endNode,1); // 0是关闭下一行，如果需要替换的内容恰巧在被关闭的行中，则替换失效
                // 替换
                dn = dn.replace(range.startContainer.innerText.substring(left,right),ml+range.startContainer.innerText.substring(left,right)+mr);
                // 写入dom
                document.getElementsByClassName("duan")[did].innerHTML = dn;
            }

            /**
             * @type js data-insert-ajax-tool
             * @desc 操作后端数据的ajax
             * @time 2022/10/21 9:37
             * @author mabo
             * @param serviceName
             * @param params
             */
            function noResponseAjax(serviceName,params){
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:8080/"+serviceName,
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(params)
                });
            }

            /**
             * @type js data-select-ajax-tool
             * @desc 查询后端数据的ajax
             * @time 2022/10/21 9:39
             * @author mabo
             * @param serviceName
             * @param params
             */
            function responseAjax(serviceName,params){
                console.log("有返回值的Ajax请求参数："+params);
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:8080/"+serviceName,
                    contentType: "application/json;charset=UTF-8",
                    async: false,
                    data: JSON.stringify(params),
                    success:function (value) {
                        console.log("返回值为："+value);
                        responseValue =  value; // 默认的异步ajax请求无法对全局变量赋值，需加上async: false
                    }
                });
            }




















            /**
             * 公用服务中心
             */






            /**
             * 查询笔记
             */
            function selectNote(target,v) {
                let noteId = $(target).attr("id");
                responseAjax("selectNote",{"notesId":noteId});
                console.log("接收到的返回值："+responseValue);
                if ( v.includes("2") ) {
                    let note;
                    if ( responseValue != "null" && responseValue != "" ){
                        note = responseValue;
                    } else {
                        note = "请输入需要添加的笔记：";
                    }
                    document.getElementById("note").innerText = note;
                }
                else if (  v.includes("1") && responseValue != "null"  && responseValue != "" ) {
                    console.log("进入设置title,title为："+responseValue);
                    document.getElementById(noteId).setAttribute("title", responseValue);
                }

                // 从后端查询笔记
                // $.ajax({
                //     type: "post",
                //     url: "http://127.0.0.1:8080/selectNote",
                //     contentType: "application/json;charset=UTF-8",
                //     data: JSON.stringify({notesId:noteId}),
                //     success:function(noteInfo){
                //
                //     }
                // });
            }

            function renderDomList(){
                // 从后台获取ids
                $.ajax({
                    type: "get",
                    contentType: "application/json;charset=UTF-8",
                    url: "http://127.0.0.1:8080/selectNoteIds",
                    success:function(ids){
                        console.log("****************进入笔记dom初始化");
                        let arrays = ids.replace("[","").replace("]","").split(",");
                    //     let aims = {};
                    //     let aim;
                    //     let rss = "";
                    //     let rs="";
                    //     let left;
                    //     let right;
                    //     let range = document.createRange();
                        for (let i = 0; i < arrays.length; i++) {
                            console.log("****************执行笔记dom初始化");
                            console.log("****************当前dom的id："+arrays[i]);
                            renderNote(arrays[i]);
                        }
                    //         // b1-p1-br1-b1-0:2-blue
                    //         let bid = parseInt(arrays[i].split("-")[0].replace(/[a-z]/,""))-1;
                    //         let pid = parseInt(arrays[i].split("-")[1].replace(/[a-z]/,""))-1;
                    //         let brid = parseInt(arrays[i].split("-")[2].replace("br",""))-1
                    //         let markType = arrays[i].split("-")[3].replace(/([a-z]*)([0-9]*)/,"$1");
                    //         let elEnd = "</"+(markType=="m"?"mark>":"b>");
                    //         left = parseInt(arrays[i].split("-")[4].split(":")[0]);
                    //         right = parseInt(arrays[i].split("-")[4].split(":")[1]);
                    //         let color = arrays[i].split("-")[5];
                    //         let style = "style=" + (markType=="m"? "background-color:"+color+";color:white;": "color:"+color+";");
                    //         let bl = "<"+(markType=="m"?"mark id=":"b id=")+arrays[i]+" "+style+" onmouseover=selectNote(this,'1') onclick=addNote(this,'2')>";
                    //         range.setStart($(".bu").slice(bid).find("[class$=duan]").slice(pid)[0],0);
                    //         aim = range.startContainer.innerHTML;
                    //         aim = aim.replaceAll("<br>","|")
                    //         for (let j = 0; j < aim.split("|").length; j++) {
                    //             if( j == brid ) {
                    //                 // 补上上一次替换后的结果
                    //                 let offset = "";
                    //                 let subLen1;
                    //                 let subLen2;
                    //                 if ( i == 0 ) {
                    //                     offset = aim.split("|")[j].substr(0).substr(0,left);
                    //                 } else if ( i > 0 ) {
                    //                     subLen1 = right - (parseInt(arrays[i-1].split("-")[4].split(":")[1]));
                    //                     subLen2 = subLen1 - (right - left);
                    //                     offset = aim.split("|")[j].substr(right-subLen1).substr(0,subLen2);
                    //                 }
                    //                 rs += offset + bl +aim.split("|")[j].substring(left,right)+elEnd+aim.split("|")[j].substring(right)+"|";
                    //             } else {
                    //                 rs += aim.split("|")[j]+"|";
                    //             }
                    //         }
                    //         aim = rs
                    //         aim = aim.substring(0,(aim.length-1)).replaceAll("|","<br>")
                    //         aims[i] = aim;
                    //         if ( i < (arrays.length-1) ) {
                    //         rss += aim.split(elEnd)[0]+elEnd;
                    //         } else {
                    //         rss += aim.split(elEnd)[0]+elEnd+aim.split(elEnd)[1];
                    //         }
                    //     }
                    //     range.startContainer.innerHTML = rss;
                    }
                });




            }



            /**
             * @desc 加载笔记工具
             */
            window.onload = function () {
                // let rs = "";
                $("#upload").after("<span title=红边 onclick=addNoteId('red','b') class=tool_bian style=left:20px;top:110px;>🦐</span><span title=蓝边 onclick=addNoteId('blue','b') class=tool_bian style=left:20px;top:150px;>🐬</span><span title=绿边 onclick=addNoteId('green','b') class=tool_bian style=left:20px;top:190px;>🐍</span><span title=红面 onclick=addNoteId('red','mark') class=tool_mian style=left:20px;top:230px;>🟥</span><span title=蓝面 onclick=addNoteId('blue','mark') class=tool_mian style=left:20px;top:270px;>🟦</span><span title=绿面 onclick=addNoteId('green','mark') class=tool_mian style=left:20px;top:310px;>🟩</span><span title=清除 onclick=clearNote() class=tool_mian style=left:20px;top:350px;>❌</span>");
                this.renderDomList();
                // b1-p1-br1-b1-0:2-blue
                /**
                let range = document.createRange();
                range.setStart($(".bu").slice(0).find("[class$=duan]").slice(0)[0],0);
                console.log("#############Range:"+range.startContainer.innerHTML);
                let aim = range.startContainer.innerHTML;
                aim = aim.replaceAll("<br>","|");
                // aim = "<b id='b1-p1-br1-b1-0:2-blue' style='color: blue;'>"+aim.split("|")[0]+"</b>|";
                for (let i = 0; i < aim.split("|").length; i++) {
                    if( i == 0 ) {
                        rs += "<b id='b1-p1-br1-b1-0:2-blue' style='color: blue;'>"+aim.split("|")[i].substring(0,2)+"</b>"+aim.split("|")[i].substring(2)+"|";
                    } else {
                        rs += aim.split("|")[i]+"|";
                    }
                }
                aim = rs;
                aim = aim.substring(0,(aim.length-1)).replaceAll("|","<br>");
                console.log("aim:"+aim);
                range.startContainer.innerHTML = aim;
                 **/
            }


            /**
             * 添加笔记
             */
            function addNote(target,v) {
                console.log("---------------------进入AddNote")
                let thisId = $(target).attr("id");
                // 仅仅做记号，没添加任何笔记
                if (v.includes("0")){
                    // 添加笔记到后端
                    // $.ajax({
                    //     type: "post",
                    //     contentType: "application/json;charset=UTF-8",
                    //     url: "http://127.0.0.1:8080/addNote",
                    //     data: JSON.stringify({
                    //         notesId:thisId,
                    //         creatorId:10001
                    //     })
                    // });
                    let params = {
                        notesId:thisId,
                        creatorId:10001
                    }
                    noResponseAjax("addNote",params);
                } else {
                    console.log("---------------------进入正式添加AddNote")
                    swal({
                        function:selectNote(target,v),
                        title:"处理有关<font color='#d2691e'>"+target.innerText+"</font>的笔记：",
                        text:"<textarea id='note' onfocus='clearAddNoteTip(this)' onblur='updateContent(this,event)'></textarea>",
                        html:true,
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定处理",
                        cancelButtonText: "取消处理",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },function(isConfirm){
                        if (isConfirm) {
                            console.log("---------------------开始添加AddNote到后台")
                                // 添加笔记到后端
                                let thisId = $(target).attr("id");
                                let params = {
                                    notesId:thisId,
                                    noteContent:$("#note").text(),
                                    creatorId:10001,
                                    modifyTime:new Date
                                }
                                let response = responseAjax("addNote",params);
                                swal({
                                    title: "处理结果",
                                    text: response
                                });
                                // 添加笔记到后端
                                // $.ajax({
                                //     type: "post",
                                //     contentType: "application/json;charset=UTF-8",
                                //     url: "http://127.0.0.1:8080/addNote",
                                //     data: JSON.stringify({
                                //         notesId:thisId,
                                //         noteContent:$("#note").text(),
                                //         creatorId:10001,
                                //         modifyTime:new Date
                                //     }),
                                //     success:function(addInfo){
                                //         swal({
                                //             title: "处理结果",
                                //             text: addInfo
                                //         });
                                //     }
                                // });
                            } else {
                                swal("取消", "处理笔记操作已取消","error");
                            }
                        }
                    )
                }
            }


            /**
             * 为选中的内容构建DOM
             * @param bgc
             * @param color
             * @param type
             */
            function buildDOMForSelection(bgc,color,type){
                let selection = window.getSelection();
                let range = selection.getRangeAt(0);
                let node;
                let bid; // 部id
                let pid; // 章id
                let bmid; // <b>、<mark>标记id
                let brid;
                let rangeSub = range.startOffset + ":" + range.endOffset;
                let id;
                // 【补充标记 ID】 为组合部-段-标记 ID 做准备：找到选中内容所属的【部、段、具体标记】
                let thisB = $(selection.focusNode).parent().parent(); // 选中的内容节点的祖父节点【部】 <div class="bu">
                let thisP = $(selection.focusNode).parent(); // 选中的内容节点的父节点【段】 <p class="*_duan">
                // console.log("thisB:"+thisB.html());
                // console.log("thisP:"+thisP.html());

                // 判断是不是选中了已经添加笔记的内容
                let bool = selection.focusNode.parentNode.textContent.localeCompare(selection.focusNode.textContent);

                if ( bool != 0 ) {

                // 遍历部：添加部 ID
                $.each($(".bu"), function(index, item) {
                    if (thisB.html() == $(item).html()) {
                        bid = "b" + (index + 1); // 构建部 ID
                    }
                    $(thisB).attr("id",bid);
                });

                // 遍历段：添加段 ID
                $.each($("[class$=duan]"), function(index, item) {
                    if (thisP.html() == $(item).html()) {
                        pid = "p" + (index + 1); // 构建段 ID
                    }
                    $(thisP).attr("id",bid+"-"+pid);
                });

                // 包装选中的内容节点，即给选中内容添加<b>或<mark>标记
                if ( type.includes("mark") ) {
                    node = document.createElement("mark");
                } else {
                    node = document.createElement("b");
                }
                node.innerText = selection.toString();

                // 替换选中
                range.deleteContents();
                range.insertNode(node);

                // 遍历<br>
                let brs = $("#" + bid + "-" + pid + " br");
                // 上一个br→本node→下一个br  ||  本node→下一个br
                $.each(brs, function(index, item) {
                    let target = $(node).prev("br");
                    let lastIndex = brs.index(target);
                    console.log("lastIndex:"+lastIndex);
                    console.log("thisIndex:"+index);
                    console.log("B:"+item);
                    if ( target == item || index == (lastIndex+1) ){

                        brid = "br" +  (index + 1); // 构建换行 ID
                        console.log("Brid是遍历得到的，为："+brid)
                    }
                });
                    // 最后一行没有br
                    if ( brid == undefined ) {
                        brid = "br"+(brs.length+1);
                        console.log("Brid不是遍历得到的，为："+brid)
                    }

                // type =  true : 是mark标记，否则是b标记
                if ( type.includes("mark") ) {
                    // 遍历标记
                    $.each($("#" + bid + "-" + pid + " mark"), function(index, item) {
                        if ($(node).text() == $(item).text()) {
                            // 补充bmid
                            bmid = "m" + (index + 1); // 构建标记 ID
                        }
                    });
                } else {
                    // 遍历标记
                    $.each($("#" + bid + "-" + pid + " b"), function(index, item) {
                        if ($(node).text() == $(item).text()) {
                            // 补充bmid
                            bmid = "b" + (index + 1); // 构建标记 ID
                        }
                    });
                }

                // 处理rangeSub

                console.log("OldRangeSubIndex:"+rangeSub);
                let lastRangeSub = $(node).prev().attr("id");
                if ( lastRangeSub != undefined ){
                    lastRangeSub = lastRangeSub.split(":")[1];
                    console.log("lastRangeSubRightIndex:"+lastRangeSub);
                    rangeSub = (parseInt(rangeSub.split(":")[0])+parseInt(lastRangeSub)) + ":" + (parseInt(rangeSub.split(":")[1])+parseInt(lastRangeSub));
                }
                console.log("FinalRangeSubIndex:"+rangeSub);


                id = bid + "-" + pid + "-" + brid + "-" + bmid + "-" + rangeSub; // 整合 部-段-标记-换行-start:end ID
                    let c = bgc==""?color:bgc;
                // 添加id
                $(node).attr("id",id+"-"+c);
                console.log("#ID:"+"#"+id);
                console.log("bgc:"+bgc);
                console.log("color:"+color);
                console.log("$$$$$$$$$$$$$$$$$$$$C:"+c);
                $(node).css("background-color",bgc).css("color",color).attr("onmouseover","selectNote(this,'1')").attr("onclick","addNote(this,'2')");
                // 把划线添加到后台
                    addNote(node,"0");
                } else {
                    swal({
                        title:"温馨提示",
                        text:"不支持复合样式",
                        type:"warning",
                        html:true
                    })
                }


            }

            /**
             * 清除笔记的颜色样式
             */
            function clearNote(){
                let selection = window.getSelection();
                let hasNote = false;
                let parent = selection.focusNode.parentElement;
                let parentId = $(parent).attr("id");
                // 获取上下两个换行元素之间的元素集合
                let objs = getAllNodesBetweenTwoElements($(parent).prev("br"),$(parent).next("br"));
                let ids = new Array();
                // 准备本行其他标记元素的ids
                for (let i = 0; i < objs.length; i++) {
                    if ( objs[i].id != parentId) {
                        ids.add(id);
                    }
                }


                if ( ! hasNote ){
                    // 处理后台
                    dealAfterClearNote(ids,parentId);
                    // 将选择的文本追加一份到包裹文本的标签的后边
                    $(parent).after(selection.toString());
                    // 删除整个包裹文本的标签
                    $(parent).remove();
                } else {
                    swal({
                            title: "确认清除笔记",
                            text: "待清理的选中内容含有阅读笔记，是否一并清除？",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定清除！",
                            cancelButtonText: "取消清除！",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },
                        function(isConfirm){
                            if (isConfirm) {
                                    // 处理后台
                                    dealAfterClearNote(ids,parentId);
                                    // 将选择的文本追加一份到包裹文本的标签的后边
                                    $(parent).after(selection.toString());
                                    // 删除整个包裹文本的标签
                                    $(parent).remove();
                            } else {
                                swal({
                                    title: "温馨提示",
                                    text: "你还可以仅清除标注颜色，请选择：",
                                    type: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "确定清除！",
                                    cancelButtonText: "取消清除！",
                                    closeOnConfirm: false,
                                    closeOnCancel: false
                                }, function (isConfirm) {
                                    if (isConfirm) {
                                        $(selection.focusNode.parentElement).css("background-color","").css("color","")
                                        swal("颜色已清除！", "放心，只是清除了标注内容的颜色",
                                            "success");
                                    } else {
                                        swal("取消清除样式操作！", "放心好的，您取消清除样式操作！",
                                            "error");
                                    }
                                })
                            }
                        });


                }
            }

            function dealAfterClearNote(sameLineMarksIds,theMarkId){
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:8080/dealAfterClearNote",
                    data: {
                        "ids":sameLineMarksIds,
                        "id":theMarkId
                    },
                    success:function (type){
                        if ( type == "empty" ) { // 没有笔记
                            swal("删除成功！", "你的划线已经被清除。","success");
                        } else if ( type == "fill" ) { // 有笔记
                            swal("删除成功！", "你的笔记和划线已经被清除。","success");
                        }
                    },
                    error:function (type){
                        swal("删除失败！", "错误类型："+type,"error");
                    }
                });
            }
            /**
             * @description 包装选中的文本
             * @param {Object} v
             */
            function wrap(v) {
                var selection = window.getSelection();
                var range = selection.getRangeAt(0);
                console.log("END_TO_END",range.END_TO_END);
                console.log("END_TO_START",range.END_TO_START);
                console.log("START_TO_END",range.START_TO_END);
                console.log("START_TO_START",range.START_TO_START);
                console.log("startOffset",range.startOffset);
                console.log("endOffset",range.endOffset);
                console.log("startContainer",range.startContainer.innerHTML);
                console.log("endContainer",range.endContainer.innerHTML);
                // 排除重复添加样式
                console.log("**********************ThisPC:"+selection.focusNode.parentNode.textContent);
                console.log("**********************ThisTextContent:"+selection.focusNode.textContent);
                var bool = selection.focusNode.parentNode.textContent.localeCompare(selection.focusNode.textContent);
                if ( (bool != 0) || (v == 4) ) {
                    var node;
                    var textNode;
                    var bid; // 部id
                    var pid; // 章id
                    var bmid; // <b>、<mark>标记id
                    var brid;
                    var rangeSub = range.startOffset + ":" + range.endOffset;
                    if (range.collapsed) {
                        return;
                    }
                    // 清除样式
                    if (v == 4) {
                        let text = selection.toString();
                        // 预定义占位内容
                        textNode = document.createTextNode(text);
                        // 将占位内容加入到 range 域
                        range.insertNode(textNode);
                        let element = $(textNode).parent().html().toString();
                        if (element.replaceAll(text, "") == "") {
                            // 追加将要删除的文本
                            $(textNode).parent().after(text);
                            // 删除old样式
                            $(textNode).parent().remove();
                        } else {
                            // 移除没用到的且位于 range 内的多余的占位内容
                            $(textNode).remove();
                            swal({
                                title: "<h3>温馨提示：</h3>",
                                text: "请选择需要清除颜色的文字！",
                                html: true
                            });
                        }
                    } else {
                        // 【补充标记 ID】 为组合部-段-标记 ID 做准备：找到选中内容所属的【部、段、具体标记】
                        var thisP = $(selection.focusNode).parent(); // 选中的内容节点的父节点【段】 <p class="*_duan">
                        var thisB = $(selection.focusNode).parent().parent(); // 选中的内容节点的祖父节点【部】 <div class="bu">
                        // 遍历部：添加部 ID
                        $.each($(".bu"), function(index, item) {
                            if ($(thisB).attr("id") == $(item).attr("id")) {
                                bid = "b" + (index + 1); // 构建部 ID
                                $(thisB).attr("id", bid); // 整合 部 ID
                            }
                        });
                        // 遍历段：添加段 ID
                        $.each($("[class$=duan]"), function(index, item) {
                            if ($(thisP).attr("id") == $(item).attr("id")) {
                                pid = "p" + (index + 1); // 构建段 ID
                                $(thisP).attr("id", bid + "-" + pid); // 整合 部-段 ID
                            }
                        });
                        // 包装选中的内容节点，即给选中内容添加<b>或<mark>标记
                        if (v <= 3) {
                            node = document.createElement("b");
                        } else if (v > 4) {
                            node = document.createElement("mark");
                        }
                        node.innerText = selection.toString();


                        // 添加样式
                        if (v == 1) {
                            $(node).css("color", "red").attr("onmouseover", "tip(this)");
                        }
                        if (v == 2) {
                            $(node).css("color", "blue").attr("onmouseover", "tip(this)");
                        }
                        if (v == 3) {
                            $(node).css("color", "green").attr("onmouseover", "tip(this)");
                        }
                        if (v == 5) {
                            $(node).css("background-color", "red").css("color", "white").attr("onmouseover",
                                "tip(this)");
                        }
                        if (v == 6) {
                            $(node).css("background-color", "blue").css("color", "white").attr("onmouseover",
                                "tip(this)");
                        }
                        if (v == 7) {
                            $(node).css("background-color", "green").css("color", "white").attr("onmouseover",
                                "tip(this)");
                        }
                        // 替换选中
                        range.deleteContents();
                        range.insertNode(node);

                        // 遍历<br>
                        $.each($("#" + bid + "-" + pid + " br"), function(index, item) {
                            console.log("node:"+node);
                            console.log("nodeParent:"+node.parentNode);
                            console.log("nodeNextNode:"+node.nextSibling); // 下一个节点
                            console.log("nodeNextElement:"+node.nextElementSibling); // 下一个元素
                            console.log("node.innerHtml:"+node.innerHTML);
                            console.log("$(node):"+$(node));
                            console.log("$(node).html:"+$(node).html());
                            console.log("item:"+item);
                            console.log("itemLastNode:"+item.previousSibling); // 包括文本节点、注释节点
                            console.log("itemLastElm:"+item.previousElementSibling); // 之包含元素节点
                            console.log("item.innerHtml:"+item.innerHTML);
                            console.log("$(item):"+$(item));
                            console.log("$(item).html:"+$(item).html());
                            if ( node.nextElementSibling == item ){
                                brid = "br" +  (index + 1); // 构建换行 ID
                            }
                        });
                        // 最后一行没有br
                        if ( brid == undefined ) {
                            brid = "br"+($("#" + bid + "-" + pid + " br").length+1);
                        }



                        // ************************************终极目标：补充标记 ID
                        if (v <= 3) {
                            let rgb = $(node).css("color");
                            // 遍历标记
                            $.each($("#" + bid + "-" + pid + " b"), function(index, item) {
                                if ($(node).text() == $(item).text()) {
                                    // 补充bmid
                                    bmid = "b" + (index + 1); // 构建标记 ID
                                }
                            $(node).attr("id", bid + "-" + pid + "-" + brid + "-" + bmid + "-" + rangeSub + "-" + rgb); // 整合 部-段-标记-换行-start:end ID
                            });
                        } else if (v > 4) {
                            let rgb = $(node).css("background-color");
                            // 遍历标记
                            $.each($("#" + bid + "-" + pid + " mark"), function(index, item) {
                                if ($(node).text() == $(item).text()) {
                                    // 补充bmid
                                    bmid = "m" + (index + 1); // 构建标记 ID
                                }
                                $(node).attr("id", bid + "-" + pid + "-" + brid + "-" + bmid + "-" + rangeSub + "-" + rgb); // 整合 部-段-标记-换行-start:end ID
                            });
                        }
                    }
                } else {
                    swal({
                        title:"温馨提示",
                        text:"不支持复合样式",
                        type:"warning",
                        html:true
                    })
                }
            }

            /**
             * 获取当前页面并将页面内容提交到后端
             */
            $("#upload").click(function() {
                var doc = document.getElementsByTagName('html')[0].innerHTML;
                doc = encodeURIComponent(doc);
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:8080/printHtml",
                    data: "html=" + doc
                });
            });
