$(document).ready(function() {
  var realBlog = document.getElementsByClassName("realBlog");
  //var numberOfPosts = realBlog.length;
  var postsPerPage = 10;
  var pageCount = Math.ceil(realBlog.length/10);
  var $pagination = $(".pagination")

  function showPage(page) {
    $(realBlog).hide();
    let postsToDisplay = [];
    for (let i = 0; i < realBlog.length; i += 1) {
      if (i >= page * postsPerPage && i <= page * postsPerPage + postsPerPage - 1) {
        postsToDisplay.push(realBlog[i]);
        console.log(i);
        $(postsToDisplay[i]).show();
      }
    }
    console.log(postsToDisplay);
  }

  function createPageNumbers() {
    var createUl = document.createElement("ul");
    createUl.className = "pageNumbers";
    for (let i = 1; i <= Math.ceil(realBlog.length/10); i += 1) {
      var createLi = document.createElement("li");
      var createA = document.createElement("a");
      createA.href = "#" + i;
      createA.textContent = i;
      createLi.className = "pageButton";
      createLi.append(createA);
      createUl.append(createLi);
      $(".pagination").append(createUl);
      createA.addEventListener("click", () => {
        showPage(i - 1);
      });
    }
  }

  showPage(0);
  createPageNumbers();
});
