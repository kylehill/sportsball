(function(scope, undefined){

  var Team = function() {

    this.setPlayer = function(index, position, min, max) {
      _players[index].set(position, min, max)
    }

    this.trainPlayer = function(index, position, xp) {
      return _players[index].train(position, xp)
    }

    this.trainAll = function(position, xp) {
      _players.forEach(function(p){
        p.train(position, xp)
      })
    }

    this.levelUp = function(index, position) {
      return _players[index].levelUp(position)
    }

    this.display = function() {
      return {
        players: _players.map(function(p){
          return p.display()
        }),
        positions: {
          g: _players[_positions.g].display(),
          ld: _players[_positions.ld].display(),
          lw: _players[_positions.lw].display(),
          rd: _players[_positions.rd].display(),
          rw: _players[_positions.rw].display(),
          c: _players[_positions.c].display(),
        }
      }
    }

    this.roll = function(position) {
      switch (position) {
        case "g":
          return _players[_positions.g].roll("g")
        case "c":
          return _players[_positions.c].roll("c")
        case "lw":
          return _players[_positions.lw].roll("w", true)
        case "rw":
          return _players[_positions.rw].roll("w", false)
        case "ld":
          return _players[_positions.ld].roll("d", true)
        case "rd":
          return _players[_positions.rd].roll("d", false)
      }
      
    }

    this.injury = function(position) {
      _players[_positions[position]].injury()
    }

    this.release = function(index) {
      _players[index] = new Player()
    }

    this.change = function(position, index) {
      var currentIndex = _positions[position]
      _positions[position] = index

      Object.keys(_positions).forEach(function(p){
        if (p === position) { 
          return 
        }
        if (_positions[p] === index) {
          _positions[p] = currentIndex
        }
      })
    }

    var _players = []
    for (var i = 0; i < 12; i++) {
      _players.push(new Player())
    }

    var _positions = {
      g: 0,
      ld: 1,
      rd: 2,
      lw: 3,
      rw: 4,
      c: 5
    }

  }

  scope.Team = Team

})(this);

if (typeof module !== "undefined") {
  var Player = require("./player")
  module.exports = this.Team
};