window.addEventListener('load', (event) => {
    callingForm();
    getSessionStorage();
});

function callingForm() {
    let content = document.getElementById("content");
    let divBook = document.getElementById("myBooks");
    let newBook = divBook.querySelector(".h2");
    let buttonAdd = document.createElement("input");
    let pochTitle = content.querySelectorAll(".h2");
    let divFirst = document.createElement("div");

    divFirst.id = "first";

    pochTitle.id = "pochTitle";

    buttonAdd.id = "add-book";
    buttonAdd.value = "Ajouter un livre";
    buttonAdd.type = "button";

    newBook.id = "new-book";
    newBook.innerHTML = "Nouveau livre" + "<br />" + "<br />";

    newBook.append(buttonAdd);
    newBook.append(divFirst);



    document.getElementById("add-book").addEventListener('click', function (event) {
        event.preventDefault()
        initPage(), deleteButtonBook();
    }, false);
}

function deleteButtonBook() {
    let divNewBook = document.getElementById("new-book");
    let buttonAdd = document.getElementById("add-book");
    divNewBook.removeChild(buttonAdd);

}
function initPage() {
    let content = document.getElementById("content");
    let divBook = document.getElementById("myBooks");
    let divFirst = document.getElementById("first");
    let form = document.createElement("form");

    form.id = "form-search";


    let labelAuthor = document.createElement("label");
    labelAuthor.textContent = "Auteur :";
    let inputFormAuthor = document.createElement("input");
    inputFormAuthor.id = "author";
    inputFormAuthor.type = "text";

    let labelTitle = document.createElement("label");
    labelTitle.textContent = "Titre du livre:";
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
    divBookSearch.id = "book";


    let newBook = divBook.querySelector(".h2");
    let br = document.createElement("BR");

    let divPoch = document.getElementById("poch");

    divFirst.append(form);
    form.append(labelTitle);
    form.append(inputFormTitle);
    form.append(labelAuthor);
    form.append(inputFormAuthor);
    form.append(inputButtonSearch);
    form.append(br);
    form.append(buttonCancel);
    divFirst.append(divSearch);
    divFirst.append(divBookSearch);
    divFirst.append(divPoch);

    document.getElementById("button-green-search").addEventListener('click', function (event) {
        event.preventDefault()
        callingButtonSearch(), cleanFieldSearch();
    }, false);

    buttonCancel.onclick = function () {
        location.reload();
        let tagForm = document.getElementsByTagName("form");
        tagForm.innerHTML = "";
        callingForm();

    };
}
function fieldRequired() {
    let inputAuthor = document.getElementById("author").value;
    let inputTitleBook = document.getElementById("title-book").value;

    if (inputAuthor == "") {
        alert("Le champ Auteur ne doit pas être vide");
        return false;
    }
    if (inputTitleBook == "") {
        alert("Le champ Titre ne doit pas être vide");
        return false;
    }

    if (inputTitleBook == "" && inputAuthor == "") {
        alert("Tous les champs ne doivent pas être vide");
        return false;
    }
    return true;

}

function callingButtonSearch() {
    if (fieldRequired() == true) {
        document.getElementById("button-green-search").addEventListener('click', API());
    } else {
        fieldRequired();
    }

}

function cleanFieldSearch() {
    if (document.getElementById("author").value && document.getElementById("title-book").value != "") {
        document.getElementById("author").value = "";
        document.getElementById("title-book").value = "";

    }
}

async function API() {
    console.log("API");
    //url + key api : https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4
    let inputAuthor = document.getElementById("author").value;
    let inputTitleBook = document.getElementById("title-book").value;

    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + inputTitleBook + "+inauthor:" + inputAuthor + "&key=AIzaSyDPkQzkp7tT8hwUHtCOMVg634fYz_qXMl4");
    const books = await response.json();
    let bookList = [];
    bookList = books.items;
    const bookTotal = books.totalItems;
    //console.log(books);
    document.getElementById("button-green-search").addEventListener('click', getBook(bookList, bookTotal), cleanFieldSearch());

}





function getBook(bookList, bookTotal) {
    let bookDiv = document.getElementById("book");
    let newBookDiv = document.getElementById("myBooks");
    let divFirst = document.getElementById("first");



    if (bookTotal == 0) {

        let p = document.createElement("p");
        p.innerHTML = "Aucun livre n’a été trouvé";
        bookDiv.append(p);

    } else {

        let textSearch = document.createElement("h3");
        bookDiv.append(textSearch);

        let  i = 0;

        while (i < bookList.length) {
            //console.log("else");
            let div = document.createElement("div");
            let author = document.createElement("h4");
            let title = document.createElement("h4");
            let ID = document.createElement("h4");
            let text = document.createElement("h4");
            let imgage = document.createElement("img");
            let para = document.createElement("p");
            let bookmarks = document.createElement("i");
            bookmarks.classList.add("fa-regular", "fa-bookmark");
            // console.log(bookList[i].volumeInfo.imageLinks.thumbnail);

            if (bookList[i].volumeInfo.imageLinks.thumbnail == null) {
                imgage.src = img / unvalaible.png;
            } else {
                imgage.src = bookList[i].volumeInfo.imageLinks.thumbnail;
            }

            let txt = bookList[i].volumeInfo.description;

            div.className = "element";
            bookmarks.id = "bookmark" + i;

            //if more than one author
            for (let j = 0; j < bookList[i].volumeInfo.authors.length; j++) {
                if (bookList[i].volumeInfo.authors.length > 1) {
                    author.innerHTML = "Auteur : " + bookList[i].volumeInfo.authors[0];
                } else {
                    author.innerHTML = "Auteur : " + bookList[i].volumeInfo.authors;

                }
            }
            //console.log(bookList[i].volumeInfo);
            textSearch.innerHTML = "Résultat de la recherche :";
            title.innerHTML = "Titre : " + bookList[i].volumeInfo.title;
            ID.innerHTML = "Identifiant : " + bookList[i].id;

            if (bookList[i].volumeInfo.description == null) {
                text.innerHTML = "Description : Information manquante";
            } else {
                text.innerHTML = "Description : " + txt.slice(0, 200) + "...";
            }

            bookDiv.append(div);
            div.append(bookmarks);
            div.append(title);
            div.append(para);
            div.append(ID);
            div.append(author);
            div.append(text);
            div.append(imgage);
            document.getElementById("bookmark" + i).addEventListener('click', function (event) {
                event.preventDefault()
                if (document.querySelectorAll(".elementMarked").length > 0) {
                    lookPochList(div);
                } else {
                    sessionStorage.setItem("session"+i, div.innerHTML);
                    addPochlist(div);

                }


            }, false);


            i++;
        }
    }
}

function lookPochList(div) {
    let i = 0;
    let resultDiv = div.textContent.indexOf('Auteur');
    // console.log(result);
    let idSubDiv = div.textContent.substring(resultDiv, -12);
    let idPochDiv = idSubDiv.substring(div.textContent.indexOf('Identifiant : '));
    let idPochSubDiv = idPochDiv.substring(14);
    let idPochSub = "";
    while (i < document.querySelectorAll(".elementMarked").length) {
        let divPoch = document.getElementsByClassName("elementMarked");
        let result = divPoch[i].textContent.indexOf('Auteur');
        let idSub = divPoch[i].textContent.substring(result, -12);
        let idPoch = idSub.substring(divPoch[i].textContent.indexOf('Identifiant : '));
        idPochSub = idPoch.substring(14);


        i++;
    }
    if (idPochSubDiv == idPochSub) {
        alert("Le livre est déjà dans la poch'list");
    } else {
        alert("Le livre a été ajouté à la poch'list");
        sessionStorage.setItem("session"+i, div.innerHTML);
        addPochlist(div);

    }

}

function addPochlist(div) {
    //authorBookmark = author;
    console.log("add");
    //let idBook = ID.substring(14);

    let content = document.getElementById("content");
    let divBookMark = div.innerHTML;
    let divPoch = document.createElement("h4");
    divPoch.innerHTML = divBookMark;
    divPoch.className = "elementMarked";
    divPoch.style.borderColor = "#117A54";

    content.appendChild(divPoch);

    //put all sessionStorage in a json for have all items

    let pochDiv = document.getElementById("poch");
    let pochListDiv = document.createElement("div");

    pochListDiv.className = "pochList";

    content.appendChild(pochListDiv);


    let k = 0;
    let iconbook = content.querySelector(".fa-bookmark");
    iconbook.className = "fa-regular fa-trash";

    while (k < document.querySelectorAll(".pochList").length) {
        console.log(sessionStorage.getItem("session" + k));
        if (sessionStorage.length = !0) {
            let iconWithSession = k + 1;
            iconbook.id = "icon" + iconWithSession;


        } else {
            iconbook.id = "icon" + k;

            document.getElementById("icon" + k).addEventListener('click', function (event) {
                event.preventDefault()
                removePochlist(divPoch);
            }, false);
        }

        k++;

    }


}


function getSessionStorage() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  for(let i =0; i<sessionStorage.length; i++){
        let session = sessionStorage.getItem(sessionStorage.key(i));
        let divSession = document.createElement("div");
        divSession.className = "elementMarked";
        divSession.style.borderColor = "#117A54";
        divSession.innerHTML = session;
        content.appendChild(divSession);
  
        console.log(session);


        let iconbook = content.querySelector(".fa-bookmark");
        iconbook.className = "fa-regular fa-trash";
        iconbook.id = "icon" + i;

        document.getElementById("icon" + i).addEventListener('click', function (event) {
            event.preventDefault()
            removePochlist(divSession);
        }, false);
    }


}

function removePochlist(divSession) {
    let poch = document.getElementById("content");
    poch.removeChild(divSession);
    sessionStorage.removeItem("elementMarked");

}
