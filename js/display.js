$(function(){

  var display = function(standings) {
    $("#standings tbody").empty()

    standings.forEach(function(team, i){
      var $row = $($("#team-row").html())
      
      $row.find(".rank").text(i + 1)
      $row.find(".name").text(team.team)
      $row.find(".played").text(team.raw.gp)
      $row.find(".wins").text(team.raw.w)
      $row.find(".losses").text(team.raw.l)
      $row.find(".draws").text(team.raw.d)
      $row.find(".points").text(team.raw.pts)
      $row.find(".for").text(team.raw.gf)
      $row.find(".against").text(team.raw.ga)
      $row.find(".diff").text(team.raw.gd)

      $("#standings tbody").append($row)
    })
  }

  var lg = League.random(12)
  display(lg.display())

  $("#next").on("click", function(){
    lg.playNext()
    display(lg.display())
  })

  $("#week").on("click", function(){
    lg.playRound()
    display(lg.display())
  })

})