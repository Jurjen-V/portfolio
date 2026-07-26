var tlSongs;
gsap.registerPlugin(SplitText);
$(function () {

	var inputDate = new Date("02/09/2024");

	// Get today's date
	var todaysDate = new Date();

	// call setHours to take the time out of the comparison
	if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
		$('.logocopy').html('\
		<div class="row">Vandaag de finale met</div>\
		<div class="row">de <div class="bold">800 beste hits</div> uit de</div>\
		<div class="row bold">jaren 80!</div>')
		$('.cta').addClass('lastday')
	}

	const feedPlaying = "https://feeds.pexi.nl/api/feeds/635116c070763";
	const feed = "https://feeds.pexi.nl/api/feeds/ec68a70375b6e6c";

	const maxSongs = 7;
	function hover() {
		var hoverTimeline = gsap.timeline({ paused: true })
			.to(".cta", { scale: 1.1, duration: .6, ease: "back.inOut(3)" })
			;

		$("#stage").mouseenter(function () { hoverTimeline.play(); });
		$("#stage").mouseleave(function () { hoverTimeline.reverse(); });
	}

	const titles = document.querySelectorAll('.title');
	const artists = document.querySelectorAll('.artist');
	const audioSongs = document.querySelectorAll('.song');
	const covers = document.querySelectorAll('.cover');
	const copies = document.querySelectorAll('.copyoverflow');
	const posities = document.querySelectorAll('.positie');
	// function to create song html elements
	const songs = document.getElementById('songs');
	function createSong(song, index) {
		let position = song.position;
		// fallback for position when not available in feed
		if (!position) { position = 800 - (index + 1) };

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

	// function to get the list
	function getPositions(position) {
		$.get(feed + `?from=${position - maxSongs + 1}&to=${position}&limit=${maxSongs}`, (e) => {
			const tracks = e.tracks.reverse();
			titles.forEach(title => title.innerHTML = tracks[0].title);
			artists.forEach(artist => artist.innerHTML = tracks[0].artist.name);
			posities.forEach(positie => positie.innerHTML = '#' + tracks[0].position);
			if (!tracks[0].position) {
				posities.forEach(positie => positie.innerHTML = '#800');
				// positie.style.display = 'none';
			}
			const imageurl = encodeURIComponent(tracks[0].thumbnail);
			covers.forEach(cover => cover.style.backgroundImage = "url('https://static.pexi.nl/hostedfeedimage/?url=https://static1.qmusic.medialaancdn.be" + imageurl + "')");

			if (titles.clientWidth > copies.clientWidth) {
				titles.forEach(title => {
					title.classList.add('marquee');
					title.innerHTML = tracks[0].title + "&ThickSpace;" + tracks[0].title + "&ThickSpace;";
				});
			}
			if (artists.clientWidth > copies.clientWidth) {
				artists.forEach(artist => {
					artist.classList.add('marquee');
					artist.innerHTML = tracks[0].artist.name + "&ThickSpace;" + tracks[0].artist.name + "&ThickSpace;";
				});
			}
			// tracks[0].position = 8;
			if (tracks[0].position <= 8) {
				document.querySelectorAll(".player").forEach(player => player.style.opacity = "1");
				// tracks[maxSongs-1].position = 5;
				if (tracks[maxSongs - 1].position <= 8) {
					$('#stage').addClass('songsNotAvailable')
				}
				$('#stage').removeClass('songsAvailable')
				$('.nuopjeradio').remove();
			} else {
				document.querySelector(".player").style.opacity = "0";
				tracks.forEach((track, i) => {
					createSong(track, i);
				})

			}
		});
	}
	tlSongs = gsap.timeline({ delay: 0.4, paused: true, onComplete: hover })
		.to('.hiddenOnload', { opacity: 1, duration: .3 })
		.call(function () { introAnim1.play() }, null, "<")
		.call(function () { introAnim2.play() }, null, "<")
		.fromTo('.cta', .4, { y: 100, scale: 0.5, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: "power2.out", stagger: .1 }, 0.4)
		.from('.straks, .song', { y: 50, duration: .4, opacity: 0, stagger: .1, ease: Power1.easeOut }, 0.6)
		.call(hover)

		;
	tlSongs.play();
	// feed to get current playing song and set it to position
	$.get(feedPlaying, (playing) => {
		const songEditions = playing.played_tracks[0].active_editions;
		let number = 800;
		if (songEditions.length > 0) {
			songEditions.forEach(editions => {
				number = editions.position;
			})
		}
		getPositions(number);
	})

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

});


PEXI.skinsReady(function () {
	PEXI.message('size');
	PEXI.skinsWallpaper('wallpaper.png');
	PEXI.receiveMessage('scalingdone', function () {
		tlSongs.play();
	});
})