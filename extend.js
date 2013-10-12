
/**
* 对自定义规则切割的图片进行拼装的类
*/
OpenLayers.Layer.LTTrafficLayer2 = OpenLayers.Class(OpenLayers.Layer.TileCache, {
/*获取图片的地址的定时器*/
timer : null,
mapMaxExtent: null,
initialize: function (name, url, options) {
var tempoptions = OpenLayers.Util.extend({
'format': 'image/png',
isBaseLayer: true
}, options);
OpenLayers.Layer.TileCache.prototype.initialize.apply(this, [name, url, {},
tempoptions]);
this.numZoomLevels = 6;
this.maxResolution = 152.87405654296875;
this.realtimeurl = url;
this.transitionEffect = null;
},
destroy : function() {
OpenLayers.Layer.TileCache.prototype.destroy.apply(this,arguments);
this.destroyTimer();
},

refresh: function () {
if (this.visibility) {
this.clearGrid();
this.redraw();

}
},
createTimer : function() {
function time() {//获取图片路径与时间戳
OpenLayers.loadURL('http://eye.bjjtw.gov.cn/Web-T_bjjt_new/query.do', {
serviceType : 'traffic',
acode : '110000',
cls : 1,
type : 0,
timestamp : Math.random()
}, this, this.success, this.failure);
}
var _time = OpenLayers.Function.bind(time, this);
_time();
this.timer = window.setInterval(_time, 60 * 1000);

},

destroyTimer : function(){
if (this.timer) {
window.clearInterval(this.timer);
this.timer = null;
}
},

success : function(resp){
var txt = resp.responseText;
if (txt === '') {
return;
}

resp = eval('(' + txt + ')');
if (resp) {
var time = resp.sTime+"";
var times=time.substring(8,10) + ":" + time.substring(10,12);
if(this.visibility){
$('traffictime').innerHTML = times;
if($('traffictime').timestmp&&$('traffictime').timestmp!=times){
$('traffictime').timestmp = times;
this.refresh();

}
if(!$('traffictime').timestmp){
$('traffictime').timestmp = times;
this.refresh();
}
}
}
},
failure : function(resp) {

},

/**
* 按地图引擎切图规则实现的拼接方式
*/
getURL: function (bounds) {
var res = this.map.getResolution();
var bbox = this.map.getMaxExtent();
var size = this.tileSize;
//计算列号 
var tileX = Math.round((bounds.left - bbox.left) / (res * size.w));
//计算行号
var tileY = Math.round((bbox.top - bounds.top) / (res * size.h));
//当前的等级 
var tileZ = this.map.zoom;
if (tileX < 0) tileX = tileX + Math.round(bbox.getWidth() / bounds.getWidth());
if (tileY < 0) tileY = tileY + Math.round(bbox.getHeight() / bounds.getHeight());
return this.getTilePic(tileX, tileY, tileZ);
},

clone: function (obj) {

if (obj == null) {
obj = new OpenLayers.Layer.LTTrafficLayer2(this.name, this.url, this.options);
}
obj = OpenLayers.Layer.LTTrafficLayer2.prototype.clone.apply(this, [obj]);
return obj;
},
//请求加随机数，解决ie6下图片缓存不更新问题
getTilePic: function (tileX, tileY, tileZ) {
var dir = '';
if (tileZ > 6) {
var delta = Math.pow(2, tileZ - 5);
var rowDir = 'R' + Math.floor(tileY / delta);
var colDir = 'C' + Math.floor(tileX / delta);
dir = tileZ + "/" + rowDir + "/" + colDir + "/";
} else {
dir = tileZ + '/';
}

var tileNo = tileZ + "-" + tileX + "-" + tileY;
var sUrl = this.url + dir + tileNo + '.png?r=';
var d = Math.random();
sUrl += d;
//alert(sUrl);
return sUrl;
},
CLASS_NAME: "OpenLayers.Layer.LTTrafficLayer2"
});