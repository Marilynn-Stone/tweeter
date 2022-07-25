/* eslint-disable no-undef */

$(document).ready(function () {
  console.log("client is ready");

  const $createTweetElement = (tweetData) => {
    if (tweetData) {
      const $tweet = `
      <article class="tweet">
        <header> 
          <span><i ${tweetData.user.avatars}></i>${tweetData.user.name}</span>
          <p>${tweetData.user.handle}</p>
        </header>
        <div class="tweet-content">${tweetData.content.text}</div>
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
    }
  };
  
  const $renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const newTweet = $createTweetElement(tweet);
      $('#tweets-container').append(newTweet);
    }
  };
  
  $("form").on("submit", function(event) {
    event.preventDefault();
    $.ajax("/tweets", { method: "POST", data:$(this).serialize()});
  });

  $.get("/tweets")
    .then(data => {
      $renderTweets(data);
    });

});