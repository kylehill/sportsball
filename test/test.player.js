var Statistic = require("../js/statistic")
var Player = require("../js/player")
var expect = require("chai").expect

describe("Player", function(){

  var p
  beforeEach(function(){
    p = new Player()
  })

  it("should instantiate", function(){

    expect(Player).to.be.a("function")
    expect(p).to.be.an("object")
    expect(p).to.have.keys([
      "display",
      "set",
      "train",
      "levelUp",
      "injury",
      "roll"
    ])

  })

  it("should have a (modified) getter", function(){

    expect(p.display()).to.have.keys(["stats", "injuries", "lefty"])
    
    expect(p.display().lefty).to.be.a("boolean")
    expect(p.display().injuries).to.be.a("number")
    expect(p.display().stats).to.be.an("object")

    expect(p.display().stats).to.have.keys(["d", "g", "w", "c"])
    expect(p.display().stats.g).to.be.a("string")

  })

  it("should have a specific position setter", function(){

    p.set("g", 10, 20)
    expect(p.display().stats.g).to.equal("10-20")

  })

  it("should be able to train a position", function(){

    p.set("g", 5, 10)
    p.train("g", 21)
    expect(p.display().stats.g).to.equal("5-12")

  })

  it("should be able to level up a position", function(){

    p.set("w", 10, 20)
    p.levelUp("w")
    expect(p.display().stats.w).to.equal("11-16")

  })

  it("should be able to apply injuries", function(){

    p.set("d", 5, 10)
    p.set("g", 5, 9)
    p.set("w", 1, 3)
    p.set("c", 6, 6)
    p.injury()

    expect(p.display().stats).to.deep.equal({
      d: "4-9",
      g: "4-8",
      w: "1-2",
      c: "5-5"
    })

    p.injury()

    expect(p.display().stats).to.deep.equal({
      d: "2-7",
      g: "2-6",
      w: "1-1",
      c: "3-3"
    })

  })

  it("should be able to roll for a position", function(){

    p.set("c", 15, 15)
    expect(p.roll("c")).to.equal(15)

  })

  it("should be able to roll for sides", function(){

    p.set("w", 10, 10)
    var side = p.display().lefty

    expect(p.roll("w", !side)).to.equal(10)
    expect(p.roll("w", side)).to.equal(12)

  })

})