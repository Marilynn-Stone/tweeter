$(document).ready(function() {
  console.log("client is ready");

  $loadTweets();

  $newTweet();

  $("#error-message").hide();
});

// Escape function to prevent XSS attack.

const safeHTML = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Two functions that work together to dynamically render new tweets.
const $createTweetElement = (tweetData) => {
  const $tweet = `
    <article class="tweet">
      <header> 
        <span><img src = ${tweetData.user.avatars}></img>${tweetData.user.name}</span>
        <p>${tweetData.user.handle}</p>
      </header>
      <div class="tweet-content">${safeHTML(tweetData.content.text)}</div>
      <footer>
        <time>${timeago.format(tweetData.created_at)}</time>
        <nav>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </nav>
      </footer>
    </article>
  `;
  return $tweet;
};

const $renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const newTweet = $createTweetElement(tweet);
    $('#tweets-container').prepend(newTweet);
  }
};

// Fetch tweets from /tweets page.
const $loadTweets = () => {
  $.get("/tweets")
    .then(data => {
      $renderTweets(data);
    });
};

// Animate and display validation error messages.
const errorMessage = (msg) => {
  $("#error-message").html(msg);
  $("#error-message").slideDown();
};

// Submit new tweet without refreshing page. Change form data into a query string. Implement tweet validation.
const $newTweet = () => {
  $("form").on("submit", function(event) {
    event.preventDefault();
    if ($("form textarea").val().length === 0) {
      errorMessage("\u2A02 Please enter some text before submitting tweet. \u2A02");
    } else if ($("form textarea").val().length > 140) {
      errorMessage("\u2A02 Your tweet is too long to submit. \u2A02");
    } else {
      $.post("/tweets", $(this).serialize())
        .then(() => {
          $loadTweets();
        });
      location.reload();
    }
  });
};