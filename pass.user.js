// ==UserScript==
// @name          ccu save id&password
// @namespace     http://www.cs.ccu.edu.tw/~hcwei95u/
// @description   add a button to save id and password 
//
// chrome
// @match       http://ecourse.elearning.ccu.edu.tw/
// @match	http://myhome.ccu.edu.tw/NUBlog/index/index.php
// @match	http://kiki.ccu.edu.tw/~ccmisp06/cgi-bin/class_new/login.php
// @match http://miswww1.cc.ccu.edu.tw/pt_proj/index.php
//
// opera
// @include       http://ecourse.elearning.ccu.edu.tw/
// @include	http://myhome.ccu.edu.tw/NUBlog/index/index.php
// @include	http://kiki.ccu.edu.tw/~ccmisp06/cgi-bin/class_new/login.php
// @include http://miswww1.cc.ccu.edu.tw/pt_proj/index.php
// @version       2.0
// ==/UserScript==

/*
	Author: carlcarl
	Version: 2.0
*/

(function() 
{
	// If localStorage or native JSON aren't available, the default value is returned
	if(typeof GM_getValue !== 'function')
	{
		function GM_getValue(configKey, configDefaultValue) {
			if ((window.localStorage) && (window.JSON)) {
				var configValue = localStorage.getItem("ccu" + configKey);
				return (configValue === null) ? configDefaultValue : JSON.parse(configValue);
			}
			else {
				return configDefaultValue;
			}
		}
	}

	// If localStorage or native JSON aren't available, it does nothing
	if(typeof GM_setValue !== 'function')
	{
		function GM_setValue(configKey, configValue) {
			if ((window.localStorage) && (window.JSON)) {
				localStorage.setItem("ccu" + configKey, JSON.stringify(configValue));
			}
		}
	}
	
	function $(name) 
	{
		return document.getElementsByName(name);
	}
	
	function $$(id) 
	{
		return document.getElementById(id);
	}
	
	function ccuCreateBox(_box, s, s2, idValue, passValue)
	{
		var buttonName = '記帳密';
		_button = document.createElement('input');
		_button.id = 'ccu-set';
		_button.type = 'button';
		_button.value = buttonName;
		_button.style.cssText = s;

		_form = document.createElement('div');
		_form.id = 'ccu-input';
		_form.style.cssText = s2;
		_label1 = document.createElement('label');
		_label1.innerHTML = 'Account: ';
		_inputId = document.createElement('input');
		_inputId.id = 'ccu-id';
		_inputId.value = idValue;
		_label2 = document.createElement('label');
		_label2.innerHTML = 'Password: ';
		_inputPass = document.createElement('input');
		_inputPass.type = 'password';
		_inputPass.id = 'ccu-pass';
		_inputPass.value = passValue;
		_check = document.createElement('input');
		_check.id = 'ccu-check';
		_check.type = 'button';
		_check.value = 'check';
		_cancel = document.createElement('input');
		_cancel.id = 'ccu-cancel';
		_cancel.type = 'button';
		_cancel.value = 'cancel';
		_form.appendChild(_label1);
		_form.appendChild(document.createElement('br'));
		_form.appendChild(_inputId);
		_form.appendChild(document.createElement('br'));
		_form.appendChild(_label2);
		_form.appendChild(document.createElement('br'));
		_form.appendChild(_inputPass);
		_form.appendChild(document.createElement('br'));

		// If 工讀系統
		if(window.location.href == 'http://miswww1.cc.ccu.edu.tw/pt_proj/index.php')
		{
			_select = document.createElement('select');
			_select.id = 'ccu-role';
			_option1 = document.createElement('option');
			_option1.value = '1';
			_option1.innerHTML = '計劃主持人';
			_option2 = document.createElement('option');
			_option2.value = '2';
			_option2.innerHTML = '專任助理';
			_option3 = document.createElement('option');
			_option3.value = '3';
			_option3.innerHTML = '兼任助理';
			_option4 = document.createElement('option');
			_option4.value = '4';
			_option4.innerHTML = '臨時工';
			_select.appendChild(_option1);
			_select.appendChild(_option2);
			_select.appendChild(_option3);
			_select.appendChild(_option4);
			_select.value = (scriptConfig.role == undefined)? "" : scriptConfig.role;
			_form.appendChild(_select);
			_form.appendChild(document.createElement('br'));
		}
		_form.appendChild(document.createElement('br'));
		_form.appendChild(_check);
		_form.appendChild(_cancel);

		_box.appendChild(_button);
		_box.appendChild(_form);
	}
	function ccuShow()
	{
		$$('ccu-input').style.display='block';
	}
	
	function ccuHide()
	{
		$$('ccu-input').style.display='none';
	}
	function ccuSave()
	{
		GM_setValue(window.location.href + "-id",  $$('ccu-id').value);
		GM_setValue(window.location.href + "-pass",  $$('ccu-pass').value);
		if(window.location.href == 'http://myhome.ccu.edu.tw/NUBlog/index/index.php')
		{
			$$('member_id').value = $$('ccu-id').value;
			$$('member_pw').value = $$('ccu-pass').value;
		}
		else if(window.location.href == 'http://kiki.ccu.edu.tw/~ccmisp06/cgi-bin/class_new/login.php')
		{
			$('id')[0].value = $$('ccu-id').value;
			$('password')[0].value = $$('ccu-pass').value;
		}
		else if(window.location.href == 'http://miswww1.cc.ccu.edu.tw/pt_proj/index.php')
		{
			GM_setValue(window.location.href + "-role",  $$('ccu-role').value);
			$('staff_cd')[0].value = $$('ccu-id').value;
			$('passwd')[0].value = $$('ccu-pass').value;
			$('proj_type')[0].value = $$('ccu-role').value;
		}
		else
		{
			$('id')[0].value = $$('ccu-id').value;
			$('pass')[0].value = $$('ccu-pass').value;
		}
		$$('ccu-input').style.display='none';
	}
	
	var scriptConfig = 
	{
		id: GM_getValue(window.location.href + "-id", ""),
		pass: GM_getValue(window.location.href + "-pass", ""),
		role: GM_getValue(window.location.href + "-role", ""),
	};
	
	
	window.addEventListener('load', function (e)
	{
		if($$('Layer1') != undefined)
			$$('Layer1').style.top = '3px';
		if (e.target instanceof  Document) 
		{ 
			var idValue = (scriptConfig.id == undefined)? "" : scriptConfig.id;
			var passValue = (scriptConfig.pass == undefined)? "" : scriptConfig.pass;
			var s = "z-index:100;position:absolute;";
			var s2 = "width:180px;height:150px;z-index:100;position:absolute;background-color:white;display:none;text-align:center;box-shadow:0px 0px 10px #06C;border-radius:3px;";
			var _box;
			var _option = '';
			var _id;
			var _pass;
			
			if(window.location.href == 'http://myhome.ccu.edu.tw/NUBlog/index/index.php') //工讀系統
			{
				s = s + "left:400px;";
				_box = document.getElementById('login');
				_id = $$('member_id');
				_pass = $$('member_pw');
			}
			else if(window.location.href == 'http://kiki.ccu.edu.tw/~ccmisp06/cgi-bin/class_new/login.php') //選課系統
			{
				_box = document.getElementsByName('form1')[0];
				s2 = s2 + "top:150px;";
				_id = $('id')[0];
				_pass = $('password')[0];
			}
			else if(window.location.href == 'http://miswww1.cc.ccu.edu.tw/pt_proj/index.php') //行政自動化系統
			{
				_box = document.getElementsByName('f1')[0];
				s2 = s2 + "position:relative";
				_id = $('staff_cd')[0];
				_pass = $('passwd')[0];

				$roleValue = (scriptConfig.role == undefined)? "" : scriptConfig.role;
				$('proj_type')[0].value = $roleValue;
			}
			else //ecourse
			{
				_box = document.getElementsByName('form1')[0];
				_id = $('id')[0];
				_pass = $('pass')[0];
			}

			// Create button and form
			ccuCreateBox(_box, s, s2, idValue, passValue);

			// Assign value to the fields on the page
			_id.value = idValue;
			_pass.value = passValue;

			$$('ccu-set').addEventListener('click', function (e){ccuShow();}, false);
			$$('ccu-cancel').addEventListener('click', function (e){ccuHide();}, false);
			$$('ccu-check').addEventListener('click', function (e){ccuSave();}, false);
		}
	}, false);

////////////////////////////// END OF MAIN SCRIPT /////////////////////////////
})();
