console.log("Fair warning - I'm not a great dev, this code isn't efficient.");
var profiles_open = [];
var profilepos = ['30', '30'];
$(window).on('load', function() {
	$('body').removeClass('loading');
});
$('a').on('click', function() {
	$('audio#click')[0].play();
	if ($(this).attr('href') == '#') {
		event.preventDefault();
	} else {}
});
$('a.innav').on('click', function() {
	event.preventDefault();
	$('audio#click')[0].play();
	$('body').addClass('loading');
	var newloc = $(this).attr('href');
	setTimeout(function() {
		window.location.href = newloc;
	},200);
});
$('body').on('click', '.btn.close', function() {
	$('audio#click')[0].play();
	closewindow($(this).parent());
	event.preventDefault();
});
$('body').on('mousedown', '.profile', function() {
	$('.profile.active').removeClass('active');
	$(this).addClass('active');
});
$('body').keyup(function(e) {
	if (e.key === 'Escape') {
		closewindow($('.profile.active'));
	}
});
$('.profile-link').on('click', function() {
	$('body').addClass('loading');
	var user = $(this).attr('id');
	var rank = $(this).attr('d-rank');
	rank = rank.replace(/<[^>]*>?/gm, '');
	if ($.inArray(user, profiles_open) == -1) {
		$.post("/data/",
	    {
			type: 'u',
			id: user,
		},
		function(data, status) {
			if (status == 'success') {
				if (rank == '1') {
					$('audio#leader')[0].play();
				}
				profiles_open.push(user);
				data = data.split('&');
				$('.profile.active').removeClass('active');
				$('.container').append('<div style="right:' + profilepos[1] + 'px;top:' + profilepos[0] + 'px;" class="section profile twelve columns draggable active" id="' + data[0] + '"><a href="#" class="btn close" title="Click or press ESC to close"></a><div class="title"><p>User profile</p></div><div class="wrapper"><div class="row"><div class="one-third column"><div class="avatar" style="background-color:#' + data[1] + ';"></div></div><div class="one-third column"><p class="t-right h-title">Rank</p><p class="t-right h-stat">' + rank + '</p></div><div class="one-third column"><p class="t-right h-title">Average</p><p class="t-right h-stat">' + data[2] + '%</p></div></div><p class="username">' + data[0] + '</p><p class="lactive">Last active: ' + data[7] + '</p><ul class="stats"><li>Contributions <span>' + data[4] + '</span></li><li>Right <span>' + data[5] + '</span></li><li>Wrong <span>' + data[6] + '</span></li><li>Joined:<span>' + data[3] + '</span></li></ul></div></div>');
				$('.draggable').draggable();
				profilepos = [parseInt(profilepos['1']) + 30, parseInt(profilepos['0']) + 30];
				$('body').removeClass('loading');
			}
		});
	}
});

function closewindow(w) {
	if ($('.profile.active').length) {
		profilepos = [parseInt(profilepos['1']) - 30, parseInt(profilepos['0']) - 30];
		profiles_open.splice($.inArray(w.attr('id'), profiles_open), 1);
		var nextprofile = profiles_open.length -1;
		if (nextprofile !=  -1) {
			$('#' + $.escapeSelector($(profiles_open).get(nextprofile))).addClass('active');
		}
		w.remove();
	}
}

function playclick() {
	event.preventDefault();
	$('audio#click')[0].play();
}