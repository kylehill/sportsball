var League = require("../js/league")
var expect = require("chai").expect

describe("League", function(){

  it("test", function(){
    var l = League.random(12)
    l.playAll()
    console.log(l.display())
  })

})