var Game = require("../js/game")
var expect = require("chai").expect

describe("Game", function(){

  it("should not instantiate", function(){
    expect(Game).to.be.an("object")
    expect(Game).to.have.keys([ "random", "play" ])
  })

  it("should be able to simulate a game")

})