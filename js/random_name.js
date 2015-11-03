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

  var prefix = function(){
    return shuffle([ 
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
    ])[0]
  }

  var city = function(){
    return shuffle([ 
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
      "Grolton",
      "Lumbardshire",
      "Feckington",
      "Maul's"
    ])[0]
  }

  var suffix = function(){
    return shuffle([ 
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
      "Juniors",
      "'" + (Math.ceil(Math.random() * 89) + 10),
      "'" + (Math.ceil(Math.random() * 89) + 10),
      "'" + (Math.ceil(Math.random() * 89) + 10),
      "'" + (Math.ceil(Math.random() * 89) + 10),
      "'" + (Math.ceil(Math.random() * 89) + 10)
    ])[0]
  }

  var randomName = function() {
    if (Math.random() > .85) {
      return city()
    }

    if (Math.random() > .5) {
      return prefix() + " " + city()
    }

    return city() + " " + suffix()
  }

  scope.randomName = randomName


})(this);

if (typeof module !== "undefined") {
  module.exports = this.randomName
};