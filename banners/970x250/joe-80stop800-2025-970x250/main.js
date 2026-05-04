$( function () {

	const feed = "https://feeds.pexi.nl/api/feeds/ec68a70375b6e6c";
	const feedPlaying = "https://feeds.pexi.nl/api/feeds/635116c070763";
	const maxSongs = 5;

	function hover(){
		var hoverTimeline = gsap.timeline({paused:true})
			.to(".cta", {scale:1.1, duration:.6,ease: "back.inOut(3)"})
		;
		
		$("#stage").mouseenter( function() {hoverTimeline.play();});
		$("#stage").mouseleave( function() {hoverTimeline.reverse();});
	}

	// function to create song html elements
	const songs = document.getElementById('songs');
	function createSong(song, index){
		let position = song.position;
		// fallback for position when not available in feed
		if(!position){position = 800 - index};

		const newSong = document.createElement('div');
		newSong.classList.add('song');
		newSong.classList.add('song' + (index + 1));

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

	const introAnim1 = lottie.loadAnimation({
		container: intro1,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'data.json'
	})
	const introAnim2 = lottie.loadAnimation({
		container: intro2,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'data1.json'
	})
	const introAnim3 = lottie.loadAnimation({
		container: cirkel,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'Cirkel.json'
	})
	const introAnim4 = lottie.loadAnimation({
		container: cirkel1,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'Cirkel.json'
	})
	// starttimeline animation
	const tl = gsap.timeline({delay: 0.4, paused:true})
		.to('.hiddenOnload',{opacity:1,duration:.3})
		.call(function(){introAnim1.play()}, null,"<")
    	.call(function(){introAnim2.play()}, null,"<")	
    	.call(function(){introAnim4.play()}, null,"<")
		.call(function(){introAnim3.play()}, null,"<.2")
	;
	const title = document.querySelector('.title');
	const artist = document.querySelector('.artist');
	const audioSong = document.querySelector('.song');
	const cover = document.querySelector('.cover');
	const copies = document.querySelector('.copyoverflow');
	const positie = document.querySelector('.positie');
	// function to get the list
	function getPositions(position) {
		$.get(feed + `?from=${position - maxSongs}&to=${position}'&limit=${maxSongs}`, (e) => {
			const tracks = e.tracks.reverse();
			// tracks[0].position = 7;
			if (tracks[0].position <= 8) {
				title.innerHTML = tracks[0].title
				artist.innerHTML = tracks[0].artist.name
				positie.innerHTML = '#' + tracks[0].position;
				if (!tracks[0].position) {
					positie.innerHTML = '#800';
					// positie.style.display = 'none';
				}
				const imageurl = encodeURIComponent(tracks[0].thumbnail);
				cover.style.backgroundImage = "url('https://static.pexi.nl/hostedfeedimage/?url=https://static1.qmusic.medialaancdn.be" + imageurl + "')";
				console.log(title.clientWidth, copies.clientWidth);
				if (title.clientWidth > copies.clientWidth) {
					title.classList.add('marquee');
					title.innerHTML = tracks[0].title + "&ThickSpace;" + tracks[0].title + "&ThickSpace;";
				}
				console.log(artist.clientWidth, copies.clientWidth);
				if (artist.clientWidth > copies.clientWidth) {
					artist.classList.add('marquee');
					artist.innerHTML = tracks[0].artist.name + "&ThickSpace;" + tracks[0].artist.name + "&ThickSpace;";
				}
				$('#stage').removeClass('songsAvailable')
				$('.nu_op_je_radio').remove();

				tlSongs = gsap.timeline({ delay: 0.4, paused: true, onComplete: hover })
					.to('.hiddenOnload', { opacity: 1, duration: .3 })
					.call(hover)
					.call(function () { introAnim1.play() }, null, "<")
					.call(function () { introAnim2.play() }, null, "<")
					.from('.player', { y: 50, duration: .4, opacity: 0, stagger: .1, ease: Power1.easeOut }, "<")

					;

			} else {
				$('.player').remove();
				tracks.forEach((track, i) => {
					createSong(track, i);
				})

				var tlSongs = gsap.timeline({ delay: 0.8, onComplete: hover, paused: true })
					.staggerFrom('.nu_op_je_radio, .song, .cta', .4, { y: 50, opacity: 0, stagger: .1, ease: Power1.easeOut })
					.to('.cta', { scale: 1.1, duration: .6, ease: "back.inOut(3)", yoyo: true, repeat: 1 }, "=+.5")
					;
			}

				tl.play()
				tlSongs.play()

		})
	}

	// feed to get current playing song and set it to position
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







		
});