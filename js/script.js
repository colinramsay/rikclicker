var ClickCounter = {
    SOUNDS: ['A-BIENTOT.mp3', 'ANAL-FLAP.mp3', 'ANAL-SCAB.mp3', 'ANIMAL-ONE.mp3', 'ANIMAL-TWO.mp3', 'ANUS_on_SEA.mp3', 'ARSE-TO-MOUTH.mp3', 'BIBAMUS.mp3', 'BLAIR.mp3', 'BOLLOCKSY.mp3', 'BONJOUR.mp3', 'BURST-RECTUM.mp3', 'BURST.mp3', 'CAESAR.mp3', 'CASH.mp3', 'CELEBRITY-WANKAHOLIC.mp3', 'CHARITY-WANK.mp3', 'CHATEAU.mp3', 'CHEER.mp3', 'CHEESE-STRING.mp3', 'CHILDREN.mp3', 'CONTROVERSY.mp3', 'COUGH.mp3', 'CUNTFACE.mp3', 'DADDY.mp3', 'DAS-KAPITAL.mp3', 'DOPPELGANGER.mp3', 'ED.mp3', 'EFFING-LINE.mp3', 'EVIL-LAUGH.mp3', 'FACSIT-GOLFERS.mp3', 'FORGET.mp3', 'FOUL-MUTT.mp3', 'FUCKING-FABIO.mp3', 'FUCKSTICKS.mp3', 'GO-AWAY.mp3', 'GOEBBELS.mp3', 'GOLLY.mp3', 'GOOD-LORD.mp3', 'GRUNT-AND-GROAN.mp3', 'GRUNT.mp3', 'HORSE-COCK.mp3', 'HORSEFLSH.mp3', 'HUZZAH.mp3', 'JOKE.mp3', 'LATRINES.mp3', 'LEFTY.mp3', 'LIE!.mp3', 'LIMP.mp3', 'LOO.mp3', 'LOVE.mp3', 'MARVELOUS.mp3', 'MLUD.mp3', 'MMMMM.mp3', 'MONEY.mp3', 'MR-LUCKY.mp3', 'NAUGHTY-GIRL.mp3', 'NAZI-GOLD.mp3', 'NHS.mp3', 'NO-CHANCE.mp3', 'NO.mp3', 'OF-COURSE.mp3', 'OH-WELL.mp3', 'OLD-HEART.mp3', 'OLD-SNOW.mp3', 'OOMPAH.mp3', 'PALACE.mp3', 'PILOTS.mp3', 'PITY.mp3', 'PLUCK-AND-STIFFEN.mp3', 'PRAWN.mp3', 'PRICK-ON-A-DARTBOARD.mp3', 'PUBIC-WIG.mp3', 'PUPPY-JAZZ.mp3', 'PURPLE.mp3', 'QUEEN-MUM.mp3', 'RAPE-ALARM.mp3', 'RAZTENBERGER.mp3', 'RAZZLE.mp3', 'REAL-EYES.mp3', 'RIGHT-ON.mp3', 'RUBY.mp3', 'SATAN-SHITHOLE.mp3', 'SATISFYINGLY.mp3', 'SAUSAGE.mp3', 'SCREAM.mp3', 'SEX-NOIZE.mp3', 'SHANDY.mp3', 'SHIT.mp3', 'SHUT-UP.mp3', 'SNOWMAN.mp3', 'SPIRIT.mp3', 'TA-DA.mp3', 'TASERING.mp3', 'TWAT.mp3', 'UNCLE.mp3', 'UNDERPANTS.mp3', 'VAG-FEST.mp3', 'VEG.mp3', 'VIAGRA.mp3', 'VOILA.mp3', 'VOL_AU_VENT.mp3', 'WANDY-1.mp3', 'WE-ARRIVE.mp3', 'WHAT.mp3', 'WHERE-ARE-WE.mp3', 'WHO-THE-FUCK.mp3', 'WICKED-LAUGH.mp3', 'WINKIES.mp3', 'WOOF.mp3', 'YES.mp3', 'YOU-FUCKING-ARE.mp3', 'ZEBRA-COCK.mp3', 'human_poo.mp3', 'nora.mp3', 'squirt.mp3'],
    IMAGES: ['20130301-SCP001-TheLastHurrah-Rik-4310.jpg', '20130301-SCP001-TheLastHurrah-Rik-4327.jpg', '20130301-SCP001-TheLastHurrah-Rik-7792.jpg', '20130301-SCP001-TheLastHurrah-Rik-7812.jpg', '20130301-SCP001-TheLastHurrah-Rik-7837.jpg', '20130301-SCP001-TheLastHurrah-Rik-7947.jpg'],
    COOKIE_KEY: 'click-counter',

    setCookie: function(name, value, daysTillExpiry) {
        var expiryDate = new Date();

        expiryDate.setDate(expiryDate.getDate() + daysTillExpiry);

        value = escape(value) + ((daysTillExpiry===null) ? "" : "; expires="+ expiryDate.toUTCString());

        document.cookie = name + "=" + value;
    },


    getCookie: function(name) {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++) {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x === name) {
                return unescape(y);
            }
        }
    },


    updateImage: function() {
        var num = Math.floor(Math.random() * ClickCounter.IMAGES.length);

        $('#click-target img').attr('src', 'img/randoms/' + ClickCounter.IMAGES[num]);
    },


    getClickCount: function() {
        return ClickCounter.getCookie(ClickCounter.COOKIE_KEY) ? parseInt(ClickCounter.getCookie(ClickCounter.COOKIE_KEY), 10) : 0;
    },


    refreshTwitter: function() {
        $('.twitter-container iframe').remove();
        $('.twitter-container').html('<a class="twitter-share-button" data-count="none" data-text="I Rik Clicked ' + ClickCounter.getClickCount() + ' times with The Last Hurrah!" href="https://twitter.com/share">Tweet your RikClicks</a>');
        if(twttr && twttr.widgets) {
            twttr.widgets.load();
        }
    },


    play: function(file) {
        soundManager.stopAll();
        soundManager.destroySound(file);

        soundManager.createSound({
          id: file,
          url: file,
          autoLoad: true,
          autoPlay: true,
          onload: function() {
            $('#click-target img').fadeTo('fast', 1);
          },
          whileplaying: function() {
            var val = (this.position / this.duration) * 100;
            $('.progress').css('width', val + '%');
          },
          volume: 50
        });
    },

    onClick: function() {
        $('#click-target img').fadeTo('fast', 0.5);

        ClickCounter.updateImage();
        var curr = $('#counter').flipCounter('getNumber') + 1,
            num = Math.floor(Math.random() * ClickCounter.SOUNDS.length);

        $('#counter').flipCounter("setNumber", curr);
        $('.progress').css('transition', null);
        $('.progress').css('width', 0);
        $('.progress').css('transition', 'width 0.2s');

        ClickCounter.play('sound/' + ClickCounter.SOUNDS[num]);
        ClickCounter.setCookie(ClickCounter.COOKIE_KEY, curr, 30);
        ClickCounter.refreshTwitter();
    },


    onSoundManagerReady: function() {
        $('#click-target').on('click', ClickCounter.onClick);
    },


    startApp: function() {

        $('#counter').flipCounter({
            number: ClickCounter.getClickCount(),
            numIntegralDigits:1,
            numFractionalDigits:0,
            digitClass:"counter-digit",
            counterFieldName:"counter-value",
            digitHeight:40,
            digitWidth:30,
            imagePath:"img/flipCounter-medium.png",
            easing: 'easeOutQuad',
            duration:10000
        });

        ClickCounter.refreshTwitter();

        soundManager.setup({
            url: 'swf/',
            flashVersion: 9,
            preferFlash: false,
            onready: ClickCounter.onSoundManagerReady
        });

    }
};

$(ClickCounter.startApp);

window.fbAsyncInit = function() {
    FB.init({
        appId      : '784435014938364',
        xfbml      : true,
        version    : 'v2.2'
    });
};

(function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));