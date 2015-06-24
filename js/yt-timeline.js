/*jslint vars: true, plusplus: true, devel: true, nomen: true, maxerr: 50, regexp: true, browser: true, white: true */
/*global YT*/
var ytData = [
		{
			title: 'Ikhtisar',
			speaker: 'Sundar Pichai',
			start: '00:03:32',
			secondStart: null
		},
		{
			title: 'Android M',
			speaker: 'Dave Burke',
			start: '00:11:53',
			secondStart: null
		},
		{
			title: 'Android Wear',
			speaker: 'David Singleton',
			start: '00:28:33',
			secondStart: null
		},
		{
			title: 'Internet of Things',
			speaker: 'Sundar Pichai',
			start: '00:37:22',
			secondStart: null
		},
		{
			title: 'Google Now',
			speaker: 'Aparna Chennapragada',
			start: '00:48:27',
			secondStart: null
		},
		{
			title: 'Google Photos',
			speaker: 'Anil Sabharwal',
			start: '01:00:07',
			secondStart: null
		},
		{
			title: 'Android One & Products',
			speaker: 'Jen Fitzpatrick',
			start: '01:14:23',
			secondStart: null
		},
		{
			title: 'Developer Products',
			speaker: 'Jason Titus',
			start: '01:29:19',
			secondStart: null
		},
		{
			title: 'Google Play',
			speaker: 'Ellie Powers',
			start: '01:41:30',
			secondStart: null
		},
		{
			title: 'Android Nanodegree',
			speaker: 'Sundar Pichai',
			start: '01:47:05',
			secondStart: null
		},
		{
			title: 'Google Cardboard',
			speaker: 'Clay Bavor',
			start: '01:49:38',
			secondStart: null
		}
	],
	ytDataLen = ytData.length,
	ytPlayer,
	ytMenuInner;

function ytTimeConverter (input) {
	'use strict';
	var splits = input.split(':'),
		res = (parseInt(splits[0], 10) * 60 * 60) + (parseInt(splits[1], 10) * 60) + parseInt(splits[2], 10);
	return res;
}

function ytInsertMenu(obj) {
	'use strict';
	var parent = obj.parentNode,
		menuWrapper = document.createElement('div'),
		menuInnerList = document.createElement('ul'),
		navNext = document.createElement('div'),
		navPrev = document.createElement('div'),
		listFrag = document.createDocumentFragment(),
		ww = window.innerWidth || screen.width,
		menuInnerWidth = (ww >= 630) ? 570 : 240;

	ytMenuInner = document.createElement('div');

	menuWrapper.className = 'yt__timeline__menu__wrapper';
	ytMenuInner.className = 'yt__timeline__menu';
	menuInnerList.className = 'yt__timeline__list';
	navNext.className = 'yt__timeline__nav next active';
	navPrev.className = 'yt__timeline__nav prev';

	ytMenuInner.appendChild(menuInnerList);

	menuWrapper.appendChild(navPrev);
	menuWrapper.appendChild(ytMenuInner);
	menuWrapper.appendChild(navNext);

	parent.insertBefore(menuWrapper, obj);

	ytData.forEach(function(element, index) {
		var box = document.createElement('span'),
			items = document.createElement('li'),
			links = document.createElement('a'),
			speaker = document.createElement('span'),
			timeStart = document.createElement('span'),
			title = document.createElement('span'),
			timeToSeconds = ytTimeConverter(element.start);

		element.secondStart = timeToSeconds;

		items.className = 'yt__timeline__list__items';
		items.style.width = (ww >= 630) ? (menuInnerWidth / 4) + 'px' : (menuInnerWidth / 2) + 'px';
		

		box.className = 'yt__timeline__list__items__box';
		links.className = 'yt__timeline__list__items__links';
		links.href = '#';
		links.setAttribute('data-id', index);
		speaker.className = 'yt__timeline__list__items__speakers';
		speaker.textContent = element.speaker;
		timeStart.className = 'yt__timeline__list__items__time__start';
		timeStart.textContent = element.start;
		title.className = 'yt__timeline__list__items__titles';
		title.textContent = element.title;


		links.appendChild(title);
		links.appendChild(speaker);
		links.appendChild(timeStart);
		links.appendChild(box);

		items.appendChild(links);

		listFrag.appendChild(items);
	});

	menuInnerList.appendChild(listFrag);

	menuInnerList.style.width = ((menuInnerWidth / 4) * ytDataLen) + 'px';
}

function ytTimelineInit() {
	'use strict';
	var link = document.createElement('link'),
		script = document.createElement('script');

	link.rel = 'stylesheet';
	link.href = 'http://id.infografik.print.kompas.com/youtube/css/yt-timeline-style.css';
	script.src = 'http://www.youtube.com/iframe_api';

	document.head.appendChild(link);
	document.head.appendChild(script);

	ytInsertMenu(document.getElementById('yt-player'));
}



ytTimelineInit();

function onPlayerReady() {
	'use strict';

	var parent = document.getElementById('yt-player').parentNode,
		menuList = parent.getElementsByClassName('yt__timeline__list')[0],
		menuLinks = parent.getElementsByClassName('yt__timeline__list__items__links'),
		navLinks = parent.getElementsByClassName('yt__timeline__nav'),
		navCounter = 0,
		ww = window.innerWidth || screen.width,
		menuInnerWidth = (ww >= 630) ? 570 : 240,
		clickNavHandler = function () {
			var btn = this,
				min = 0,
				max = Math.floor(ytDataLen / 4);

			if (btn.classList.contains('next')) {
				if (navCounter >= max) {
					navCounter = max;
				} else {
					navCounter++;
				}
				
			} else if (btn.classList.contains('prev')) {
				if (navCounter <= min) {
					navCounter = min;
				} else {
					navCounter--;
				}
			}

			[].forEach.call(navLinks, function(element) {

				if (element.classList.contains('next')) {
					if (navCounter === max) {
						element.classList.remove('active');
					} else {
						element.classList.add('active');
					}
				}


				if (element.classList.contains('prev')) {
					if (navCounter === min) {
						element.classList.remove('active');
					} else {
						element.classList.add('active');
					}
				} 


			});

				

			menuList.style.left = -(navCounter * menuInnerWidth) + 'px';

			// console.log(ytDataLen + ' vs ' + navCounter);
		},
		clickVideoHandler = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var id = parseInt(this.getAttribute('data-id'), 10),
				dt = ytData[id];

			ytPlayer.pauseVideo();
			ytPlayer.seekTo(dt.secondStart, true);
			window.setTimeout(function() {
				ytPlayer.playVideo();

				[].forEach.call(menuLinks, function(element, index) {
					if (index === id) {
						element.parentNode.classList.add('active');
					} else {
						element.parentNode.classList.remove('active');
					}
				});
			}, 100);

		};


	[].forEach.call(menuLinks, function(element) {
		element.addEventListener('click', clickVideoHandler, false);
	});

	[].forEach.call(navLinks, function(element) {
		element.addEventListener('click', clickNavHandler, false);
	});
}

function onYouTubeIframeAPIReady() {
	'use strict';
	ytPlayer = new YT.Player('yt-player', {
		height: '354',
		width : '630',
		videoId : '7V-fIGMDsmE',
		events : {
			'onReady' : onPlayerReady,
			'onStateChange' : onPlayerStateChange
		}
	});
}

function onPlayerStateChange(event) {
	
	console.log(ytPlayer.getDuration());
}



// 	  - overview 
//   -  
// 
// 

		// (function () {
			// 'use strict';

			// var data = [
			// 		{
			// 			ID: 0,
			// 			title: 'Ikhtisar',
			// 			speaker: 'Sundar Pichai',
			// 			start: '3:32',
			// 			end: '11:51'
			// 		},
			// 		{
			// 			ID: 1,
			// 			title: 'Android M',
			// 			speaker: 'Dave Burke',
			// 			start: '11:53',
			// 			end: '28:32'
			// 		},
			// 		{
			// 			ID: 2,
			// 			title: 'Android Wear',
			// 			speaker: 'David Singleton',
			// 			start: '28:33',
			// 			end: '37:21'
			// 		},
			// 		{
			// 			ID: 3,
			// 			title: 'Internet of Things',
			// 			speaker: 'Sundar Pichai',
			// 			start: '37:22',
			// 			end: '48:26'
			// 		}
			// 	],
			// 	tag = document.createElement('script'),
			// 	firstScriptTag = document.getElementsByTagName('script')[0],
			// 	player,
			// 	done = false;

			// tag.src = 'http://www.youtube.com/iframe_api'; // https

			// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


			// function onYouTubeIframeAPIReady() {
			// 	player = new YT.Player('player', {
			// 		height: '390',
			// 		width : '640',
			// 		videoId : '7V-fIGMDsmE',
			// 		events : {
			// 			'onReady' : onPlayerReady,
			// 			'onStateChange' : onPlayerStateChange
			// 		}
			// 	});
			// }

			// function onPlayerReady(event) {
			// 	event.target.playVideo();

			// 	var links = document.getElementsByClassName('times');

			// 	[].forEach.call(links, function(element) {
			// 		element.addEventListener('click', function(e) {
			// 			e.preventDefault();
			// 			player.pauseVideo();
			// 			player.seekTo(120, true);
			// 			window.setTimeout(function() {
			// 				player.playVideo();	
			// 			}, 100);
						
			// 		}, false);
			// 	});


			// 	// player.seekTo({seconds: 50, allowSeekAhead: true});
			// }

			// function onPlayerStateChange(event) {
			// 	if (event.data === YT.PlayerState.PLAYING && !done) {
			// 		// window.setTimeout(stopVideo, 6000);
			// 		console.log(event);
			// 		done = true;
			// 	}
			// }

			// function stopVideo() {
			// 	player.stopVideo();
			// }

		// }());eiuriugelgfkfkutf`


