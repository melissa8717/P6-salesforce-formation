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
                let div = document.createElement("div");
                var author = document.createElement("h4");
                var title = document.createElement("h4");
                var ID= document.createElement("h4");
                var text = document.createElement("h4");
                var imgage = document.createElement("img");
                let para = document.createElement("p");
                let bookmarks = document.createElement("i");
                bookmarks.classList.add("fa-regular", "fa-bookmark");
               // console.log(bookList[i].volumeInfo.imageLinks.thumbnail);
                
                if(bookList[i].volumeInfo.imageLinks.thumbnail == null){
                    imgage.src = img/unvalaible.png;
                }
                else{
                    imgage.src = bookList[i].volumeInfo.imageLinks.thumbnail;   
                }
               
                let txt = bookList[i].volumeInfo.description;

                div.className = "element";
                bookmarks.id = "bookmark"+i;
                
                //if more than one author
                for (let j = 0; j < bookList[i].volumeInfo.authors.length; j++) {
                    if(bookList[i].volumeInfo.authors.length > 1){
                        author.innerHTML ="Auteur : " + bookList[i].volumeInfo.authors[0]  ;
                    }
                    else{
                      author.innerHTML ="Auteur : " + bookList[i].volumeInfo.authors;

                    }
                }
                 //console.log(bookList[i].volumeInfo);
                textSearch.innerHTML = "Résultat de la recherche :";
                title.innerHTML = "Titre : " +bookList[i].volumeInfo.title;
                ID.innerHTML = "<br /> Identifiant : " + bookList[i].id;
                
                if(bookList[i].volumeInfo.description ==  null){
                    text.innerHTML = "Description : Information manquante";
                }
                else{
                    text.innerHTML = "Description : " + txt.slice(0, 200)+"...";
                }

                bookDiv.append(div);
                div.append(bookmarks);
                div.append(title);
                div.append(para);
                div.append(ID);
                div.append(author);
                div.append(text);
                div.append(imgage);
                
                //bookmark
                document.getElementById("bookmark"+i).addEventListener('click',function(event){
                event.preventDefault()
                    addPochlist(div);}, false);
            
        i++;    
      }
           count ++;
     if(count =>1){
        document.getElementById("author").value = "";
        document.getElementById("title-book").value = "";
       
    
        }
    if(count > 1){
         document.getElementById("element").textContent = "";

         }
         
     }
    
  
}


function addPochlist(div) {
    //authorBookmark = author;
    
                let poch = document.getElementById("poch");
                let divBookMark = div.innerHTML;
                let divRemove = document.createElement("h4");
                divRemove.innerHTML = divBookMark;
                divRemove.className = "elementMarked";

                poch.appendChild(divRemove);
                sessionStorage.setItem("elementMarked", divRemove.innerHTML);  
                    
                let markSession = sessionStorage.getItem("elementMarked");
                let pochDiv = document.getElementById("poch");
                let pochListDiv = document.createElement("div");
                let bookMark = document.createElement("h4");
                      
                bookMark.innerHTML =  markSession;
                pochListDiv.className = "pochList"; 
    
                pochDiv.appendChild(pochListDiv);
               // pochListDiv.appendChild(divRemove); 
                
                //auto save in refresh  
                let idBookmark = "";
                for(j=0;j<pochListDiv.length;j++){
                   bookMark.id = "bookMarked"+j;
                   idBookmark = document.getElementById("bookMarked"+j);
                }

                // See if we have an autosave value
                // (this will only happen if the page is accidentally refreshed)
                for (let i=0; i < sessionStorage.length; i++) {
                    let cle = sessionStorage.key(i);
                    
                  // Restore the contents of the text field
                  divRemove.innerHTML = sessionStorage.getItem("elementMarked");
                    
                }
                // Listen for changes in the text field
              /* field.addEventListener("change", () => {
                  // And save the results into the session storage object
                  sessionStorage.setItem("elementMarked", bookMark.innerHTML);
                });*/
                
                let iconbook = poch.querySelector(".fa-bookmark");
                iconbook.className ="fa-regular fa-trash";
                 
                let k = 0;
                
                while(k<document.querySelectorAll(".pochList").length){
               
                    iconbook.id = "icon"+k;
                   

                  document.getElementById("icon"+k).addEventListener('click',function(event){
                event.preventDefault()
                    removePochlist(divRemove);}, false);
                    
                    k++;
                }    

             
}

function removePochlist(divRemove){
     console.log("remove");
    let poch = document.getElementById("poch");
    console.log(divRemove.parentNode);
    poch.removeChild(divRemove);
   sessionStorage.removeItem("elementMarked");
    
   
    
        
 }
