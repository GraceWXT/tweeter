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
      "avatars": "https://github.com/GraceWXT/tweeter/blob/master/public/images/user-avatar-1.png?raw=true",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1648684074309
  };
  const user2 = {
    "user": {
      "name": "Descartes",
      "avatars": "https://raw.githubusercontent.com/GraceWXT/tweeter/23e8794ae8276690bc58127ab35979fa57147112/public/images/user-avatar-2.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1648572125887
  };

  const tweets = [ user1, user2 ];

  
  const createTweetArticle = (tweet) => {

    // Create the children elements for header
    const $avatar = $("<img>").attr("src", `${tweet.user.avatars}`);
    const $userName = $("<span>").text(tweet.user.name);
    const $divAvaName = $("<div>").addClass("user-avatar-and-name").append($avatar, $userName);
    const $divHandle = $("<div>").addClass("handle").append(`<span>${tweet.user.handle}</span>`);
    
    // Calculate the day & hour difference from tweet creation tumestamp to provide the text to footer
    const day = Math.floor((Date.now() - tweet.created_at) / (24 * 3600 * 1000));
    const hour = Math.floor(((Date.now() - tweet.created_at) % (24 * 3600 * 1000)) / (3600 * 1000));
    const dayText = `${day ? day : ""}${day ? (day !== 1 ? " days " : " day ") : ""}`;
    const hourText = `${hour}${hour !== 1 ? " hours " : " hour "}`;
    const createdTimeText = `${dayText ? dayText : ""}${hourText}ago`;
    
    // Create the children elements for footer
    const $divCreatedAt = $("<div>").addClass("created-at").text(createdTimeText);
    const $divActionIcons = $("<div>").addClass("action-icons").append(`<i class="fa-solid fa-flag"></i>`, `<i class="fa-solid fa-retweet"></i>`, `<i class="fa-solid fa-heart"></i>`);
    
    // Create header, p and footer elements and append the children elements & text to them accordingly
    const $header = $("<header>").append($divAvaName, $divHandle);
    const $p = $("<p>").text(`${tweet.content.text}`);
    const $footer = $("<footer>").append($divCreatedAt, $divActionIcons);
    
    // Create an article element and append everything
    const $article = $("<article>").addClass("tweet").append($header, $p, $footer);

    return $article;
  };
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $article = createTweetArticle(tweet);
      $("section#tweets-container").append($article);
    }
  };

  renderTweets(tweets);

  $("section.new-tweet > form").submit((event) => {
    event.preventDefault();
    console.log("Submission prevented");
  })

});
