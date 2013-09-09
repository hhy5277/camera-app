/**
 * Namespace for the Camera app.
 */
var camera = camera || {};

/**
 * Namespace for effects.
 */
camera.effects = camera.effects || {};

/**
 * @private {camera.effects.Andy} tracker
 * @constructor
 * @extend {camera.Effect}
 */
camera.effects.Pinch = function(tracker) {
  camera.Effect.call(this, tracker);
  this.amount_ = 0.5;
};

camera.effects.Pinch.prototype = {
  __proto__: camera.Effect.prototype
};

/**
 * @override
 */
camera.effects.Pinch.prototype.randomize = function() {
  this.amount_ = Math.random() * 0.6 + 0.2;
};

/**
 * @override
 */
camera.effects.Pinch.prototype.filterFrame = function(canvas) {
  var face = this.tracker_.getFace();
  x = canvas.width * (face.x + (face.width / 2));
  y = canvas.height * face.y;
  radius = Math.sqrt(face.width * face.width +
                     face.height * face.height) * canvas.width;
  canvas.bulgePinch(x,
                    y,
                    radius * this.amount_, 0.5 * face.confidence);
};

/**
 * @override
 */
camera.effects.Pinch.prototype.getTitle = function() {
  return chrome.i18n.getMessage('pinchEffect');
};

