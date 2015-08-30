(function(scope, undefined){

  var series = function(homeTeam, awayTeam, homePosition, awayPosition) {
    var count = 0
    
    for (var i = 0; i < 3; i++) {
      var h = homeTeam.roll(homePosition)
      var a = awayTeam.roll(awayPosition)

      if (h > a) { count++ }
      if (a > h) { count-- }
    }

    return count
  }

  var shuffle = function(array) {
    var out = []
    while (array.length) {
      var index = Math.floor(Math.random() * array.length)
      var removed = array.splice(index, 1)
      out.push(removed[0])
    }
    return out
  }

  var Game = {

    random: function() {
      return this.play(new Team(), new Team())
    },

    play: function(homeTeam, awayTeam) {

      var seriesResults = {
        c: series(homeTeam, awayTeam, "c", "c"),
        hl: series(homeTeam, awayTeam, "lw", "ld"),
        al: series(homeTeam, awayTeam, "ld", "lw"),
        hr: series(homeTeam, awayTeam, "rw", "rd"),
        ar: series(homeTeam, awayTeam, "rd", "rw"),
        g: series(homeTeam, awayTeam, "g", "g")
      }

      var homeGoals = [], awayGoals = []

      if (seriesResults.al > 0) {
        var score = Math.ceil(seriesResults.al / 2)
        for (var i = 0; i < score; i++) {
          homeGoals.push("ld")
        }
      }
      else {
        var score  = Math.floor(seriesResults.al / 2) * -1
        for (var i = 0; i < score; i++) {
          awayGoals.push("lw")
        }
      }

      if (seriesResults.hl > 0) {
        var score = Math.ceil(seriesResults.hl / 2)
        for (var i = 0; i < score; i++) {
          homeGoals.push("lw")
        }
      }
      else {
        var score  = Math.floor(seriesResults.hl / 2) * -1
        for (var i = 0; i < score; i++) {
          awayGoals.push("ld")
        }
      }

      if (seriesResults.ar > 0) {
        var score = Math.ceil(seriesResults.ar / 2)
        for (var i = 0; i < score; i++) {
          homeGoals.push("rd")
        }
      }
      else {
        var score  = Math.floor(seriesResults.ar / 2) * -1
        for (var i = 0; i < score; i++) {
          awayGoals.push("rw")
        }
      }

      if (seriesResults.hr > 0) {
        var score = Math.ceil(seriesResults.hr / 2)
        for (var i = 0; i < score; i++) {
          homeGoals.push("rw")
        }
      }
      else {
        var score  = Math.floor(seriesResults.hr / 2) * -1
        for (var i = 0; i < score; i++) {
          awayGoals.push("rd")
        }
      }

      if (seriesResults.c > 0) {
        for (var i = 0; i < seriesResults.c; i++) {
          homeGoals.push("c")
        }
      }
      else {
        for (var i = 0; i < (seriesResults.c * -1); i++) {
          awayGoals.push("c")
        }
      }

      homeGoals = shuffle(homeGoals)
      awayGoals = shuffle(awayGoals)

      if (seriesResults.g > 0) {
        var score = Math.ceil(seriesResults.g / 2)
        for (var i = 0; i < score; i++) {
          awayGoals.pop()
        }
      }
      else {
        var score  = Math.floor(seriesResults.g / 2) * -1
        for (var i = 0; i < score; i++) {
          homeGoals.pop()
        }
      }
      
      return {
        home: homeGoals.length,
        away: awayGoals.length,
        homeGoals: homeGoals,
        awayGoals: awayGoals,
        series: seriesResults,
        result: (homeGoals.length > awayGoals.length ? "home" : (homeGoals.length === awayGoals.length ? "draw" : "away"))
      }

    }

  }

  scope.Game = Game

})(this);

if (typeof module !== "undefined") {
  var Team = require("./team")
  module.exports = this.Game
};