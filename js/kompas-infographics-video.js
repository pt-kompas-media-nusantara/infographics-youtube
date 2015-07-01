/*jslint vars: true, plusplus: true, devel: true, nomen: true, maxerr: 50, regexp: true, browser: true, white: true */
/*global YT*/

//set global variables
var ytContainer = null,
	ytData = null,
	ytMode = false,
	ytPlayer = null,
	ytVideoId = null;

//create functions
function KompasInfographicsVideos(mode, options) {
	'use strict';
	this.mode = mode;
	this.options = options;

	if (this.mode !== 'youtube-timeline') {
		ytPlayer = null;
	}

	ytContainer = (this.mode === 'youtube-timeline') ? this.options.container : null;
	ytData = (this.mode === 'youtube-timeline') ? this.options.data : null;
	ytMode = (this.mode === 'youtube-timeline') ? true : false;
	ytVideoId = (this.mode === 'youtube-timeline') ? this.options.youTubeVideoID : null;
}

KompasInfographicsVideos.prototype.initiateVideo = function () {
	'use strict';
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = 'css/kompas-infographics-video.css';
	css.type = 'text/css';
	document.head.appendChild(css);

	this.assembleTheMinions();
};

KompasInfographicsVideos.prototype.assembleTheMinions = function () {
	'use strict';
	
	switch (this.mode) {
		case 'youtube-timeline':
			this.initYoutubeTimeline(this.options);
			break;
		default:
			break;
	}
};

KompasInfographicsVideos.prototype.initYoutubeTimeline = function (options) {
	'use strict';
	var container = document.getElementById(options.container),
		ytInit,
		ytTimeConverter;

	ytTimeConverter = function (strInput) {
		//converts hh:mm:ss to seconds
		var splits = strInput.split(':');
		return (parseInt(splits[0], 10) * 60 * 60) + (parseInt(splits[1], 10) * 60) + parseInt(splits[2], 10);
	};

	ytInit = function () {
		var ytElScript = document.createElement('script'),
			clonedContainer = container.cloneNode(true),
			containerParent = container.parentNode,
			containerNewWrapper = document.createElement('div');

		//convert hh:mm:ss in ytData[].start to seconds and set ytData[].secondStart's value
		ytData.forEach(function(element) {
			element.secondStart = ytTimeConverter(element.start);
		});

		ytElScript.src = 'http://www.youtube.com/iframe_api';

		containerNewWrapper.className = 'kompas-infographics__yt__timeline__wrapper';
		containerNewWrapper.appendChild(clonedContainer);
		containerParent.insertBefore(containerNewWrapper, container);
		containerParent.removeChild(container);

		document.head.appendChild(ytElScript);
	};

	ytInit();
};


//youtube functions, always check if ytMode === true

function onYouTubePlayerReady() {
	'use strict';
	
	if (ytMode) {
		var container = document.getElementById(ytContainer),
			parent = container.parentNode,
			menu = document.createElement('div'),
			menuList = document.createElement('ul'),
			menuWrapper = document.createElement('div'),
			navNext = document.createElement('div'),
			navPrev = document.createElement('div'),
			insertMenuItems = function(menuContainer) {
				var itemsFrag = document.createDocumentFragment(),
					menuWidth = menu.offsetWidth;
					
				menuContainer.style.width = ((menuWidth / 4) * ytData.length) + 'px';
				console.log(menuWidth);
				ytData.forEach(function(element) {

				});
			};

		menu.className = 'kompas-infographics__yt__timeline__menu';
		menuList.className = 'kompas-infographics__yt__timeline__list';
		menuWrapper.className = 'kompas-infographics__yt__timeline__menu__wrapper';
		navNext.className = 'kompas-infographics__yt__timeline__nav next active';
		navPrev.className = 'kompas-infographics__yt__timeline__nav prev';

		menu.appendChild(menuList);

		menuWrapper.appendChild(navPrev);
		menuWrapper.appendChild(menu);
		menuWrapper.appendChild(navNext);

		parent.insertBefore(menuWrapper, container);
		
		insertMenuItems(menuList);
	}

}

function onYouTubeIframeAPIReady() {
	'use strict';

	if (ytMode) {
		var playerWidth = document.getElementById(ytContainer).offsetWidth,
			playerHeight = Math.floor((9/16) * playerWidth);

		ytPlayer = new YT.Player(ytContainer, {
			height: playerHeight.toString(),
			width : playerWidth.toString(),
			videoId : ytVideoId,
			events : {
				'onReady' : onYouTubePlayerReady
				// 'onStateChange' : onPlayerStateChange
			}
		});
	}
		
}




// var ytData = [
// 		{
// 			title: 'Ikhtisar',
// 			speaker: 'Sundar Pichai',
// 			start: '00:03:32',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Android M',
// 			speaker: 'Dave Burke',
// 			start: '00:11:53',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Android Wear',
// 			speaker: 'David Singleton',
// 			start: '00:28:33',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Internet of Things',
// 			speaker: 'Sundar Pichai',
// 			start: '00:37:22',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Google Now',
// 			speaker: 'Aparna Chennapragada',
// 			start: '00:48:27',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Google Photos',
// 			speaker: 'Anil Sabharwal',
// 			start: '01:00:07',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Android One & Products',
// 			speaker: 'Jen Fitzpatrick',
// 			start: '01:14:23',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Developer Products',
// 			speaker: 'Jason Titus',
// 			start: '01:29:19',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Google Play',
// 			speaker: 'Ellie Powers',
// 			start: '01:41:30',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Android Nanodegree',
// 			speaker: 'Sundar Pichai',
// 			start: '01:47:05',
// 			secondStart: null
// 		},
// 		{
// 			title: 'Google Cardboard',
// 			speaker: 'Clay Bavor',
// 			start: '01:49:38',
// 			secondStart: null
// 		}
// 	],
// 	ytDataLen = ytData.length,
// 	ytPlayer,
// 	ytMenuInner;

// function ytTimeConverter (input) {
// 	'use strict';
// 	var splits = input.split(':'),
// 		res = (parseInt(splits[0], 10) * 60 * 60) + (parseInt(splits[1], 10) * 60) + parseInt(splits[2], 10);
// 	return res;
// }

// function ytInsertMenu(obj) {
// 	'use strict';
// 	var parent = obj.parentNode,
// 		menuWrapper = document.createElement('div'),
// 		menuInnerList = document.createElement('ul'),
// 		navNext = document.createElement('div'),
// 		navPrev = document.createElement('div'),
// 		listFrag = document.createDocumentFragment(),
// 		ww = window.innerWidth || screen.width,
// 		menuInnerWidth = (ww >= 630) ? 570 : 240;

// 	ytMenuInner = document.createElement('div');

// 	menuWrapper.className = 'yt__timeline__menu__wrapper';
// 	ytMenuInner.className = 'yt__timeline__menu';
// 	menuInnerList.className = 'yt__timeline__list';
// 	navNext.className = 'yt__timeline__nav next active';
// 	navPrev.className = 'yt__timeline__nav prev';

// 	ytMenuInner.appendChild(menuInnerList);

// 	menuWrapper.appendChild(navPrev);
// 	menuWrapper.appendChild(ytMenuInner);
// 	menuWrapper.appendChild(navNext);

// 	parent.insertBefore(menuWrapper, obj);

// 	ytData.forEach(function(element, index) {
// 		var box = document.createElement('span'),
// 			items = document.createElement('li'),
// 			links = document.createElement('a'),
// 			speaker = document.createElement('span'),
// 			timeStart = document.createElement('span'),
// 			title = document.createElement('span'),
// 			timeToSeconds = ytTimeConverter(element.start);

// 		element.secondStart = timeToSeconds;

// 		items.className = 'yt__timeline__list__items';
// 		// items.setAttribute('data-id', index);
// 		items.setAttribute('data-start', element.secondStart);
// 		items.style.width = (ww >= 630) ? (menuInnerWidth / 4) + 'px' : (menuInnerWidth / 2) + 'px';
		

// 		box.className = 'yt__timeline__list__items__box';
// 		links.className = 'yt__timeline__list__items__links';
// 		links.href = '#';
// 		links.setAttribute('data-id', index);
// 		speaker.className = 'yt__timeline__list__items__speakers';
// 		speaker.textContent = element.speaker;
// 		timeStart.className = 'yt__timeline__list__items__time__start';
// 		timeStart.textContent = element.start;
// 		title.className = 'yt__timeline__list__items__titles';
// 		title.textContent = element.title;


// 		links.appendChild(title);
// 		links.appendChild(speaker);
// 		links.appendChild(timeStart);
// 		links.appendChild(box);

// 		items.appendChild(links);

// 		listFrag.appendChild(items);
// 	});

// 	menuInnerList.appendChild(listFrag);

// 	menuInnerList.style.width = ((menuInnerWidth / 4) * ytDataLen) + 'px';
// }

// function ytTimelineInit() {
// 	'use strict';
// 	var link = document.createElement('link'),
// 		script = document.createElement('script');

// 	link.rel = 'stylesheet';
// 	link.href = 'http://id.infografik.print.kompas.com/youtube/css/yt-timeline-style.css';
// 	script.src = 'http://www.youtube.com/iframe_api';

// 	document.head.appendChild(link);
// 	document.head.appendChild(script);

// 	ytInsertMenu(document.getElementById('yt-player'));
// }



// ytTimelineInit();

// function onPlayerReady() {
// 	'use strict';

// 	var parent = document.getElementById('yt-player').parentNode,
// 		menuList = parent.getElementsByClassName('yt__timeline__list')[0],
// 		menuLinks = parent.getElementsByClassName('yt__timeline__list__items__links'),
// 		navLinks = parent.getElementsByClassName('yt__timeline__nav'),
// 		navCounter = 0,
// 		ww = window.innerWidth || screen.width,
// 		menuInnerWidth = (ww >= 630) ? 570 : 240,
// 		clickNavHandler = function () {
// 			var btn = this,
// 				min = 0,
// 				max = Math.floor(ytDataLen / 4);

// 			if (btn.classList.contains('next')) {
// 				if (navCounter >= max) {
// 					navCounter = max;
// 				} else {
// 					navCounter++;
// 				}
				
// 			} else if (btn.classList.contains('prev')) {
// 				if (navCounter <= min) {
// 					navCounter = min;
// 				} else {
// 					navCounter--;
// 				}
// 			}

// 			[].forEach.call(navLinks, function(element) {

// 				if (element.classList.contains('next')) {
// 					if (navCounter === max) {
// 						element.classList.remove('active');
// 					} else {
// 						element.classList.add('active');
// 					}
// 				}


// 				if (element.classList.contains('prev')) {
// 					if (navCounter === min) {
// 						element.classList.remove('active');
// 					} else {
// 						element.classList.add('active');
// 					}
// 				} 


// 			});

				

// 			menuList.style.left = -(navCounter * menuInnerWidth) + 'px';

// 			// console.log(ytDataLen + ' vs ' + navCounter);
// 		},
// 		clickVideoHandler = function(e) {
// 			e.preventDefault();
// 			e.stopPropagation();
// 			var id = parseInt(this.getAttribute('data-id'), 10),
// 				dt = ytData[id];

// 			ytPlayer.pauseVideo();
// 			ytPlayer.seekTo(dt.secondStart, true);
// 			window.setTimeout(function() {
// 				ytPlayer.playVideo();

// 				[].forEach.call(menuLinks, function(element, index) {
// 					if (index <= id) {
// 						element.parentNode.classList.add('active');
// 					} else {
// 						element.parentNode.classList.remove('active');
// 					}
// 				});
// 			}, 100);

// 		};


// 	[].forEach.call(menuLinks, function(element) {
// 		element.addEventListener('click', clickVideoHandler, false);
// 	});

// 	[].forEach.call(navLinks, function(element) {
// 		element.addEventListener('click', clickNavHandler, false);
// 	});
// }

// function ytCheckProgress() {
// 	// console.log(ytPlayer.getCurrentTime());
// 	var duration = ytPlayer.getDuration(),
// 		currentTime = ytPlayer.getCurrentTime(),
// 		parent = document.getElementById('yt-player').parentNode,
// 		items = parent.getElementsByClassName('yt__timeline__list__items');

// 	if (currentTime < duration) {

// 		[].forEach.call(items, function(element) {
// 			var start = parseInt(element.getAttribute('data-start'), 10);
// 			if (currentTime > start) {
// 				element.classList.add('active');
// 			} else {
// 				element.classList.remove('active');
// 			}
// 		});

// 		window.setTimeout(ytCheckProgress, 200);
// 	}
		
// }

// function onYouTubeIframeAPIReady() {
// 	'use strict';
// 	ytPlayer = new YT.Player('yt-player', {
// 		height: '354',
// 		width : '630',
// 		videoId : '7V-fIGMDsmE',
// 		events : {
// 			'onReady' : onPlayerReady,
// 			'onStateChange' : onPlayerStateChange
// 		}
// 	});
// }



// function onPlayerStateChange(event) {

// 	if (event.data === YT.PlayerState.PLAYING) {
// 		ytCheckProgress();
// 	}
// }


