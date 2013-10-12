goog.provide('ol.test.style.Icon');

describe('ol.style.IconLiteral', function() {

  describe('#equals()', function() {

    it('identifies equal literals', function() {
      var literal = new ol.style.IconLiteral({
        height: 10,
        width: 20,
        opacity: 1,
        rotation: 0.1,
        url: 'http://example.com/1.png'
      });
      var equalLiteral = new ol.style.IconLiteral({
        height: 10,
        width: 20,
        opacity: 1,
        rotation: 0.1,
        url: 'http://example.com/1.png'
      });
      var differentLiteral1 = new ol.style.IconLiteral({
        height: 11,
        width: 20,
        opacity: 1,
        rotation: 0.1,
        url: 'http://example.com/1.png'
      });
      var differentLiteral2 = new ol.style.IconLiteral({
        height: 10,
        width: 2,
        opacity: 1,
        rotation: 0.1,
        url: 'http://example.com/1.png'
      });
      var differentLiteral3 = new ol.style.IconLiteral({
        height: 10,
        width: 20,
        opacity: 0.5,
        rotation: 0.1,
        url: 'http://example.com/1.png'
      });
      var differentLiteral4 = new ol.style.IconLiteral({
        height: 10,
        width: 20,
        opacity: 1,
        rotation: 0.2,
        url: 'http://example.com/1.png'
      });
      var differentLiteral5 = new ol.style.IconLiteral({
        height: 10,
        width: 20,
        opacity: 1,
        rotation: 0.1,
        url: 'http://example.com/2.png'
      });
      expect(literal.equals(equalLiteral)).to.be(true);
      expect(literal.equals(differentLiteral1)).to.be(false);
      expect(literal.equals(differentLiteral2)).to.be(false);
      expect(literal.equals(differentLiteral3)).to.be(false);
      expect(literal.equals(differentLiteral4)).to.be(false);
      expect(literal.equals(differentLiteral5)).to.be(false);
    });

  });

});

describe('ol.style.Icon', function() {

  describe('constructor', function() {

    it('accepts literal values', function() {
      var symbolizer = new ol.style.Icon({
        height: 10,
        width: 20,
        opacity: 1,
        rotation: 0.1,
        url: 'http://example.com/1.png'
      });
      expect(symbolizer).to.be.a(ol.style.Icon);
    });

    it('accepts expressions', function() {
      var symbolizer = new ol.style.Icon({
        height: ol.expr.parse('10'),
        width: ol.expr.parse('20'),
        opacity: ol.expr.parse('1'),
        rotation: ol.expr.parse('0.1'),
        url: ol.expr.parse('"http://example.com/1.png"')
      });
      expect(symbolizer).to.be.a(ol.style.Icon);
    });

  });

  describe('#createLiteral()', function() {

    it('evaluates expressions with the given feature', function() {
      var symbolizer = new ol.style.Icon({
        height: ol.expr.parse('heightAttr'),
        width: ol.expr.parse('widthAttr'),
        opacity: ol.expr.parse('opacityAttr'),
        rotation: ol.expr.parse('rotationAttr'),
        url: ol.expr.parse('urlAttr')
      });

      var feature = new ol.Feature({
        heightAttr: 42,
        widthAttr: 0.42,
        opacityAttr: 0.5,
        rotationAttr: 123,
        urlAttr: 'http://example.com/1.png'
      });

      var literal = symbolizer.createLiteral(feature);
      expect(literal).to.be.a(ol.style.IconLiteral);
      expect(literal.height).to.be(42);
      expect(literal.width).to.be(.42);
      expect(literal.opacity).to.be(0.5);
      expect(literal.rotation).to.be(123);
      expect(literal.url).to.be('http://example.com/1.png');
    });

    it('can be called without a feature', function() {
      var symbolizer = new ol.style.Icon({
        height: ol.expr.parse('10'),
        width: ol.expr.parse('20'),
        opacity: ol.expr.parse('1'),
        rotation: ol.expr.parse('0.1'),
        url: ol.expr.parse('"http://example.com/1.png"')
      });

      var literal = symbolizer.createLiteral();
      expect(literal).to.be.a(ol.style.IconLiteral);
      expect(literal.height).to.be(10);
      expect(literal.width).to.be(20);
      expect(literal.opacity).to.be(1);
      expect(literal.rotation).to.be(0.1);
      expect(literal.url).to.be('http://example.com/1.png');
    });

    it('applies default type if none provided', function() {
      var symbolizer = new ol.style.Icon({
        height: ol.expr.parse('10'),
        width: ol.expr.parse('20'),
        url: ol.expr.parse('"http://example.com/1.png"')
      });

      var literal = symbolizer.createLiteral();
      expect(literal).to.be.a(ol.style.IconLiteral);
      expect(literal.opacity).to.be(1);
      expect(literal.rotation).to.be(0);
    });

  });

  describe('#getHeight()', function() {

    it('returns the icon height', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        height: 20
      });

      var height = symbolizer.getHeight();
      expect(height).to.be.a(ol.expr.Literal);
      expect(height.getValue()).to.be(20);
    });

  });

  describe('#getOpacity()', function() {

    it('returns the icon opacity', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        opacity: 0.123
      });

      var opacity = symbolizer.getOpacity();
      expect(opacity).to.be.a(ol.expr.Literal);
      expect(opacity.getValue()).to.be(0.123);
    });

  });

  describe('#getRotation()', function() {

    it('returns the icon rotation', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        rotation: 0.123
      });

      var rotation = symbolizer.getRotation();
      expect(rotation).to.be.a(ol.expr.Literal);
      expect(rotation.getValue()).to.be(0.123);
    });

  });

  describe('#getUrl()', function() {

    it('returns the url', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png'
      });

      var url = symbolizer.getUrl();
      expect(url).to.be.a(ol.expr.Literal);
      expect(url.getValue()).to.be('http://example.com/1.png');
    });

  });


  describe('#getWidth()', function() {

    it('returns the icon width', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10
      });

      var width = symbolizer.getWidth();
      expect(width).to.be.a(ol.expr.Literal);
      expect(width.getValue()).to.be(10);
    });

  });


  describe('#setHeight()', function() {

    it('sets the icon height', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        height: 20
      });
      symbolizer.setHeight(new ol.expr.Literal(30));

      var height = symbolizer.getHeight();
      expect(height).to.be.a(ol.expr.Literal);
      expect(height.getValue()).to.be(30);
    });

    it('throws when not provided an expression', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        height: 20
      });

      expect(function() {
        symbolizer.setHeight(30);
      }).throwException(function(err) {
        expect(err).to.be.a(goog.asserts.AssertionError);
      });
    });

  });

  describe('#setOpacity()', function() {

    it('sets the icon opacity', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        height: 20,
        opacity: 0.123
      });
      symbolizer.setOpacity(new ol.expr.Literal(0.321));

      var opacity = symbolizer.getOpacity();
      expect(opacity).to.be.a(ol.expr.Literal);
      expect(opacity.getValue()).to.be(0.321);
    });

    it('throws when not provided an expression', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        height: 20,
        opacity: 0.123
      });

      expect(function() {
        symbolizer.setOpacity(0.5);
      }).throwException(function(err) {
        expect(err).to.be.a(goog.asserts.AssertionError);
      });
    });

  });

  describe('#setRotation()', function() {

    it('sets the icon rotation', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        height: 20,
        rotation: 0.123
      });
      symbolizer.setRotation(new ol.expr.Literal(0.321));

      var rotation = symbolizer.getRotation();
      expect(rotation).to.be.a(ol.expr.Literal);
      expect(rotation.getValue()).to.be(0.321);
    });

    it('throws when not provided an expression', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10,
        height: 20,
        rotation: 0.123
      });

      expect(function() {
        symbolizer.setRotation(0.5);
      }).throwException(function(err) {
        expect(err).to.be.a(goog.asserts.AssertionError);
      });
    });

  });

  describe('#setUrl()', function() {

    it('sets the url', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png'
      });

      symbolizer.setUrl(new ol.expr.Literal('http://example.com/2.png'));

      var url = symbolizer.getUrl();
      expect(url).to.be.a(ol.expr.Literal);
      expect(url.getValue()).to.be('http://example.com/2.png');
    });

    it('throws when not provided an expression', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png'
      });

      expect(function() {
        symbolizer.setUrl('http://example.com/2.png');
      }).throwException(function(err) {
        expect(err).to.be.a(goog.asserts.AssertionError);
      });
    });

  });

  describe('#setWidth()', function() {

    it('sets the icon width', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10
      });

      symbolizer.setWidth(new ol.expr.Literal(20));

      var width = symbolizer.getWidth();
      expect(width).to.be.a(ol.expr.Literal);
      expect(width.getValue()).to.be(20);
    });

    it('throws when not provided an expression', function() {
      var symbolizer = new ol.style.Icon({
        url: 'http://example.com/1.png',
        width: 10
      });

      expect(function() {
        symbolizer.setWidth(40);
      }).throwException(function(err) {
        expect(err).to.be.a(goog.asserts.AssertionError);
      });
    });

  });

});


goog.require('goog.asserts.AssertionError');

goog.require('ol.Feature');
goog.require('ol.expr');
goog.require('ol.expr.Literal');
goog.require('ol.style.Icon');
goog.require('ol.style.IconLiteral');
