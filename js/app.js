var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
    cargarTareas();
    $("#add-form").submit(agregarTarea);
    $(document).on("click",".removerTarea",eliminarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}

var plantillaTarea = '<tr class="tareas" data-id="**id**">'+
            '<td>**nombre**</td>'+
            '<td>'+
                '<a data-toggle="modal" data-target="#datosTarea"><span class="glyphicon glyphicon-zoom-in"></span></a>'+
                '<a><span class="glyphicon glyphicon-pencil"></span></a>'+
                '<a><span class="glyphicon glyphicon-remove removerTarea"></span></a>'+
            '</td>'+
            '<td>**estado**</td>'+
        '</tr>';
    


var crearTarea =function (tarea) {
    var nombre = tarea.name;
    var estado = tarea.status[0];
    var id = tarea._id;
    var nuevaPlantilla =" ";

        nuevaPlantilla += plantillaTarea.replace('**id**',id).replace('**nombre**',nombre).replace('**estado**',estado);
        $tasksList.append(nuevaPlantilla);
    
      // creamos la fila
//      var $tr = $("<tr />");
//      // creamos la celda del nombre
//      var $nombreTd = $("<td />");
//      $nombreTd.text(nombre);
//      // creamos la celda del estado
//      var $estadoTd = $("<td />");
//      $estadoTd.text(estado);
//      // agregamos las celdas a la fila
//      $tr.append($nombreTd);
//      $tr.append($estadoTd);
//      // agregamos filas a la tabla
//      $tasksList.append($tr);
    
    };

var agregarTarea = function(e){
    e.preventDefault();
    var nombre = $ ("#nombre-tarea").val();
    //url  qur  ya  tenemos //se pone  un  objeto llave  del  valor
    $.post(api.url,{
        name:nombre
    },function (response){
        $("#myModal").modal("hide");
        cargarTareas();
    });
};
var eliminarTarea = function(){
    
    var tomarPadre = $(this).parents("tr");
    var dataId = tomarPadre.data("id");
    
    //esto es  para  eliminar  tarea  del html
    tomarPadre.remove();
    //eliminar tarea  del  servidor 
    
    $.ajax({
        url: api.url + dataId,
        type:'DELETE',
        success: function(data){
            alert("borrado");
        }
    });
    
};

$(document).ready(cargarPagina);