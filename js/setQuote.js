const printQuote = () => {
  let api = `https://api.quotable.io/random`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
	  quote.innerHTML = `"${ data.content }"`;
	  if (data.author != null) quoteAuthor.innerHTML = `- ${ data.author }`;
	});  
};

printQuote();
