function get_datos(){
    var usuario = document.getElementById('txt_user_name').value;
    var dificultad = document.getElementById('select_dificultad').value;


    var lista_operaciones = new Array();
    agregar_operaciones(lista_operaciones);
    set_datos(usuario,dificultad,lista_operaciones);
}


function agregar_operaciones(lista_operaciones){
    var op_mas =   document.getElementById('op_mas');
    var op_menos = document.getElementById('op_menos');
    var op_mult =  document.getElementById('op_mult');
    var op_div =   document.getElementById('op_div');
   // var op_todos = document.getElementById('op_todos');

    
   /* if(op_todos.checked){
        lista_operaciones.push('.');
    }else{*/

         if(op_mas.checked){
             lista_operaciones.push('+');
         }
     
         if(op_menos.checked){
             lista_operaciones.push('-');
         }
     
         if(op_mult.checked){
             lista_operaciones.push('*');
         }
     
     
         if(op_div.checked){
             lista_operaciones.push('/');
         }
   // }

    //console.log(lista_operaciones);
    
}

function set_datos(usuario,dificultad,lista_operaciones){
    var datos = new Array();
    datos.push(usuario);
    datos.push(dificultad);
    datos.push(lista_operaciones);
   // console.log(lista_operaciones);

    localStorage.setItem('usuario',usuario);
    localStorage.setItem('dificultad',dificultad);
    //const stringifiedInterests =JSON(lista_operaciones);
    localStorage.setItem('lista_operaciones',lista_operaciones);
    //console.log(stringifiedInterests);
    location.href= 'inicio.html';
}