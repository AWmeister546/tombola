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

function losuj() {
  var dostepne = [];
  for (var i = 1; i <= 100; i++) {
    var e = document.getElementById("num_" + i);
    if (!e.classList.contains("chosen") && !e.classList.contains("last_cl")) {
      dostepne.push(i);
    }
  }

  if (dostepne.length === 0) {
    popup.alert({ content: "Wszystkie liczby zostały już wylosowane!" });
    return;
  }

  var wylosowana = dostepne[Math.floor(Math.random() * dostepne.length)];

  var overlay = document.createElement("div");
  overlay.id = "losowanie-overlay";
  overlay.innerHTML =
    "<div id='losowanie-box'>" +
      "<span id='losowanie-label'>Wylosowana liczba</span>" +
      "<span id='losowanie-liczba'>" + wylosowana + "</span>" +
    "</div>";
  document.body.appendChild(overlay);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      overlay.classList.add("widoczny");
    });
  });

  setTimeout(function() {
    overlay.classList.remove("widoczny");
    setTimeout(function() {
      document.body.removeChild(overlay);
      cl(wylosowana);
    }, 600);
  }, 5000);
}

(function injectStyles() {
  var css = [
    "#losowanie-overlay {",
    "  position: fixed; inset: 0;",
    "  background: rgba(0,0,0,0);",
    "  display: flex; align-items: center; justify-content: center;",
    "  z-index: 9999;",
    "  transition: background 0.6s ease;",
    "  pointer-events: none;",
    "}",
    "#losowanie-overlay.widoczny {",
    "  background: rgba(0,0,0,0.82);",
    "  pointer-events: all;",
    "}",
    "#losowanie-box {",
    "  display: flex; flex-direction: column; align-items: center;",
    "  opacity: 0; transform: scale(0.7);",
    "  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.34,1.56,.64,1);",
    "}",
    "#losowanie-overlay.widoczny #losowanie-box {",
    "  opacity: 1; transform: scale(1);",
    "}",
    "#losowanie-label {",
    "  color: #fff; font-size: clamp(1.4rem, 4vw, 2.2rem);",
    "  letter-spacing: 0.08em; text-transform: uppercase;",
    "  margin-bottom: 0.4em; font-family: inherit;",
    "}",
    "#losowanie-liczba {",
    "  color: #f5c518;",
    "  font-size: clamp(6rem, 22vw, 14rem);",
    "  font-weight: 900; line-height: 1;",
    "  text-shadow: 0 0 60px rgba(245,197,24,0.55);",
    "  font-family: inherit;",
    "}",
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
