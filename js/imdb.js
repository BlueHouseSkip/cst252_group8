

var tag1 = "monster";
var tag2 = "scientist";
var tagSet = "monster";


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

var url = "https://imdb-api.com/API/AdvancedSearch/k_636sci65?title_type=tv_series&genres=animation&keywords=" + tagSet +"&sort=user_rating,desc";
//url = "none";
//var domain = "https://cataas.com";

function getAjax () {
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

      //var cartoonsToGet = uniqueRandom(5, data.results.length);
      var cartoonsToGet = arrayOfSelf(10);

      cartoonsToGet.forEach(function (el, index) {
        //data[element].
        console.log(data.results[el]);
        console.log(el);
        $("#output").append("<h1>" + data.results[el].title + "</h1>");
        $("#output").append("<p>" + data.results[el].description + "       " + data.results[el].contentRating + "</p>");
        $("#output").append("<h4>" + data.results[el].plot + "</h4>");
        $("#output").append("<img scr=" + data.results[el].image + ">");
        $("#output").append(`<img scr=${data.results[el].image}>`);
      });
      /*
      $("#output").append("<h1>" + data.title + "</h1>");
      $("#output").append("<img scr=" + data.img + "></img>");
      $("#output").append("<h5>" + data.alt + "</h5>");
      */
  })
  // If the request fails
  .fail(function( xhr, status, errorThrown ) {
      console.log(errorThrown + " Status:" + status );
  });
}

$("#press-me").click(getAjax);

$("#clear").click(function () {
	$("#output").empty()
})
