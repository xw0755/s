goog.require('ol.Map');
goog.require('ol.RendererHint');
goog.require('ol.View2D');
goog.require('ol.extent');
goog.require('ol.layer.TileLayer');
goog.require('ol.proj');
goog.require('ol.source.OSM');
goog.require('ol.source.WMTS');
goog.require('ol.tilegrid.WMTS');
goog.require('ol.Overlay');
var Map ;
$(document).ready(function () { 

	$('#map').css('height',$('body').height());
	  
	 /* */
	var projection = new ol.Projection({
	  code: 'EPSG:4326',
	  extent:[113.078889,114.185663,34.412735,34.979180]
	});
	 //[113.63490918846705, 34.71444286771205],[113.59287791837377, 34.754920541469026],[113.8253214483803, 34.701044189411384]
	var projectionExtent = [113.078889,114.185663,34.412735,34.979180];//projection.getExtent();
	var size =0.00071431785457163428;
	var resolutions = new Array(8);
	var matrixIds = new Array(8);
	for (var z = 0; z < 8; ++z) {
	  // generate resolutions and matrixIds arrays for this WMTS
	  resolutions[z] = size / Math.pow(2, z);
	  //matrixIds[z] = 'EPSG:4326:' + z;
	  matrixIds[z] =  z;
	}
	var view = new ol.View2D({
		center: [113.632276, 34.6959575],
		projection: projection,
		zoom: 6
	  });
	  
	  
	
	//$('#canvas').css('display','none');
	
	Map = new ol.Map({
	  layers: [
		new ol.layer.TileLayer({
		  source: new ol.source.WMTS({
			url: 'http://192.168.0.22:9000/44/wmts',//'http://v2.suite.opengeo.org/geoserver/gwc/service/wmts/',
			layer: 'medford:buildings',
			matrixSet: 'EPSG:4326',
			format: 'image/png',
			projection: projection,
			tileGrid: new ol.tilegrid.WMTS({
			  origin: [113.078889,34.979180],//ol.extent.getTopLeft(projectionExtent),  //[113.30070896781166, 34.978634993535962]5
			  resolutions: resolutions,
			  tileSize:[512,512],
			  matrixIds: matrixIds
			}),
			style: '_null',
			extent: [113.078889,114.185663,34.412735,34.979180]//[-13682835, -13667473, 5204068, 5221690]
		  })
		})
	  ],
	  renderer: ol.RendererHint.CANVAS,
	 
	  target: 'map',
	  view: view
	});
	 
Map.on('click', function(evt) {
		
  var coordinate = Map.getCoordinateFromPixel([evt.getPixel()[0] -45,evt.getPixel()[1] +47]);  //evt.getCoordinate();

		
   var canvas  = document.createElement('canvas'),
            //获取2d canvas上下文（如果不支持canvas，这个对象是不存在的）
        canvasContext    = canvas.getContext("2d");
       
        // 设置canvas的宽度和高度
        canvas.width = 90;
        canvas.height = 90;
		
		var doughnutData = [
				{
					value: 30,
					color:"#F7464A"
				},
				{
					value : 50,
					color : "#46BFBD"
				},
				{
					value : 100,
					color : "#FDB45C"
				},
				{
					value : 40,
					color : "#949FB1"
				},
				{
					value : 120,
					color : "#4D5360"
				}
			
			];

	var myDoughnut = new Chart(canvasContext).Doughnut(doughnutData);
	   var overlay = new ol.Overlay({
		  element: canvas
		});	
  overlay.setPosition(coordinate);
 

  
  Map.addOverlay(overlay);
 });


});
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
closer.onclick = function() {
  container.style.display = 'none';
  closer.blur();
  return false;
};
