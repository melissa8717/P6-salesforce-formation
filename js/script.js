async function API(){
    
    //url + key api : https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4
    var inputAuthor = document.getElementById("author").value;
    var inputTitleBook = document.getElementById("title-book").value;
  
    const response =  await fetch("https://www.googleapis.com/books/v1/volumes?q="+inputTitleBook+"+inauthor:"+inputAuthor+"&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4");
    const books = await response.json();
    var bookList = [];
    bookList=books.items;
   console.log(bookList);
    
    let  i = 0;
    while(i<bookList.length){
        
        var bookDiv = document.getElementById("book")
        var div = document.createElement("div");
        var h3Author = document.createElement("h4");
        var h3Title = document.createElement("h4");
        var h3ID= document.createElement("h4");
        var h3Text = document.createElement("h4");

        div.id = "element";
       
        h3Author.innerHTML ="Auteur : " + bookList[i].volumeInfo.authors;
        h3Title.innerHTML = "Titre : " +bookList[i].volumeInfo.title;
        h3ID.innerHTML = "Identifiant : " + bookList[i].id;
        h3Text.innerHTML = "Description : " + bookList[i].volumeInfo.description;
        bookDiv.append(div);
        div.append(h3Title);
        div.append(h3ID);
        div.append(h3Author);
        div.append(h3Text);

       // console.log(bookList[i].volumeInfo.authors);
        i++;
    }
  
    

}
