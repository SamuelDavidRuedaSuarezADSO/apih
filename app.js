import { usuarios, documento } from "./modulo.js";

const $root = document.querySelector('#root');
const $form = document.querySelector('#form');
const $nom = document.querySelector('#nom');
const $apell = document.querySelector('#apell');
const $tipe = document.querySelector('#tipe');
const $dom = document.querySelector('#dom');
const $email = document.querySelector('#email');
const $direcc = document.querySelector('#direcc');
const $boton = document.querySelector('#boton');

const enviar = (datos) => {
  fetch(`http://127.0.0.1:3000/users`, {
    method: 'post',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json; charset=UT-8'
    }
  })
  alert("Los datos fueron enviados correctamente");
}

const validar = (event) => {
  event.preventDefault();
  let nom = $nom.value.trim();
  let apell = $apell.value.trim();
  let tipe = $tipe.value.trim();
  let dom = $dom.value.trim();
  let email = $email.value.trim();
  let direcc = $direcc.value.trim();
  let id;

  if (nom === "" || apell === "" || tipe === "" || dom === "" || email === "" || direcc === "") {
    alert("Error: Por favor lleno todos los campos");
  }
  else {
    if (isNaN(nom)) {
      if (isNaN(apell)) {
        switch (tipe.toUpperCase()) {
          case "TI":
            id = 1;
            break;
          case "CC":
            id = 2;
            break;
          case "CE":
            id = 3;
            break;
          case "PS":
            id = 4;
            break;
          case "LM":
            id = 5;
            break;
        }
        documento(id)
          .then((response) => {
            let res = response[0]
            if (tipe.toUpperCase() === res.name) {
              if (!isNaN(dom)) {
                if (isNaN(email) && /^[\w-\.]+\@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                  if (isNaN(direcc)) {
                    const datos = {
                      nombre: nom,
                      apellido: apell,
                      documento: dom,
                      tipo_documento: res.id,
                      correo: email,
                      direcc: direcc
                    }
                    enviar(datos)
                  }
                  else {
                    alert("Error: LA DIRECCION ESTA INCORRETA")
                  }
                }
                else {
                  alert("Error: El EMAIL no es valido");
                }
              }
              else {
                alert("Error: El DOCUMENTO no es valido");
              }
            }
            else {
              alert("Error: El TIPO DE DOCUMENTO no existe");
            }
          })
      }
      else {
        alert("Error: El APELLIDO no es valido");
      }
    }
    else {
      alert("Error: El NOMBRE no es valido");
    }
  }
}

$form.addEventListener('submit', validar);

