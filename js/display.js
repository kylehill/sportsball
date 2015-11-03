var lg

$(function(){

  var current_week = 0

  var display = function(display) {
    $("#standings tbody").empty()

    display.standings.forEach(function(team, i){
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

    $("#fixtures .container").empty()
    $("#round_num").text(current_week + 1)

    display.fixtures[current_week].forEach(function(fixture){
      var $row = $($("#fixture-row").html())

      $row.find(".home").text(fixture.home)
      $row.find(".result").text(fixture.result)
      $row.find(".away").text(fixture.away)

      $("#fixtures .container").append($row)
    })
  }

  lg = League.random(12, 22)
  display(lg.display())

  $("#next").on("click", function(){
    lg.playNext()
    display(lg.display())
  })

  $("#week").on("click", function(){
    lg.playRound()
    display(lg.display())
  })

  $("#prev_sched").on("click", function(){
    current_week = Math.max(0, current_week - 1)    
    display(lg.display())
  })

  $("#next_sched").on("click", function(){
    current_week = Math.min(lg.display().fixtures.length - 1, current_week + 1)
    display(lg.display())
  })
})