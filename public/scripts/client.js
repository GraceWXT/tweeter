/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(() => {
  // test data taken from initial-tweets.json
  const user1 = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1648485725887
  };
  const user2 = {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1648572125887
  };
  // const tweets = [ user1, user2 ];

  
  const createTweetArticle = (tweet) => {
    // Create the children elements for header
    const $avatar = $("<img>").attr("src", `${tweet.user.avatars}`)
    const $userName = $("<span>").text(tweet.user.name);
    const $divAvaName = $("<div>").addClass("user-avatar-and-name").append($avatar, $userName);
    const $divHandle = $("<div>").addClass("handle").append(`<span>${tweet.user.handle}</span>`)
    // Create the children elements for footer
    const $divCreatedAt = $("<div>").addClass("created-at").text(`Created at ${Date(tweet.created_at)}`)
    const $divActionIcons = $("<div>").addClass("action-icons").append(`<i class="fa-solid fa-flag"></i>`, `<i class="fa-solid fa-retweet"></i>`, `<i class="fa-solid fa-heart"></i>`);
    // Create header, p and footer elements and append the children elements & text to them accordingly
    const $header = $("<header>").append($divAvaName, $divHandle);
    const $p = $("<p>").text(`${tweet.content.text}`);
    const $footer = $("<footer>").append($divCreatedAt, $divActionIcons);
    // Create an article element and append everything
    const $article = $("<article>").addClass("tweet").append($header, $p, $footer);

    return $article;
  };
  console.log("Create article function loaded")
  console.log(createTweetArticle(user1), createTweetArticle(user2))
  const renderTweets = (tweets) => {
    
  };
  console.log("Rendering function loaded")

  // renderTweets(tweets);

});
