
window.onload = function (){

	var i, a, b, c, d, itm1, itm2, itm3;
	var div, ul, li, span, img;
	var dbody = document.body,
	    mobile,
		land,
		port,
	    bt_event;

	var dur = 350, // animation
	    dur2 = 550, // layout
		delay,
	    in_out = "easeInOutQuart",
	    _out = "easeOutQuart",
	    in_ = "easeInQuart";

	var root = location.origin;
	var path = location.pathname.split('/');

	for(i=0; i<path.length-1; i++){
	    root += path[i] + '/';
	}

	console.log( "ROOT: " + root );

	// MOBILE

	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};

	if( isMobile.any() ){
	    mobile = true;
	    $(dbody).addClass('mobile');
	    bt_event = 'touchstart';
	}else{
	    mobile = false;
	    bt_event = 'click';
	}

	console.log( "MOBILE: " + mobile );

	var page_y,
		win_w,
		win_h;

	function scroll(to){

		console.log(to);

		$(document.body).stop().scrollTo( to, {
			duration: dur2,
			easing: in_out,
			axis:'y'
		});
	}

	//////////////////////////////// WINDOW ////////////////////////////////

	function resize(){
		win_w = $( window ).width();
		win_h = $( window ).height();
		if(mobile){
			if(win_w < win_h) {
				$(dbody).removeClass('land').addClass('port');
				land = false;
				port = true;
			} else {
				$(dbody).removeClass('port').addClass('land');
				land = true;
				port = false;
			}
		}
	}

	window.onresize = resize;
	resize();

	var colors = {

	}

	//////////////////////////////// OBJECTS ////////////////////////////////

	function get(id){ return document.getElementById(id)};
	function reg(id){ window[id] = get(id) }

	reg('header');
	reg('container');
	reg('menu');
	reg('resources_container');
	reg('resources_list');
	reg('footer');

	reg('menu1');
	reg('menu2');
	reg('menu3');

	$(menu1).on('click', function(){
		document.location.href = "index.html";
	})

	$(menu2).on('click', function(){
		document.location.href = "preview.html";
	})

	$(menu3).on('click', function(){
		document.location.href = "resources.html";
	})

	//////////////////////////////// OBJECTS ////////////////////////////////

	var cards = [
		null,
		{
			hex:'#ff5039',
			hover:'#ff5039',
			title: "Building Block Card",
			text: "Building Block Cards are the most commonly reoccurring elements and features that data-driven organizations and smart cities have.<br>They can be combined and connected to the Getting Started Cards to encourage creative playing and reshaping of ideas."
		},
		{
			hex:'#02477d',
			hover:'#02477d',
			title: "Getting Started Card",
			text: "Getting Started Cards offer practical overview and guidance on how to get started with being smart and data driven for local government units (LGUs).<br>It provides set of tools to being smart and data driven based on the the building block cards."
		},

	];

	var resources =  [ null,
		{
			module:1,
			title: "CARDSET",
			text: "Get started with being smart and data-driven. Get the cards. Download them. Print them. Share with others.",
			url: "https://github.com/smartctph/getting-started-with-smart-and-data-driven-lgus/tree/main/getting-started_print/"
		},
		{
			module:1,
			title: "GUIDEBOOK",
			text: "Learn more about the cardset and how you can utilize them in your journey towards being smart and data-driven.",
			url: "https://github.com/smartctph/getting-started-with-smart-and-data-driven-lgus/tree/main/getting-started_print/"
		},
		{
			module:1,
			title: "ICONS",
			text: "Icon files and visualy system for the Smart and Data-Driven Getting Started series.",
			url: "https://github.com/smartctph/getting-started-with-smart-and-data-driven-lgus/tree/main/getting-started_icons/"
		},
		{
			module:1,

			title: "DESIGN",
			text: "Design files for the Getting Started series.",
			url: "https://github.com/smartctph/getting-started-with-smart-and-data-driven-lgus/tree/main/getting-started_design/"
		}
	];


	var card_cell;
	var card_container;
	var card_left;
	var card_right;

	if(page == 'preview'){

		for( i = 1; i<cards.length; i++ ){

			d = cards[i];

			card_cell = get('card' + i);
			d.cell = card_cell;
			card_cell.d = d;
			$(card_cell)
				.css({ backgroundColor: d.hex })
				.on('click', function(){
					if(this.plus){
						this.plus = false;
						$(this.cont).animate({ left: '0'}, dur2, in_out);
					}else{
						this.plus = true;
						$(this.cont).animate({ left: '-100%'}, dur2, in_out);
					}
					scroll(this.cont);
				})
				.on('mouseover', function(){
					$(this.cont).css({ backgroundColor: this.d.hover })
				})
				.on('mouseout', function(){
					$(this.cont).css({ backgroundColor: this.d.hex })
				})

			card_cell.plus = false;

			card_container = document.createElement('div');
			$(card_container)
				.addClass('card_container')
			card_cell.appendChild(card_container);
			card_cell.cont = card_container;

			// left

			card_left = document.createElement('div');
			$(card_left)
				.addClass('card_left')
				.css({ backgroundImage:'url(img/card_left' + i + '.png)'});
			card_container.appendChild(card_left);

			img = new Image();
				$(img).addClass('go')
			img.src = 'img/go.png';
			card_left.appendChild(img);

			div = document.createElement('div');
			$(div)
				.addClass('iam')
				.html("I am a...")
			card_left.appendChild(div);

			div = document.createElement('div');
			$(div)
				.addClass('title')
				.html(d.title)
			card_left.appendChild(div);

			// right
			card_right = document.createElement('div');
			$(card_right)
				.addClass('card_right')
				.css({ backgroundImage:'url(img/card_right' + i + '.png)'});
			card_container.appendChild(card_right);

			div = document.createElement('div');
			$(div)
				.addClass('quote')
			card_right.appendChild(div);

			div2 = document.createElement('div');
			$(div2)
				.addClass('quote_tx')
				.html('&quot;' + d.text + '&quot;' )
			div.appendChild(div2);

			img = new Image();
				$(img).addClass('back')
			img.src = 'img/back.png';
			card_right.appendChild(img);

			//menu

			li = document.createElement('li');
			li.d = d;
			$(li)
				.addClass('menu_bt')
				.css( {backgroundImage:'url(img/head'+ i +'.png)'})
				.on(bt_event, function(){
					scroll( this.d.cell );
				});

			menu.appendChild(li);

		}
	}


	/* download BT */

	if( page == 'preview' || page == 'getting-started' ){

		reg('download_bt');

		$(download_bt).on('click', function(){
			window.open('./print/Getting Started with Smart and Data-driven LGUs Card set (for printing) - FNF.pdf');
		});

	}

	if( page == 'preview' || page == 'getting-started' ){

		reg('download_guidebook_bt');

		$(download_guidebook_bt).on('click', function(){
			window.open('./print/Getting Started with Smart and Data-driven LGUs Guidebook.pdf');
		});

	}


	/* resources */

	if(page == 'resources'){

		for( i = 1; i<resources.length; i++ ){

			d = resources[i];

			li = document.createElement('li');
			li.d = d;
			$(li)
				.addClass('resource')
				.addClass('module' + d.module);

			if(d.module == 2){

				div = document.createElement('div');
				$(div)
					.addClass('module2_bts')
				li.appendChild(div);

				for (a in d.url){
					itm1 = document.createElement('div');
					itm1.url = d.url[a][1];
					$(itm1)
						.addClass('module2_bt')
						.html(d.url[a][0])
						.on('click', function(){
								window.open( this.url);
						});
					div.appendChild(itm1)
				}
			}else{
				$(li).on('click', function(){
						window.open( this.d.url);
				});
			}

			div = document.createElement('div');
			$(div)
				.addClass('resource_title')
				.html(d.title)
			li.appendChild(div);

			div = document.createElement('div');
			$(div)
				.addClass('resource_desc')
				.html(d.text)
			li.appendChild(div);

			img = new Image();
			img.src = 'img/resource_'+i+'.png';
			li.appendChild(img);

			resources_list.appendChild(li);


		}
	}




	/**/
}
