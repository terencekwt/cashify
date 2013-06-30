audio = document.getElementById("audio");
audio.play();
collie.ImageManager.add({
    "logo": "http://rlv.zcache.com/i_love_hong_kong_bumper_stickers-r6a0661bffe77420083cc91a2005d59ec_v9wht_8byvr_512.jpg",
    "map": "/assets/map.png"
});

var layer = new collie.Layer({
    width : 818,
    height : 519,
});

var map = new collie.DisplayObject({
    width : 818,
    height : 519,
    x : 'center',
    y : 'center',
    backgroundImage : "map"
}).addTo(layer);

var map2 = new collie.DisplayObject({
    width : 818,
    height : 519,
    x : 'center',
    y : 'center',
    backgroundImage : "logo"
});

collie.ImageManager.add({
        rabbit: "http://jindo.dev.naver.com/collie/img/small/yame_walk.png"
});
var rabbit = new collie.DisplayObject({
    x: 60,
    y: 319,
    width: 129.4,
    height: 165,
    backgroundImage: "rabbit"
}).addTo(layer);

var gate = new collie.DisplayObject({
    width : 100,
    height : 50,
    x : 200,
    y : 300
    }).addTo(layer).attach({
        click : function(e){
            collie.Timer.cycle(rabbit, "10fps", {
                from: 0,
                to: 8,
                loop: 0
            });
            collie.Timer.queue().
                transition(rabbit, 1000, {
                    to: 170,
                    set: "x"
                }).
                transition(rabbit, 1000, {
                    to: 210,
                    set: "y"
                    }).
                delay(function(){
                    collie.Timer.stop(rabbit);
                }, 50);
                //delay(function(){ map2.addTo(layer) }, 50);
        }
    });

collie.Renderer.addLayer(layer);

collie.Renderer.load(document.getElementById("collie_frame"));

collie.Renderer.start();
