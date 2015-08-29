(function(scope, undefined){

  var rand = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  }

  var Statistic = function() {

    this.train = function(xp) {
      _xp = _xp + (xp || 0)

      while (_xp >= _max) {
        _xp = _xp - _max
        _max = _max + 1
      }

      if (_max - _min >= 20) {
        _max = _min + 20
        _xp = 0
        return false
      }
      return true
    }

    this.levelUp = function() {
      if (_max - _min >= 5) {
        _max = _max - 4
        _min = _min + 1

        this.train()
        return true
      }
      return false
    }

    this.set = function(min, max) {
      _min = min
      _max = max
      _xp = 0
    }

    this.get = function() {
      return {
        min: _min,
        max: _max,
        xp: _xp
      }
    }

    this.injury = function(amount) {
      amount = amount || 0

      _min = _min - amount
      _max = _max - amount
      _xp = Math.max(_xp - amount, 0)
    }

    this.roll = function() {
      return rand(_min, _max)
    }

    this.toString = function() {
      return _min + "-" + _max
    }

    var _min = 1
    var _max = rand(5, 21)
    var _xp = 0

    while (this.levelUp()){}

    _max = _max + rand(1, 9)

  }

  scope.Statistic = Statistic

})(this);

if (typeof module !== "undefined") {
  module.exports = this.Statistic
};