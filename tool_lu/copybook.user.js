// ==UserScript==
// @name         字帖调整
// @namespace    https://tofuliang.me/
// @version      0.1
// @description  match size to exercise book
// @author       tofuliang
// @match        https://tool.lu/copybook/template.html
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.slim.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let pageHasExample = $(".table").has('.chinese .example').length > 0
    let lastRowHasExample = false
    $(".table .row").each((i,row)=>{
        let $row = $(row)
        let pageRow = $row.find(".cell .pinyin").length > 0 && 11||16
        // console.log($row.find(".cell .pinyin").length,pageRow)
        let lastCell = $row.children().last()[0]
        let practice = $row.find(".cell .chinese .practice")
        if(practice.length > 0){
            let copyCount = Math.floor(15/practice.length) - 1 || 0
            if(copyCount > 0){
                $row.children().filter((i,e)=>{
                    let filter = !($(e).has('.chinese .example').length > 0) && !($(e).has('.chinese .practice').length > 0)
                    return filter
                }).remove()
                let clone = $row.children().has('.chinese .practice').clone();
                while(copyCount-- > 0){
                    $row.append($(clone).clone());
                }
            }
        }
        // console.log(lastCell.outerHTML)
        $row.append(lastCell.outerHTML.repeat(16-$row.children().length));
        $row.removeClass("first-row last-row");
        if((i+1)%pageRow == 0){
            $row.addClass("last-row");
        }
        if((i+1)%pageRow == 1){
            $row.addClass("first-row");
        }
        if(pageHasExample && !lastRowHasExample && $row.has('.chinese .example').length < 1){
            $row.remove()
        }
        lastRowHasExample = $row.has('.chinese .example').length > 0
    })
    $(".chinese svg").addClass("word")
    $(".cell").css({width:"60px"})
    $(".cell .chinese").css({width:"40px",heigth:"40px",padding:"10px","background-size":"100%"})
    $(".cell .chinese .word").css({width: "40px", height:"40px"})
    $(".cell .pinyin").css({width: "60px", height:"38px","font-size":"20px", "line-height":"38px","background-size":"100%"})
})();

