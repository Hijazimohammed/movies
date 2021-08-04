var getButton = document.getElementById('user_form');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
  event.preventDefault();
  var movieId = event.target.movieId.value;
  fetch('/movies/' + movieId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!movieId) {
        document.getElementById('results').innerHTML = '';
        for (const i in data) {
          document.getElementById('results').innerHTML +=
            data[i].movieTitle + ' <br>';
        }
      } else {
        if (data.movieTitle == undefined) {
          document.getElementById('results').innerHTML = '';
          document.getElementById('results').innerHTML +=
            'The ID selected was not found.' + '<br>';
        } else {
          document.getElementById('results').innerHTML = '';
          document.getElementById('results').innerHTML +=
            data.movieTitle + '<br>';
        }
      }

      console.log(JSON.stringify(data));
    });
}

var postButton = document.getElementById('user_form_post');
postButton.addEventListener('submit', newPost);

function newPost(event, post) {
  event.preventDefault();
  var movieTitle = event.target.movieTitle.value;
  var movieDirector = event.target.movieDirector.value;
  post = {
    movieDirector: movieDirector,
    movieTitle: movieTitle,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  return fetch('/movies', options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .then((error) => console.log('error', error));
}

var deleteButton = document.getElementById('user_form_delete');
deleteButton.addEventListener('submit', deleteMovie);

function deleteMovie(event) {
  event.preventDefault();
  var movieId = event.target.movieId.value;
  const options = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      movieId: movieId,
    }),
  };
  const URL = '/movies/' + movieId;

  fetch(URL, options)
    .then((response) => response.json())
    .then((data) => console.log('movie id ', data));
}

var putButton = document.getElementById('user_form_put');
putButton.addEventListener('submit', updateMovie);

function updateMovie(event) {
  event.preventDefault();
  var movieId = event.target.movieId.value;
  var movieTitle = event.target.movieTitle.value;
  var movieDirector = event.target.movieDirector.value;

  post = {
    movieDirector: movieDirector,
    movieTitle: movieTitle,
  };
  const options = {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(post),
  };

  const URL = '/movies/' + movieId;
  fetch(URL, options)
    .then((response) => response.json())
    .then((data) => console.log('movie update :', data));
}
