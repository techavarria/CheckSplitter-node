// VARIABLES
var subtotal = 0;
var itemDicJ = {};
var localPeople = localStorage.getItem('localPeople');

if (localStorage.getItem("localItems") === null) {  // revisa si existe y si no la inicializa
    var itemDicJ = {};
} else {
    var itemDicJ = JSON.parse(localStorage.getItem('localItems'));
    setTable();
    setPrices();
}

// FUNCIONES
function setTable(){  // crea la lista de la cuenta si la variable ya existia
    for (var i = 0; i < Object.keys(itemDicJ).length; i++) {
        i1 = Object.keys(itemDicJ)[i];
        i2 = Object.values(itemDicJ)[i][0];
        i3 = Object.values(itemDicJ)[i][1];
        d1 = document.getElementById('items');
        html_code = `
        <tr id = ${"item_" + i1}>
          <td>${i1}</td>
          <td>${i2}</td>
          <td>${i3}</td>
          <td>
                  <button style="font-size:24px" onclick = "eliminar(this)" id= ${"btn_" + i1}><i class="fa fa-trash"></i></button>
          </td>
        </tr>
        `
        d1.insertAdjacentHTML('beforeend', html_code);
    }
}

function additem(){ // agrega filas a la lista de la cuenta
  i1 = document.getElementById('newitem').value;
  i2 = parseInt(document.getElementById('newamount').value);
  i3 = parseInt(document.getElementById('newprice').value);
  itemDicJ[i1] = [i2, i3];
  d1 = document.getElementById('items');
  html_code = `
  <tr id = ${"item_" + i1}>
    <td>${i1}</td>
    <td>${i2}</td>
    <td>${i3}</td>
    <td>
            <button style="font-size:24px" onclick = "eliminar(this)" id= ${"btn_" + i1}><i class="fa fa-trash"></i></button>
    </td>
  </tr>
  `
  d1.insertAdjacentHTML('beforeend', html_code);
  document.getElementById('newitem').value = "";
  document.getElementById('newamount').value = "";
  document.getElementById('newprice').value = "";
  setPrices();
  localStorage.setItem('localItems', JSON.stringify(itemDicJ));
}

function gotoPeople(){  // Guarda la variable y pasa a la siguiente pagina
  localStorage.setItem('localItems', JSON.stringify(itemDicJ));
  location.replace('people2item.html');
}

function eliminar(elem){  // Elimina item de la lista
    str = elem.id;
    item_id = "item_" + str.substring(4, str.length);
    var parent = document.getElementById("items");
    var child = document.getElementById(item_id);
    parent.removeChild(child);
    setPrices();
    localStorage.setItem('localItems', JSON.stringify(itemDicJ));
}

function setPrices(){ // actualiza los totales de la cuenta
    var parent = document.getElementById("items");
    subtotal = 0;
    itemDicJ = {};
    for (i = 0; i < parent.children.length; i++) {
        item = parent.children[i].children[0].innerHTML
        cantidad = parseInt(parent.children[i].children[1].innerHTML);
        precio = parseInt(parent.children[i].children[2].innerHTML);
        itemDicJ[item] = [cantidad, precio];
        subtotal = subtotal + precio
    }
    ico = subtotal * 0.08;
    netototal = subtotal - ico;
    propina = netototal * 0.1;
    total = subtotal + propina;
    document.getElementById('netototal').value = netototal;
    document.getElementById('ico').value = ico;
    document.getElementById('subtotal').value = subtotal;
    document.getElementById('propina').value = propina;
    document.getElementById('total').value = total;
}

function back(){  // se devuelve a la pagina anterior
    location.replace('index.html');
}
