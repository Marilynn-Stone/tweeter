/* eslint-disable no-undef */

$(document).ready(function() {
  console.log("client is ready");

  $loadTweets();

  $newTweet();

  

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

const $newTweet = () => {
  $("form").on("submit", function(event) {
    event.preventDefault();
    if ($("form textarea").val().length === 0) {
      alert("Please enter some text before submitting tweet.");
    }
    if ($("form textarea").val().length > 140) {
      alert("Your tweet is too long to submit.");
    }
    $.post("/tweets", $(this).serialize())
      .then(() => {
        $loadTweets();
      });
    location.reload();
  });
};