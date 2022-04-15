
//import * as confetti from "../confetti/confetti.js";
//THE WHAT: a program that works with a buzzfeed quiz styled page to get answers to questions and math them to cartoons

//THE HOW: There is an array containing every cartoon with a list of correct answers for that cartoon.
//         The answers are collected from the page when the submit button is pressed and compared to
//         the list of correct answers for each cartoon. The cartoon with the highest similarity rate
//         is displayed to the console. In later iterations it should unhide the proper element.

// QUIRKS
//         Ties are handled automatically by indexOf() which takes the first matching index
//         This means that the higher in the array the more likely a cartoon is to show up
//         This is especially true with a low amount of questions

//         NOTE: At least 15 questions is recommended for best results



// weight is how much to count each question as. decimal percent so 1 is 100%, .5 is 50%, 2 is 200%, etc.
const WEIGHT = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

// CURRENTLY 21 QUESTIONS

// cosntructor for each cartoon definition.
function Cartoon (name, answersArray, element) {
  this.name = name;
  this.answers = answersArray;
  this.element = element;
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
  // * toggles the visibility of the element associated with the cartoon
  //   the preset parameter allows the optional feature of only toggling the
  //   element's visibility if it's shown. It will either hide or do nothing.
  this.toggleElement = function (toggleOnlyIfEnabled=false) {
    if(toggleOnlyIfEnabled) {
      //console.log("toggleOnlyIfEnabled true");
      if($(this.element).is(":visible")) {
        $(this.element).toggle();
      }
    } else {
      //console.log("toggleOnlyIfEnabled false");
      $(this.element).toggle();
    }
    return;
  }
}

/*
    Cartoon cosntructor is:
        name of cartoon, list of correct answers, DOM object to enable

        each new cartoon must be declared and then added to the CARTOON_ARRAY variable.
*/
const GRAVITYFALLS    = new Cartoon("Gravity Falls",              [3,2,4,3,1,2,1,4,2,4,4,2,4,1,4,1,3,1,1,1,2], "#gravityfalls");
const RICKNMORTY      = new Cartoon("Rick and Morty",             [1,2,1,1,2,1,4,1,5,5,3,4,1,4,3,3,3,1,2,4,3], "#ricknmorty");
const STARWARS        = new Cartoon("Star Wars: the Clone Wars",  [3,2,3,1,2,1,2,3,1,2,5,1,3,1,4,1,3,4,1,3,3], "#starwars");
const SAILORMOON      = new Cartoon("Sailor Moon",                [1,1,5,3,2,1,3,4,5,4,1,5,1,5,3,1,4,1,2,2,5], "#sailormoon");
const STEVEN          = new Cartoon("Steven Universe",            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "#steven");
const ARCANE          = new Cartoon("Arcane",                     [2,1,2,1,2,1,2,4,4,3,5,2,2,5,1,3,1,3,2,3,1], "#arcane");
const REGULAR         = new Cartoon("Regular Show",               [3,1,3,1,2,1,2,2,1,2,1,2,1,1,1,4,2,1,2,3,1], "#regular");
const MIDNIGHT        = new Cartoon("Midnight Gospel",            [2,2,2,2,2,2,4,4,4,3,4,1,3,4,4,3,1,2,2,2,3], "#midnight");
const ONEPIECE        = new Cartoon("One Piece",                  [2,2,4,2,1,2,1,4,3,5,2,3,2,5,1,1,5,5,1,1,4], "#onepiece");
const SPONGEBOB       = new Cartoon("Spongebob Squarepants",      [2,1,5,3,3,2,3,2,3,3,1,3,2,3,5,2,2,5,1,1,4], "#spongebob");
const POKEMON         = new Cartoon("Pokemon",                    [4,2,4,3,1,2,3,3,5,4,2,2,3,2,2,1,1,1,1,2,4], "#pokemon");
const AVATAR          = new Cartoon("Avatar",                     [4,1,2,2,3,2,2,4,4,5,1,3,2,3,2,2,2,2,1,3,2], "#avatar");

const CARTOON_ARRAY = [GRAVITYFALLS, RICKNMORTY, STARWARS, SAILORMOON, STEVEN, ARCANE, REGULAR, MIDNIGHT, ONEPIECE, SPONGEBOB, POKEMON, AVATAR];

// Show the quiz if its hidden, hide it if its shown
function toggleQuizVisibility() {
  $("#quiz").toggle();
  return;
}

// get rid of all checks on the quiz
function resetQuiz() {
  $(":checked").prop("checked",false);
}

//whether results are shown or hidden, hide them.
function hideResults() {
  CARTOON_ARRAY.forEach(function (e,i,r) {
    e.toggleElement(true);
  });
}

function showAllResults() {
  CARTOON_ARRAY.forEach(function (e,i,r) {
    e.toggleElement();
  });
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
  CARTOON_ARRAY.forEach(function (e, i, r) {
    similarityArray[i] = (CARTOON_ARRAY[i].similarity(inputAnswers));
  });
  console.log("similarity:");
  console.log(similarityArray);
  // * Math.max() gets the largest number in the array, it's set as max
  //   which is passed as the parameter in indexOf() which allows it to find
  //   the position of the largest number in the array, which is set as index.
  //   the index should also be the index of the corresponding cartoon in CARTOON_ARRAY
  //   enableElement() is then ran for that cartoon.
  let max = Math.max(...similarityArray);
  let index = similarityArray.indexOf(max);
  console.log(index);
  console.log(CARTOON_ARRAY[index].name);
  toggleQuizVisibility();
  CARTOON_ARRAY[index].toggleElement();
  $("#restart").toggle();
});

// restart button that appears with the results. resets everything allowing you to retake the quiz.
$("#restart").click(function () {
  if($("#restart").is(":visible")) {
    $("#restart").toggle();
  }
  resetQuiz();
  hideResults();
  toggleQuizVisibility();
  $('input').prop('checked',false).checkboxradio('refresh') // refreshes JQueryUI to reflect accurate state of the quiz
});




// more space
