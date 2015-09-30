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
	css.href = 'http://id.infografik.print.kompas.com/libs/css/kompas-infographics-video.css';
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
			navCounter = 0,
			maxCounter = Math.floor(ytData.length / 4),
			minCounter = 0,
			armVideoClickHandler,
			navClickHandler,
			videoClickHandler,
			insertMenuItems;

		armVideoClickHandler = function (obj) {
			obj.addEventListener('click', videoClickHandler, false);
		};

		navClickHandler = function () {
			var btn = this,
				next = btn.parentNode.getElementsByClassName('next')[0],
				prev = btn.parentNode.getElementsByClassName('prev')[0],
				menuWidth = menu.offsetWidth;

			if (btn.classList.contains('next')) {
				if (navCounter < maxCounter) {
					navCounter++;
				} else {
					navCounter = maxCounter;
				}
			}

			if (btn.classList.contains('prev')) {
				if (navCounter > minCounter) {
					navCounter--;
				} else {
					navCounter = minCounter;
				}
			}

			if (navCounter === 0) {
				prev.classList.remove('active');
			} else if (navCounter === maxCounter) {
				next.classList.remove('active');
			} else {
				next.classList.add('active');
				prev.classList.add('active');
			}

			menuList.style.left = -(navCounter * menuWidth) + 'px';
		};

		insertMenuItems = function(menuContainer) {
			var itemsFrag = document.createDocumentFragment(),
				menuWidth = menu.offsetWidth,
				pageCounter = 0;
					
			menuContainer.style.width = ((menuWidth / 4) * ytData.length) + 'px';
			
			ytData.forEach(function(element, index) {
				var items = document.createElement('li'),
					links = document.createElement('a'),
					title = document.createElement('span'),
					speakers = document.createElement('span'),
					timeStart = document.createElement('span'),
					box = document.createElement('span');
				
				items.className = 'kompas-infographics__yt__timeline__list__items';
				items.style.width = (menuWidth / 4) + 'px';
				items.setAttribute('data-start', element.secondStart);

				links.className = 'kompas-infographics__yt__timeline__list__items__links';
				links.href = 'https://www.youtube.com/watch?v=' + ytVideoId;
				links.target = '_blank';
				links.setAttribute('data-id', index);
				

				title.className = 'kompas-infographics__yt__timeline__list__items__titles';
				title.textContent = element.title;
				speakers.className = 'kompas-infographics__yt__timeline__list__items__speakers';
				speakers.textContent = element.speaker;
				timeStart.className = 'kompas-infographics__yt__timeline__list__items__time__start';
				timeStart.textContent = element.start;
				box.className = 'kompas-infographics__yt__timeline__list__items__box';

				links.appendChild(title);
				links.appendChild(speakers);
				links.appendChild(timeStart);
				links.appendChild(box);

				items.appendChild(links);

				itemsFrag.appendChild(items);

				armVideoClickHandler(links);

				if (index > 0 && index % 4 === 0) {
					pageCounter++;
				}

				items.setAttribute('data-page', pageCounter);

			});

			menuContainer.appendChild(itemsFrag);

		};

		videoClickHandler = function (e) {
			e.preventDefault();
			var id = this.getAttribute('data-id'),
				items = menuList.getElementsByClassName('kompas-infographics__yt__timeline__list__items');
			
			ytPlayer.pauseVideo();
			ytPlayer.seekTo(ytData[id].secondStart, true);

			window.setTimeout(function () {
				ytPlayer.playVideo();
				[].forEach.call(items, function(element, index) {
					if (index <= id) {
						element.classList.add('active');
					} else {
						element.classList.remove('active');
					}
				});
			}, 100);

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

		navNext.addEventListener('click', navClickHandler, false);
		navPrev.addEventListener('click', navClickHandler, false);
	}

}

function onYouTubePlayerStateChange(e) {
	'use strict';
	var ytCheckProgress = function () {
		var parent = document.getElementById(ytContainer).parentNode,
			menuList = parent.getElementsByClassName('kompas-infographics__yt__timeline__list')[0],
			menuItems = menuList.getElementsByClassName('kompas-infographics__yt__timeline__list__items'),
			duration = ytPlayer.getDuration(),
			currentTime = ytPlayer.getCurrentTime(),
			currentPage = 0;

		if (currentTime < duration) {
			[].forEach.call(menuItems, function (element) {
				var start = parseInt(element.getAttribute('data-start'), 10),
					page = parseInt(element.getAttribute('data-page'), 10);

				if (currentTime > start) {
					element.classList.add('active');
				} else {
					element.classList.remove('active');
				}
			});

			window.setTimeout(ytCheckProgress, 200);
		}

	};

	if (e.data === YT.PlayerState.PLAYING) {
		ytCheckProgress();
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
				'onReady' : onYouTubePlayerReady,
				'onStateChange' : onYouTubePlayerStateChange
			}
		});
	}
		
}



