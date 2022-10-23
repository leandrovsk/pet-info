import { insertPost, getPosts, updatePost, getUser } from "./api.js";

const localToken = localStorage.getItem("userToken");
const token = JSON.parse(localToken);

const modalContainer = document.querySelector(".modal-container");

async function getPost(postID) {
  const posts = await getPosts(token);
  const resp = posts.find((elem) => {
    return postID == elem.id;
  });
  return resp;
}

export function insertPostModal() {
  modalContainer.innerHTML = "";
  modalContainer.insertAdjacentHTML(
    "beforeend",
    `<div class='modal'>
             <span>
                <h2>Criar novo post</h2>
                <button class='modal-close-btn'>X</button>
             </span>
             <form>
                <div class='form-div-container'>
                   <label for='title'>Título do post</label>
                   <input type='text' id='title' placeholder='Digite o título aqui...'>
                </div>
                <div class='form-div-container'>
                   <label for='content'>Conteúdo do post</label>
                   <textarea id='content' placeholder='Desenvolva o conteúdo do post aqui...'></textarea>
                </div>
                <div class='modal-btn-container'>
                   <button class='modal-cancel-btn' type='button'>Cancelar</button>
                   <button class='modal-post-btn disable'>Publicar</button>
                </div>
             </form>
          </div>`
  );

  const modalClose = document.querySelector(".modal-close-btn");
  const modalCancel = document.querySelector(".modal-cancel-btn");
  const form = document.querySelector("form");
  const elements = [...form];
  const postBtn = document.querySelector(".modal-post-btn");
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");

  elements.forEach((element) => {
    if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
      element.addEventListener("keyup", () => {
        if (title.value !== "" && content.value !== "") {
          postBtn.classList.remove("disable");
        } else {
          postBtn.classList.add("disable");
        }
      });
    }
  });

  modalClose.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-hide");
  });

  modalCancel.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-hide");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    postBtn.innerHTML = "";
    postBtn.insertAdjacentHTML(
      "beforeend",
      `
     <img src='/assets/img/spinner.svg' alt='spinner' class='loading' id='loading'>
   `
    );

    postBtn.classList.add("disable");

    const body = {};

    elements.forEach((elem) => {
      if (
        (elem.tagName == "INPUT" && elem.value !== "") ||
        (elem.tagName == "TEXTAREA" && elem.value !== "")
      ) {
        body[elem.id] = elem.value;
      }
    });
    const response = await insertPost(body, token);
    modalContainer.classList.toggle("modal-hide");
    document.location.reload(true);
    return response;
  });
}

export async function editPostModal(postID) {
  const post = await getPost(postID);

  modalContainer.innerHTML = "";
  modalContainer.insertAdjacentHTML(
    "beforeend",
    `<div class='modal'>
            <span>
               <h2>Edição</h2>
               <button class='modal-close-btn'>X</button>
            </span>
            <form>
               <div class='form-div-container'>
                  <label for='title'>Título do post</label>
                  <input type='text' id='title'>
               </div>
               <div class='form-div-container'>
                  <label for='content'>Conteúdo do post</label>
                  <textarea id='content'></textarea>
               </div>
               <div class='modal-btn-container'>
                  <button class='modal-cancel-btn' type='button'>Cancelar</button>
                  <button class='modal-post-btn disable'>Salvar Alterações</button>
               </div>
            </form>
         </div>`
  );

  const modalClose = document.querySelector(".modal-close-btn");
  const modalCancel = document.querySelector(".modal-cancel-btn");
  const postBtn = document.querySelector(".modal-post-btn");
  const form = document.querySelector("form");
  const elements = [...form];
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");

  title.value = post.title;
  content.value = post.content;

  elements.forEach((element) => {
    if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
      element.addEventListener("keyup", () => {
        if (title.value !== "" && content.value !== "") {
          postBtn.classList.remove("disable");
        } else {
          postBtn.classList.add("disable");
        }
      });
    }
  });

  modalClose.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-hide");
  });

  modalCancel.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-hide");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    postBtn.innerHTML = "";
    postBtn.insertAdjacentHTML(
      "beforeend",
      `
    <img src='/assets/img/spinner.svg' alt='spinner' class='loading' id='loading'>
  `
    );

    postBtn.classList.add("disable");

    const body = {};

    elements.forEach((elem) => {
      if (
        (elem.tagName == "INPUT" && elem.value !== "") ||
        (elem.tagName == "TEXTAREA" && elem.value !== "")
      ) {
        body[elem.id] = elem.value;
      }
    });
    const response = await updatePost(body, post.id, token);
    modalContainer.classList.toggle("modal-hide");
    document.location.reload(true);
    return response;
  });
}

export async function deletePostModal() {
   modalContainer.innerHTML = "";
   modalContainer.insertAdjacentHTML(
     "beforeend",
     `<div class='modal'>
              <span>
                 <h2>Confirmação de exclusão</h2>
                 <button class='modal-close-btn'>X</button>
              </span>
                 <div class='del-div-container'>
                    <h2 class='del-title'>Tem certeza que deseja excluir este post?</h2>
                    <p class='del-info'>Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>
                 </div>
                 <div class='modal-btn-container'>
                    <button class='modal-cancel-btn' type='button'>Cancelar</button>
                    <button class='modal-alert-btn'>Sim, excluir este post</button>
                 </div>
           </div>`
   );
}

export async function showPostModal(postID, userData) {

  const post = await getPost(postID);

  modalContainer.innerHTML = "";
  modalContainer.insertAdjacentHTML(
    "beforeend",
    `<div class='modal'>
               <div class='article-top-container'>
                  <figure>
                    ${userData[0].innerHTML}
                  </figure>
                  <p class='cardname'>${userData[1].innerHTML}</p>
                  <p class='date'>${userData[2].innerHTML}</p>
                  <p class='date'>${userData[3].innerHTML}</p>
                  <button class='close-btn'>X</button>
               </div>
               <div class='modal-post-container'>
                  <h2 class='modal-post-title'>${post.title}</h2>
                  <p class='modal-post-content'>${post.content}</p>
               </div>
         </div>`
  );

    const modalClose = document.querySelector('.close-btn')

  modalClose.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-hide");
  });
}