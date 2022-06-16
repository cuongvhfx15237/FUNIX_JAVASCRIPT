//Variable



var modal = document.getElementById("Modal"); //modal

var btn = document.getElementById("myBtn"); // Get the button that opens the modal

var span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal


var More = document.getElementById('more-than');// Get the button that click in Get more Button


// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

var afterSearch = document.getElementById("Search-button");// Get the <span> element that closes the modal
afterSearch.onclick = function(){
modal.style.display="none";
replacePage();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//when the user click in the getmore Button
More.onclick = function(){
  fetch('https://gnews.io/api/v4/top-headlines?&token=36eda659ae83d9ecaf7badd878196905')
  .then(function (response) {
      return response.json();
  }).then(function (data) {
            write(data)
    })    

}
// load page
$(document).ready(function(){
  fetch('https://gnews.io/api/v4/top-headlines?&token=36eda659ae83d9ecaf7badd878196905')
    .then(function (response) {
        return response.json();
    }).then(function (data) {
      
      $('#loading').toggleClass('hidden')
      alert('done load')
      write(data)
      $('#loading').toggleClass('hidden')
      })
    });

// when search button
function replacePage(){
  $('#News-Container').empty();
  $('#loading').toggleClass('hidden')
    var keyword=$('#search-key').val();
    Lang()
    Country()
    if (typeof Langs == "string"){
      var LangATT = "&lang=" + Langs
    }
    else {
      LangATT = "";
    }

    if (typeof Countrys == "string"){
      var CountryATT = "&country=" + Countrys
    }
    else {
      CountryATT = "";
    }
    var myLink="https://gnews.io/api/v4/search?q=" + keyword + LangATT + CountryATT + "&token=36eda659ae83d9ecaf7badd878196905";
    console.log(myLink)
    // get Json search using Ajax
        fetch(myLink)
        .then(function (response) {
            return response.json();
        })  
        .then(function (data) {
          console.log(data)
          
              write(data);
              alert('done search')
              $('#loading').toggleClass('hidden')
          })
        }

//write content page
function write(x){
    var box = document.getElementById('News-Container');
    var j = box.children.length;
    for (var i=0; i < x.articles.length; i++){
        var Image = x.articles[i].image;
        var Title = x.articles[i].title;
        var Url = x.articles[i].url
        var Content= x.articles[i].content;
        j +=i;
    $('#News-Container').append('<div id = "Container"> <div id = "Image-' + j + '" class = "picture" alt="_pic-content"></div> <div id = "new-content"> <a id = "Title-' + j + '" class = "Title"></a><div id = "Content-' + j + '" class = "Content"></div></div>  </div>');   
    $('#Image-' + j).css('background-image','url("' + Image + '")');
    $('#Title-' + j).text(Title);
    $('#Title-' + j).attr('href', Url);
    $('#Title-' + j).attr('style', 'font-size: 1.5em');
    $('#Title-' + j).attr('target', '_blank');
    $('#Content-' + j).text(Content);
    }
}

//dropdown - list
function DropDownList() {
  document.querySelector(".DropDownList").classList.toggle("Show");
 }

//radio
var Langs = "";
var Countrys = "";
function Lang() {
    Langs = document.getElementsByName("Lang");
    for (var i=0; i< Langs.length; i++){
      if (Langs[i].checked){
        return Langs = Langs[i].value;
      }
      }
  }
  function Country() {
    Countrys = document.getElementsByName("Country");
    for (var i=0; i< Countrys.length; i++){
      if (Countrys[i].checked){
        return Countrys = Countrys[i].value;
      }
      }
  }

//check & uncheck radio
  $("input:radio").on("click",function (e) {
    var inp=$(this); //cache the selector
    if (inp.is(".select")) { //see if it has the selected class
        inp.prop("checked",false).removeClass("select");
        return;
    }
    $("input:radio[name='"+inp.prop("name")+"'].select").removeClass("select");
    inp.addClass("select");
});

//loading icon
