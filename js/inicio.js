var data;
var respuesta_final = 0;
var puntuacion = 0;
let timerId = Number(30);
var max_puntuacion = 0;
const myInterval =0 ;


function set_datos(){
    var usuario = localStorage.getItem('usuario');
    var dificultad = localStorage.getItem('dificultad');
    var lista_operaciones = localStorage["lista_operaciones"];
    var puntuacion_text = document.getElementById('user_puntuacion'); 
    puntuacion_text.innerHTML = puntuacion;
    
    //seteo el nombre del usuario logueado en pantalla
    document.getElementById('user_name').innerHTML = usuario;
    
    
    lista_operaciones = set_operacion(lista_operaciones);
    get_evaluar_dificultad();
    myInterval = setInterval(actualizar_contador, 1000);
}


function set_operacion(lista_operaciones){
    var array_split = lista_operaciones.split(',');
    var cantidad_operaciones = array_split.length;
  
    return array_split;
}

function get_evaluar_dificultad(){
    //dificultades 0-facil,1-medio,2-dificil,3-experto
    console.log('USUARIO = '+ localStorage.getItem('usuario'));
    console.log('DIFICULTAD = '+ localStorage.getItem('dificultad'));
    var dificultad = Number(localStorage.getItem('dificultad'));
    var digitos = 1;
    var cantidades = 2;

    var operacion_a_mostrar_txt ='';
    var operacion_a_mostrar_lb = document.getElementById('contenido_operaciones_operacion');
    var respuesta_a_mostrar = document.getElementById('contenido_operaciones_respuesta');

    var lista_operaciones = localStorage["lista_operaciones"];
    var array_split = lista_operaciones.split(',');
    var cantidad_operaciones = array_split.length-1;


    if(dificultad!=0) {
        digitos*=2;
        cantidades*=1;
    }        

    console.log('DIGITOS = '+digitos);
    console.log('CANTIDAD = '+cantidades);

    var cantidades_array = new Array();
    var operaciones_array = new Array();

    for(i=0;i<cantidades;i++){
        var cantidad_add = Number(0);
        var index_new =0;
        switch (dificultad) {
            case 1: cantidad_add = Math.floor(Math.random() * 100)+10; if(cantidad_add>100){ cantidad_add = 100} break;
            case 2: cantidad_add = Math.floor(Math.random() * 1000)+100; if(cantidad_add>1000){ cantidad_add = 1000}  break;
            case 3: cantidad_add = Math.floor(Math.random() * 100000)+1000; if(cantidad_add>100000){ cantidad_add = 100000} break;
            default:
                cantidad_add = Math.floor(Math.random() * 9)+1; break;
        }

        cantidades_array.push(cantidad_add);


        index_new = Math.floor(Math.random() * cantidad_operaciones); 
        if(index_new==cantidad_operaciones && index_new==index_ant && index_ant>0){
          index_new+=1;
        }else{
          index_ant=index_new;
        }
        var operacion =array_split[index_new];
        operaciones_array.push(operacion);
    }



    var index_ant = 0;
    var respuesta = 0;


    for(k=0;k<cantidades;k++){//armo la operacion a mostrar
      var operacion_select = '';
      console.log('Valor = '+cantidades_array[k]);
     // console.log(operacion_a_mostrar_txt);
      if(k>0){
        console.log('operacion = '+operaciones_array[k]);
        respuesta = get_respuesta(cantidades_array[k-1],operaciones_array[k],cantidades_array[k]);
        operacion_a_mostrar_txt+=' '+operaciones_array[k]+' '+cantidades_array[k];
        console.log(operacion_a_mostrar_txt);
      }else{
        operacion_a_mostrar_txt += cantidades_array[k];
      }

    }//fin bucle crear operacion

    operacion_a_mostrar_lb.innerHTML = operacion_a_mostrar_txt.substring(0,operacion_a_mostrar_txt.length);
   // respuesta_a_mostrar.innerHTML =respuesta; 
    respuesta_final = respuesta;
    agregar_posibles_respuestas(respuesta_final);
   // console.log('RESPUESTA = '+respuesta);
}


function get_respuesta(valor_ant,operacion,new_valor){
    var respuesta=0;
    switch (operacion) {
        case '-': respuesta = Number(valor_ant) - Number(new_valor); break;
        case '+': respuesta = Number(valor_ant) + Number(new_valor); break;
        case '*': respuesta = Number(valor_ant) * Number(new_valor); break;
        case '/': respuesta = Number(valor_ant) / Number(new_valor); break;
    }

    return  respuesta;
}

function agregar_posibles_respuestas(respuesta){
    var respuesta_1 = Number(respuesta);
    var respuesta_2 = Number(respuesta-1);
    var respuesta_3 = Number(respuesta+2);

    var array_respuestas = new Array();
    array_respuestas.push(respuesta_1);
    array_respuestas.push(respuesta_2);
    array_respuestas.push(respuesta_3);
    array_respuestas.sort(function() { return Math.random() - 0.5 });

    console.log('posibles repuestas = ' + respuesta_1 +' | ' +respuesta_2+' | ' +respuesta_3);
    console.log(array_respuestas);
   
     const div = document.getElementById('respuesta_div');
       div.innerHTML = '';
       const element = document.createElement("label");
       element.innerHTML = array_respuestas[0];
       element.onclick = function() {
        get_validar_respuesta(array_respuestas[0]);
       }
       div.appendChild(element);
   // }
    const element_2 = document.createElement("label");
    element_2.innerHTML = array_respuestas[1];
    element_2.onclick = function() {
        get_validar_respuesta(array_respuestas[1]);
    }
    div.appendChild(element_2);

    const element_3 = document.createElement("label");
    element_3.innerHTML = array_respuestas[2];
    element_3.onclick = function() {
        get_validar_respuesta(array_respuestas[2]);
    }
    div.appendChild(element_3);

}


function get_validar_respuesta(respuesta_seleccionada){
    var respuesta_a_mostrar = document.getElementById('contenido_operaciones_respuesta');
    var puntuacion_text = document.getElementById('user_puntuacion');
    var lista_operaciones = localStorage["lista_operaciones"];
    lista_operaciones = set_operacion(lista_operaciones);

    if(respuesta_seleccionada == respuesta_final && timerId > 0){
        puntuacion += 10;
        timerId = 30;
    }else{
       puntuacion -= 10;
    }
    puntuacion_text.innerHTML = puntuacion;
    get_evaluar_dificultad();
    if(max_puntuacion < puntuacion){
        max_puntuacion = puntuacion;
    }
    eveluar_si_sigo();
}

function actualizar_contador() {
    var puntuacion_text = document.getElementById('user_puntuacion');
    var cn_text = document.getElementById('user_contador');


    if(timerId <= 0){
        puntuacion -= 10;
        var lista_operaciones = localStorage["lista_operaciones"];
        lista_operaciones = set_operacion(lista_operaciones);
        get_evaluar_dificultad();
        timerId = 30;
    }else{
        timerId -= 1;
    }
    puntuacion_text.innerHTML = puntuacion;
    cn_text.innerHTML = timerId;
  //  eveluar_si_sigo();
}


function eveluar_si_sigo(){
    if(puntuacion <= 0){
        alert('Has perdido tu maxima puntuacion fue = '+max_puntuacion);
        location.href = "index.html";
    }

    clearInterval(myInterval);
}