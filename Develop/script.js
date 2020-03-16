//Gives the current hour of the day useful for coloring the boxes according to time 
moment().hour()

$(document).ready(function () {
  
    // Sets current day in html
  $("#currentDay").text(moment().format("dddd, MMMM Do"))
  
  // creates the html for the dayplanner dynamically
  for (let i = 9; i <= 17; i++) {
    if (i < 12) {
      $plannerBlock = $(`
      <section class="planner-block" value =${i}>
      <time class="col-sm-2">${i}:00 AM</time>
      <input class="form-control form-control-lg col-sm-8" type="text">
      <button type="submit" class="btn btn-info"><i class="fas fa-save"></i></button>
      </section>
      `)
    }
    else if (i === 12) {
      $plannerBlock = $(`
      <section class="planner-block" value =${i}>
      <time class="col-sm-2">${i}:00 PM</time>
      <input class="form-control form-control-lg col-sm-8" type="text">
      <button type="submit" class="btn btn-info"><i class="fas fa-save"></i></button>
      </section>
      `)
    }
    else {
      $plannerBlock = $(`
      <section class="planner-block" value =${i}>
      <time class="col-sm-2">${i - 12}:00 PM</time>
      <input class="form-control form-control-lg col-sm-8" type="text">
      <button type="submit" class="btn btn-info"><i class="fas fa-save"></i></button>
      </section>
      `)
    }
    $plannerBlock.appendTo("#planner-box")
  }

  // adding color to each box in day planner placing text from localstorage if it exists
  let $plannerChildren = $(".planner-block")
  for (let i = 0; i <= 8; i++) {
    let $thisChild = $plannerChildren[i]
    if (localStorage.getItem($($thisChild).attr('value'))) {
      $($thisChild.children[1]).val(localStorage.getItem($($thisChild).attr('value')))
    }


    // adds color to each element
    if (moment().hour() > $($thisChild).attr('value')) {
      $($thisChild.children[1]).addClass("past")
    }
    else if (moment().hour() == $($thisChild).attr('value')) {
      $($thisChild.children[1]).addClass("present")
    }
    else {
      $($thisChild.children[1]).addClass("future")
    }
  }
})

// save button listener 
$(document).on("click", ".btn-info", function (event) {
  event.preventDefault();

  // input field in this block
  let $thisInput = $(this).siblings()[1];

  // time related to this block
  let $thisTimeVal = $($(this).parent()).attr('value')
  localStorage.setItem($thisTimeVal, $($thisInput).val());


})