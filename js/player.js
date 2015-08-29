(function(scope, undefined){

  var Player = function() {

    var _lefty = !!(Math.random() > .5)
    var _injuries = 0

  }

  scope.Player = Player

})(this);

if (typeof module !== "undefined") {
  module.exports = this.Player
};