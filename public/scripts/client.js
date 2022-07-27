/* eslint-disable no-undef */

$(document).ready(function() {
  console.log("client is ready");

  $loadTweets();

  $newTweet();

  $("#error-message").hide();
});

const safeHTML = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const $createTweetElement = (tweetData) => {
  const $tweet = `
    <article class="tweet">
      <header> 
        <span><i ${tweetData.user.avatars}></i>${tweetData.user.name}</span>
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

const $loadTweets = () => {
  $.get("/tweets")
    .then(data => {
      $renderTweets(data);
    });
};

const errorMessage = (msg) => {
  $("#error-message").html(msg);
  $("#error-message").slideDown();
};

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