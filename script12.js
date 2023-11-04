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
		},
						{
			name: "Are you going to?",
			path: "3/are you going to get a haircut today.ogg",
			lyrics: "Are you going to get a haircut today?"
		},
						{
			name: "kind of yummy",
			path: "3/CocaCola is kinda yummy.ogg",
			lyrics: "Coca-Cola is kind of  yummy"
		},
						{
			name: "Another pencil",
			path: "3/do you have another pencil.ogg",
			lyrics: "Do you have another pencil?"
		},
						{
			name: "Do you know where...",
			path: "3/do you know where the toilet is.ogg",
			lyrics: "Do you know where the toilet is?"
		},
						{
			name: "i don't know what...",
			path: "3/i don't know what you are saying.ogg",
			lyrics: "I don't know what you are saying."
		},
						{
			name: "I dont know where",
			path: "3/i dont know where KFC is.ogg",
			lyrics: "I dont know where KFC is"
		},
						{
			name: "i drink water when",
			path: "3/i drink water when i'm thirsty.ogg",
			lyrics: "I drink water when i'm thirsty"
		},
						{
			name: "I know where",
			path: "3/I know where my mom is.ogg",
			lyrics: "I know where my mom is"
		},
						{
			name: "I know where 美宜佳 is",
			path: "3/i know where MYJ is.ogg",
			lyrics: "I know where 美宜佳 is."
		},
						{
			name: "I'm kind of sleepy",
			path: "3/im kinda sleepy.ogg",
			lyrics: "I'm kind of sleepy<br>Why?<br>Because I slept 7 hours"
		},
						{
			name: "I'm still thirsty",
			path: "3/i'm still thirsty.ogg",
			lyrics: "I'm still thirsty"
		},
						{
			name: "The chair is not a toy",
			path: "3/the chair is not a toy.ogg",
			lyrics: "The chair is not a toy"
		},
						{
			name: "empty",
			path: "3/the cup is empty.ogg",
			lyrics: "The cup is empty"
		},
						{
			name: "Which line?",
			path: "3/which line.ogg",
			lyrics: "Which line?  <br>哪一条行？"
		},
						{
			name: "for you",
			path: "4/for you.ogg",
			lyrics: "This is for you, and this is for you<br> And this is for Howie<br> And this is for Chen"
		},
						{
			name: "Have to do today",
			path: "4/have to do today.ogg",
			lyrics: "What do you have to do today?<br>I have to wash the dog"
		},
						{
			name: "ill be there soon",
			path: "4/ill be there.ogg",
			lyrics: "I will be there at 9 o'clock<br> What about Howie?<br> I will be there soon"
		},
						{
			name: "I'll be thirsty",
			path: "4/ill be thirsty.ogg",
			lyrics: "I'll be thirsty"
		},
						{
			name: "I'm sure ",
			path: "4/im sure cocacola is kinda yummy.ogg",
			lyrics: "I'm sure Coca-Cola is kind of yummy"
		},
						{
			name: "They'll be hungry too",
			path: "4/they'll be hungry too.ogg",
			lyrics: "They'll be hungry too"
		},
						{
			name: "this is from",
			path: "4/this is from meiyijia.ogg",
			lyrics: "This is from 美宜家"
		},
						{
			name: "Where are you from?",
			path: "4/where are you from.ogg",
			lyrics: "where are you from?<br> I'm from 湖南"
		},
						{
			name: "Pup Pup Geese - 1",
			path: "4/Goose-1.MP3",
			lyrics: "Pup Pup Geese - 1"
		},
						{
			name: "Howie, read the question",
			path: "5/Howie, read the question.ogg",
			lyrics: "Howie, read the question"
		},
						{
			name: "I can take milk when",
			path: "5/I can take milk.ogg",
			lyrics: "I can take milk when the class is finished"
		},
						{
			name: "I can take the sugar when",
			path: "5/i can take the sugar.ogg",
			lyrics: "I can take the sugar when the class is finished"
		},
						{
			name: "I guess he is yellow",
			path: "5/i guess he is yellow.mp3",
			lyrics: "What color is Rubble?<br> I guess he is yellow"
		},
						{
			name: "lets finish this page",
			path: "5/lets finish this page.ogg",
			lyrics: "Lets finish this page"
		},
						{
			name: "what about you?",
			path: "5/what about.ogg",
			lyrics: "What are you doing?<br> I'm reading<br> What about you, Howie?<br> I'm reading, too."
		},
						{
			name: "They'll be here tomorrow",
			path: "5/when are the geese coming.ogg",
			lyrics: "when are the geese coming here?<br> They'll be here tomorrow."
		},
						{
			name: "Where do you live?",
			path: "5/where do you live.ogg",
			lyrics: "Where do you live?<br> I live on Zhonghua avenue"
		},
						{
			name: "Back away from",
			path: "6/back away from the bread.ogg",
			lyrics: "Back away from the bread!"
		},
						{
			name: "Can someone please",
			path: "6/can someone please.ogg",
			lyrics: "Can someone please turn on the lights?"
		}
		,
						{
			name: "He went this way",
			path: "6/he went this way.ogg",
			lyrics: "He went this way"
		}
		,
						{
			name: "I eat everything -- even",
			path: "6/I eat everything.ogg",
			lyrics: "I eat everything<br> Even onion? <br> Even 臭豆腐?<br>Yes"
		}
		,
						{
			name: "Rescue",
			path: "6/marshall will rescue the goose.ogg",
			lyrics: "Marshall will rescue the goose"
		}
		,
						{
			name: "What homework do you have to do?",
			path: "6/what homework do you have to do.ogg",
			lyrics: "What homework do you have to do?"
		},
						{
			name: "Piece of bread",
			path: "6/would you like this piece of bread.ogg",
			lyrics: "Would you like this piece of bread?"
		},
						{
			name: "Catch up with them",
			path: "7/fuzzy you need to catch up with them.ogg",
			lyrics: "Fuzzy, you need to catch up with them."
		},
						{
			name: "get this on/off you",
			path: "7/get this on you.ogg",
			lyrics: "Let's get this on you<br> And let's get this off you"
		},
						{
			name: "if the ball doesnt go in the bag",
			path: "7/if the ball doesnt go in the bag.ogg",
			lyrics: "If the ball doesnt go in the bag,<br> then you have to answer the question."
		},
						{
			name: "Use your helmet",
			path: "7/use your helmet.ogg",
			lyrics: "Use your helmet"
		},
						{
			name: "When you fly back",
			path: "7/when you fly back we'll see you again.ogg",
			lyrics: "When you fly back<br> We'll see you again"
		},
						{
			name: "you just climbed to the roof",
			path: "7/you just climbed.ogg",
			lyrics: "Marshall, you just climbed to the roof of the train station"
		},
						{
			name: "Goose-3.MP3",
			path: "7/Goose-3.MP3",
			lyrics: "Pup pup Goose 3"
		},
						{
			name: "Are they all here",
			path: "8/are they all here.ogg",
			lyrics: "Are they all here?"
		},
						{
			name: "Don't move -- keep going",
			path: "8/dont move keep going.ogg",
			lyrics: "Don't move!<br>Keep going!"
		},
						{
			name: "They are everywhere",
			path: "8/I found one in my juice glass.ogg",
			lyrics: "I found one in my juice glass<br> They are everywhere"
		},
						{
			name: "I'd better figure out",
			path: "8/id better figure out where they came from.ogg",
			lyrics: "I'd better figure out where they came from."
		},
						{
			name: "Call this one bertle",
			path: "8/lets call this one bertle.ogg",
			lyrics: "Lets call this one Bertle"
		},
						{
			name: "That really tickles",
			path: "8/that really tickles.ogg",
			lyrics: "That really tickles"
		},
						{
			name: "This one has a star on her back",
			path: "8/this one has a star on her back.ogg",
			lyrics: "This one has a star on her back"
		},
						{
			name: "Need water to live",
			path: "8/turtles need water to live.ogg",
			lyrics: "Turtles need water to live"
		},
						{
			name: "Turtles 1",
			path: "8/Turtles1.MP3",
			lyrics: "Turtles - 1"
		},
						{
			name: "Are there any pencils?",
			path: "9/are there any pencils.ogg",
			lyrics: "Are there any pencils?<br>Yes, there are."
		},
						{
			name: "Ten times",
			path: "9/i watched ten times.ogg",
			lyrics: "How many times?<br>I watched the video ten times"
		},
						{
			name: "Test the chair",
			path: "9/I will test the chair.ogg",
			lyrics: "I will test the chair"
		},
						{
			name: "Is there any sugar?",
			path: "9/is there any sugar.ogg",
			lyrics: "Is there any sugar?<br>No, there isn't"
		},
						{
			name: "Time to have a class",
			path: "9/it is time to have a class.ogg",
			lyrics: "It is time to have a class"
		},
						{
			name: "Right away",
			path: "9/pick up the highlighter.ogg",
			lyrics: "Pick up the highlighter<br>when???<br>Right away!"
		},
						{
			name: "Will be back home",
			path: "9/soon all of your friends will be back home.ogg",
			lyrics: "Soon all of your friends will be back home"
		},
						{
			name: "Will be in Australia",
			path: "9/soon all of your friends will be in Australia.ogg",
			lyrics: "Soon all of your friends will be in Australia"
		},
						{
			name: "Use toothpaste for teeth",
			path: "9/thing use for teeth.ogg",
			lyrics: "What thing do you use for your teeth?<br> I use toothpaste"
		},
						{
			name: "Turtles - 3",
			path: "9/Turtles - 3.MP3",
			lyrics: "Turtles - 3"
		},
						{
			name: "Use English please",
			path: "9/use english please.ogg",
			lyrics: "Use English please"
		},
						{
			name: "Both Mom and Dad",
			path: "9/who do you love.ogg",
			lyrics: "Who do you love Mom or Dad?<br> I love both"
		},
						{
			name: "You have to do something",
			path: "9/you have to do something.ogg",
			lyrics: "You have to do something"
		},
						{
			name: "You'd better get out of there",
			path: "9/youd better get out of there.ogg",
			lyrics: "You'd better get out of there"
		},
						{
			name: "Is there any..?",
			path: "10/1.ogg",
			lyrics: "Is there any milk tea?<br>Yes, there is."
		},
						{
			name: "I gotta go",
			path: "10/I gotta go.ogg",
			lyrics: "I gotta go <br>（我得走了）"
		},
						{
			name: "I just turned on the AC",
			path: "10/i just turned on the AC.ogg",
			lyrics: "I just turned on the AC"
		},
						{
			name: "I want Howie to read all the words on the left",
			path: "10/i want howie to read all the words on the left.ogg",
			lyrics: "I want howie to read all the words on the left"
		},
						{
			name: "A piece of gum?",
			path: "10/would you like a piece of gum.ogg",
			lyrics: "Would you like a piece of gum?<br> Yes, please."
		},
						{
			name: "Skye, can you get grandpa home?",
			path: "11/get grandpa home.ogg",
			lyrics: "Skye, can you get grandpa home?"
		},
						{
			name: "Paw Patrol - Pups save goodway 2",
			path: "11/goodway 2.MP3",
			lyrics: "Paw Patrol - Pups save goodway 2"
		},
						{
			name: "Paw Patrol - Pups save goodway 3",
			path: "11/goodway 3.MP3",
			lyrics: "Paw Patrol - Pups save goodway 3"
		},
						{
			name: "Pushups",
			path: "11/how many pushups can you do.ogg",
			lyrics: "How many pushups can you do?"
		},
						{
			name: "Isn't sth missing?",
			path: "11/isnt sth missing.ogg",
			lyrics: "Isn't something missing?"
		},
						{
			name: "Pretty awesome dude",
			path: "11/pretty awesome dude.ogg",
			lyrics: "Pretty awesome dude"
		},
						{
			name: "See you at ",
			path: "11/see you at city hall Ryder.ogg",
			lyrics: "See you at city hall, Ryder"
		},
						{
			name: "Show us what you can do",
			path: "11/show us what you can do.ogg",
			lyrics: "Show us what you can do"
		},
						{
			name: "This should work great",
			path: "11/thanks rocky this should work great.ogg",
			lyrics: "Thanks Rocky <br>this should work great	"
		},
						{
			name: "Amazing",
			path: "12/amazinfg.ogg",
			lyrics: "Wow, that was so amazing!"
		},
						{
			name: "comfy - share",
			path: "12/are you omfy.ogg",
			lyrics: "Are you comfy?<br> You can share with me"
		},
						{
			name: "Save the day",
			path: "12/can apollo save the asu.ogg",
			lyrics: "Can Apollo save the day, his own  super way?<br>转危为安，扭转败局"
		},
						{
			name: "might need",
			path: "12/might need.ogg",
			lyrics: "Farmer Yumi might need some help around the farm"
		},
						{
			name: "Need a super pup to save the day?",
			path: "12/need a super piup.ogg",
			lyrics: "Need a super pup to save the day?"
		},
						{
			name: "Down there",
			path: "12/rocky what are uou doing.ogg",
			lyrics: "Rocky, what are you doing down there?"
		},
						{
			name: "Paw Patrol - Super pup 1",
			path: "12/super pup 1.MP3",
			lyrics: "Paw Patrol - Super pup 1"
		},
						{
			name: "Thanks buddy",
			path: "12/thanks buddy.ogg",
			lyrics: "Thanks buddy"
		},
						{
			name: "Thats it",
			path: "12/thats it.ogg",
			lyrics: "Thats it"
		},
						{
			name: "Who wants to play soccer?",
			path: "12/who wants to play sopccer.ogg",
			lyrics: "Hey pups! Who wants to play soccer?"
		}

	],
	last_class: function(){
		const how_many_last_class = 10;
		for (var i = this.songs.length-how_many_last_class; i < this.songs.length; i++) {
			this.songs[i].highlight = 1;
		}
	},

	render: function () {
		const htmls = this.songs.map((song, index) => {
			return `
			             <div class="song ${
																	index === this.currentIndex ? "active" : ""
																}" data-index = ${index}>
					        <div class="thumb ${ song.highlight === 1 ? 'highlights':''}" >
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
		this.last_class()
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