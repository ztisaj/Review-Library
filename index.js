const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', addReview);

class Review {
  constructor (title, comment, stars) {
    this.title = form.title.value;
    this.comment = form.comment.value;
    this.stars = parseInt(form.stars.value);
  }
}

let myReview = [];
let newReview;

function addReview() {

  event.preventDefault();

  newReview = new Review(title, comment, stars);
  if(newReview.title!='' && newReview.stars<6 && newReview.stars>0){
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

function createReview(item) {

  const reviewList = document.querySelector('#review-list');

  const reviewDiv = document.createElement('div');
  const titleDiv = document.createElement('p');
  const commentDiv = document.createElement('p');
  const reviewStar = document.createElement('p');
  const removeButton = document.createElement('button');

  reviewDiv.classList.add('reviewData');
  reviewDiv.setAttribute('id', myReview.indexOf(item));

  titleDiv.textContent = item.title;
  titleDiv.classList.add('title');
  reviewDiv.appendChild(titleDiv);

  commentDiv.textContent = item.comment;
  commentDiv.classList.add('comment');
  reviewDiv.appendChild(commentDiv);

  reviewStar.classList.add('stars');
  let newArr=[];
  for(let i=0; i<parseInt(item.stars); i++){
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


function setData() {
    localStorage.setItem(`myReview`, JSON.stringify(myReview));
}

function restore() {
    if(!localStorage.myReview) {
        render();
    }else {
        let objects = localStorage.getItem('myReview');
        objects = JSON.parse(objects);
        myReview = objects;
        render();
    }
}

restore();
