window.addEventListener("load", function(){

  var header = document.getElementById('top-header'); 
  var wrappWinSet = document.querySelector(".wrapp-win-set");
  var wrappWinSetWid = wrappWinSet.offsetWidth;
  var wrappWinSetHeih = wrappWinSet.offsetHeight;
  var batteryIcon = document.querySelector('.window-settings__battery');
  var level;
  var styleTextElement = document.querySelector(".style-text");
  var deleteTextIcon = document.querySelector(".delete-item-header");
  var textItalic = document.querySelector(".text-italic");
  var textBold = document.querySelector(".text-bold");
  var textColor = document.querySelector(".text-color");
  var textColorBackground = document.querySelector(".text-color-bg");
  var content = document.querySelector(".content");
  editField.document.designMode = "on";
  var contentHeight = content.style.height = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  ) + "px";
  var contextmenu = document.querySelector(".contextmenu");
  var editmenu = contextmenu.querySelector(".edit-menu");
  var colorItem = document.querySelector(".color-item");
  var pallete = document.querySelector(".pallete");
  var styleItem = document.querySelector(".style-item");
  var styleItalic = document.querySelector(".style-italic");
  var toUp = document.querySelector(".toUp");
  var warnBlock = document.querySelector(".warn-block");
  var warnBlockClose = document.querySelector(".warn-block-close");
  var warnBlockOutput = document.querySelector(".warn-block-output");
  var isTextItalic = false;
  var isColoredText = false;
  var isEditable = false;
  var isCopied = false;
  var isWarnDisplayed = false;
  var clipBoardText;
  var showingTooltip;
  
  function doTextItalic() {
    if(editField.window.getSelection().toString()){

      if(!isTextItalic) {
        styleItalic.textContent = "Normal";
      }else {
         styleItalic.textContent ="Italic";
      }

      editField.document.execCommand("italic", false, null);
      contextmenu.style.display = "";
      isTextItalic = !isTextItalic;
    }else {
      contextmenu.style.display = "";
    }  
  }
  
  function showPallete() {
    pallete.style.display = "block";
    contextmenu.style.display = "";
  }
	
	function showWarn(msg) {
	/*   isWarnDisplayed = true;
	  warnBlock = document.createElement("div");
	  var warnBlockClose = document.createElement("div");
	  var warnBlockInfo = document.createElement("div");
	  var divOutput = document.createElement("div");
	  warnBlock.classList.add("warn-block");
	  warnBlockClose.classList.add("warn-block-close fa fa-times");
	  warnBlock.appendChild(warnBlockClose);
	  warnBlockInfo.classList.add("info-block-warn fa fa-info-circle");
	  warnBlockInfo.innerHTML = "Warning";
	  warnBlock.classList.add(warnBlockInfo);
	  divOutput.classList.add("warn-block-output");
	  divOutput.innerHTML = msg;
	  warnBlock.appendChild(divOutput);
	  document.body.appendChild(warnBlock); */
	  warnBlockOutput.innerHTML = msg;
	  warnBlock.style.display = "block";
	}
	
	function hideWarn() {
	  /* document.body.removeChild(warnBlock); */
	  //warnBlockOutput.innerHTML = "";
	  warnBlock.style.display = "";
	}
  
   function copyText() {
     isCopied = true;
	 clipBoardText = content.contentWindow.getSelection();
	 console.log(clipBoardText.toString());
     editField.document.execCommand("copy", false, null);
   }
   
   function cutText() {
     isCopied = true; 
	 clipBoardText = content.contentWindow.getSelection();
     editField.document.execCommand("cut", false, null);
   }
   
   function pasteText() {
     editField.document.execCommand("paste", false, null);
   }
   
       
    function ifSelectedText() {
        //style etitmenu (contextmenu) -> like copy, cut and paste
        editmenu.style.color = styleItem.style.color = "#333";
		styleItalic.style.display = "block";
		isEditable = true;
    }
	
	function closeContextmenu() {
	  contextmenu.style.display = "";
	}
	
	function showTooltip(t, content){
		var tooltipElem = document.createElement("div");
		tooltipElem.classList.add("tooltip");
		tooltipElem.innerHTML = content;
		document.body.appendChild(tooltipElem);
		var coords = t.getBoundingClientRect();

		var left = coords.left + (t.offsetWidth - tooltipElem.offsetWidth) / 2;
		if (left < 0) left = 0;

		var top = coords.top - tooltipElem.offsetHeight - 5;
		if (top < 0) { // не вылезать за верхнюю границу окна
		top = coords.top + t.offsetHeight + 5;
		}

		tooltipElem.style.left = left + 'px';
		tooltipElem.style.top = top + 'px';

		showingTooltip = tooltipElem;
	}
  
  function WindowSettings() {
  
    navigator.getBattery().then(function(battery) {
	    function batteryChange() {	
			if(level > 0 && level < 0.26){
			  batteryIcon.classList.toggle('fa-battery-empty');
			}else if(level > 0.26 && level < 0.51) {
			  batteryIcon.classList.toggle('fa-battery-quarter');
			}else if(level > 0.51 && level < 0.76) {
			  batteryIcon.classList.toggle('fa-battery-half');
			}else if(level > 0.71 && level < 1){
			  batteryIcon.classList.toggle('fa-battery-three-quarters');
			}else if(level == 1){
			  batteryIcon.classList.toggle('fa-battery-full');
			}else {
			  batteryIcon.classList.toggle('fa-battery-empty');
			} 
		}
	    level = (battery.level).toFixed(2);
		var isertedLevel;
		
		batteryChange();
        battery.onlevelchange = function(){
			batteryChange();
        };
    });
	
    header.addEventListener("click", function(e) {
      var target = e.target;
	  
      if (target.classList.contains("close")) {
        window.close();
      }else if(target.classList.contains("min")) {
        //some code
      }else {
        //some code
      }

     }, false);
   }
   
   
  function StyleText() {
   
    styleTextElement.addEventListener("click", function(e) {
	  var target = e.target;
	  
	  if(target.classList.contains("copy-item-header")) {
	    copyText();
	  }
	  
	  if(target.classList.contains("cut-item-header")) {
	    cutText();
	  }	

	  if(target.classList.contains("delete-item-header")) {
		
	    editField.document.execCommand("delete", false, null);
	  }
	  
	  if(target.classList.contains("undo")) {
	    editField.document.execCommand("undo", false, null);
	  }
	  
	  if(target.classList.contains("redo")) {
	    editField.document.execCommand("redo", false, null);
	  }
	  
	  if(target.classList.contains("text-italic")) {
	    e.stopPropagation();
	    editField.document.execCommand("italic", false, null);
	    isTextItalic = !isTextItalic;
	  }
	  
	  if(target.classList.contains("text-bold")) {
	    editField.document.execCommand("bold", false, null);
	  }
	  
	  if(target.classList.contains("text-underline")) {
	    editField.document.execCommand("underline", false, null);
	  }
	  
	  if(target.classList.contains("text-through")) {
	    editField.document.execCommand("strikeThrough", false, null);
	  }
	  
	  if(target.classList.contains("text-color")) {
		isColoredText = true;
		showPallete();
	  }
	  
	  if(target.classList.contains("text-color-bg")) {
	    isColoredText = false;
	    showPallete();
		editField.document.execCommand("hiliteColor", false, null);
	  }
	  
	  if(target.classList.contains("text-super")) {
	    editField.document.execCommand("superscript", false, null);
	  } 

	  if(target.classList.contains("text-sub")) {
	    editField.document.execCommand("subscript", false, null);
	  } 

	  if(target.classList.contains("text-left")) {
	    editField.document.execCommand("justifyLeft", false, null);
	  }	

	  if(target.classList.contains("text-center")) {
	    editField.document.execCommand("justifyCenter", false, null);
	  }

	  if(target.classList.contains("text-right")) {
	    editField.document.execCommand("justifyRight", false, null);
	  }	

	  if(target.classList.contains("text-full")) {
	    editField.document.execCommand("justifyFull", false, null);
	  }

	  if(target.classList.contains("text-indent")) {
	    editField.document.execCommand("indent", false, null);
	  }	

	  if(target.classList.contains("text-outdent")) {
	    editField.document.execCommand("outdent", false, null);
	  } 

	  if(target.classList.contains("text-list-ol")) {
	    editField.document.execCommand("insertOrderedList", false, null);
	  } 

	  if(target.classList.contains("text-list-ul")) {
	    editField.document.execCommand("insertUnorderedList", false, null);
	  }

	  if(target.classList.contains("text-paragraph")) {
	    editField.document.execCommand("insertParagraph", false, null);
	  } 
	  
	  if(target.classList.contains("text-link")) {
	    editField.document.execCommand("createLink", false, prompt("Enter link URL",""));
	  } 

	  if(target.classList.contains("text-broken-link")) {
	    editField.document.execCommand("unlink", false, null);
	  } 

	  if(target.classList.contains("inserted-image")) {
	    editField.document.execCommand("insertImage", false, prompt("Enter image URL",""));
	  }
	  
	}, false);
	
	styleTextElement.addEventListener("change", function(e) {
	  var target = e.target;
	  
	  if(target.classList.contains("text-heading")) {
	    editField.document.execCommand("heading", false, target.value);
	  }
	  
      if(target.classList.contains("text-size")){
        editField.document.execCommand("fontSize", false, target.value);
      }
	  
      if(target.classList.contains("text-font")){
        editField.document.execCommand("fontName", false, target.value);
      }
	  
	  
	  
	}, false);
  }

  function Content() {

    editField.addEventListener("keydown", function(e) {
		content.style.boxShadow = "0 1px 10px #0b06d2";
		if(e.repeat && (!e.ctrlKey && !e.metaKey) && !e.shiftKey && !e.altKey ) {
		  showWarn("The button is pinched");
		}
	}, false);
	
	editField.addEventListener("keyup", function(e) {
		content.style.boxShadow = "";
	}, false);
	
    editField.addEventListener("contextmenu", function(e) {
	  
	  //prevent standard contextmenu
      e.preventDefault();
	  
	  // if TEXT IS SELECTED
	  //iframe.contentWindow  -> take window from iframe
      if(content.contentWindow.getSelection().toString()) {
        ifSelectedText();
      }else {
	    styleItalic.style.display = "";
		styleItem.style.color = "";
	  }
	  
      contextmenu.style.left = e.clientX + content.getBoundingClientRect().left + "px";
      contextmenu.style.top = e.clientY +content.getBoundingClientRect().top + "px";
      contextmenu.style.display = "block";
	  colorItemDem = colorItem.getBoundingClientRect();

      contextmenu.addEventListener("click", function(e){
	    var target = e.target;
		
		if(target.classList.contains("color-item")) {
		  isColoredText = true;
		  showPallete();
		}
		
		if(target.classList.contains("style-italic")) {
	       e.stopImmediatePropagation();
		   doTextItalic();
		}
		
		if(target.classList.contains("copy-item")) {
		  if(isEditable) {
		    copyText();
			closeContextmenu();
		  }
		}
		
		if(target.classList.contains("cut-item")) {
		  if(isEditable) {
		    cutText();
			closeContextmenu();
		  }
		}
		
		if(target.classList.contains("paste-item")) {
		  if(isCopied) {
		    console.log("paste");
		    pasteText();
		    closeContextmenu();
		  }
		}
		
      }, false);
    });
	
	content.focus();
	
	//if double click on text
	editField.addEventListener("dblclick", ifSelectedText, false);

    editField.addEventListener("click", function(e) {
      contextmenu.style.display = "";
      editmenu.style.color = "";
	  pallete.style.display = "";
    }, false);
  }
	
  window.addEventListener("scroll", function() {

    if(document.body.scrollTop > header.offsetHeight) {
	
      header.style.boxShadow = "0 1px 4px #000";
	  toUp.style.display = "block";
	  
    }else {
      header.style.boxShadow = "";
	  toUp.style.display = "";
    }
	
  }, false);
  
  header.addEventListener("mouseover",  function(e){
    var target = e.target;
	
    if(target.hasAttribute("data-tooltip")) {
	  showTooltip(target, target.getAttribute("data-tooltip"));
	  
	  if(target.getAttribute("data-tooltip") == "Battary"){
	    document.body.removeChild(showingTooltip);
	    showingTooltip = null;
	    showTooltip(target, level*100+"%");
	  }
	
	}
  }, false);
  
  
   header.addEventListener("mouseout",  function(e){
      if(showingTooltip){
        document.body.removeChild(showingTooltip);
	    showingTooltip = null;
	  }
    }, false);
  
  pallete.addEventListener("click", function(e) {
	
	  var target = e.target;
	  
	  if(target.classList.contains("palette-colorswatch")) {
		
		if(isColoredText) {
		  textColor.style.color = content.style.color = target.style.backgroundColor;
	      editField.document.execCommand("foreColor", false, target.style.backgroundColor);
		}else {
		  textColorBackground.style.backgroundColor = target.style.backgroundColor;
          editField.document.execCommand("hiliteColor", false, target.style.backgroundColor);		  
		}
		
		if(getComputedStyle(content).backgroundColor == textColor.style.color || textColor.style.color == textColorBackground.style.backgroundColor) {
		      showWarn("Text and background are the same color");
		 }
		
		this.style.display = "";
	  }
	}, false);
	
	toUp.addEventListener("click", function(e) {
	  window.scrollTo(0, 0);
	}, false);
	
	warnBlock.addEventListener("click", function(e) {
	  var target = e.target;
	  if(target.classList.contains("warn-block-close")) {
	    hideWarn();
	  }
	  
	}, false);
	
	warnBlock.addEventListener("mousedown", function(e) {
	  
	
	}, false);
	
  new WindowSettings();
  new StyleText();
  new Content();


});