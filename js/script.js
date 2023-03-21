function API(){
    
    //GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4
    var inputAuthor = document.getElementById("author").value;
    var inputTitleBook = document.getElementById("title-book").value;

    console.log(inputAuthor);

    fetch("https://www.googleapis.com/books/v1/volumes?q="+inputTitleBook+"+inauthor:"+inputAuthor+"&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4")
    .then((response) => response.json())
    .then((json) => console.log(json));

}
