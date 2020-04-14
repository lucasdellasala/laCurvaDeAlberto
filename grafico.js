
var arrayDePaises=["CHN","BRA","ARG","USA","ITA","ESP",];
var array=[];
var cantidadDeDias=0;

var pureba=$("#paisesParaComparar :selected").val();



//TRAE TODAS LAS PROMESAS
Promise.all(arrayDePaises.map(element => curvaPais(element))).then(function(values) {
    for (var i =0; i<values.length;i++){
        array[i]={name:"pais",data:values[i]};
    }
});

//RENDERIZO GRAFICO
setTimeout(function() {renderizarGrafico(array)},2000);




//////////////////////////////////////////////////////
///////   F - U - N - C - I - O  - N - E - S   ///////
//////////////////////////////////////////////////////


//FUNCION QUE OBTIENE LA CURVA DE CONFIRMADOS DEL PAIS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function curvaPais (PAIS){
    var confirmadosPAIS=[];
     fetch(`${"https://covidapi.info/api/v1/"}country/${PAIS}`).then((response)=>
     response.json().then(function(data){
         var arrayPAIS =  Object.values(data.result);
         for (var i=0;i<arrayPAIS.length; i++){
             var valor=arrayPAIS[i].confirmed;
             if (valor!=0) confirmadosPAIS.push(valor);
         }       
     }) 
 )
 return confirmadosPAIS;
}


//RENDERIZA GRAFICO UTILIZANDO APEX CHARTS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function renderizarGrafico(elemento){
    var options =       {
            chart:      {type: 'line',toolbar:{show:false}},
            xaxis:      {categories: ["0"]},
            yaxis:      {labels:{show:false}},
            series:    elemento,
            labels:    ["Argentina", "otro pais","sdf","asdas"],
        responsive:    [{breakpoint: 1025,options :{chart: {height:"100%"}}}],
        stroke:         {width:3},
        fill:           {type:'gradient'}
    }
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}



//DEVUELVE UN BOLEAN SI SE APRETA O NO LOS SWITCH
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var lineal=true;
$(document).ready(function(){
    $('input[type="checkbox"]').click(function(){
        if($(this).prop("checked") == true){
            console.log("Checkbox is checked.");
            lineal=false;
        }
        else if($(this).prop("checked") == false){
            console.log("Checkbox is unchecked.");
            lineal=true;
        }
    });
});

