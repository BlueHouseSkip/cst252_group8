

// weight is how much to count each question as. decimal percent so 1 is 100%, .5 is 50%, 2 is 200%, etc.
const WEIGHT = [1,1,1,1,1,1,1,1,1,1];

// 5 questions so far
// each question has 4 answers, represneted by 1 2 3 and 4 in each one


function Cartoon (name, answersArray, element) {
  this.name = name;
  this.answers = answersArray;
  this.element = element;
  this.similarity = function (inputArray) {
    let similarityNum = 0; // decrlaring this variable so it can be used later
    let tempAnswers = this.answers; // A fix for a scope issue with this.__ variable
    inputArray.forEach(function (e, i, r) {
        //console.log(tempAnswers[i]);
        if(e == tempAnswers[i]) {
          similarityNum += WEIGHT[i];
        }
      });
    return similarityNum;
  }
  this.enableElement = function () {
    // enable the element showing the results for their quiz
    return;
  }
}

/*
    Cartoon cosntructor is:
        name of cartoon, list of correct answers, DOM object to enable
*/

const GRAVITYFALLS    = new Cartoon("Gravity Falls",              [1,4,2,3,2,3,1,2,4,3], "non");
const RICKNMORTY      = new Cartoon("Rick and Morty",             [2,1,3,1,3,4,4,2,2,2], "non");
const STARWARS        = new Cartoon("Star Wars: the Clone Wars",  [4,2,3,1,4,3,1,1,3,2], "non");
const SAILORMOON      = new Cartoon("Sailor Moon",                [1,3,2,4,1,3,2,3,4,1], "non");
const STEVEN          = new Cartoon("Steven Universe",            [3,4,4,2,1,1,3,2,2,3], "non");
const ARCANE          = new Cartoon("Arcane",                     [1,1,1,1,1,4,3,4,4,2], "non");

const CARTOON_ARRAY = [GRAVITYFALLS, RICKNMORTY, STARWARS, SAILORMOON, STEVEN, ARCANE];
// $("#14")[0].checked
/*
$("#sum").click(function() {
    console.log("test");
});
*/

$("#sum").click(function() {
//  console.log("clicked");
  if($(":checked").length != WEIGHT.length) {
    alert("Please answer every question");
    return;
  }
  var inputAnswers = [];
  $(":checked").each(function (i) {
      inputAnswers[i] = parseInt(this.value);
//      inputAnswers[i] += Math.random() * 0.3;
//      console.log(this);
  });
  console.log("Your answers:");
  console.log(inputAnswers);
  similarityArray = [];
  CARTOON_ARRAY.forEach(function (e, i, r) {
    similarityArray[i] = (CARTOON_ARRAY[i].similarity(inputAnswers));

  });
  console.log("similarity:");
  console.log(similarityArray);
  let max = Math.max(...similarityArray);

  let index = similarityArray.indexOf(max);
  console.log(index);
  console.log(CARTOON_ARRAY[index].name);
  CARTOON_ARRAY[index].enableElement();

});


// more space
