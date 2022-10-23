import { login } from "../../scripts/api.js";

const leftAside = document.querySelector(".left-aside");
const rightAside = document.querySelector(".right-aside");

function renderLeftAside() {
  leftAside.insertAdjacentHTML(
    "beforeend",
    `<h1>Petinfo</h1>
    <h2><em>Amor</em> e <em>Carinho</em> por meio do conhecimento</h2>
    <span>
      <p>Todas as informações para melhorar a vida do seu pet em um só lugar</p>
      <figure>
        <img src="/assets/img/loginBanner.svg" alt="banner">
      </figure>
    </span>
   `
  );
}

renderLeftAside();

function renderRightAside() {
  rightAside.insertAdjacentHTML(
    "beforeend",
    `<form>
    <h3>Login</h3>
    <label for='email'>Email</label>
    <input type='text' id='email' name='email' placeholder='Digite seu email aqui'>
    <label for='password'>Senha</label>
    <input type='password' id='password' name='password' placeholder='Digite sua senha aqui'>
    <p class='hidden' id='form-alert'></p>
    <button type='submit' class='form-login-btn disable'>Acessar</button>
    <p class='form-question'>Ainda não possui conta?</p>
    <p class='form-info'>Clicando no botão abaixo, você pode se cadastrar rapidamente</p>
    <button type='button' class='register-btn'>Cadastrar</button>
  </form>
  `
  );
}

renderRightAside();

const alert = document.querySelector("#form-alert");

const eventsLogin = () => {
  const form = document.querySelector("form");
  const elements = [...form];
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const buttom = document.querySelector(".form-login-btn");

  elements.forEach((element) => {
    if (element.tagName == "INPUT") {
      element.addEventListener("keyup", () => {
        alert.classList.add("hidden");
        if (email.value !== "" && password.value !== "") {
          buttom.classList.remove("disable");
        } else {
          buttom.classList.add("disable");
        }
      });
    }

    if (
      element.tagName == "BUTTON" &&
      element.className.includes("register-btn")
    ) {
      element.addEventListener("click", () => {
        window.location.replace("/pages/register/");
      });
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    buttom.innerHTML = "";
    buttom.insertAdjacentHTML(
      "beforeend",
      `
      <img src='/assets/img/spinner.svg' alt='spinner' class='loading' id='loading'>
    `
    );
    buttom.classList.add("disable");

    const body = {};

    elements.forEach((elem) => {
      if (elem.tagName == "INPUT" && elem.value !== "") {
        body[elem.id] = elem.value;
      }
    });
    await loginUser(body);
  })

  async function loginUser(data) {
    const response = await login(data);

    if (response.message) {
      buttom.innerHTML = "";
       buttom.innerHTML = "Acessar";
      buttom.classList.remove("disable");
      alert.classList.remove("hidden");
      alert.innerText = response.message;
      console.log(response.message);
    } else {
      console.log("login efetuado com sucesso");
        window.location.replace("/pages/home");
      };
    }
};

eventsLogin();

