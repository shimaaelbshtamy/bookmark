var NameInput = document.getElementById("nameBtn");
var urlInput = document.getElementById("urlBtn");
var addBtn = document.getElementById("addBtn");
var Guidebox = document.querySelector(".box-info");
var closeBtn = document.getElementById("closeBtn");
var pList = [];
var visitBtns;

if (localStorage.getItem("products") != null) {
  pList = JSON.parse(localStorage.getItem("products"));
  displayProducts(pList);
} else {
  pList = [];
}

function addProduct() {
  if (NameInput.value == "" || urlInput.value == "") {
    return;
  }
  var product = {
    name: NameInput.value,
    url: urlInput.value,
  };

  pList.push(product);
  localStorage.setItem("products", JSON.stringify(pList));

  displayProducts(pList);
}

var globalIndex;

function updateProduct() {
  pList[globalIndex].name = NameInput.value;
  pList[globalIndex].url = urlInput.value;

  displayProducts(pList);
  localStorage.setItem("products", JSON.stringify(pList));

  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function setupFormToUpdata(index) {
  globalIndex = index;
  var p = pList[index];
  NameInput.value = p.name;
  urlInput.value = p.url;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function displayProducts(pList) {
  var cartona = ``;

  for (var i = 0; i < pList.length; i++) {
    cartona += ` <table class="table mt-4 text-center bg-light">
         
          <tbody id="tableContent"> 
              <tr>
                <td>${i + 1}</td>
                <td> ${pList[i].name} </td>
                              
                <td>
                  <button class="btn btn-visit" onclick="openLink(${
                    pList[i].url
                  })" data-index="0 ">
                    <i class="fa-solid fa-eye pe-2"></i>
                    
                    Visit
                    
                  </button>
                </td>
                <td>
                  <button onclick="deleteProduct(${i})" class="btn btn-delete pe-2" data-index="${i}">
                    <i class="fa-solid fa-trash-can"></i>
                   
                    Delete
                  </button>
                </td>
                <td>
                  <button onclick="setupFormToUpdata(${i})" class="btn btn-outline-info" pe-2" data-index="0">
                    <i class="fa-solid fa-pen"></i>
                     updata
                  </button>
                </td>
            </tr>
            </tbody>
        </table>`;
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function deleteProduct(index) {
  pList.splice(index, 1);
  displayProducts(pList);
  localStorage.setItem("products", JSON.stringify(pList));
}

// function openLink(index) {
//   visitBtns = document.querySelectorAll(".btn-visit");
//   if (visitBtns) {
//     for (var i = 0; i < visitBtns.length; i++) {
//       visitBtns[i].addEventListener("click", function (index) {
//         openLink(index);
//       });
//     }
//   }

//   open(`https://${pList.urlInput}`);
// }

function openLink(index) {
 
  open(`https://${pList[index].urlInput}`);
}


var visitBtns = document.querySelectorAll(".btn-visit");

if (visitBtns) {
  for (let i = 0; i < visitBtns.length; i++) {
    visitBtns[i].addEventListener("click", function () {
      openLink(i);
    });
  }
}


function clearForm() {
  NameInput.value = "";
  urlInput.value = "";
}

function filterByName(name) {
  var result = [];

  for (var i = 0; i < pList.length; i++) {
    if (pList[i].name.toLowerCase().includes(name.toLowerCase())) {
      result.push(pList[i]);
      console.log(pList[i]);
    }
  }
  displayProducts(result);
}


addBtn.addEventListener("click", function () {
  if (
    NameInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
    
   
  ) {
    var list = {
      NameInput: capitalize(NameInput.value),
      urlInput: urlInput.value,
    };
    pList.push(list);
    localStorage.setItem("products", JSON.stringify(pList));
    displayProducts(pList.length - 1);
    clearForm();
    NameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
    Guidebox.classList.add("d-none");
  } else {
    Guidebox.classList.remove("d-none");
  }

  
});

// addBtn.addEventListener("click", function () {
//   if (
//     NameInput.classList.add("is-valid") &&
//     urlInput.classList.add("is-valid")
    
    
   
//   ) {
//     var list = {
//       NameInput: NameInput.value,
//       urlInput: urlInput.value,
//     };
//     pList.push(list);
//     localStorage.setItem("products", JSON.stringify(pList));
//     displayProducts(pList.length - 1);
//     clearForm();
//     NameInput.classList.remove("is-valid");
//     urlInput.classList.remove("is-valid");
//     Guidebox.classList.add("d-none");
//   } else {
//     Guidebox.classList.remove("d-none");
//   }
  
  
// });




function closeBox() {
  Guidebox.classList.add("d-none");
}

closeBtn.addEventListener("click", closeBox);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeBox();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeBox();
  }
});

function validate(elm) {
  var regex = {
    nameBtn: /^[A-Z][a-z]{3,15}$/,
    urlBtn:
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/,
  };
  var matched = regex[elm.id].test(elm.value);
  if (matched) {
    elm.classList.remove("is-invalid");
    elm.classList.add("is-valid");
    elm.nextElementSibling.classList.add("d-none");
  } else {
    elm.classList.add("is-invalid");
    elm.classList.remove("is-valid");
    elm.nextElementSibling.classList.remove("d-none");
  }
}
