# CSSlider
Sencillo slider solo con librerias jquery

A veces buscamos por internet sliders hechos con jquery pero no hace todo lo que nosotros queremos, os planteo una forma sencilla de hacerlo vosotros mismos sólo con librerías de jquery.

Empezamos por el index.html.

# Index.html

Tenemos un div donde introduciremos todos los contenidos del slider. Cada imagen irá dentro de otro div así podremos cargar cualquier cosa que no sea una imagen. Cargamos las flechas si queremos y los "bullets". Con poco conocimiento de php se pueden cargar automáticamente pero la estructura es la siguiente. Las clases e id visibles son importantes para el desarrollo de este slider. Explicaré para que se usa cada uno cuando lo usemos. He incluido jquery de eventos móviles para aplicarlo también.

<div id='slider' class='activo'>
  <div>
    <div id='sliderInicio1' class='activo'><img class='imagenesGrandes' src='img/inicio001.jpg'></div>
    <div id='sliderInicio2' class='ocultos'><img class='imagenesGrandes' src='img/inicio002.jpg'></div>
    <div id='sliderInicio3' class='ocultos'><img class='imagenesGrandes' src='img/inicio003.jpg'></div>
    <div class='CSFlechasSlider' id='CSFlechasSlider'>
      <div class='floatLeft'>
        <img src='img/prev.png' id='CSPrev' class='cambiar3' name='sliderInicio3'/>
      </div>
      <div  class='floatRight'>
        <img src='img/next.png' id='CSNext' class='cambiar3' name='sliderInicio2'/>
      </div>
    </div>
  </div>
  <div id='CSSliderInicio'>
    <div>
      <ul class='CSSliderInicio'>
        <li class='sliderInicio1 primeraBolita'><a href='#'  class='cambiar2' name='sliderInicio1'></a></li>
        <li class='sliderInicio2'><a href='#' class='cambiar2' name='sliderInicio2'></a></li>
        <li class='sliderInicio3'><a href='#' class='cambiar2' name='sliderInicio3'></a></li>
      </ul>
    </div>
  </div>
</div>

# style1.css

Aquí le damos algunos estilos básicos, más que nada indicarles cuales están ocultos y cuales activos.

# CSSlider.js

Vamos donde realmente importa, al script.

var active = "sliderInicio1";
var siguiente = "sliderInicio2";
var anterior = "sliderInicio3";
var automatico = setInterval(function(){$("img.cambiar3").trigger("click");}, 4200);

Inicializamos las variables con active es la primera imagen, siguiente es la segunda y anterior la última. Esos nombres hacen referencia al id del div que queremos mostrar en cada momento. En automático vamos a simular la pulsación de la flecha hacia delante cada 4,2 segundos, tiempo que podemos modificar.

---------------------------------------------------------------------------------------------------------------------------------

$('a.cambiar2, img.cambiar2, img.cambiar3').click(function(){
  clearInterval(automatico);
  var divname = this.name;
  var enlaces = "";

  if(divname.search("sliderInicio") > -1){
    enlaces = document.getElementById("CSSliderInicio").getElementsByTagName("a");
    $('.CSSliderInicio li').css("background-color", '#E4E4E4');
    cambiar(active);
    active = divname;
  }
  
  Asignamos el evento click a los "bullets", y a las dos flechas.
  Recogemos el name del evento clicado para saber el div a mostrar.
  Recogemos todos los enlaces para usarlos luego y ponemos todos los "bullets" de color claro, llamamos a cambiar() para que      muestre el nuevo div y oculte el actual. Cambiamos el elemento que estaba asignado como actual por el nuevo.
  Al principio paramos el automático para que no se líe mientras cambiamos la imagen actual.
  
---------------------------------------------------------------------------------------------------------------------------------

#Función cambiar()

function cambiar(activado){
  if(!$("#"+divname ).is(":visible")){
    $("#"+activado ).hide("fade", 900, function(){
        $("#"+divname).show("fade", 900);
    });
  }
}

Esta función es la clave de todo, si el elemento que actualmente está visible lo ocultamos con una animación fade y cuando termine animamos la entrad de la nueva. Aquí podemos cambiar el fade por cualquier evento animado jquery:
  -fade
  -slide
  -drop
  -explode
  -fold
  -highlight
  -puff
  -pulsate
  -scale
  -shake
  -size
  -transfer
  https://api.jqueryui.com/category/effects/
  
  con los parámetros necesarios por ejemplo si usáramos slide sería
  $("#"+activado ).hide("slide",{direction: "right"} 900, function(){});
  
  Podemos controlar el tiempo de entrada y de salida a nuestro gusto y la animación pueden ser diferentes.
  
--------------------------------------------------------------------------------------------------------------------------------
anteriorSiguiente(enlaces);

for(var y = 0; y < enlaces.length; y++){
  if(enlaces[y].name === divname){
    $('.' + divname).css("background-color", '#666666');
    y = enlaces.length;
  }
}

Añadimos una vez cambiada la imagen cual sería el siguiente y la anterior en las flechas. Cambiamos el "bullet" a oscuro.

--------------------------------------------------------------------------------------------------------------------------------
#Función anteriorSiguiente()

function anteriorSiguiente(enlacesCambiar){
  for(var x = 0; x < enlacesCambiar.length; x++){
    if(enlacesCambiar[x].name === active){
      if(x === (enlacesCambiar.length -1)){
        siguiente = enlacesCambiar[0].name;
        anterior = enlacesCambiar[x - 1].name;
      }else if(x === 0){
        siguiente = enlacesCambiar[x + 1].name;
        anterior = enlacesCambiar[enlaces.length -1].name;
      }else{
        siguiente = enlacesCambiar[x + 1].name;
        anterior = enlacesCambiar[x - 1].name;
      }
    }
  }

  $("#CSNext").attr('name', siguiente);
  $("#CSPrev").attr('name', anterior);
}

Controlamos si la imagen actual es la última o la primera para cargar las imágenes correctas.

--------------------------------------------------------------------------------------------------------------------------------

automatico = setInterval(function(){$("img.cambiar3").trigger("click");}, 4200);
    });
    
    $(".imagenesGrandes").touchwipe({
        wipeLeft: function() { $("#CSNext").trigger("click"); },
        wipeRight: function() { $("#CSPrev").trigger("click"); },
        min_move_x: 1,
        min_move_y: 1,
        preventDefaultEvents: true
    });
});

Volvemos a cargar el automático y la última función es para los eventos de arrastre de dedos en los móviles.
