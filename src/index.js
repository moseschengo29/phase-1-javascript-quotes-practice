const form = document.querySelector("#new-quote-form");
const getBtn = document.querySelector(".btn-get");
const quoteList = document.querySelector("#quote-list");

const getQuotes = function () {
  fetch(" http://localhost:3000/quotes")
    .then((res) => res.json())
    .then(function (data) {
      data.forEach((element) => {
        const quoteBlock = document.createElement("div");
        quoteBlock.innerHTML = `
        <li class="quote-card">
          <blockquote class="blockquote">
            <p class="mb-0">${element.quote}</p>
            <footer class="blockquote-footer">${element.author}</footer>
          <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
        </li>
        `;

        const delButton = quoteBlock.querySelector(".btn-danger");
        delButton.addEventListener("click", function () {
          deleteQuote(element);
        });
        quoteList.appendChild(quoteBlock);
      });
    });
};

getBtn.addEventListener("click", function (e) {
  getQuotes();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userQuote = e.target.new_quote.value;
  const author = e.target.author.value;

  let userObj = {
    quote: userQuote,
    author,
  };

  submitQuote(userObj);
});

const submitQuote = function (obj) {
  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json)
    .then((data) => {
      return data;
    });
};

const deleteQuote = function (quote) {
  fetch(`http://localhost:3000/quotes/${quote.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {});
};

// const getLikes = function (quote) {
//   fetch(`http://localhost:3000/likes/${quote.id}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       quote,
//       quoteId: quote.id,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => data);
// };
