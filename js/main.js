var Map,heatmapLayer;
//document.oncontextmenu=new Function("event.returnValue=false"); 
//document.onselectstart=new Function("event.returnValue=false"); 
$(document).ready(function () { 
	$('#map').css('height',$('body').height()- $('.navbar').height());
	
	var projection = ol.proj.get('EPSG:4326');
	var projectionExtent = projection.getExtent();

	var view = new ol.View2D({
		center: [113.632276, 34.6959575], 
		zoom: 10
	  });
	var size =0.00071431785457163428;
	var resolutions = new Array(8);
	var matrixIds = new Array(8);
	for (var z = 0; z < 8; ++z) {
	  // generate resolutions and matrixIds arrays for this WMTS
	  resolutions[z] = size / Math.pow(2, z);
	  //matrixIds[z] = 'EPSG:4326:' + z;
	  matrixIds[z] =  z;
	}
	Map = new ol.Map({
	  layers: [
		new ol.layer.Tile({
		  source: new ol.source.WMTS({
			url: 'http://192.168.0.22:9000/36/wmts',//'http://v2.suite.opengeo.org/geoserver/gwc/service/wmts/',
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
});