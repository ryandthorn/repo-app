'use strict';

const searchURL = 'https://api.github.com/users/';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getRepo(query, params) {
  const queryString = formatQueryParams(params)
  const url = searchURL + `${query}` + '/repos?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function displayResults(responseJson) {
  console.log(responseJson);
  $('#js-error-message').empty();
  $('#results-list').empty();

  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
    `<li>
      <h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url}/${responseJson[i].name}">${responseJson[i].html_url}/${responseJson[i].name}</a>
    </li>`
    )};

  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search').val();
    const params = {
      type: $('#js-type').val(),
      sort: $('#js-sort').val(),
      direction: $('#js-direction').val() 
    };
    getRepo(searchTerm, params);
  });
}

$(watchForm);