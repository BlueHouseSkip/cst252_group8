

// weight is how much to count each question as. decimal percent so 1 is 100%, .5 is 50%, 2 is 200%, etc.
const WEIGHT = [1,1,1,1.5,1];

// 5 questions so far
// each question has 4 answers, represneted by 1 2 3 and 4 in each one


function Cartoon (answersArray, element) {
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
}


var gravityFalls = new Cartoon([1,4,2,3,2], "non");
var rickAndMorty = new Cartoon([2,1,3,1,3], "non");

var cartoonArray = [gravityFalls, rickAndMorty];
// $("#14")[0].checked
/*
$("#sum").click(function() {
    console.log("test");
});
*/

$("#sum").click(function() {
  console.log("clicked");
  var inputAnswers = [];
  $(":checked").each(function (i) {
      inputAnswers[i] = parseInt(this.value);
      console.log(this);
  });
 console.log(inputAnswers);
  var similar = gravityFalls.similarity(inputAnswers);
 console.log(similar);
 similarityArray = [];
  cartoonArray.forEach(function (e, i, r) {
    similarityArray[i] = (cartoonArray[i].similarity(inputAnswers));
    
  });

});
