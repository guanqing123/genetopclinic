
/*Object.prototype.fadeIn = function(time, callback) {
  var el = this;
  el.style.opacity = 0;
  var st = setInterval(function() {
    el.style.opacity = parseFloat(el.style.opacity) + 0.01;
    if (el.style.opacity >= 1) {
      clearInterval(st);
      if (callback !== undefined) {
        callback();
      }
    }
  }, time);
  return this;
}

Object.prototype.fadeOut = function(time, callback) {
  var el = this;
  el.style.opacity = 1;
  var st = setInterval(function() {
    el.style.opacity = parseFloat(el.style.opacity) - 0.01;
    if (el.style.opacity <= 0) {
      clearInterval(st);
      if (callback !== undefined) {
        callback();
      }
    }
  }, time);
  return this;
}*/
