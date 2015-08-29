var Statistic = require("../js/statistic")
var expect = require("chai").expect

describe("Statistic", function(){

  var s
  beforeEach(function(){
    s = new Statistic()
  })

  it("should instantiate", function(){
    expect(Statistic).to.be.a("function")
    expect(s).to.be.an("object")
    expect(s).to.have.keys([
      "get", 
      "set", 
      "train", 
      "levelUp",
      "injury", 
      "roll", 
      "toString"
    ])
  })

  it("should not have min, max, and xp publicly accessible", function(){
    expect(s.min).to.equal(undefined)
    expect(s._min).to.equal(undefined)
    expect(s.max).to.equal(undefined)
    expect(s._max).to.equal(undefined)
    expect(s.xp).to.equal(undefined)
    expect(s._xp).to.equal(undefined)
  })

  it("should have a getter", function(){
    expect(s.get()).to.have.keys(["min", "max", "xp"])
    expect(s.get().min).to.be.a("number")
    expect(s.get().max).to.be.a("number")
    expect(s.get().xp).to.be.a("number")
  })

  it("should have a setter", function(){
    s.set(10, 20)
    expect(s.get().min).to.equal(10)
    expect(s.get().max).to.equal(20)
    expect(s.get().xp).to.equal(0)
  })

  it("should be able to increase max", function(){
    s.set(10, 20)
    expect(s.train(20)).to.equal(true)
    expect(s.get().min).to.equal(10)
    expect(s.get().max).to.equal(21)
    expect(s.get().xp).to.equal(0)
  })

  it("should be able to increase multiple levels", function(){
    s.set(10, 20)
    expect(s.train(41)).to.equal(true)
    expect(s.get().min).to.equal(10)
    expect(s.get().max).to.equal(22)
    expect(s.get().xp).to.equal(0)
  })

  it("should be able to increase xp", function(){
    s.set(10, 20)
    expect(s.train(10)).to.equal(true)
    expect(s.get().min).to.equal(10)
    expect(s.get().max).to.equal(20)
    expect(s.get().xp).to.equal(10)

    expect(s.train(15)).to.equal(true)
    expect(s.get().min).to.equal(10)
    expect(s.get().max).to.equal(21)
    expect(s.get().xp).to.equal(5)
  })

  it("should not be able to increase max 20 more than min", function(){
    s.set(10, 30)
    expect(s.train(30)).to.equal(false)
    expect(s.get().min).to.equal(10)
    expect(s.get().max).to.equal(30)
    expect(s.get().xp).to.equal(0)
  })

  it("should be able to convert max to min", function(){
    s.set(10, 20)
    expect(s.levelUp()).to.equal(true)
    expect(s.get().min).to.equal(11)
    expect(s.get().max).to.equal(16)
  })

  it("should not convert max to min if insufficient difference", function(){
    s.set(10, 14)
    expect(s.levelUp()).to.equal(false)
    expect(s.get().min).to.equal(10)
    expect(s.get().max).to.equal(14)
  })

  it("should be able to reduce min, max, and xp", function(){
    s.set(10, 14)
    s.train(5)
    s.injury(1)
    expect(s.get()).to.deep.equal({
      min: 9,
      max: 13,
      xp: 4
    })

    s.set(10, 14)
    s.train(1)
    s.injury(2)
    expect(s.get()).to.deep.equal({
      min: 8,
      max: 12,
      xp: 0
    })
  })

  it("should roll between min and max inclusive", function(){
    s.set(1, 4)
    var obj = {}
    for (var i = 0; i < 1000; i++) {
      obj[s.roll()] = true
    }
    expect(obj).to.have.keys([ "1", "2", "3", "4" ])
    expect(s.roll()).to.be.a("number")
  })

  it("should have a toString method", function(){
    s.set(10, 20)
    expect(s.toString()).to.equal("10-20")
  })

})