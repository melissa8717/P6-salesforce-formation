window.addEventListener('load', (event) => {
  callingForm();
  getSessionStorage();
});

function callingForm(){
    let content = document.getElementById("content");
    let divPoch = document.createElement("div");
    let divBook = document.getElementById("myBooks");
    let newBook = divBook.querySelector(".h2");
    let buttonAdd = document.createElement("input");
    
    buttonAdd.id = "add-book";
    buttonAdd.value = "Ajouter un livre";
    buttonAdd.type = "button";
    
    divPoch.id = "poch";
    newBook.id = "new-book";
   //// newBook.id = "new-book";
    
    divBook.append(buttonAdd);
    divBook.append(divPoch);
    
    document.getElementById("add-book").addEventListener('click',function(event){
                event.preventDefault()
                    initPage();}, false);
}
function initPage(){
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
    
    let divPoch = document.createElement("div");
    divPoch.id = "poch";
    
    let divBookSearch = document.createElement("div");
    divBookSearch.id = "book";
    
    let content = document.getElementById("content");
    
    let titlePochDiv = document.createElement("h2");
    titlePochDiv.innerHTML = "<hr>"+"Ma poch'liste";
   
    divBook.append(form);
    form.append(labelAuthor);
    form.append(inputFormAuthor);
    form.append(labelTitle);
    form.append(inputFormTitle);
    form.append(inputButtonSearch);
    form.append(buttonCancel);
    divBook.append(divSearch);
    divBook.append(divBookSearch);
    divBook.append(divPoch);
    divPoch.append(titlePochDiv);
    
   document.getElementById("button-green-search").addEventListener('click',function(event){
                event.preventDefault()
                    callingButtonSearch();}, false);
    
    buttonCancel.onclick = function(){
    location.reload();
    let tagForm = document.getElementsByTagName("form");
    tagForm.innerHTML = "";
     callingForm();
    
    };
}
function fieldRequired(){
    let inputAuthor = document.getElementById("author").value;
    let inputTitleBook = document.getElementById("title-book").value;
    
    if(inputAuthor == ""){
        alert("Le champ Auteur ne doit pas être vide");
        return false;
    }
    if(inputTitleBook  == ""){
        alert("Le champ Titre ne doit pas être vide");
        return false;
    }
    
   if(inputTitleBook  == "" && inputAuthor == ""){
        alert("Tous les champs ne doivent pas être vide");
        return false;
    }
    return true;   

}

function callingButtonSearch(){
        if(fieldRequired() == true){
       document.getElementById("button-green-search").addEventListener('click', API());
        }
        else{
            fieldRequired()
        }

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

function lookPochList(){
       let i = 0;
               
       while(i<document.querySelectorAll(".elementMarked").length){
             let divPoch = document.getElementsByClassName("elementMarked");
                    console.log(divPoch[i].textContent);
              let result = divPoch[i].textContent.indexOf('Auteur');
                    console.log(result);
              let idSub = divPoch[i].textContent.substring(result,-12);
              let idPoch = idSub.substring(divPoch[i].textContent.indexOf('Identifiant : ') );
              let idPochSub = idPoch.substring(14)
                    console.log(idPochSub); 
                    
              i++;
              return idPochSub;
        }
    
}



function getBook(bookList,bookTotal){
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
                ID.innerHTML = "Identifiant : " + bookList[i].id;
                
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
                
               //let idBook = ID.substring(14);
                document.getElementById("bookmark"+i).addEventListener('click',function(event){
                    event.preventDefault()
                        if(lookPochList() ==  bookList[i].id){
                        alert("Livre déjà présent dans la Poch'list !");
                        }
                        else{
                             addPochlist(div);

                             }

                     }, false);
                                                                           

        i++;    
      }   
    } 
}


function addPochlist(div) {
    //authorBookmark = author;
    console.log("add");
                //let idBook = ID.substring(14);
               
                let poch = document.getElementById("poch");
                let divBookMark = div.innerHTML;
                let divPoch = document.createElement("h4");
                divPoch.innerHTML = divBookMark;
                divPoch.className = "elementMarked";

                poch.appendChild(divPoch);
                sessionStorage.setItem("session", divPoch.innerHTML); 
                    
                let markSession = sessionStorage.getItem("session");
                let pochDiv = document.getElementById("poch");
                let pochListDiv = document.createElement("div");

                pochListDiv.className = "pochList"; 
    
                pochDiv.appendChild(pochListDiv);
                
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
    let divSession = document.createElement("h4");
    divSession.className = "elementMarked";

    poch.appendChild(divSession);

    if(sessionStorage.length =! 0){
    
        for (let i=0; i < sessionStorage.length; i++) {
             let session = sessionStorage.getItem(sessionStorage.key(i));
             divSession.innerHTML= session;

             let iconbook = poch.querySelector(".fa-bookmark");
             iconbook.className ="fa-regular fa-trash";
             iconbook.id = "icon"+i;

             document.getElementById("icon"+i).addEventListener('click',function(event){
                event.preventDefault()
                    removePochlist(divSession);}, false);
         }
        
    }

}

function removePochlist(divSession){
     console.log("remove");
    let poch = document.getElementById("poch");
    console.log(divSession.parentNode);
    poch.removeChild(divSession);
    sessionStorage.removeItem("elementMarked");  
        
 }
