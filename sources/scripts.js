var last = new Array;

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

function change(a,name) {
	var e = document.getElementById(a);
	var name, arr;
	arr = e.className.split(" ");
	if (arr.indexOf(name) == -1) {
    e.className += " " + name;
	};
}

function cl(a) {
	var c=document.getElementById("num_"+a);
	if (c.classList.contains("last_cl") || c.classList.contains("chosen")) {
		last.splice( last.indexOf(a),1);
		if (c.classList.contains("last_cl") && (last[length]>0)) {
			var e = document.getElementById("num_"+last[last.length-1]);
			e.className = e.className.replace(/\bchosen\b/g, "last_cl");
		}
		c.className = c.className.replace(/\blast_cl\b/g, "");
		c.className = c.className.replace(/\bchosen\b/g, "");
		c.className = c.className.replace("  ", " ");
	} else {
		last.push(a);
		change("num_"+a,"last_cl");
		if (last[last.length-2]) {
			var e = document.getElementById("num_"+last[last.length-2]);
			e.className = e.className.replace(/\blast_cl\b/g, "chosen");
		}
	}
}

function clear_numbers() {
	popup.confirm( {
		content : "Czy na pewno chcesz wyczyścić tablicę?",	
		keyboard : true,
		default_btns : {
		    ok : 'TAK',
		    cancel : 'NIE'
			}	
		},
		function(param){
			if(param.proceed){
				var i;
				for (i = 1; i < 91; i++) {
					var e = document.getElementById("num_"+i);
					e.className = e.className.replace(/\bchosen\b/g, "");
					e.className = e.className.replace(/\blast_cl\b/g, "");
				};
				last=[];
			}
		}
		);
}

function showall() {
	var s=last.join(', ');
	popup.alert( { content : s } );
}

function downl() {
		popup.alert({
				content: 'Wydrukuj tylko tylke stron, ile potrzebujesz.<br><br><a href="pdf/kupony_duze.pdf">Duże (6 na stronie)</a><br><a href="pdf/kupony_male.pdf">Małe (12 na stronie)</a>'
		});
}
