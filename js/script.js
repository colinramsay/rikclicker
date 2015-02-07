var clickerSounds = ['A BIENTOT.mp3',
'ANAL SCAB.mp3',
'ARSE TO MOUTH.mp3',
'BIBAMUS.mp3',
'BONJOUR.mp3',
'BURST RECTUM.mp3',
'BURST.mp3',
'CASH.mp3',
'CHEESE STRING.mp3',
'COUGH.mp3',
'DAS KAPITAL.mp3',
'EFFING LINE.mp3',
'EVIL LAUGH.mp3',
'FORGET.mp3',
'FOUL MUTT.mp3',
'FUCKING FABIO.mp3',
'FUCKSTICKS.mp3',
'GOEBBELS.mp3',
'GOLLY.mp3',
'GRUNT AND GROAN.mp3',
'HUZZAH.mp3',
'LEFTY.mp3',
'LIE!.mp3',
'LIMP.mp3',
'MLUD.mp3',
'MARVELOUS.mp3',
'MONEY.mp3',
'MR LUCKY.mp3',
'NAUGHTY GIRL.mp3',
'NAZI GOLD.mp3',
'OF COURSE.mp3',
'OLD SNOW.mp3',
'OOMPAH.mp3',
'PITY.mp3',
'PLUCK AND STIFFEN.mp3',
'PRAWN.mp3',
'PRICK ON A',
'PUBIC WIG.mp3',
'RAZTENBERGER.mp3',
'REAL EYES.mp3',
'RUBY.mp3',
'SATAN SHITHOLE.mp3',
'SATISFYINGLY.mp3',
'SCREAM.mp3',
'SHANDY.mp3',
'SHIT.mp3',
'SHUT UP.mp3',
'SNOWMAN.mp3',
'TA DA.mp3',
'TASERING.mp3',
'VEG.mp3',
'VOILA.mp3',
'WE ARRIVE.mp3',
'WHAT.mp3',
'WHERE ARE WE.mp3',
'WHO THE FUCK.mp3',
'YES.mp3',
'YOU FUCKING ARE.mp3'];

var clickerImages = [
    '20130301-SCP001-TheLastHurrah-Rik-4310.jpg',
    '20130301-SCP001-TheLastHurrah-Rik-4327.jpg',
    '20130301-SCP001-TheLastHurrah-Rik-7792.jpg',
    '20130301-SCP001-TheLastHurrah-Rik-7812.jpg',
    '20130301-SCP001-TheLastHurrah-Rik-7837.jpg',
    '20130301-SCP001-TheLastHurrah-Rik-7947.jpg'
];

var COOKIE_KEY = 'rik-click';

var setCookie = function(c_name,value,exdays) {
            var exdate=new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie=c_name + "=" + c_value;
        };

        var getCookie = function(c_name) {
            var i,x,y,ARRcookies=document.cookie.split(";");
            for (i=0;i<ARRcookies.length;i++) {
              x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
              y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
              x=x.replace(/^\s+|\s+$/g,"");
              if (x==c_name)
                {
                return unescape(y);
                }
            }
        };

function updateImage() {
    var num = Math.floor(Math.random() * clickerImages.length);

    $('#click-target img').attr('src', '/img/randoms/' + clickerImages[num]);
}


function getClickCount() {
    return getCookie(COOKIE_KEY) ? parseInt(getCookie(COOKIE_KEY), 10) : 0;
}

function refreshTwitter() {
    $('.twitter-container iframe').remove();
    $('.twitter-container').html('<a class="twitter-share-button" data-count="none" data-text="I Rik Clicked ' + getClickCount() + ' times with The Last Hurrah!" data-via="The Last Hurrah" href="https://twitter.com/share">Tweet your RikClicks</a>');
    if(twttr && twttr.widgets) {
        twttr.widgets.load();
    }
}


function openFbPopUp() {
    FB.ui({
        method: 'share',
        href: 'https://developers.facebook.com/docs/'
    }, function(response){

    });
}


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '784435014938364',
      xfbml      : true,
      version    : 'v2.2'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



$(function() {
    refreshTwitter();
});

soundManager.setup({

    url: '/swf/',
    flashVersion: 9,
    preferFlash: false,
    debugMode: true,

    onready: function() {

        var play = function(file) {
            soundManager.stopAll();
            soundManager.destroySound(file);

            // if(sound) {
            //     console.debug(sound);
            //     soundManager.setPosition(file, 0);
            //     soundManager.resume(file);
            //     return;
            // }

            soundManager.createSound({
              id: file,
              url: file,
              autoLoad: true,
              autoPlay: true,
              onload: function() {
                    //alert('The sound '+this.sID+' loaded!');
              },
              onerror: function() {
                console.log(arguments);
              },
              whileplaying: function() {
                var val = (this.position / this.duration) * 100;
                console.log(val);
                $('.progress').css('width', val + '%');
              },
              volume: 50
            });
        };

        $("#counter").flipCounter({
            number: getClickCount(), // the initial number the counter should display, overrides the hidden field
            numIntegralDigits:1, // number of places left of the decimal point to maintain
            numFractionalDigits:0, // number of places right of the decimal point to maintain
            digitClass:"counter-digit", // class of the counter digits
            counterFieldName:"counter-value", // name of the hidden field
            digitHeight:40, // the height of each digit in the flipCounter-medium.png sprite image
            digitWidth:30, // the width of each digit in the flipCounter-medium.png sprite image
            imagePath:"img/flipCounter-medium.png", // the path to the sprite image relative to your html document
            easing: 'easeOutQuad', // the easing function to apply to animations, you can override this with a jQuery.easing method
            duration:10000
        });

        $('#click-target').on('click', function() {
            updateImage();
            var curr = $("#counter").flipCounter("getNumber") + 1,
                num = Math.floor(Math.random() * clickerSounds.length);

            $("#counter").flipCounter("setNumber", curr);
            $('.progress').css('transition', null);
            $('.progress').css('width', 0);
            $('.progress').css('transition', 'width 0.2s');

            play('sound/' + clickerSounds[num]);
            setCookie(COOKIE_KEY, curr, 30);
            refreshTwitter();
        });
    }
});

