
var itemDicJ = {};

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah')
        .attr('src', e.target.result)
        .width(550)
        .height(700);
    };
    reader.readAsDataURL(input.files[0]);
  }
}


var ind = 0

function procesar() {
  parent = document.getElementById('imagen_cortada');
  var children = [].slice.call(parent.getElementsByTagName('img'), 0);
  console.log(children);
  var promises = [];
  var fin_proceso = 0;
  str = children[ind].id;
  str.substring(4, str.length)

  img = document.getElementById(children[ind].id);
  Tesseract.recognize(img, 'spa')
    .then(function(result) {
      console.log("termino " + ind)
      console.log(result.text)
      cantidades = result.text;
      ind = ind + 1;

      img = document.getElementById(children[ind].id);
      Tesseract.recognize(img, 'spa')
        .then(function(result) {
          console.log("termino " + ind)
          console.log(result.text)
          items = result.text;
          ind = ind + 1;

          img = document.getElementById(children[ind].id);
          Tesseract.recognize(img, 'spa')
            .then(function(result) {
              console.log("termino " + ind)
              console.log(result.text)
              precios = result.text;
              ind = ind + 1;
              proceso_tabla();
            })
        })
    })
}

var num_img = 0

function popupResult(result) {
  var html;
  if (result.html) {
    html = result.html;
  }
  if (result.src) {
    html = `
      <img src=${result.src} id=sect_${num_img}>
      <button style="font-size:24px" onclick = "eliminar(this)" id= ${"btn_" + num_img}><i class="fa fa-trash"></i></button>
      `;
    num_img = num_img + 1
    var d1 = document.getElementById('imagen_cortada');
    d1.insertAdjacentHTML('beforeend', html);
  }
  setTimeout(function() {
    $('.sweet-alert').css('margin', function() {
      var top = -1 * ($(this).height() / 2),
        left = -1 * ($(this).width() / 2);
      return top + 'px 0 0 ' + left + 'px';
    });
  }, 1);
}

function demoResizer() {
  var vEl = document.getElementById('blah'),
    resize = new Croppie(vEl, {
      viewport: {
        width: 400,
        height: 600
        // width: '100%',
        // height: 600

      },
      boundary: {
        width: 550,
        height: 700
      },
      showZoomer: true,
      enableResize: true,
      enableOrientation: true,
      mouseWheelZoom: 'ctrl'
    });
  resize.bind({
    url: vEl.src,
    zoom: 0
  });
  vEl.addEventListener('update', function(ev) {
    console.log('resize update', ev);
  });
  document.querySelector('.resizer-result').addEventListener('click', function(ev) {
    resize.result({
      type: 'blob'
    }).then(function(blob) {
      popupResult({
        src: window.URL.createObjectURL(blob)
      });
    });
  });
}


function eliminar(elem) {
  str = elem.id;
  item_id = "sect_" + str.substring(4, str.length);
  var parent = document.getElementById("imagen_cortada");
  var child = document.getElementById(item_id);
  parent.removeChild(child);
  var childbtn = document.getElementById(str);
  parent.removeChild(childbtn);
}



function proceso_tabla() {
  cantidades = cantidades.split('\n')
  items = items.split('\n')
  precios = precios.split('\n')

  cantidades = cantidades.filter((num) => {
    return num != ""
  })
  items = items.filter((num) => {
    return num != ""
  })
  precios = precios.filter((num) => {
    return num != ""
  })



  d1 = document.getElementById('tabla');
  html_code = '';
  for (var i = 0; i < cantidades.length; i++) {


    cantidades[i] = cantidades[i].replace(/\D/g,'');
    precios[i] = precios[i].replace(/\D/g,'');



    html_code = html_code + `
        <tr>
          <td ><input type="text" id="cantidad_${i}" name="FirstName" class="form-control" value="${cantidades[i]}"></td>
          <td ><input type="text" id="items_${i}" name="FirstName" class="form-control" value="${items[i]}"></td>
          <td ><input type="text" id="precios_${i}" name="FirstName" class="form-control" value="${precios[i]}"></td>
        </tr>
        `;
    d1.innerHTML = html_code;
  }


}

function siguiente_pag() {
  for (var i = 0; i <  cantidades.length; i++) {
    i1 = parseInt(document.getElementById('cantidad_' + i).value);
    i2 = document.getElementById('items_' + i).value;
    i3 = parseInt(document.getElementById('precios_' + i).value);
    itemDicJ[i2] = [i1, i3];
  }
  localStorage.setItem('localItems', JSON.stringify(itemDicJ));
  location.replace('people2item.html');
}







//
