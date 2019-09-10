$(document).ready(function() {
  var $realBlog = $(".realBlog");
  var numberOfPosts = $realBlog.length;
  var postsPerPage = 5;
  var pageCount = Math.ceil(numberOfPosts/postsPerPage);
  var $pagination = $(".pagination");
  var $backToBlogs = $(".backToBlogs");
  var backToBlogs = document.getElementById("backToBlogs");
  var $blogPageButtons = $(".blogPageButtons");

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
    createPageNumbers(); //Run the createPageNumbers whenever the showPage function is called
  }
  showPage(0); //Run the function so when you open up the blog page it starts on page 1

  function createPageNumbers() {
    var createUl = document.createElement("ul"); //Declare createUl so every time it's called it'll create an unordered list object
    createUl.className = "pageNumbers"; //Give the unordered list object a class
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
        });
      });
    }
  }
  individualPost(); //Run the function so it adds all eventListeners to each post

  if (document.URL.contains("blog.html")) {
    
  }
  elseif () {

  }
  elseif () {

  }
});
