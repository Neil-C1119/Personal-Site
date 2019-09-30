$(document).ready(function() {
  var $realBlog = $(".realBlog");
  var numberOfPosts = $realBlog.length;
  var postsPerPage = 5;
  var pageCount = Math.ceil(numberOfPosts/postsPerPage);
  var $pagination = $(".pagination");
  var $backToBlogs = $(".backToBlogs");
  var backToBlogs = document.getElementById("backToBlogs");
  var $blogPageButtons = $(".blogPageButtons");
  var $pageButton = $(".pageButton");
  var pageButtonsArray = [];

  function activePage() {
    if (window.location.href.indexOf("#1") !== -1) { //If you're on the first page
      pageButtonsArray[0].className = "pageButton inflate active";
      pageButtonsArray[1].className = "pageButton inflate";
      pageButtonsArray[2].className = "pageButton inflate";
    }
    else if (window.location.href.indexOf("#2") !== -1) { //If you're on the second page
      pageButtonsArray[0].className = "pageButton inflate";
      pageButtonsArray[1].className = "pageButton inflate active";
      pageButtonsArray[2].className = "pageButton inflate";
    }
    else if (window.location.href.indexOf("#3") !== -1) { //If you're on the third page
      pageButtonsArray[0].className = "pageButton inflate";
      pageButtonsArray[1].className = "pageButton inflate";
      pageButtonsArray[2].className = "pageButton inflate active";
    }
  }

  function showPage(page) {
    $realBlog.hide(); //Hide everything on the page
    $backToBlogs.hide(); //Hide the "Back to the Blogs" div at the bottom of the page
    $blogPageButtons.show(); //Show the blogPageButtons in case they were hidden before
    let postsToDisplay = []; //Create an empty array to push blog posts into
    for (let i = 0; i < numberOfPosts; i += 1) { //Looping through each blog post
      if (i >= page * postsPerPage && i <= page * postsPerPage + postsPerPage - 1) { //Function to get page 1 = posts 1-10, page 2 = posts 11-20, etc.
        postsToDisplay.push($realBlog[i]); //Push the correct blog posts to the empty array
        $(postsToDisplay).show(); //Show the array of blog posts on the page
      }
    }
    return postsToDisplay;
    createPageNumbers(); //Run createPageNumbers whenever the showPage function is called
  }
  showPage(0); //Run the function so when you open up the blog page it starts on page 1

  function createPageNumbers() {
    var createUl = document.createElement("ul"); //Declare createUl so every time it's called it'll create an unordered list object
    createUl.className = "pageNumbers"; //Give the unordered list object a class
    createUl.id = "pageNumbers"; //Give the unordered list object an ID
    for (let i = 1; i <= pageCount; i += 1) { //Count the amount of blog posts, and for every 10 posts...
      var createLi = document.createElement("li"); //Create a list item
      var createA = document.createElement("a"); //Create an anchor item
      createA.href = "#" + i; //Set the anchor's href to # + i
      createA.textContent = i; //Set the text content of the anchor to i
      createLi.className = "pageButton inflate"; //Set the list item's class to "PageButton"
      createLi.append(createA); //Append the anchor to the list item
      createUl.append(createLi); //Append the list item to the unordered list
      $(".pagination").append(createUl); //Append the unordered list to the page element with the class "pagination"
      createA.addEventListener("click", () => { //Add a click listener to the anchors
        showPage(i - 1); //Run the showPage function for whatever i is clicked
        window.scrollTo(0,0); //Scroll to the top of the page
        setTimeout(activePage, 50); //Wait 50 milliseconds before running the activePage function (so it reads the proper window.location.href.indexOf)
      });
    }
  }
  createPageNumbers(); //Run the function so it creates page links at the bottom

  function individualPost() {
    let postsToListen = [] //An empty array for posts to add an eventlistener to
    for (let i = 0; i < numberOfPosts; i++) { //Loop throught all of the posts on the page and...
      postsToListen.push($realBlog[i]); //Push each blog post into the postsToListen array
      let postToDisplay = []; //An empty array for deciding which post to display
      postsToListen[i].addEventListener("click", () => { //When you click on a specific post...
        $realBlog.hide(); //Hide every post
        postToDisplay.push(postsToListen[i]); //Push the clicked post into the postToDisplay array
        $(postToDisplay).show(); //Show what's in the postToDisplay array
        $(".blogPageButtons").hide(); //Hide the page buttons at the bottom
        $(".borderBottom").hide(); //Hide the bottom border of the posts
        $backToBlogs.show(); //Show the "Back to the Blogs" div at the bottom of the page
        backToBlogs.addEventListener("click", () => { //When you click on the "Back to the Blogs" div...
          showPage(0); //Show the first page of blog posts
          pageButtonsArray[0].className = "pageButton inflate active"; //Make the first page the active one, since it redirects you back to it
          if (window.location.href.indexOf("#2") !== -1) { //If you were on the second page previously...
            pageButtonsArray[1].className = "pageButton inflate"; //Reset the 2nd page button's classnames
          }
          else if (window.location.href.indexOf("#3") !== -1) { //If you were on the third page previously...
            pageButtonsArray[2].className = "pageButton inflate"; //Reset the 3rd page button's classnames
          }
        });
      });
    }
  }
  individualPost(); //Run the function so it adds all eventListeners to each post

  var pageNumbers = document.getElementById("pageNumbers"); //Grab the HTML element with the ID "pageNumbers"
  for(i = 0; i < pageNumbers.childNodes.length; i++) { //Loop through the amount of list items in the pageNumbers list and...
    pageButtonsArray.push(pageNumbers.childNodes[i]); //Push the list item into the pageButtonsArray
    pageButtonsArray[0].className = "pageButton inflate active"; //Set the first page button as the active page
  }
});
