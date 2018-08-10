// VARIABLES
var subtotal = 0;

if (localStorage.getItem("localPeople") === null) { // revisa si existe y si no la inicializa
    var peopleDicJ = {};
} else {
    var peopleDicJ = JSON.parse(localStorage.getItem('localPeople'));
    setList();
}

// FUNCIONES
function setList(){ // crea la lista si los valores ya existian
    for (var i = 0; i < Object.keys(peopleDicJ).length; i++) {
        p1 = Object.keys(peopleDicJ)[i];
        btn_name = "btn" + p1;
        list_name ="list" + p1;
        d1 = document.getElementById('lista');
        html_code = `
        <li id="${list_name}">
            <p id = "${p1}">
                <button style="font-size:24px" onclick = "eliminar(this)" id= ${btn_name}><i class="fa fa-trash"></i></button>
                ${p1}
            </p>
        </li>
        `
        d1.insertAdjacentHTML('beforeend', html_code);
    }
}

function addpeople(){ // agrega personas a la lista
    p1 = document.getElementById('newguy').value;
    document.getElementById('newguy').value = "";
    btn_name = "btn" + p1;
    list_name ="list" + p1;
    d1 = document.getElementById('lista');
    html_code = `
    <li id="${list_name}">
        <p id = "${p1}">
            <button style="font-size:24px" onclick = "eliminar(this)" id= ${btn_name}><i class="fa fa-trash"></i></button>
            ${p1}
        </p>
    </li>
    `
    d1.insertAdjacentHTML('beforeend', html_code);
    updateLocalPeople();
}

function eliminar(elem){  // elimina personas de la lista
    str = elem.id;
    list_id = "list" + str.substring(3, str.length);
    var parent = document.getElementById("lista");
    var child = document.getElementById(list_id);
    parent.removeChild(child);
    updateLocalPeople();
}

function funcfoto(){  // funcion para subir la foto de la cuenta
  updateLocalPeople();
  location.replace('check_photo.html');
}

function gotoCheck(){ // va a la siguiente pagina
    updateLocalPeople();
    location.replace('check.html');
}

function updateLocalPeople(){ // actualiza la lista de personas
    lista = document.querySelector('#lista');
    elementos = lista.children;
    var i;
    var lista_personas = [];
    peopleDicJ = {}
    for (i = 0; i < elementos.length; i++) {
        elemento = elementos[i].id
        peopleDicJ[elemento.substring(4,elemento.length)] = null;
    }
    localStorage.setItem('localPeople', JSON.stringify(peopleDicJ));
}

// JQUERY
$(document).ready(function() {  // detecta cuando se clickea fuera del input o se da enter
    $("#newguy").change(function() {
        addpeople();
    });
});
