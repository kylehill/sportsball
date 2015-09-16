(function(scope, undefined){

  var idCounter = 1

  var prefixes = [ 
    "St.", 
    "North", 
    "South", 
    "Central", 
    "West", 
    "East", 
    "New", 
    "Old", 
    "ASC", 
    "SC", 
    "Sportsball", 
    "Port",
    "Fort",
    "Ward",
    "Real",
    "Lake"
  ]
  var cities = [ 
    "Fordington", 
    "Padget", 
    "Waterford", 
    "Miller", 
    "Boynesville", 
    "Couraway", 
    "Rippington", 
    "Adlingville", 
    "Smithton Springs", 
    "Point Margaret", 
    "Tooblett", 
    "Outways", 
    "Banestow", 
    "Rigadane", 
    "Canela Vista",
    "Kinnikinnick",
    "Harrisfield",
    "Richtertown",
    "Los Espinazos",
    "Corton",
    "Ropersvale",
    "Pashockshin",
    "Jeffersonville",
    "Erewhon",
    "Tesiphon",
    "Dortanburg",
    "Underbridge",
    "Hithan",
    "Ponce",
    "Summer's Rest",
    "Archerdale",
    "Stratton Falls",
    "Pitchfield",
    "Pascague",
    "Kromerheim",
    "Daversbruck",
    "Hanson Park",
    "Grolton"
  ]
  var suffixes = [ 
    "SC", 
    "United", 
    "City",
    "Town",
    "Sportsball", 
    "Reds", 
    "Blues", 
    "Greens", 
    "Golds",
    "Oranges",
    "Red Star", 
    "Blue Star", 
    "Green Star", 
    "Gold Star",
    "Orange Star",
    "Maritime", 
    "Heights",
    "Continental",
    "International",
    "Sixes",
    "Diamonds",
    "Beach",
    "Social",
    "Phoenix", 
    "Rovers",
    "Tigers",
    "Lions",
    "Bears",
    "Hawks",
    "Crows",
    "Cats",
    "Growlers",
    "Nuclear",
    "Old Boys",
    "'" + (Math.ceil(Math.random() * 89) + 10),
    "'" + (Math.ceil(Math.random() * 89) + 10),
    "'" + (Math.ceil(Math.random() * 89) + 10),
    "'" + (Math.ceil(Math.random() * 89) + 10),
    "'" + (Math.ceil(Math.random() * 89) + 10)
  ]

  var shuffle = function(array) {
    var out = []
    while (array.length) {
      var index = Math.floor(Math.random() * array.length)
      var removed = array.splice(index, 1)
      out.push(removed[0])
    }
    return out
  }

  var randomName = function() {
    cities = shuffle(cities)
    prefixes = shuffle(prefixes)
    suffixes = shuffle(suffixes)
       
    if (Math.random() > .85) {
      return cities[0]
    }

    if (Math.random() > .5) {
      return prefixes[0] + " " + cities[0]
    }

    return cities[0] + " " + suffixes[0]
  }

  var Team = function(name) {

    this.name = name || randomName()
    
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
        id: _id,
        name: this.name,
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

    var _id = idCounter++

  }

  scope.Team = Team

})(this);

if (typeof module !== "undefined") {
  var Player = require("./player")
  module.exports = this.Team
};