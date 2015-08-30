(function(scope, undefined){

  var idCounter = 1

  var Player = function() {

    this.display = function() {
      return {
        stats: {
          g: _stats.g.toString(),
          d: _stats.d.toString(),
          w: _stats.w.toString(),
          c: _stats.c.toString()
        },
        injuries: _injuries,
        lefty: _lefty,
        id: _id
      }
    }

    this.set = function(position, min, max) {
      return _stats[position].set(min, max)
    }

    this.injury = function() {
      _injuries = _injuries + 1
      Object.keys(_stats).forEach(function(key){
        _stats[key].injury(_injuries)
      })
    }

    this.train = function(position, xp) {
      return _stats[position].train(xp)
    }

    this.levelUp = function(position) {
      return _stats[position].levelUp()
    }

    this.roll = function(position, side) {
      switch (position) {
        case "c":
          return _stats.c.roll()
        case "g":
          return _stats.g.roll()
        case "d":
        case "ld":
        case "rd":
          var roll = _stats.d.roll()
          if (side === _lefty) {
            roll = Math.floor(roll * 1.2)
          }
          return roll
        case "w":
        case "lw":
        case "rw":
          var roll = _stats.w.roll()
          if (side === _lefty) {
            roll = Math.floor(roll * 1.2)
          }
          return roll
      }
    }

    var _stats = {
      w: new Statistic(),
      d: new Statistic(),
      c: new Statistic(),
      g: new Statistic()
    }

    var _lefty = !!(Math.random() > .5)
    var _injuries = 0

    var _id = idCounter++

  }

  scope.Player = Player

})(this);

if (typeof module !== "undefined") {
  var Statistic = require("./statistic")
  module.exports = this.Player
};