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
goog.require('ol.style.Icon');
goog.require('ol.style.Style');
goog.require('ol.parser.GeoJSON');
goog.require('ol.source.Vector');

Array.prototype.unique = function()
{
    var tmp = {}, out = [];
    for(var i = 0, n = this.length; i < n; ++i)
    {
        if(!tmp[this[i]]) { tmp[this[i]] = true; out.push(this[i]); }
    }
    return out;
}

Array.prototype.max = function(){
    return Math.max.apply( Math, this );
};
Array.prototype.min = function(){
    return Math.min.apply( Math, this );
};