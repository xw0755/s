var Map,heatmapLayer;
//document.oncontextmenu=new Function("event.returnValue=false"); 
//document.onselectstart=new Function("event.returnValue=false"); 
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
 
	
	initmenu();
	
	Map.on('click',function(e){console.dir(e.coordinate_);});
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
					 var request = $.ajax({
					  url: "temp/search.html",
					  //data:{type :$(_self).attr('href')},
					  type: "POST",							  
					  dataType: "html"
					});
					 
					request.done(function(data) {
						
					 
					 $('#Modal .modal-body').html(data);
					 $('#Modal').css('top',$('#map').height() - $('#Modal').height());
					});
				 
				request.fail(function(jqXHR, textStatus) {
				  alert( "Request failed: " + textStatus );
				});
					
					getLocation();
					break;
					case 'glyphicon-tcgl':
					console.dir(_type);
					break;
					case 'glyphicon-zygl' :

					var flickerAPI ="http://222.143.36.23/proxy/FeatureServer.ashx?layer=ylws&page=1&version=2&where=&maxfeatures=100&request=query&callback=?";
					$.getJSON( flickerAPI, { 
						format: "json"
					  })
						.done(function( data ) {
						 
						                    
						 /* <ul class="media-list">
						  <li class="media">
							<a class="pull-left" href="#"><img class="media-object" data-src="holder.js/27x35" alt="64x64" style="width: 27px; height: 34px;" src="countbtn/icon_index_1_0.png">
							</a>
							<div class="media-body">
							  <h4 class="media-heading">中国人寿保险股份有限公司济源支公司</h4>
							  <p>河南省济源市沁园中路431号</p>
							</div>
						  </li>
					     <ul> */
							var style = new ol.style.Style({
									  symbolizers: [
										new ol.style.Icon({
										  url: 'images/icon.png',
										  yOffset: -22
										})
									  ]
									});
									var vector = new ol.layer.Vector({
									  source: new ol.source.Vector({
										parser: new ol.parser.GeoJSON(),
										data: data.content
									  }),
									  style: style
									});
							Map.addLayer(vector);
							
							var popup = new ol.Overlay({
							  element: $("#popup")
							});
							Map.addOverlay(popup);
							Map.on('click',function(e){
		 
							Map.getFeatures({
								pixel: e.getPixel(),
								layers: [vector],
								success: function(layerFeatures) {
								  var feature = layerFeatures[0][0];
								  if (feature) {
									var geometry = feature.getGeometry();
									var coord = geometry.getCoordinates();
									popup.setPosition(coord);
									$("#popup").popover({
									  'placement': 'top',
									  'html': true,
									  'content': feature.get('name')
									});
									$("#popup").popover('show');
								  } else {
									$("#popup").popover('destroy');
								  }
								}
							  });
						});
						}); 
						 


					break;
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
							 $('#Modal #people').html('<br/>'+
										'年份：&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" class="timeSlider" value="" /><br/>'+
										'<canvas id="peoplebar" height="360" width="420"></canvas>');
			 //http://www.eyecon.ro/bootstrap-slider/
							$('.timeSlider').slider({
								min:1995,
								max:2000,
								step:1,
								tooltip:'show',
								formater:function(v){
									return v + "年";
								}
								}).on('slideStop', function(ev){console.dir(ev);console.dir(++i);});
							 
							var barChartData = {
									labels : ["1月","2月","3月","4月","5月","6月","7月"],
									datasets : [
										{
											fillColor : "rgba(220,220,220,0.5)",
											strokeColor : "rgba(220,220,220,1)",
											data : [65,59,90,81,56,55,40]
										} 
									]
									
								};

							var myLine = new Chart(document.getElementById("peoplebar").getContext("2d")).Bar(barChartData);
							$('#Modal').css('top',$('#map').height() - $('#Modal').height());
							/* 
							if(heatmapLayer == undefined){
								heatmapLayer = new Heatmap.Layer("Heatmap");
							} */
							//chart2Map();
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
								
								
							for(var i = 0;i<data.datapar.length;i++){
							 var canvas  = document.createElement('canvas'),
								//获取2d canvas上下文（如果不支持canvas，这个对象是不存在的）
								canvasContext    = canvas.getContext("2d");
							   
								// 设置canvas的宽度和高度
								canvas.width = 90;
								canvas.height = 90;
								
								var myDoughnut = new Chart(canvasContext).Doughnut(doughnutData,{animation :false});
							   var overlay = new ol.Overlay({
								  element: canvas
								});	 
								  overlay.setPosition(data.datapar[i]); 
								  Map.addOverlay(overlay);
									  
								 // heatmapLayer.addSource(new Heatmap.Source(new OpenLayers.LonLat(data.datapar[i])[0], data.datapar[i])[1]);
								  
								  }
 
									//Map.addLayer(heatmapLayer);
									//Map.zoomToExtent(heatmapLayer.getDataExtent());
		
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
						$('#gzfwTab a:first').trigger('click'); 
						break;
					case 'glyphicon-ggtz' :

						request = $.ajax({
								  url: "curl.php", 
								  type: "GET",
								  data:{url:'http://www.henan.gov.cn/zwgk/zwdt/zfdt/'},
								  dataType: "html"
								});
								 
							request.done(function(data) { 
							var titles = $(data).find('td[width="832"]');
							var times  = $(data).find('td[width="145"]');
							
							
							var vhtml = '<table class="table table-condensed">'
									/* +'<thead>'
									  +'<tr>'
										 
										+'<th>标题</th>'
										+'<th>发布时间</th>'
										 
									  +'</tr>'
									+'</thead>' */
									+'<tbody>';
									 
									 
								
							for(var i = 0; i<9;i++){
								 vhtml +='<tr>'
										 
										+'<td>'+titles[i].innerHTML+'</td>'
										+'<td>'+times[i].innerHTML+'</td>'
										 
									  +'</tr>';
							 }
							 	vhtml +='</tbody>';
								  vhtml +='</table>';
							 $('#Modal .modal-body').html(vhtml);
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
			
			$("#position").css("display","block");
			 
			   var overlay = new ol.Overlay({
					  element: $("#position")
					});	
					
		    overlay.setPosition([position.coords.longitude,position.coords.latitude]); 
		    Map.addOverlay(overlay);
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
		   var _type = $(_self).attr('href');
		   switch (_type){
				case '#water':
			  
				break;
				case '#electricity':
					var request = $.ajax({
					  url: "curlPost.php",
					  //data:{type :$(_self).attr('href')},
					  type: "POST",							  
					  dataType: "html"
					});
					 
					request.done(function(data) {
						var t = $(data).find('table')[2];
					  $(t).find('tr td').filter(':first-child').remove();
					  $(t).find('tr td').filter(':last-child').remove();
					  $(t).addClass("table");
					 $('#Modal #electricity').html(t); 
					  $('#Modal').css('top',65);//$('#map').height() - $('#Modal').height());
					  $("#Modal").width(800);
					  $("#Modal").css("margin-left",-100);
					});
					 
					request.fail(function(jqXHR, textStatus) {
					  alert( "请求失败: " + textStatus );
					});
				break;
			}
			 
	});
	
}










