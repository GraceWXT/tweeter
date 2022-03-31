/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {  // The function will run when the document is ready

  /** A function that creates the <article> element for each tweet. */
  const createTweetArticle = (tweet) => {

    // Create the children elements for header
    const $avatar = $("<img>").attr("src", `${tweet.user.avatars}`);
    const $userName = $("<span>").text(tweet.user.name);
    const $divAvaName = $("<div>").addClass("user-avatar-and-name").append($avatar, $userName);
    const $divHandle = $("<div>").addClass("handle").append(`<span>${tweet.user.handle}</span>`);
    
    // Calculate the day & hour difference from tweet creation timestamp to provide the text to footer
    const day = Math.floor((Date.now() - tweet.created_at) / (24 * 3600 * 1000));
    const hour = Math.floor(((Date.now() - tweet.created_at) % (24 * 3600 * 1000)) / (3600 * 1000));
    const dayText = `${day ? day : ""}${day ? (day !== 1 ? " days " : " day ") : ""}`;
    const hourText = `${hour}${hour !== 1 ? " hours " : " hour "}`;
    const createdTimeText = `${dayText ? dayText : ""}${hourText}ago`;

    // If were to use the timeago library provided on Compass
    // const createdTimeText = timeago.format(tweet.created_at);
    
    // Create the children elements for footer
    const $divCreatedAt = $("<div>").addClass("created-at").text(createdTimeText);
    const $divActionIcons = $("<div>").addClass("action-icons").append(`<i class="fa-solid fa-flag"></i>`, `<i class="fa-solid fa-retweet"></i>`, `<i class="fa-solid fa-heart"></i>`);
    
    // Create the header, p and footer elements and append the children elements & text to them accordingly
    const $header = $("<header>").append($divAvaName, $divHandle);
    const $p = $("<p>").text(`${tweet.content.text}`);
    const $footer = $("<footer>").append($divCreatedAt, $divActionIcons);
    
    // Create an article element that contains everything
    const $article = $("<article>").addClass("tweet").append($header, $p, $footer);

    return $article;
  };

  /** A function that receives an array of objects (tweets),
   * loop over each element to create <article> elements,
   * and append the created elements to the #tweets-container <section>.  */
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $article = createTweetArticle(tweet);
      $("section#tweets-container").append($article);
    }
  };

  /** A function that will send a request to get the tweets JSON array,
   * and pass it to the renderTweets function to render the tweets content on the website.
   */
  const loadTweets = function() {
    $.ajax("/tweets").then((tweets) => {
      $("section#tweets-container").empty();
      renderTweets(tweets);
    });
  };

  loadTweets();

  /** An event handler that handles new tweet submission asynchronously */

  $("section.new-tweet > form").submit((event) => {
    // Prevent the browser default behaviour for a submit event
    event.preventDefault();
    const textarea = $("textarea#tweet-text");
    // Error handler one: textarea is empty
    if (!textarea.val()) {
      return alert("The tweet is empty!");
    }
    //Error handler two: tweet is more than 140 characters
    if (textarea.val().length > 140) {
      return alert("The tweet is too long!");
    }
    // Serialize the data in the form to a querystring so that we can send it in a HTTP request
    const newTweet = $("section.new-tweet > form").serialize();
    // console.log(newTweet);  // To see the serialized data and verify it's correct
    // Send the AJAX POST request
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: newTweet
    })
    // Empty the textarea, and load the updated tweets JSON
      .then(() => {
        textarea.val("");
        loadTweets();
      })
  });
});
