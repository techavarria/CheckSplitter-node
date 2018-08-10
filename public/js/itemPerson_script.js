// VARIABLES
DirPer = localStorage.getItem('localDirPer');
DirP = JSON.parse(DirPer)

// FUNCIONES
listBoxPersonas();
UpdateTable();

function listBoxPersonas() {  // crea listbox de personas
    d1 = document.getElementById('id_personas');
    for (i = 0; i < Object.keys(DirP).length; i++) {
        nameItem = Object.keys(DirP)[i];
        html_code = `<option id="opciones" value="${nameItem}">${nameItem}</option>`;
        d1.insertAdjacentHTML('beforeend', html_code);
    }
}

function UpdateTable() {  // crea tabla con los items (su porcentaje y valor a pagar) para cada persona
    d1 = document.getElementById('tabla');
    var select = document.getElementById("id_personas");
    var Producto = select.options[select.selectedIndex].value;
    if (DirP[Producto] == null) {
      html_code = `
      <tr>
      </tr>
      `;
      d1.innerHTML = html_code;
      html_code = '';
      alert('no tiene productos')
    } else {
      dicAux = DirP[Producto]["items"];
      itm = Object.keys(dicAux);
      html_code = '';
      total_price = 0;
      for (var  i = 0;  i  < itm.length;  i++) {
          pric = Object.values(dicAux)[i].valor;
          perc = Object.values(dicAux)[i].porcentaje;
          total_price = total_price + parseInt(pric);
          html_code = html_code + `
      <tr>
        <th scope="row">${i+1}</th>
        <td>${itm[i]}</td>
        <td>${pric}</td>
        <td>${perc}</td>
      </tr>
      `;
      }
      html_code = html_code + `
      <tr>
      <th scope="row">-</th>
      <td><strong>TOTAL</strong></td>
      <td><strong>${total_price}</strong></td>
      <td><strong>-</strong></td>
      </tr>
      `;
      d1.innerHTML = html_code;
      html_code = '';

    }
}

function back(){  // se devuelve a la pagina anterior
    location.replace("people2item.html")
}

// JQUERY
$("#id_personas").change(function() { // detecta cuando se elige una persona de la listbox y actualiza la tabla de los item por esa persona
    var select = document.getElementById("id_personas");
    var Producto = select.options[select.selectedIndex].value;
    UpdateTable();
});
