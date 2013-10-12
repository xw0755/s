var Map,heatmapLayer;
$(document).ready(function () { 

	$('#map').css('height',$('body').height()- $('.navbar').height());
	  
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
	view = new ol.View2D({
		center: [113.632276, 34.6959575],
		projection: projection,
		zoom: 10
	  });
 
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
 
	
	initmenu();
	
	Map.on('click',function(e){
		console.dir(e.coordinate_);
	});
});

function initmenu(){
	 $('.imgblock').bind('click',function(e){
		     
			var _self = this;
			$('#Modal').modal({
			  backdrop: false
			});
			$('#Modal .modal-title').html(this.parentNode.lastChild.cloneNode());
			$('#Modal .modal-body').html("");
			var  _type = _self.classList[2];
			 
				switch (_type){
					case 'glyphicon-ssdw': 
					console.dir(_type);
					
					getLocation();
					break;
					case 'glyphicon-tcgl':
					console.dir(_type);
					break;
					case 'glyphicon-zygl' :console.dir(_type);  break;
					case 'glyphicon-jcaj'  :console.dir(_type); break;
					case 'glyphicon-zngj'  : 
						var request = $.ajax({
								  url: "curl.php", 
								  type: "GET",
								  data:{url:'http://218.28.136.21:8081/index.asp'},
								  dataType: "html"
								});
								 
							request.done(function(data) { 
							 $('#Modal .modal-body').html($(data).find('p.tt').next());
							 
							 $('#Modal .modal-body').find('a').attr('href',function(){
								var _self = this;
							 if(_self.href.indexOf('http')>-1){
								return _self.href.replace(location.origin + location.pathname.replace(new RegExp(/\/[^\/]+$/),''),  'http://218.28.136.21:8081/');}
								else{
									return _self.href = 'http://218.28.136.21:8081/'+_self.href;
								}
								 
							 }); 
							 $('#Modal .modal-body').find('a').attr('target','_Blank');
							});
							 
							request.fail(function(jqXHR, textStatus) {
							  alert( "Request failed: " + textStatus );
							});
						break;
					case 'glyphicon-jczc'  : 
					 
					var vhtml = '<ul class="nav nav-pills nav-justified"  id="jczcTab">'+
									  '<li><a href="#people">人口</a></li>'+
									  '<li><a href="#social">社会</a></li>'+
									  '<li><a href="#industry">工业</a></li>'+
									  '<li><a href="#economic">经济</a></li>'+
									'</ul>'+
									'<div class="tab-content">'+
									  '<div class="tab-pane fade" id="people"></div>'+
									  '<div class="tab-pane fade" id="social">...</div>'+
									  '<div class="tab-pane fade" id="industry">...</div>'+
									  '<div class="tab-pane fade" id="economic">...</div>'+
									'</div>'
									;
					$('#Modal .modal-body').html(vhtml);
					$('#jczcTab a').click(function (e) {
						  e.preventDefault()
						  $(this).tab('show');
						 // $(this).addClass('in active');
						  
						  //在这里请求水电气暖数据
						   var _self = this;
						  var request = $.ajax({
							  url: "data/geo.js",
							  data:{type :$(_self).attr('href')},
							  type: "POST",							  
							  dataType: "json"
							});
							 
							request.done(function(data) {
							 $('#Modal #people').html('<hr/>'+
										'<center><h3>人口基本情况</h3><center>'+
										'<canvas id="peoplebar" height="360" width="420"></canvas>');
			 
							
							var barChartData = {
									labels : ["1月","2月","3月","4月","5月","6月","7月"],
									datasets : [
										{
											fillColor : "rgba(220,220,220,0.5)",
											strokeColor : "rgba(220,220,220,1)",
											data : [65,59,90,81,56,55,40]
										},
										{
											fillColor : "rgba(151,187,205,0.5)",
											strokeColor : "rgba(151,187,205,1)",
											data : [28,48,40,19,96,27,100]
										}
									]
									
								};

							var myLine = new Chart(document.getElementById("peoplebar").getContext("2d")).Bar(barChartData);
							$('#Modal').css('top',$('#map').height() - $('#Modal').height());
							if(heatmapLayer == undefined){
								heatmapLayer = new Heatmap.Layer("Heatmap");
							}
							//chart2Map();
							for(var i = 0;i<data.datapar.length;i++){
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
								var myDoughnut = new Chart(canvasContext).Doughnut(doughnutData,{animation :false});
							   var overlay = new ol.Overlay({
								  element: canvas
								});	 
								  overlay.setPosition(data.datapar[i]); 
								 // Map.addOverlay(overlay);
									  
								  heatmapLayer.addSource(new Heatmap.Source(new OpenLayers.LonLat(data.datapar[i])[0], data.datapar[i])[1]);
								  
								  }
 
									Map.addLayer(heatmapLayer);
									Map.zoomToExtent(heatmapLayer.getDataExtent());
		
							});
							 
							request.fail(function(jqXHR, textStatus) {
							  alert( "Request failed: " + textStatus );
							});
					});
					$('#jczcTab a:first').trigger('click'); 
					 				
					break;
					case 'glyphicon-tjnj'  : console.dir(_type);break;
					case 'glyphicon-gzfw' :
						var vhtml = '<ul class="nav nav-pills nav-justified"  id="gzfwTab">'+
									  '<li><a href="#water">水</a></li>'+
									  '<li><a href="#electricity">电</a></li>'+
									  '<li><a href="#gas">气</a></li>'+
									  '<li><a href="#warm">暖</a></li>'+
									'</ul>'+
									
									'<div class="tab-content">'+
									  '<div class="tab-pane fade" id="water">...</div>'+
									  '<div class="tab-pane fade" id="electricity">...</div>'+
									  '<div class="tab-pane fade" id="gas">...</div>'+
									  '<div class="tab-pane fade" id="warm">...</div>'+
									'</div>'
									;
									 
						$('#Modal .modal-body').html(vhtml);
						
						taptrigger('gzfwTab');
						break;
					case 'glyphicon-ggtz' :console.dir(_type); break;
				}
			  
		   });
}
var browserSupport = false;
function getLocation(){
	/* 检查浏览器是否支持w3c geolocation api */
	 
	if(navigator.geolocation){
		browserSupport = true;
		
		navigator.geolocation.getCurrentPosition(function(position){
			 //定位
			// console.dir(position);
			 Map.getView().setCenter([position.coords.longitude,position.coords.latitude]);
			  
			 
		},reportProblem,{timeout:45000});
	}
	 
}

function reportProblem(e){
	//定位错误
	
	if(browserSupport){
		switch(e.code){
			case e.PERMISSION_DENIED:
				alert('未开启定位');
				break;
			case e.POSITION_UNAVAILABLE:
				alert('无法定位');
				break;
			case e.TIMEOUT:
				alert('定位超时');
			break;
		}
	}else{
		alert('你的浏览器不支持定位');
	}
	
}


function taptrigger(id){
	$('#'+id+' a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show');
		 // $(this).addClass('in active');
		  
		  //在这里请求水电气暖数据
		   var _self = this;
		  var request = $.ajax({
			  url: "temp/search.html",
			  data:{type :$(_self).attr('href')},
			  type: "POST",							  
			  dataType: "html"
			});
			 
			request.done(function(data) {
			
			  $('#Modal #water').html(data);
			 
			 $('#Modal').css('top',$('#map').height() - $('#Modal').height());
			});
			 
			request.fail(function(jqXHR, textStatus) {
			  alert( "Request failed: " + textStatus );
			});
	});
	$('#'+id+' a:first').trigger('click'); 
}










