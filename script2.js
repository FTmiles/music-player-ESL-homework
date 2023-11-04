/**
 * To do in this app:
 * 1. Display the song playing
 * 2. Play the sone
 * 3. Pause the song playing
 * 4. Keep the song repeatedly playing
 * 5. new song
 * 6. Previous song
 * 7. Play the new song randomly
 * 8. Select the song to play.
 * 9. Scroll active songs
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "MUSIC_PLAYER_STORAGE";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $(".progress");
const btnNext = $(".btn-new");
const btnPrev = $(".btn-prev");
const btnRepeat = $(".btn-repeat");
const btnRandom = $(".btn-random");
const playlist = $(".playlist");
const song = $(".song");

const app = {
	currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeated: false,
	config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
	setConfig: function (key, value) {
		this.config[key] = value;
		localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
	},
	Shuffle: function(o){
	//Shuffle jQuery array of elements - see Fisher-Yates algorithm
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
},
///////end of shuffle function//////////

	songs: [
		{
			name: "again",
			path: "1/again.ogg",
			lyrics: "... again..."
		},

		{
			name: "good luck",
			path: "1/good luck with your emergency.ogg",
			lyrics: "good luck with your emergency"
		},
		{
			name: "How do you...",
			path: "1/How do you open this window.ogg",
			lyrics: "How do you open this window?"
		},
		{
			name: "How many..?",
			path: "1/how many books do you have.ogg",
			lyrics: "How many books do you have?"
		},
			{
			name: "I know where..",
			path: "1/i know where chickaletta is.ogg",
			lyrics: "I know where Chickaletta is"
		},
				{
			name: "get to",
			path: "1/ill help you get to your truck.ogg",
			lyrics: "I'll help you get to your truck"
		},
				{
			name: "question - answer",
			path: "1/question - answer.ogg",
			lyrics: "Question - what color is it? <br> Answer - it is red"
		},
				{
			name: "Question - answer",
			path: "1/Question - Where are you.ogg",
			lyrics: "Question - Where are you <br> Answer - I am at Newton"
		},
						{
			name: "Another question",
			path: "1/question one - another.ogg",
			lyrics: "Question 1 <br> Another question"
		},
						{
			name: "Silly chicken",
			path: "1/where is that silly chicken.ogg",
			lyrics: "Where is that silly chicken?"
		},
						{
			name: "would you like to",
			path: "1/would you like to drink water.ogg",
			lyrics: "Would you like to drink water <br> Yes I would"
		},
						{
			name: "would you like to ",
			path: "1/would you like to go outside yes.ogg",
			lyrics: "Would you like to go outside?<br> Yes I would"
		},
						{
			name: "Would you like to",
			path: "1/Would you like to go to Thailand.ogg",
			lyrics: "Would you like to go to Thailand? <br> No, I wouldn't"
		},
						{
			name: "Giant Alex part 1",
			path: "1/Giant-alex-pt1.MP3",
			lyrics: "Giant Alex part 1"
		},
						{
			name: "Giant Alex part 2",
			path: "1/Giant-alex-pt2.MP3",
			lyrics: "Giant Alex part 2"
		},
						{
			name: "I found it",
			path: "2/i found it, it's in line 21.ogg",
			lyrics: "I found it, it's in line 21"
		},
						{
			name: "I know how to",
			path: "2/i know how to get Alex up the beanstalk.ogg",
			lyrics: "I know how to get Alex up the beanstalk"
		},
						{
			name: "I know how to",
			path: "2/i know how to play soccer.ogg",
			lyrics: "I know how to play soccer"
		},
						{
			name: "need - why? - because",
			path: "2/i need water why.ogg",
			lyrics: "I need water<br>Why?<br>Because I'm thirsty"
		},
						{
			name: "I'd better",
			path: "2/id better make more smoothies.ogg",
			lyrics: "I'd better make more smoothies"
		},
						{
			name: "Its working",
			path: "2/its working.ogg",
			lyrics: "its working <br>(有效；成功)"
		},
						{
			name: "Highlighter",
			path: "2/take the highlighter.ogg",
			lyrics: "Take the highlighter"
		},
						{
			name: "going to do",
			path: "2/what are you going to do today.ogg",
			lyrics: "What are you going to do today?<br>I'm going to study English at Newton"
		},
						{
			name: "Would you like to",
			path: "2/would you like to drink milk tea.ogg",
			lyrics: "Would you like to drink milk tea? <br> Yes, I would. I would like to drink milk tea."
		},
						{
			name: "to join",
			path: "2/would you like to join me.ogg",
			lyrics: "Would you like to join me?<br> Yes I would"
		},
						{
			name: "Paw Patrol - Giant Alex 3",
			path: "2/giant-alex-3.MP3",
			lyrics: ""
		}
	],

	render: function () {
		const htmls = this.songs.map((song, index) => {
			return `
			             <div class="song ${
																	index === this.currentIndex ? "active" : ""
																}" data-index = ${index}>
					        <div class="thumb" >
                      		</div>
					        <div class="body">
						        <h3 class="title">${song.name}</h3>

					        </div>
					        <div class="option">
						        <i class="fas fa-ellipsis-h"></i>
					        </div>
				         </div>`;
			//['']
		});
		playlist.innerHTML = htmls.join("\n");
	},

	//define properties for the app object
	defineProperties: function () {
		Object.defineProperty(this, "currentSong", {
			get: function () {
				return this.songs[this.currentIndex];
			}
		});
	},

	// Handle the events
	handleEvents: function () {
		const _this = this;
		//handle the scrolling
		const cdWidth = cd.offsetWidth; //to get the original width of CD element
		document.onscroll = function () {
			const scrollTop = window.scaleY || document.documentElement.scrollTop; // to get the number of pixels users scroll
			const newCdWidth = cdWidth - scrollTop;

			newCdWidth > 0 ? (cd.style.width = newCdWidth + "px") : 0; //set the new width for the CD
			cd.style.opacity = newCdWidth / cdWidth; //set the opacity for the CD
		};

		//handle cd's spinning animation
		const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
			duration: 10000, //10s
			interations: Infinity
		});

		//play/pause the song
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}

			//when the song is playing
			audio.onplay = function () {
				_this.isPlaying = true;
				player.classList.add("playing");
				cdThumbAnimate.play();
			};

			//show the progress
			audio.ontimeupdate = function () {
				const progressPercent = Math.floor(
					(this.currentTime / audio.duration) * 100
				);
				progress.value = progressPercent;
			};

			//move to a new position in the audio
			progress.onchange = function (e) {
				const seekTime = (e.target.value / 100) * audio.duration;
				audio.currentTime = seekTime;
			};

			//when this song is paused
			audio.onpause = function () {
				_this.isPlaying = false;
				player.classList.remove("playing");
				cdThumbAnimate.pause();
			};
		};
		//when a user clicks the Next button
		btnNext.onclick = function () {
			if (_this.isRandom) {
				_this.loadRandomSong();
			} else {
				_this.loadNextSong();
			}
			audio.play();
			_this.render();
			_this.scrollActiveSong();
		};

		//when a user clicks the Previous button
		btnPrev.onclick = function () {
			if (_this.isRandom) {
				_this.loadRandomSong();
			} else {
				_this.loadPrevSong();
			}
			audio.play();
			_this.render();
			_this.scrollActiveSong();
		};

		//when a user clicks the random button
		btnRandom.onclick = function () {
			_this.isRandom = !_this.isRandom;
			_this.loadRandomSong();
			_this.setConfig("isRandom", _this.isRandom);
			btnRandom.classList.toggle("active", _this.isRandom);
			audio.play();
		};

		//when a user clicks the repeat button
		btnRepeat.onclick = function () {
			_this.isRepeated = !_this.isRepeated;
			if (_this.isRandom) {
				_this.isRandom = false;
				_this.setConfig("isRepeated", _this.isRepeated);
			}
			btnRepeat.classList.toggle("active", _this.isRepeated);
		};

		//when the current playlist is ended
		audio.onended = function () {
			if (_this.isRepeated) {
				audio.play();
			} else {
				btnNext.click();
			}
		};

		//listen to click events on the playlist.
		playlist.onclick = function (e) {
			const songNode = e.target.closest(".song");
			//handle the click on a song
			if (e.target.closest(".song:not(.active)") || !e.target.closest(".option")) {
				_this.currentIndex = Number(songNode.dataset.index);
				_this.loadCurrentSong();
				_this.render();
				audio.play();
			}
		};
	},

	//load the current song which is playing
	loadCurrentSong: function () {
		heading.innerHTML = this.currentSong.lyrics;
		cdThumb.style.backgroundImage = '';
		audio.src = this.currentSong.path;
	},
	//load config
	loadConfig: function () {
		this.isRandom = this.config.isRandom;
		this.isRepeated = this.config.isRepeated;
		btnRandom.classList.toggle("active", this.isRandom);
		btnRepeat.classList.toggle("active", this.isRepeated);
	},

	//Load the next song
	loadNextSong: function () {
		this.currentIndex++;
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0;
		}
		this.loadCurrentSong();
	},

	//load the previous song
	loadPrevSong: function () {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1;
		}
		this.loadCurrentSong();
	},

	//play a random song
	loadRandomSong: function () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.songs.length);
		} while (newIndex === this.currentIndex);

		this.currentIndex = newIndex;
		this.loadCurrentSong();
	},

	//scroll the active song to view
	scrollActiveSong: function () {
		setTimeout(() => {
			$(".song.active").scrollIntoView({ behavior: "smooth", block: "nearest" });
		}, 500);
	},

	start: function () {
		//shuffle songs
		this.Shuffle(this.songs)

		//load config
		this.loadConfig();

		//define the properties for the app object
		this.defineProperties();

		//default, play the current song

		//listen and handle DOM events
		this.handleEvents();

		//load a song to play
		this.loadCurrentSong();

		//reder the playlist
		this.render();
	}
};

app.start();