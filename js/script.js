window.addEventListener('load', (event) => {
  formSearchBook();
  getSessionStorage();
});

function formSearchBook(){
    let divBook = document.getElementById("myBooks");
    let form = document.createElement("form");
    
    let labelAuthor = document.createElement("label");
    labelAuthor.textContent = "Auteur :";
    let inputFormAuthor = document.createElement("input");
    inputFormAuthor.id = "author";
    inputFormAuthor.type = "text";
    
    let labelTitle = document.createElement("label");
    labelTitle.textContent = "Titre :";
    let inputFormTitle = document.createElement("input");
    inputFormTitle.id = "title-book";
    inputFormTitle.type = "text";
    
    let inputButtonSearch = document.createElement("input");
    inputButtonSearch.type = "button";
    inputButtonSearch.id = "button-green-search";
    inputButtonSearch.value = "Rechercher";
    
    let buttonCancel = document.createElement("input");
    buttonCancel.className = "button-red";
    buttonCancel.type = "button";
    buttonCancel.value = "Annuler";
    
    let divSearch = document.createElement("div");
    divSearch.id = "search";
    
    let divBookSearch = document.createElement("div");
    divSearch.id = "book";
    
    
   
    divBook.append(form);
    form.append(labelAuthor);
    form.append(inputFormAuthor);
    form.append(labelTitle);
    form.append(inputFormTitle);
    form.append(inputButtonSearch);
    form.append(buttonCancel);
    divBook.append(divSearch);
    divBook.append(divBookSearch);
    
   document.getElementById("button-green-search").addEventListener('click',function(event){
                event.preventDefault()
                    callingButtonSearch();}, false);
}

function callingButtonSearch(){
       document.getElementById("button-green-search").addEventListener('click', API());

}
async function API(){
    console.log("API");
    //url + key api : https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4
    let inputAuthor = document.getElementById("author").value;
    let inputTitleBook = document.getElementById("title-book").value;

    const response =  await fetch("https://www.googleapis.com/books/v1/volumes?q="+inputTitleBook+"+inauthor:"+inputAuthor+"&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4");
    const books = await response.json();
    let bookList = [];
    bookList=books.items;
    const bookTotal = books.totalItems;
    //console.log(books);
   document.getElementById("button-green-search").addEventListener('click', getBook(bookList,bookTotal));
     
}
 
function getBook(bookList,bookTotal){
    console.log("getbook");
    let bookDiv = document.getElementById("book");
    let newBookDiv = document.getElementById("myBooks");

     if(bookTotal == 0){
         
        let p = document.createElement("p");
        p.innerHTML = "Aucun livre n’a été trouvé";
        bookDiv.append(p);

         }
     else{
         
         let textSearch = document.createElement("h3");
         bookDiv.append(textSearch);
         let  i = 0;
     
         while(i<bookList.length){
                //console.log("else");
                let div = document.createElement("div");
                let author = document.createElement("h4");
                let title = document.createElement("h4");
                let ID= document.createElement("h4");
                let text = document.createElement("h4");
                let imgage = document.createElement("img");
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
                console.log(document.getElementById("bookmark"+i));
                //bookmark
                document.getElementById("bookmark"+i).addEventListener('click',function(event){
                event.preventDefault()
                    addPochlist(div);}, false);

        i++;    
      }   
    } 
}

function addPochlist(div) {
    //authorBookmark = author;
    console.log("add");
                let poch = document.getElementById("poch");
    console.log(poch);
                let divBookMark = div.innerHTML;
                let divPoch = document.createElement("h4");
                divPoch.innerHTML = divBookMark;
                divPoch.className = "elementMarked";

                poch.appendChild(divPoch);
                sessionStorage.setItem("session", divPoch.innerHTML);  
                    
                let markSession = sessionStorage.getItem("session");
                let pochDiv = document.getElementById("poch");
                let pochListDiv = document.createElement("div");
                let bookMark = document.createElement("h4");

                //bookMark.innerHTML =  markSession;
                pochListDiv.className = "pochList"; 
    
                pochDiv.appendChild(pochListDiv);
               // pochListDiv.appendChild(divRemove); 
                
                //auto save in refresh  
                let idBookmark = "";
                for(j=0;j<pochListDiv.length;j++){
                   bookMark.id = "bookMarked"+j;
                   idBookmark = document.getElementById("bookMarked"+j);
                }

                
                let iconbook = poch.querySelector(".fa-bookmark");
                iconbook.className ="fa-regular fa-trash";

                let k = 0;
                
                while(k<document.querySelectorAll(".pochList").length){
                    if(sessionStorage.length =! 0){
                        let iconWithSession = k+1;
                        iconbook.id = "icon"+iconWithSession;

                    }
                    else{
                    iconbook.id = "icon"+k;
                   

                  document.getElementById("icon"+k).addEventListener('click',function(event){
                event.preventDefault()
                    removePochlist(divPoch);}, false);
                    }
                    
                    k++;
                    
                }    

             
}

function getSessionStorage(){
     
    let poch = document.getElementById("poch");
    let divPoch = document.createElement("h4");
    divPoch.className = "elementMarked";

    poch.appendChild(divPoch);

    if(sessionStorage.length =! 0){
    
        for (let i=0; i < sessionStorage.length; i++) {
             let session = sessionStorage.getItem(sessionStorage.key(i));
             console.log(session);

             divPoch.innerHTML= session;
        

               let iconbook = poch.querySelector(".fa-bookmark");
             iconbook.className ="fa-regular fa-trash";
                    
            console.log(iconbook);
                    iconbook.id = "icon"+i;

 document.getElementById("icon"+i).addEventListener('click',function(event){
                event.preventDefault()
                    removePochlist(divPoch);}, false);
               }
        
    }

}

function removePochlist(divPoch){
     console.log("remove");
    let poch = document.getElementById("poch");
    console.log(divPoch.parentNode);
    poch.removeChild(divPoch);
    sessionStorage.removeItem("elementMarked");  
        
 }
