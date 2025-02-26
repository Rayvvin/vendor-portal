var slideIndex = 0;
var slideIndex1 = 0;
carousel();
carousel1();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 4000); // Change image every 2 seconds
}


function carousel1() {
  var j;
  var y = document.getElementsByClassName("mySlides1");
  for (j = 0; j < y.length; j++) {
    y[j].style.display = "none";
  }
  slideIndex1++;
  if (slideIndex1 > y.length) {slideIndex1 = 1}
  y[slideIndex1-1].style.display = "block";
  setTimeout(carousel1, 5000); // Change image every 2 seconds
}
