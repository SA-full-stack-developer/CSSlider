$(document).ready(function(){
    var active = "sliderInicio1";
    var siguiente = "sliderInicio2";
    var anterior = "sliderInicio3";
    var automatico = setInterval(function(){$("img.cambiar3").trigger("click");}, 4200);

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

        anteriorSiguiente(enlaces);

        for(var y = 0; y < enlaces.length; y++){
                if(enlaces[y].name === divname){
                    $('.' + divname).css("background-color", '#666666');
                    y = enlaces.length;
                }
        }

        function cambiar(activado){
            if(!$("#"+divname ).is(":visible")){
                $("#"+activado ).hide("fade", 900, function(){
                    $("#"+divname).show("fade", 900);
                });
            }
        }

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