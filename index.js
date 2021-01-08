//add button listener
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', addReview);

//review constructor
class Review {
  constructor (title, comment, stars) {
    this.title = form.title.value;
    this.comment = form.comment.value;
    this.stars = form.stars.value;
  }
}

//create review
let myReview = [];
let newReview;

function addReview() {

  event.preventDefault();

  newReview = new Review(title, comment, stars);
  if(newReview.title!='' && newReview.stars<=5 && newReview.stars>=1){
    myReview.push(newReview);
    setData();
    render();
    form.reset();
  } else {
    alert("Please, first add Title and Rating(1-5).");
  }
}

function render() {
  const display = document.getElementById('review-list');
  const review = document.querySelectorAll('.reviewData');

  review.forEach(e=>display.removeChild(e));

  for(let i=0; i<myReview.length; i++){
    createReview(myReview[i]);
  }

}

//creating elements for review
function createReview(item) {

  const reviewList = document.querySelector('#review-list');

  const reviewDiv = document.createElement('div');
  const titleDiv = document.createElement('p');
  const commentDiv = document.createElement('p');
  const reviewStar = document.createElement('p');
  const removeButton = document.createElement('div');

  reviewDiv.classList.add('reviewData');
  reviewDiv.setAttribute('id', myReview.indexOf(item));

  titleDiv.textContent = item.title;
  titleDiv.classList.add('title');
  reviewDiv.appendChild(titleDiv);

  commentDiv.textContent = item.comment;
  commentDiv.classList.add('comment');
  reviewDiv.appendChild(commentDiv);

//adding stars
  reviewStar.classList.add('stars');
  let newArr=[];
  console.log(item.stars);
  var numb = Math.round(item.stars);
  for(let i=0; i<numb; i++){
    newArr.push('\u2605');
  }
  reviewStar.innerHTML = (newArr.join(' '));
  reviewDiv.appendChild(reviewStar);

  removeButton.textContent = 'REMOVE';
  removeButton.setAttribute('id', 'removeButton');
  reviewDiv.appendChild(removeButton);

  reviewList.appendChild(reviewDiv);

  removeButton.addEventListener('click',()=>{
    myReview.splice(myReview.indexOf(item),1);
    setData();
    render();
  });
};

//dark light mode toggle
const dl = document.querySelector('#dl');
const currentTheme = localStorage.getItem('theme');

if(currentTheme=='dark'){
  document.body.classList.add('dark-theme');
  }

dl.addEventListener('click',function(){
  document.body.classList.toggle('dark-theme');
  let theme = 'light';
  if(document.body.classList.contains('dark-theme')){
    theme='dark';
  }
  localStorage.setItem('theme', theme);
});


//storing in local storage
function setData() {
    localStorage.setItem(`myReview`, JSON.stringify(myReview));
}

//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.myReview) {
        render();
    }else {
        let objects = localStorage.getItem('myReview') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myReview = objects;
        render();
    }
}

restore();
