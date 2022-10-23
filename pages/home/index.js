import {
  getUser,
  getPosts,
  deletePost,
} from "../../scripts/api.js";
import {
  insertPostModal,
  editPostModal,
  deletePostModal,
  showPostModal,
} from "../../scripts/modal.js";

let token = "";

const main = document.querySelector("main");
const modalContainer = document.querySelector(".modal-container");

const checkToken = () => {
  const localToken = localStorage.getItem("userToken");

  if (localToken) {
    token = JSON.parse(localToken);
  } else {
    window.location.replace("/");
  }
};

checkToken();

const signOut = () => {
  const localToken = localStorage.removeItem("userToken");
  window.location.replace("/");
};

const renderTop = async () => {
  const userData = await getUser(token);

  main.insertAdjacentHTML(
    "beforeend",
    ` <header>
      <h3>Petinfo</h3>
      <span>
         <div>
            <button class='new-post-btn'>Criar publicação</button>
            <figure>
               <img src='${userData.avatar}' alt='Avatar' class='avatar'>
            </figure>
         </div>
         <nav>
            <p class='username'>@${userData.username}</p>
            <button class='logout-btn'><img src='/assets/img/logout.svg' alt='logout symbol'>Sair da conta</button>
         </nav>
      </span>
   </header>
   <div class='feed-bar-container'>
      <h3>Feed</h3>
   </div>
   `
  );

  const openModal = document.querySelector(".new-post-btn");

  openModal.addEventListener("click", async () => {
    modalContainer.innerHTML = "";
    insertPostModal();
    modalContainer.classList.toggle("modal-hide");
  });

  const logoutBtn = document.querySelector(".logout-btn");

  logoutBtn.addEventListener("click", () => {
    signOut();
  });
};

const modalDeal = (postID) => {
  deletePostModal()
  const modalClose = document.querySelector(".modal-close-btn");
  const modalCancel = document.querySelector(".modal-cancel-btn");
  const alertBtn = document.querySelector(".modal-alert-btn");

  modalClose.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-hide");
  });

  modalCancel.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-hide");
  });

  alertBtn.addEventListener("click", async () => {
  
    alertBtn.innerHTML = "";
    alertBtn.insertAdjacentHTML(
      "beforeend",
      `
      <img src='/assets/img/spinner.svg' alt='spinner' class='loading' id='loading'>
    `
    );

    alertBtn.classList.add("disable");

    await deletePost(postID, token);
    modalContainer.classList.toggle("modal-hide");

    toast('Post deletado com sucesso!', 'O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed')

    renderMain();

  });
};

export async function renderMain() {
  
  main.innerHTML = ''

  renderTop();

  const posts = await getPosts(token);
  const userInfo = await getUser(token);

  const userId = userInfo.id;

  const section = document.createElement("section");
  section.classList.add("article-section");

  main.appendChild(section);

  posts.forEach((post) => {
    const treatDate = () => {
      const thisDate = post.createdAt;

      const date = new Date(thisDate).toLocaleString("pt-BR", {
        month: "long",
        year: "numeric",
      });

      const newDate = date[0].toUpperCase() + date.substring(1);

      return newDate;
    };

    const article = document.createElement("article");
    article.classList.add("article");
    article.id = post.id;
    const div = document.createElement("div");
    div.classList.add("article-top-container");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = post.user.avatar;
    const username = document.createElement("p");
    username.classList.add("cardname");
    username.innerText = post.user.username;
    const division = document.createElement("p");
    division.classList.add("date");
    division.innerText = "|";
    const date = document.createElement("p");
    date.classList.add("date");
    date.innerText = treatDate();
    const h2 = document.createElement("h2");
    h2.innerText = post.title;
    h2.classList.add("post-title");
    const content = document.createElement("p");
    content.innerText = post.content;
    content.classList.add("post-content");
    const acess = document.createElement("p");
    acess.innerText = "Acessar publicação";
    acess.classList.add("post-acess");

    acess.addEventListener('click', async (event) => {
      const userData = [...event.target.parentNode.children[0].children]
      const postID = event.target.parentNode.id
      await showPostModal(postID,userData)
      modalContainer.classList.toggle("modal-hide");
    })

    figure.append(img);
    div.append(figure, username, division, date);

    if (post.user.id == userId) {
      const div2 = document.createElement("div");
      div2.classList.add("post-btns-container");
      const buttonA = document.createElement("button");
      buttonA.classList.add("edit-post-btn");
      const buttonB = document.createElement("button");
      buttonB.classList.add("delete-post-btn");
      buttonA.innerText = "Editar";
      buttonB.innerText = "Excluir";

      buttonA.addEventListener("click", async (event) => {
        let sectionID = event.target.parentNode.parentNode.parentNode.id;
        editPostModal(sectionID);
        modalContainer.classList.toggle("modal-hide");
      });

      buttonB.addEventListener("click", async () => {
        modalDeal(post.id)
        modalContainer.classList.toggle("modal-hide");
      });

      div2.append(buttonA, buttonB);
      div.append(div2);
    }

    article.append(div, h2, content, acess);
    section.prepend(article);
  });
}

renderMain();
