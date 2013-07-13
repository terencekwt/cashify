var boardTitle;
function changeBoard(title,boardTitle){
    boardTitle = new collie.Text({
        x : 130,
        y : 180,
        width : 350,
        height : 50,
        fontSize : 35,
        fontColor : "#ffffff",
        fontFamily : "Serif",
        ellipsisMaxLine : 2
    }).text(title).addTo(layer);
}
collie.ImageManager.add({
    "scene": "/assets/market.jpg"
});

var layer = new collie.Layer({
    width : 818,
    height : 519,
});

var map = new collie.DisplayObject({
    backgroundImage : "scene",
    fitImage: true
}).addTo(layer);

$.get('/api/special',function(data){
    $.each(data, function(index,value){
        var oText = new collie.Text({
            x : 40,
            y : index*40+220,
            width : 350,
            height : 50,
            fontSize : 30,
            fontColor : "#ffffff",
            fontFamily : "Serif",
            ellipsisMaxLine : 2
        }).text(value.name + ' --$' + value.price).addTo(layer);
    });
});

var labels = ['Coupons','Events','Donate'];

$.each(labels, function(index,value){
    var oText = new collie.Text({
        x : 390+index*85,
        y : 410,
        width : 80,
        height : 50,
        fontSize : 16,
        fontColor : "#ffffff",
        fontFamily : "Serif",
        ellipsisMaxLine : 2,
    }).text(value).attach({
        click: function(e){
            changeBoard(value);
        }
    }).addTo(layer);
});

changeBoard("~EVENTS~");

collie.Renderer.addLayer(layer);
collie.Renderer.load(document.getElementById("collie_frame"));
collie.Renderer.start();
