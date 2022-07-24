/* eslint-disable no-undef */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function () {
  console.log("client is ready");

  $createTweetElement();

  $renderTweets(tweetData);

  $newTweet();

});

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
        <time>${tweetData.created_at}</time>
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

const $newTweet = () => {
  $("form").on("submit", function(event) {
    event.preventDefault();
    $.ajax("/tweets", { method: "POST", data:$(this).serialize()});
  });
};

