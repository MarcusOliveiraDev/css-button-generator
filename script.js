//variaveis do bloco criar
let texto = document.getElementById("texto");
let url = document.getElementById("url");
let num = 0;

//variaveis do conteudo
let conteudo = document.getElementById("conteudo");
let selecao = document.getElementById("selecao");//caixa de seleçao
let selecaomouse = document.getElementById("selecao");//caixa de seleçao do mouse

//variaveis de estilo
let padding = document.getElementById("padding");
let backgroundcolor = document.getElementById("background-color");
let color = document.getElementById("color");
let borderradius = document.getElementById("border-radius");
let fontsize = document.getElementById("font-size");

//variavel do botão
let bt;
//identificar o botão e seletor
let identificador;
let identificador2;

//variavel para todo o conteudo
var codigo = new Object()

//função para criar botão
function criar(){

    texto = document.getElementById("texto").value;
    url = document.getElementById("url").value;
    conteudo = document.getElementById("conteudo");

    confirmarcriar ()

};

function confirmarcriar (){
    num += 1;
    identificador = "a" + num;
    
    //escapando caracteres especiais
    texto = texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    url = url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

    conteudo.insertAdjacentHTML('beforeend', '<a href='+url+'><button id='+identificador+'>'+texto+'</button></a>');
    codigo[identificador+'-html-url'] = url;
    codigo[identificador+'-html-texto'] = texto;

    if (importcodigo[identificador+'-css'] == ""){
        codigo[identificador+'-css'] = "";
    }else{
        codigo[identificador+'-css'] = importcodigo[identificador+'-css'];
    }  

    caixaselecionada();
} 

conteudo.addEventListener('click', function(e) {
    let elemento = document.getElementById("elemento");
    identificador = e.target.id;

    caixaselecionada();
});

function caixaselecionada (){
    //escrever id do elemento selecionado
    elemento.innerText = identificador; 
    elemento.style.paddingBottom = "10px";

    //enviar valores para inputs
    bt = document.getElementById(identificador);

    padding = document.getElementById("padding")
    backgroundcolor = document.getElementById("background-color");
    color = document.getElementById("color");
    borderradius = document.getElementById("border-radius");
    fontsize = document.getElementById("font-size");
 
    padding.value = bt.style.padding;
    backgroundcolor.value = bt.style.backgroundColor;
    color.value = bt.style.color;
    borderradius.value = bt.style.borderRadius;
    fontsize.value = bt.style.fontSize;

    //caixa de seleção
    selecao = document.getElementById("selecao");
    bt = document.getElementById(identificador).getBoundingClientRect();

    selecao.style.top = bt.y-2+'px';
    selecao.style.left = bt.x-2+'px';
    selecao.style.height = bt.height+'px';
    selecao.style.width = bt.width+'px';
}

conteudo.addEventListener('click', function(event){
    event.preventDefault();
});

//caixa de seleçao segue o mouse
conteudo.onmouseover = function(e) {
    selecaomouse = document.getElementById("selecao-mouse");
    identificador2 = e.target.id;
    bt = document.getElementById(identificador2).getBoundingClientRect();

    selecaomouse.style.top = bt.y-2+'px';
    selecaomouse.style.left = bt.x-2+'px';
    selecaomouse.style.height = bt.height+'px';
    selecaomouse.style.width = bt.width+'px';
}

//aplicar estilo
function estilizar(){
    padding = document.getElementById("padding").value;
    backgroundcolor = document.getElementById("background-color").value;
    color = document.getElementById("color").value;
    borderradius = document.getElementById("border-radius").value;
    fontsize = document.getElementById("font-size").value;

    //selecionar botão por id
    bt = document.getElementById(identificador);

    bt.style.cssText = "padding:"+padding+";" + "background-color:"+backgroundcolor+";" + "color:"+color+";" + "border-radius:"+borderradius+";" + "font-size:"+fontsize+";";
    codigo[identificador+'-css'] = "padding:"+padding+";" + "background-color:"+backgroundcolor+";" + "color:"+color+";" + "border-radius:"+borderradius+";" + "font-size:"+fontsize+";";

    caixaselecionada();
}

//importar codigo JSON como string
let varcodigo;
let importcodigo = new Object();
function importar(){

    Object.assign(importcodigo, JSON.parse(varcodigo));
    //exportar como JSON = JSON.stringify() - sempre com html e css

    for (let loop = 1; loop <= (Object.keys(importcodigo).length)/3; loop ++){
        url = importcodigo["a"+loop+"-html-url"];
        texto = importcodigo["a"+loop+"-html-texto"];
        confirmarcriar ();
        //selecionar botão por id
        bt = document.getElementById(identificador);
        console.log(loop +" /--/ "+ (Object.keys(importcodigo).length)/3);

        bt.style.cssText =  importcodigo["a"+loop+"-css"];
        caixaselecionada();
    }  

}