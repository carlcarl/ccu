// ==UserScript==
// @name          fix ecourse style
// @namespace     http://www.cs.ccu.edu.tw/~hcwei95u/
// @description   fix ecourse style
// @match       http://ecourse.elearning.ccu.edu.tw/php/*
// @include       http://ecourse.elearning.ccu.edu.tw/php/*
// @version       02 Oct 2010
// ==/UserScript==

/*
	Author: carlcarl
	Version: 02 Oct 2010
*/

function $(name) 
{
	return document.getElementsByName(name);
}

function $$(id) 
{
	return window.document.getElementById(id);
}

(function() 
{
    if(document.URL.match('bar.php') != null)
    {
        var layer = "Layer";

        // fix memu position
        for(var i = 1; i < 8; i++)
        {
            if($$(layer + i.toString()) != undefined)
            {
                $$(layer + i.toString()).style.top = '3px';
            }
        }

        // fix menu click
        for(var i = 11; i < 81; i += 10)
        {
            len = $$(layer + i.toString()).getElementsByTagName('a').length;
            for(var j = 0; j < len; j++)
            {
                $$(layer + i.toString()).getElementsByTagName('a')[j].addEventListener('click',function(e){parent.document.getElementsByName('target')[0].src = this.href;},false);
                $$(layer + i.toString()).getElementsByTagName('a')[j].target = 'target';
            }
        }

    }
////////////////////////////// END OF MAIN SCRIPT /////////////////////////////
})();
