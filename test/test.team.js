var Team = require("../js/team")
var expect = require("chai").expect

describe("Team", function(){

  var t
  beforeEach(function(){
    t = new Team()
  })

  it("should instantiate", function(){

    expect(Team).to.be.a("function")
    expect(t).to.be.an("object")
    expect(t).to.have.keys([
      "setPlayer",
      "trainPlayer",
      "trainAll",
      "levelUp",
      "display",
      "roll",
      "injury",
      "release",
      "change",
      "name"
    ])

  })

  it("should have a display function", function(){
    var d = t.display()

    expect(d).to.be.an("object")
    expect(d).to.have.keys(["players", "positions", "id", "name"])
  })

  it("should have a set player function", function(){
    t.setPlayer(5, "g", 15, 20)
    expect(t.display().players[5].stats.g).to.equal("15-20")
  })

  it("should have a train player function", function(){
    t.setPlayer(5, "g", 15, 20)
    t.trainPlayer(5, "g", 45)
    expect(t.display().players[5].stats.g).to.equal("15-22")
  })

  it("should have a train all players function", function(){
    t.setPlayer(4, "g", 10, 15)
    t.setPlayer(5, "g", 15, 20)
    t.trainAll("g", 45)
    expect(t.display().players[4].stats.g).to.equal("10-17")
    expect(t.display().players[5].stats.g).to.equal("15-22")
  })

  it("should have a level up player function", function(){
    t.setPlayer(5, "g", 15, 20)
    t.levelUp(5, "g")
    expect(t.display().players[5].stats.g).to.equal("16-16")
  })

  it("should be able to roll the position", function(){
    t.setPlayer(0, "g", 20, 20)
    expect(t.roll("g")).to.equal(20)
  })

  it("should apply the lefty part in position rolls", function(){
    while (!t.display().players[3].lefty) {
      t.release(3)
    }

    t.setPlayer(3, "w", 20, 20)
    expect(t.roll("lw")).to.equal(24)
  })

  it("should be able to apply an injury", function(){
    t.setPlayer(0, "g", 5, 10)
    t.injury("g")

    expect(t.display().players[0].stats.g).to.equal("4-9")
  })

  it("should be able to replace a player on the roster", function(){
    t.setPlayer(3, "w", 20, 20)
    t.release(3)
    expect(t.display().players[3].stats.w).to.not.equal("20-20")
  })

  it("should be able to swap position assignments within the lineup", function(){
    t.setPlayer(2, "g", 20, 20)
    t.setPlayer(0, "d", 15, 15)
    t.change("g", 2)
    expect(t.display().positions.g.stats.g).to.equal("20-20")
    expect(t.display().positions.rd.stats.d).to.equal("15-15")
  })

  it("should be able to change position assignments with the bench", function(){
    t.setPlayer(7, "g", 20, 20)
    t.change("g", 7)
    expect(t.display().positions.g.stats.g).to.equal("20-20")
    expect(t.display().positions.g.id).to.equal(t.display().players[7].id)
  })

})