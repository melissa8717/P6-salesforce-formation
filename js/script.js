async function API(){
    
    //url + key api : https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4
    var inputAuthor = document.getElementById("author").value;
    var inputTitleBook = document.getElementById("title-book").value;
    let divSearch = document.getElementById("search");

    const response =  await fetch("https://www.googleapis.com/books/v1/volumes?q="+inputTitleBook+"+inauthor:"+inputAuthor+"&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4");
    const books = await response.json();
    var bookList = [];
    bookList=books.items;
    const bookTotal = books.totalItems;
    //console.log(books);
    
    let bookDiv = document.getElementById("book");
    let newBookDiv = document.getElementById("new-book");
    
    let count = 0;
    
     
     var authorBookmark = "";
     var titleBookmark = "";
     var idBookmark = "";

     if(bookTotal == 0){
        //console.log("if");

        var p = document.createElement("p");
        p.innerHTML = "Aucun livre n’a été trouvé";
        bookDiv.append(p);

        }
     else{
         
         let textSearch = document.createElement("h3");
         divSearch.append(textSearch);
     let  i = 0;
        while(i<bookList.length){
                //console.log("else");
                var div = document.createElement("div");
                var author = document.createElement("h4");
                var title = document.createElement("h4");
                var ID= document.createElement("h4");
                var text = document.createElement("h4");
                var imgage = document.createElement("img");
                var bookmarks = document.createElement("img");
               // console.log(bookList[i].volumeInfo.imageLinks.thumbnail);
                
                /*if(bookList[i].volumeInfo.imageLinks.thumbnail == null){
                    imgage.src = img/unvalaible.png;
                }
                else{
                    imgage.src = bookList[i].volumeInfo.imageLinks.thumbnail;   
                }*/
                let txt = bookList[i].volumeInfo.description;

                div.id = "element";
                bookmarks.id = "bookmark";
                bookmarks.src = "img/add-bookmark-icon.png";
            
                 //console.log(bookList[i].volumeInfo);
                textSearch.innerHTML = "Résultat de la recherche :";
                author.innerHTML ="Auteur : " + bookList[i].volumeInfo.authors;
                title.innerHTML = "Titre : " +bookList[i].volumeInfo.title;
                ID.innerHTML = "Identifiant : " + bookList[i].id;
                
                if(bookList[i].volumeInfo.description ==  null){
                    text.innerHTML = "Description : Information manquante";
                }
                else{
                    text.innerHTML = "Description : " + txt.slice(0, 200);
                }

                bookDiv.append(div);
                
                div.append(bookmarks);
                div.append(title);
                div.append(ID);
                div.append(author);
                div.append(text);
                div.append(imgage);
                
                
                
                //bookmark
                document.getElementById("bookmark").onclick = function() {
                    authorBookmark = author;
                sessionStorage.setItem("title", title.textContent);    
                let titleMarkSession = sessionStorage.getItem("title");
                    
                let pochListDiv = document.getElementById("pochList");
                let titleMark = document.createElement("h4");
                titleMark.innerHTML =  titleMarkSession;
                titleMark.id = "titleMarked";
                pochListDiv.append(titleMark);  
                //auto save in refresh                   
                let field = document.getElementById("titleMarked");

                // See if we have an autosave value
                // (this will only happen if the page is accidentally refreshed)
                if (sessionStorage.getItem("title")) {
                  // Restore the contents of the text field
                    console.log("hello");
                  titleMark.textContent = sessionStorage.getItem("title");
                }
                
                    
                // Listen for changes in the text field
               field.addEventListener("change", () => {
                  // And save the results into the session storage object
                  sessionStorage.setItem("title", titleMark.textContent);
                });
                
                
                 console.log(titleMark.textContent);
                    
                  
                }
                

        i++;    
      }
         //empty field after search
         //inputAuthor = document.getElementById("author").value = "";
         //inputTitleBook = document.getElementById("title-book").value = "";
          /*if (document.getElementById("element").innerHTMl != ""){
                window.onload = function()
                {
                 document.write('');
                }
         }*/
         
         //console.log(document.getElementById("book").innerHTML);
     }
    count ++;
    console.log(count);
     if(count == 1){
        document.getElementById("author").value = "";
        document.getElementById("title-book").value = "";
       
    
        }
    if(count > 1){
                document.getElementById("element").innerHTMl = "";

    }
}
