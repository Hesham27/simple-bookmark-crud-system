var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var bookMarksCont = [];

if (localStorage.getItem("bookmarkNameData") !== null) {
  bookMarksCont = JSON.parse(localStorage.getItem("bookmarkNameData"));
  displayBookMark();
}
// ********************************************************************************
function addBookmark() {
  if (validationUrl() == true && validationName() == true &&  newRecord() !== false ) {
    var bookMark = {
      siteName: siteNameInput.value,
      siteURL: siteURLInput.value,
    };
  
    bookMarksCont.push(bookMark);
    
    localStorage.setItem("bookmarkNameData", JSON.stringify(bookMarksCont));
   
    displayBookMark();
    clearform();
  } else {
    Swal.fire(`Site Name or Url is not valid, Please follow the rules below :

Site name must contain at least 3 characters
Site URL must be a valid one`);
  }
}

// ******************************************************************************
function clearform() {
  siteName.value = null;
  siteURL.value = null;
  siteName.classList.remove('is-valid')
  siteName.classList.remove('is-invalid')
  siteURL.classList.remove("is-valid")
  siteURL.classList.remove("is-invalid")

}
// **************************************************************

function displayBookMark() {
  var cartona = "";
  for (var i = 0; i < bookMarksCont.length; i++) {
    cartona += ` <tr>
    <th scope="row">${i + 1}</th>
    <td>${bookMarksCont[i].siteName}</td>
    <td>
      <a href="${bookMarksCont[i].siteURL}"target="_blank"
        ><button type="button" class="btn btn-visit">
          <span class="pe-2"><i class="fa-solid fa-eye"></i></span>
          visit
        </button></a
      >
    </td>
    <td>
      <button onclick="deleteItem(${i})" type="button" class="btn btn-danger">
        <span class="pe-2"><i class="fa-solid fa-trash-can"></i></span
        >Delete
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("bookmarkRow").innerHTML = cartona;
}
function deleteItem(index) {
  bookMarksCont.splice(index, 1);
  localStorage.setItem("bookmarkNameData", JSON.stringify(bookMarksCont));
  displayBookMark();
}

function validationUrl() {
  var regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

  var text = siteURLInput.value;
  if (regex.test(text)) {
    siteURLInput.classList.add("is-valid");
    siteURLInput.classList.remove("is-invalid");
    return true;
  } else {
    siteURLInput.classList.remove("is-valid");
    siteURLInput.classList.add("is-invalid");
    return false;
  }
}

function validationName() {
  var regex = /^[a-z0-9_-]{3,15}$/;

  var text =siteNameInput.value ;

  if (regex.test(text)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    return true;
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
    return false;
  }
}



function newRecord(){
  var text =siteNameInput.value;

  if(bookMarksCont.includes(text)){
return true
   
  }

 
}