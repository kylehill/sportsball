(function(scope, undefined){

  var shuffle = function(array) {
    var out = []
    while (array.length) {
      var index = Math.floor(Math.random() * array.length)
      var removed = array.splice(index, 1)
      out.push(removed[0])
    }
    return out
  }

  var createRound = function(teams, rotate) {
    var indexes = teams.map(function(t, i){
      return i
    })
    var round = []
    
    if (indexes.length % 2 !== 0) {
      indexes.push(false)
    }
    
    var first = indexes.shift()
    while (rotate > 0) {
      indexes.unshift(indexes.pop())
      rotate--
    }
    indexes.unshift(first)

    for (var i = 0; i < (indexes.length / 2); i++) {
      var home = (indexes[i] !== false)
      var away = (indexes[indexes.length - (i + 1)] !== false)

      if (home && away) {
        var teams = shuffle([ indexes[i], (indexes[indexes.length - (i + 1)]) ])
        round.push({
          home: teams[0],
          away: teams[1],
          played: false,
          result: "",
          score: {
            home: 0,
            away: 0
          }
        })
      }
    }

    return shuffle(round)
  }

  var recalcStandings = function(inputStandings, teams) {
    var standings = inputStandings.map(function(s){ return s })
    standings.sort(function(a, b){
      if (a.pts < b.pts) { return 1 }
      if (b.pts < a.pts) { return -1 }
      if (a.gd < b.gd) { return 1 }
      if (b.gd < a.gd) { return -1 }
      if (a.gf < b.gf) { return 1 }
      if (b.gf < a.gf) { return -1 }
      if (a.gp > b.gp) { return 1 }
      if (b.gp > a.gp) { return -1 }
      return 0
    })

    return standings.map(function(team){
      return {
        record: team,
        team: teams[team.index].display()
      }
    })
  }

  var League = function(teams, rounds) {

    rounds = rounds || ((Math.ceil(teams.length / 2) * 2) - 1)

    teams = shuffle(teams)

    this.teams = teams.map(function(team){
      return team.display()
    })

    var schedule = []
    for (var i = 0; 
        i < rounds; 
        i++) {
      schedule.push(createRound(teams, i))
    }

    this.schedule = shuffle(schedule).map(function(round, r){
      return round.map(function(fixture, f){
        fixture.round = r
        fixture.match = f
        return fixture
      })
    })

    var standings = teams.map(function(team, i){
      return { 
        index: i,
        gp: 0, 
        w: 0, 
        l: 0, 
        d: 0, 
        pts: 0, 
        gf: 0, 
        ga: 0, 
        gd: 0 
      }
    })

    var unplayed = JSON.parse(JSON.stringify(this.schedule))

    this.playNext = function() {
      if (!unplayed[0]) {
        return
      }
      var game = unplayed[0].shift()
      
      var homeIndex = game.home
      var awayIndex = game.away
      var home = teams[homeIndex]
      var away = teams[awayIndex]
      
      var res = Game.play(home, away)

      switch (res.result) {
        case "home":
          standings[homeIndex].w++
          standings[homeIndex].pts += 3
          standings[awayIndex].l++
          break
        case "away":
          standings[awayIndex].w++
          standings[awayIndex].pts += 3
          standings[homeIndex].l++
          break
        case "draw":
          standings[homeIndex].d++
          standings[awayIndex].d++
          standings[homeIndex].pts++
          standings[awayIndex].pts++
      }

      standings[homeIndex].gp++
      standings[awayIndex].gp++
      standings[homeIndex].gf += res.home
      standings[awayIndex].gf += res.away
      standings[homeIndex].ga += res.away
      standings[awayIndex].ga += res.home
      standings[homeIndex].gd += (res.home - res.away)
      standings[awayIndex].gd += (res.away - res.home)

      this.schedule[game.round][game.match].played = true
      this.schedule[game.round][game.match].score.home = res.home
      this.schedule[game.round][game.match].score.away = res.away
      
      if (unplayed[0].length === 0) {
        unplayed.shift()
      }
    }

    this.playRound = function() {
      if (unplayed.length) {
        var games = unplayed[0].length
        for (var i = 0; i < games; i++) {
          this.playNext()
        }
      }
    }

    this.playAll = function() {
      var weeks = unplayed.length
      for (var i = 0; i < weeks; i++) {
        this.playRound()
      }
    }

    this.display = function() {
      var s = recalcStandings(standings, teams)
      return {
        standings: s.map(function(team){
          return { 
            team: team.team.name || team.team.id,
            points: team.record.pts,
            goals: team.record.gd + " (" + team.record.gf + "-" + team.record.ga + ")",
            record: team.record.w + "-" + team.record.l + "-" + team.record.d,
            raw: team.record
          }
        }),
        fixtures: this.schedule.map(function(round){
          return round.map(function(fixture){
            return {
              home: teams[fixture.home].name,
              away: teams[fixture.away].name,
              result: (fixture.played 
                ? fixture.score.home + " - " + fixture.score.away
                : " - ")
            }
          })
        })
      }
    }
  }

  var LeagueFactory = {

    random: function(size, rounds) {
      var teams = []
      for (var i = 0; i < size; i++) {
        teams.push(new Team())
      }
      return this.create(teams, rounds)
    },

    create: function(teams, rounds) {
      return new League(teams, rounds)
    }

  }

  scope.League = LeagueFactory

})(this);

if (typeof module !== "undefined") {
  var Team = require("./team")
  var Game = require("./game")
  module.exports = this.League
};