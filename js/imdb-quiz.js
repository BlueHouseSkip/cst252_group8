

const WEIGHT = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

//S$(".none").checkboxradio('disable');

// CURRENTLY 21 QUESTIONS

// cosntructor for each cartoon definition.
function Tagset (name, answersArray, tagName) {
  this.name = name;
  this.answers = answersArray;
  this.tagName = tagName;
  this.similarity = function (inputArray) {
    let similarityNum = 0; // decrlaring this variable so it can be used later in the function.
    let tempAnswers = this.answers; // A fix for a scope issue with this.____ variables
    inputArray.forEach(function (e, i, r) {
        //console.log(tempAnswers[i]);
        if(e == tempAnswers[i]) {
          similarityNum += WEIGHT[i];
        }
      });
    return similarityNum;
  }
}

/*
    Cartoon cosntructor is:
        name of cartoon, list of correct answers, DOM object to enable

        each new cartoon must be declared and then added to the CARTOON_ARRAY variable.
*/
const MONSTER          = new Tagset("Monster",            [3,2,4,3,1,2,1,4,2,4,4,2,4,1,4,1,3,1,1,1,2], "monster");
const SATIRE           = new Tagset("Satire",             [1,2,1,1,2,1,4,1,5,5,3,4,1,4,3,3,3,1,2,4,3], "satire");
const ADULT            = new Tagset("Adult Animation",    [3,2,3,1,2,1,2,3,1,2,5,1,3,1,4,1,3,4,1,3,3], "adult-animation");
const CARTOONNETWORK   = new Tagset("Cartoon Network",    [1,1,5,3,2,1,3,4,5,4,1,5,1,5,3,1,4,1,2,2,5], "cartoon-network");
const NICK             = new Tagset("Nickelodeon",        [3,2,4,2,2,2,3,4,5,4,4,1,4,2,5,1,1,1,1,2,3], "nickelodeon");
const ADULTSWIM        = new Tagset("Adult Swim",         [2,1,2,1,2,1,2,4,4,3,5,2,2,5,1,3,1,3,2,3,1], "adult-swim");
const WEIRD            = new Tagset("Weird",              [3,1,3,1,2,1,2,2,1,2,1,2,1,1,1,4,2,1,2,3,1], "weird");
const FRIENDSHIP       = new Tagset("Friendship",         [2,2,2,2,2,2,4,4,4,3,4,1,3,4,4,3,1,2,2,2,3], "friendship");
const APOCALYPSE       = new Tagset("Apocalypse",         [2,2,4,2,1,2,1,4,3,5,2,3,2,5,1,1,5,5,1,1,4], "apocalypse");
const DARKCOMEDY       = new Tagset("Dark Comedy",        [2,1,5,3,3,2,3,2,3,3,1,3,2,3,5,2,2,5,1,1,4], "dark-comedy");
const MAGIC            = new Tagset("Magic",              [4,2,4,3,1,2,3,3,5,4,2,2,3,2,2,1,1,1,1,2,4], "magic");
const SURREALISM       = new Tagset("Surrealism",         [4,1,2,2,3,2,2,4,4,5,1,3,2,3,2,2,2,2,1,3,2], "surrealism");

const TAGSET_ARRAY = [MONSTER, SATIRE, ADULT, CARTOONNETWORK, NICK, ADULTSWIM, WEIRD, FRIENDSHIP, APOCALYPSE, DARKCOMEDY, MAGIC, SURREALISM];

// Show the quiz if its hidden, hide it if its shown
function toggleQuizVisibility(hideOnly=false) {
  if(hideOnly) {
    if($("#quiz").is(":visible")) {
      $("#quiz").toggle();
    }
  } else $("#quiz").toggle();
  return;
}

// get rid of all checks on the quiz
function resetQuiz() {
  $(":checked").prop("checked",false);
  $(".none").prop('checked',true);
}

function hideResults() {
  $("#output").empty();
}


// submit button clicked function
$("#sum").click(function() {
  // * checks to see if every question is answered and stops the user if not,
  //   if even one questions isnt answered it'll mess everything up
  if($(":checked").length != WEIGHT.length) {
    alert("Please answer every question");
    return;
  }
  let inputAnswers = []; // Declares for use later
  // * grabs every element on the page with the attribute 'checked'
  //   If a non-quiz answer element is somehow marked as 'checked' this will likely break the quiz.
  $(":checked").each(function (i) {
      inputAnswers[i] = parseInt(this.value);
  });
  console.log("Your answers:");
  console.log(inputAnswers);
  let similarityArray = []; // Not completely neccecary but makes the next part a little cleaner.
  // * goes through every element in CARTOON_ARRAY and runs each's respective similarity function
  //   and stores the result in similarityArray
  TAGSET_ARRAY.forEach(function (e, i, r) {
    similarityArray[i] = (TAGSET_ARRAY[i].similarity(inputAnswers));
  });
  console.log("similarity:");
  console.log(similarityArray);
  //callConfetti();
  // - Math.max() gets the largest number in the array, it's set as max
  //   which is passed as the parameter in indexOf() which allows it to find
  //   the position of the largest number in the array, which is set as index.
  //   the index should also be the index of the corresponding cartoon in CARTOON_ARRAY
  //   enableElement() is then ran for that cartoon.
  let max = Math.max(...similarityArray);
  let index = similarityArray.indexOf(max);
  console.log(index);
  console.log(TAGSET_ARRAY[index].name);
  var tagSet = TAGSET_ARRAY[index].tagName;
  var imdbUrl = "https://imdb-api.com/API/AdvancedSearch/k_636sci65?num_votes=1000,&title_type=tv_series&genres=animation&keywords=" + tagSet +"&sort=user_rating,desc";

  $("#loading").toggle();

  getAjax(imdbUrl);

  toggleQuizVisibility(true);

  if($("#header").is(":visible")) {
    $("#header").toggle();
  }
  window.scrollTo(0,0);
  jQuery(window).trigger('resize').trigger('scroll');
});

// restart button that appears with the results. resets everything allowing you to retake the quiz.
$("#restart").click(function () {
  if($("#restart").is(":visible")) {
    $("#restart").toggle();
  }
  if($("#loading").is(":visible")) {
    $("#loading").toggle();
  }
  if($("#retry").is(":visible")) {
    $("#retry").toggle();
  }
  resetQuiz();
  hideResults();
  toggleQuizVisibility();

  $("#header").toggle();
  $('input').prop('checked',false).checkboxradio('refresh');  // refreshes JQueryUI to reflect accurate state of the quiz
  $(".none").prop('checked',true).checkboxradio('refresh');
  window.scrollTo(0,0);
  jQuery(window).trigger('resize').trigger('scroll');
});

//$('.parallax-window').parallax({imageSrc: '/path/to/image.jpg'})

setInterval(obnoxiousFlash,700);



function obnoxiousFlash () {
  if($("#sum").css("background-color") == "rgb(255, 255, 0)") {
    $("#sum").css("background-color", "red");
  } else {
    $("#sum").css("background-color", "yellow");
  }
}





//var tag1 = "monster";
//var tag2 = "scientist";
//var tagSet = "monster";


function uniqueRandom (amount, range) {
  var arr = [];
  while(arr.length < amount){
      var r = Math.floor(Math.random() * range);
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
// THIS IS HACK AS FUCK PLEASE CHANGE
function arrayOfSelf (length) {
  var arr = [];
  while(arr.length < length){
      arr.push(arr.length);
  }
  return arr;
}

//var url = "https://imdb-api.com/API/AdvancedSearch/k_636sci65?title_type=tv_series&genres=animation&keywords=" + tagSet +"&sort=user_rating,desc";
//url = "none";
//var domain = "https://cataas.com";

function getAjax (url) {
	// Using the core $.ajax() method
  $.ajax({
      // The URL for the request
      url: url,
      // The data to send (will be converted to a query string)
      //data: { id: 123},
      // Whether this is a POST or GET request
      type: "GET",
      // The type of data we expect back
      dataType : "json",
  })
  // If the request succeeds
  .done(function( data ) {
      //alert("Success!");
      console.log(data);

      //var cartoonsToGet = uniqueRandom(10, data.results.length);
      var cartoonsToGet = arrayOfSelf(data.results.length);

      cartoonsToGet.forEach(function (el, index) {
        //data[element].
        console.log(data.results[el]);
        console.log(el);
        /*
        $("#output").append("<h1>" + data.results[el].title + "</h1>");
        $("#output").append("<p>" + data.results[el].description + "       " + data.results[el].contentRating + "</p>");
        $("#output").append("<h4>" + data.results[el].plot + "</h4>");
        $("#output").append("<img scr=" + data.results[el].image + ">");
        */
        //$("#output").append(`<img scr=${data.results[el].image}>`);

        $("#output").append(`<div>
                              <h1>${data.results[el].title}</h1>
                              <p>${data.results[el].description}       ${data.results[el].contentRating}</p>
                              <img src=${data.results[el].image}>
                              <h4>${data.results[el].plot}</h4>
                            `);
      });
      callConfetti();
      if($("#restart").not(":visible")) {
        $("#restart").toggle();
      }
      if($("#loading").is(":visible")) {
        $("#loading").toggle();
      }
      if($("#retry").is(":visible")) {
        $("#retry").toggle();
      }
      /*
      $("#output").append("<h1>" + data.title + "</h1>");
      $("#output").append("<img scr=" + data.img + "></img>");
      $("#output").append("<h5>" + data.alt + "</h5>");
      */
  })
  // If the request fails
  .fail(function( xhr, status, errorThrown ) {
      console.log(errorThrown + " Status:" + status );
      $("#retry").toggle();
  });
}

$("#retry-button").click(function () {
  $('#sum').trigger('click');
});

$("#press-me").click(getAjax);

$("#clear").click(function () {
	$("#output").empty()
})






// comment
