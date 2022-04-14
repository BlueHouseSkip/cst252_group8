

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
const WEIGHT = [1,1,1,1,1,1,1,1,1,1];

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
  this.enableElement = function () {
    $(this.element).toggle();
    return;
  }
}

/*
    Cartoon cosntructor is:
        name of cartoon, list of correct answers, DOM object to enable

        each new cartoon must be declared and then added to the CARTOON_ARRAY variable.
*/
const GRAVITYFALLS    = new Cartoon("Gravity Falls",              [1,4,2,3,2,3,1,2,4,3], "#gravityfalls");
const RICKNMORTY      = new Cartoon("Rick and Morty",             [2,1,3,1,3,4,4,2,2,2], "#ricknmorty");
const STARWARS        = new Cartoon("Star Wars: the Clone Wars",  [4,2,3,1,4,3,1,1,3,2], "starwars");
const SAILORMOON      = new Cartoon("Sailor Moon",                [1,3,2,4,1,3,2,3,4,1], "sailormoon");
const STEVEN          = new Cartoon("Steven Universe",            [3,4,4,2,1,1,3,2,2,3], "steven");
const ARCANE          = new Cartoon("Arcane",                     [1,1,1,1,1,4,3,4,4,2], "arcane");

const CARTOON_ARRAY = [GRAVITYFALLS, RICKNMORTY, STARWARS, SAILORMOON, STEVEN, ARCANE];

function toggleQuizVisibility() {
  $("#quiz").toggle();
  return;
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
  CARTOON_ARRAY[index].enableElement();

});


// more space
