var Map,heatmapLayer;
//document.oncontextmenu=new Function("event.returnValue=false"); 
//document.onselectstart=new Function("event.returnValue=false"); 

var datacache;
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
		center: [113.67753828252178,34.75001452744813],
		projection: projection,
		zoom: 8
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
									/* var vector = new ol.layer.Vector({
									  source: new ol.source.Vector({
										parser: new ol.parser.GeoJSON(),
										data: data.content
									  }),
									  style: style
									});
							Map.addLayer(vector); */
							
							/* var popup = new ol.Overlay({
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
						}); */
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
					 jczcDom();
					
					$('#jczcTab a').click(function (e) {
						  e.preventDefault()
						  $(this).tab('show');
						 // $(this).addClass('in active');
						  
						  //在这里请求水电气暖数据
						   var _self = this;
						   var type = $(_self).attr('href');
						  
							$(type+" input[name='optionsRadios']")[1].checked= true
							 $(type+' select option').remove();
							initLDJC(type,$(type+" input[name='optionsRadios']:checked").val());
							
							$(type+" input[name='optionsRadios']").change(function(){
								 $(type+' select option').remove()
								 initLDJC(type,$(this).val()); 
							});
						if(datacache == undefined){
							datacache = {};
						}
						  
					});
					$('#jczcTab a:first').trigger('click'); 
					 				
					break;
					case 'glyphicon-tjnj'  : console.dir(_type);break;
					case 'glyphicon-gzfw' :
						var vhtml = '<ul class="nav nav-pills nav-justified"  id="gzfwTab">'+
									  '<li><a href="#electricity">电</a></li>'+
									  '<li><a href="#water">水</a></li>'+ 
									  '<li><a href="#gas">气</a></li>'+
									  '<li><a href="#warm">暖</a></li>'+
									'</ul>'+
									
									'<div class="tab-content">'+
									  '<div class="tab-pane fade" id="electricity">...</div>'+
									  '<div class="tab-pane fade" id="water">...</div>'+ 
									  '<div class="tab-pane fade" id="gas">...</div>'+
									  '<div class="tab-pane fade" id="warm">...</div>'+
									'</div>'
									;
									 
						$('#Modal .modal-body').html(vhtml);
						
						taptrigger('gzfwTab');
						$('#gzfwTab a:first').trigger('click'); 
						break;
					case 'glyphicon-ggtz' :

						  var  request = $.ajax({
								  url: "curl.php", 
								  type: "GET",
								  data:{url:'http://www.henan.gov.cn/zwgk/zwdt/zfdt/'},
								  dataType: "html"
								});
								 
							request.done(function(data) { 
							var titles = $(data).find('td[width="832"]');
							var times  = $(data).find('td[width="145"]');
							
							
							var vhtml = '<table class="table table-condensed">'
								 
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



function initLDJC(type,id){
	var request = $.ajax({
		  url: "http://192.168.0.25:8001/selfp/TNapi/GetNameByParent/"+id,
		 // data:{type :$(_self).attr('href')},
		 //url:'data/data.js',
		  type: "GET",							  
		  dataType: "json"
		});
	 
	request.done(function(data) {
	 
//http://www.eyecon.ro/bootstrap-slider/
	 datacache[type] = data;
	// 在这里监听单选按钮的变化;

	
	$('#Modal').css('top',$('#map').height() - $('#Modal').height());
		Chart2map(type,data);
		//Chart2map(mapData);
		 
	});
	 
	request.fail(function(jqXHR, textStatus) {
	  alert( "Request failed: " + textStatus );
	});
}
function initSliderChart(type,newlabels,newtimes,newcols,q){
if(newcols.length != 1){
$.each(newlabels, function (index, value) {
    $(type+' select').append($('<option>', { 
        value: value,
        text : value 
    }));
});
}
 
  
 $(type+' .timeSlider').slider({
		min:2001,
		max:newtimes.max(),
		step:1,
		value:newtimes[0],
		tooltip:'show',
		formater:function(v){
			return v + "年";
		}
		}).on('slideStop', function(ev){
				//createbar(panelData,ev.value);
				createbar(type,q,ev.value,newcols,$(type+" select").find("option:selected").text())
		}); 
		createbar(type,q,newtimes[0],newcols,$(type+" select").find("option:selected").text());
	
		$(type+" select").change(function () {
		createbar(type,q,newtimes[0],newcols,$(type+" select").find("option:selected").text());  
	  })
}
function createbar(type,q,time,cols,label){ 
	var panelData = {}; 
	//var st = q[newtimes[0]][$('#people select').text()];
	panelData.labels = [];
	panelData.datasets = [];
	var obj = {};
	obj.fillColor = "rgba(102,204,255,0.5)";
	obj.strokeColor = "rgba(102,204,255,1)";
	obj.data = [];
		
	if(cols.length ==1){
		var st = q[time];
		for(var i in st){
			panelData.labels.push(i);
			obj.data.push(st[i][cols[0]][0]);
		}
		panelData.datasets.push(obj);
	}else{
		var st = q[time][label];
		
		for(var i in st){
			panelData.labels.push(i);
			obj.data.push(st[i][0]);
		}
		panelData.datasets.push(obj);
	}

	 var myLine = new Chart(document.getElementById(type.slice(1)+"bar").getContext("2d")).Bar(panelData);
	 
} 

function getpanelData(data){
	
}
function getMapData(data){
	
}
function Chart2map(type,data){
var doughnutData = [];
	 
		var p ={}, areas = [];
		var q = {}, labels = [],times= [],cols=[];
		for(var i= 0; i<data.length;i++){
			//if(data[i].areaname =="总 计") continue;
			if(data[i].typename1 =="总户数"){
				if(p[data[i].areaname] ==undefined)
				{
					p[data[i].areaname] = [];
				}
					p[data[i].areaname].push(data[i].tatol);
					
					areas.push(data[i].areaname); 
			}
			else{
				if(q[data[i].years]== undefined){
					q[data[i].years] = {};
					
				}
				if(q[data[i].years][data[i].typename1] == undefined){
						q[data[i].years][data[i].typename1] = {}; 
					}
				if(q[data[i].years][data[i].typename1][data[i].areaname] == undefined){
						q[data[i].years][data[i].typename1][data[i].areaname] = [];
					}
				q[data[i].years][data[i].typename1][data[i].areaname].push(parseInt(data[i].tatol));
				
				labels.push(data[i].typename1);
				times.push(data[i].years);
				cols.push(data[i].areaname);
			}
		}
		
		var newlabels = labels.unique();
		var newtimes  = times.unique();
		var newcols   = cols.unique();
		 
		initSliderChart(type,newlabels,newtimes,newcols,q);
		var newareas = areas.unique();
		 colors = ['#104C4C', '#88CCCC', '#228E8E', '#CCFFFF', '#00CCCC', '#3399CC'];
		
	for(var i = 0;i<newareas.length;i++){
		
		var canvas  = document.createElement('canvas'),
		//获取2d canvas上下文（如果不支持canvas，这个对象是不存在的）
		canvasContext    = canvas.getContext("2d");
	   
		// 设置canvas的宽度和高度
		canvas.width = 90;
		canvas.height = 90;
		for(var n = 0; n < p[newareas[i]].length;n++){
			var nutdata = {};
			nutdata.value = parseInt(p[newareas[i]][n]);
			nutdata.color = colors[n];
			doughnutData.push(nutdata);
		}
	 
		//var myDoughnut = new Chart(canvasContext).Doughnut(doughnutData,{animation :false});
		var myDoughnut = new Chart(canvasContext).Doughnut(doughnutData);
	    var overlay = new ol.Overlay({
		  element: canvas
		});	 
		  overlay.setPosition(areapoi[newareas[i]]); 
		  Map.addOverlay(overlay);
			  
		 doughnutData = [];
		  
	}
}

function jczcDom(){
	var vhtml = '<ul class="nav nav-pills nav-justified"  id="jczcTab">'+
					  '<li><a href="#people">人口</a></li>'+
					  '<li><a href="#social">社会</a></li>'+
					  '<li><a href="#industry">工业</a></li>'+
					  '<li><a href="#economic">经济</a></li>'+
					'</ul>'+
					'<div class="tab-content">'+
					  '<div class="tab-pane fade" id="people">'+  
					  '<br/>'+
						 
						  '<div class="form-group">'+
							'<label for="timeSlider" class="col-sm-2 control-label">年份:</label>'+
							'<div class="col-sm-10">'+
							  '<input  type="text" class="timeSlider" />'+
							'</div>'+
						  '</div><br/>'+
						 
						 '<div class="form-group">'+
							'<label class="col-sm-2 control-label">类别:</label>'+
							'<div class="col-sm-10">'+
							  '<select  class="form-control" ></select>'+
							'</div>'+
						  '</div>'+
						
						'<canvas id="peoplebar" height="360" width="420"></canvas><br/><br/>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkjbqk" value="1">'+
							'人口基本情况'+
						  '</label>'+
						'</div>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkzr" value="5" >'+
							'人口自然变动情况'+
						  '</label>'+
						'</div>'+/* 
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="9" >'+
							'社会劳动者总数'+
						  '</label>'+
						'</div>'+ */
					  '</div>'+
					  '<div class="tab-pane fade" id="social">'+
					  '<br/>'+
						
						 '<div class="form-group">'+
							'<label for="timeSlider" class="col-sm-2 control-label">年份:</label>'+
							'<div class="col-sm-10">'+
							  '<input  type="text" class="timeSlider" />'+
							'</div>'+
						  '</div><br/>'+
						 
						 '<div class="form-group">'+
							'<label class="col-sm-2 control-label">类别:</label>'+
							'<div class="col-sm-10">'+
							  '<select  class="form-control" ></select>'+
							'</div>'+
						  '</div>'+
						  
						'<canvas id="socialbar" height="360" width="420"></canvas><br/><br/>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkjbqk" value="11">'+
							'城市设施水平'+
						  '</label>'+
						'</div>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkzr" value="26" >'+
							'市政设施及公共交通'+
						  '</label>'+
						'</div>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="37" >'+
							'卫生事业基本情况'+
						  '</label>'+
						'</div>'+ 
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="10" >'+
							'法人单位从业人数'+
						  '</label>'+
						'</div>'+
					  '</div>'+
					  '<div class="tab-pane fade" id="industry">'+
					  '<br/>'+
						 '<div class="form-group">'+
							'<label for="timeSlider" class="col-sm-2 control-label">年份:</label>'+
							'<div class="col-sm-10">'+
							  '<input  type="text" class="timeSlider" />'+
							'</div>'+
						  '</div><br/>'+
						 
						 '<div class="form-group">'+
							'<label class="col-sm-2 control-label">类别:</label>'+
							'<div class="col-sm-10">'+
							  '<select  class="form-control" ></select>'+
							'</div>'+
						  '</div>'+
						'<canvas id="industrybar" height="360" width="420"></canvas><br/><br/>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkjbqk" value="41">'+
							'社会消费品零售总额'+
						  '</label>'+
						'</div>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkzr" value="42" >'+
							'工业企业单位数'+
						  '</label>'+
						'</div>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="43" >'+
							'工业总产值'+
						  '</label>'+
						'</div>'+ 
					  '</div>'+
					  '<div class="tab-pane fade" id="economic">'+
					  '<br/>'+
						 '<div class="form-group">'+
							'<label for="timeSlider" class="col-sm-2 control-label">年份:</label>'+
							'<div class="col-sm-10">'+
							  '<input  type="text" class="timeSlider" />'+
							'</div>'+
						  '</div><br/>'+
						 
						 '<div class="form-group">'+
							'<label class="col-sm-2 control-label">类别:</label>'+
							'<div class="col-sm-10">'+
							  '<select  class="form-control" ></select>'+
							'</div>'+
						  '</div>'+
						'<canvas id="economicbar" height="360" width="420"></canvas><br/><br/>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkjbqk" value="44">'+
							'生产总值'+
						  '</label>'+
						'</div>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="rkzr" value="50" >'+
							'金融机构人民币信贷收支'+
						  '</label>'+
						'</div>'+
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="53" >'+
							'国有独资商业银行人民币信贷收支'+
						  '</label>'+
						'</div>'+ 
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="54" >'+
							'财政收入'+
						  '</label>'+
						'</div>'+ 
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="55" >'+
							'财政支出'+
						  '</label>'+
						'</div>'+ 
						'<div class="radio">'+
						  '<label>'+
							'<input type="radio" name="optionsRadios" id="shld" value="56" >'+
							'固定资产投资'+
						  '</label>'+
						'</div>'+ 
					  '</div>'+
					'</div>'
					;
	$('#Modal .modal-body').html(vhtml);
}






