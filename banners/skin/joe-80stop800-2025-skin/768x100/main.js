
$( function () {


	const feedPlaying = "https://feeds.pexi.nl/api/feeds/635116c070763";
	const feed = "https://feeds.pexi.nl/api/feeds/rw66fe7c885e9b0";
	const maxSongs = 3;
	function hover(){
		var hoverTimeline = gsap.timeline({paused:true})
			// .to(".cta", {scale:1.1, duration:.6,ease: "back.inOut(3)"})
		;
		
		$("#stage").mouseenter( function() {hoverTimeline.play();});
		$("#stage").mouseleave( function() {hoverTimeline.reverse();});
	}
	const title = document.querySelector('.title');
	const artist = document.querySelector('.artist');
	const audioSong = document.querySelector('.song');
	const cover = document.querySelector('.cover');
	const copies = document.querySelector('.copyoverflow');
	const positie = document.querySelector('.positie');
	// tlBounces1 = gsap.timeline({paused:true, repeat: -1})
	// 	.to('.circle3',{width:1831,height:1831, duration: .3, ease: Power4.easeInOut},0)
	// 	.to('.circle3',{width:1712,height:1712, duration: .3, ease: Power1.easeInOut},.3)
	// 	;
	// tlBounces2 = gsap.timeline({paused:true, delay: .1, repeat: -1})
	// 	.to('.circle2',{width:2658,height:2658, duration: .3, ease: Power4.easeInOut},0)
	// 	.to('.circle2',{width:2532,height:2532, duration: .3, ease: Power1.easeInOut},.3)
	// 	;
	// tlBounces3 = gsap.timeline({paused:true, delay: .2, repeat: -1})
	// 	.to('.circle1',{width:3421,height:3421, duration: .3, ease: Power4.easeInOut},0)
	// 	.to('.circle1',{width:3354,height:3354, duration: .3, ease: Power1.easeInOut},.3)
	// 	;

	// 	tlBounces4 = gsap.timeline({paused:true, delay: .2, repeat: -1})
	// 	.to('.circle4',{width:1068,height:1068, duration: .3, ease: Power4.easeInOut},0)
	// 	.to('.circle4',{width:890,height:890, duration: .3, ease: Power1.easeInOut},.3)
	// 	;

	// function bouncingOn(){
	// 	setTimeout(function(){
	// 		tlBounces1.play(0);
	// 	},100)
	// 	setTimeout(function(){
	// 		tlBounces2.play(0);
	// 	},200)
	// 	setTimeout(function(){
	// 		tlBounces3.play(0);
	// 	},300)
		
	// 	tlBounces4.play(0);
	// }

	// function bouncingOff(){
	// 	tlBounces1.kill(0);
	// 	tlBounces2.kill(0);
	// 	tlBounces3.kill(0);
	// 	tlBounces4.kill(0);
	// }

	// function to create song html elements
	const songs = document.getElementById('songs');
	function createSong(song, index){
		let position = song.position;
		// fallback for position when not available in feed
		if(!position){position = 800 - (maxSongs - (index + 1))};

		const newSong = document.createElement('div');
		newSong.classList.add('song');

		const newSongIndex = document.createElement('div');
		newSongIndex.classList.add('song-index');
		newSongIndex.textContent = position + ".";
		newSong.appendChild(newSongIndex);

		const newSongCopy = document.createElement('div');
		newSongCopy.classList.add('song-copy');

		const newSongArtist = document.createElement('div');
		newSongArtist.classList.add('song-artist');
		newSongArtist.textContent = song.artist.name;
		newSongCopy.appendChild(newSongArtist);

		const newSongTitle = document.createElement('div');
		newSongTitle.classList.add('song-title');
		newSongTitle.textContent = song.title;
		newSongCopy.appendChild(newSongTitle);

		newSong.appendChild(newSongCopy);
		songs.appendChild(newSong);
	}

	// function to get the list
	function getPositions(position){
		$.get(feed + `?from=${position}&to=${position + maxSongs}'&limit=${maxSongs}`,(e)=>{
			const tracks = e.tracks.reverse();
			// console.log(tracks)
			tracks.forEach((track, i)=>{
				createSong(track, i);
			})
			title.innerHTML = tracks[0].title
			artist.innerHTML = tracks[0].artist.name
			positie.innerHTML = '#'+tracks[0].position;	

			if (!tracks[0].position) {
				positie.innerHTML = '#800';
				// positie.style.display = 'none';
			}
			const imageurl = encodeURIComponent(tracks[0].thumbnail);
			cover.style.backgroundImage = "url('https://static.pexi.nl/hostedfeedimage/?url=https://static1.qmusic.medialaancdn.be" + imageurl + "')";

			if(title.clientWidth > copies.clientWidth){
				title.classList.add('marquee');
				title.innerHTML = tracks[0].title + "&ThickSpace;" + tracks[0].title + "&ThickSpace;";
			}
			if(artist.clientWidth > copies.clientWidth){
				artist.classList.add('marquee');
				artist.innerHTML = tracks[0].artist.name + "&ThickSpace;" + tracks[0].artist.name + "&ThickSpace;";
			}
			// tracks[maxSongs-1].position = 5;
			if(tracks[maxSongs-1].position <= 10){
				$('#stage').addClass('songsNotAvailable')
			}
			const tlSongs = gsap.timeline({delay: 0.8, onComplete:hover, paused:true})
				.staggerFrom('.song',.4,{y: 50, opacity: 0, stagger: .1, ease: Power1.easeOut})
				.to('.cta',{scale:1.1, duration:.6,ease: "back.inOut(3)", yoyo: true, repeat: 1},"=+.5")
			;

			PEXI.inView(function(){
				tl.play()
				tlSongs.play()
			});
		})
	}

	$.get(feedPlaying,(playing)=>{
		const songEditions = playing.played_tracks[0].active_editions;
		let number = 800;
		if (songEditions.length > 0) {
			songEditions.forEach(editions => {
				number = editions.position;
			})
		} 
		getPositions(number);
	})
	
	var tl = gsap.timeline({delay: 0.4, paused:true})
		.to('.hiddenOnload',{opacity:1,duration:.3})
		// .from('.circle',{width:0,height:0, duration: 1, stagger: .05, ease: Elastic.easeOut.config(.8,1)})
	;

	

	PEXI.inView(function(){
		tl.play()
		setTimeout(function(){
			bouncingOff()
		},5000)
	})

});