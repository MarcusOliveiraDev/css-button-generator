//variaveis do bloco criar
let texto = document.getElementById("texto");
let url = document.getElementById("url");
let num = 0;

//variaveis do conteudo
let conteudo = document.getElementById("conteudo");
let selecao = document.getElementById("selecao");//caixa de seleçao
let selecaomouse = document.getElementById("selecao");//caixa de seleçao do mouse
let modelos = document.getElementById("modelos");
let criar_conteudo = document.getElementById("criar");
let estilo = document.getElementById("estilo");
let codigo_conteudo = document.getElementById("codigo");

//variaveis de estilo
let padding = document.getElementById("padding");
let backgroundcolor = document.getElementById("background-color");
let color = document.getElementById("color");
let border = document.getElementById("border");
let borderradius = document.getElementById("border-radius");
let fontfamily = document.getElementById("font-family");
let fontsize = document.getElementById("font-size");
let boxshadow = document.getElementById("box-shadow");

//variavel do botão
let bt;
//identificar o botão e seletor
let identificador; //identifica click
let identificador2; //identifica se o cursor passou em cima
let elemento = document.getElementById("elemento"); //paragrafo com nome/id do elemento

//variaveis de importar e exportar
//variavel para todo o conteudo
let codigo = new Object() //codigo atual
//variavel da área de texto
let mostrarcodigo = document.getElementById("text-code");
let arquivo = document.getElementById("arquivo");
//variavel do css
let bt_css = {
    bt1 : "padding:;" + "background-color:;" + "color:;" + "border:;" + "border-radius:;" + "font-family:;" + "font-size:;" + "box-shadow:;",
    bt2 : "padding:10px;" + "background-color:;" + "color:;" + "border:;" + "border-radius:;" + "font-family:;" + "font-size:;" + "box-shadow:;"
};

//função para criar botão
function criar(btmodelo){

    texto = "botão";
    url = "https://";
    conteudo = document.getElementById("conteudo");

    if(conteudo.childElementCount <= 5){
        num += 1;
        identificador = "a" + num;
        
        //escapando caracteres especiais
        texto = texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        url = url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

        codigo[identificador+'-html-url'] = url;
        codigo[identificador+'-html-texto'] = texto;
        codigo[identificador+'-css'] = bt_css[btmodelo];

        conteudo.insertAdjacentHTML('beforeend', '<div style="text-align:center; margin-bottom:50px;"><a draggable="false" href='+url+'><button style="'+codigo[identificador+'-css']+'" draggable="true" id='+identificador+'>'+texto+'</button></a></div>');

        caixaselecionada();
    }

};

//função para mudar o conteudo URL e Texto do botão
function aplicarconteudo(){

    texto = document.getElementById("texto").value;
    url = document.getElementById("url").value;
    let identificadoraplicar = document.getElementById(identificador);

    //escapando caracteres especiais
    texto = texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    url = url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

    identificadoraplicar.innerText = texto;
    identificadoraplicar.parentNode.href = url;
    codigo[identificador+'-html-url'] = url;
    codigo[identificador+'-html-texto'] = texto;

    caixaselecionada();

}

//função ir para estilo
function irestilo(){
    estilo.style.cssText = "display: block;";
    criar_conteudo.style.cssText = "display: none;";
    codigo_conteudo.style.cssText = "display: none;";

    mostrarstyle();
}

//função para aplicar estilo ao botão selecionado
function estilizar(){
    padding = document.getElementById("padding").value;
    backgroundcolor = document.getElementById("background-color").value;
    color = document.getElementById("color").value;
    border = document.getElementById("border").value;
    borderradius = document.getElementById("border-radius").value;
    fontfamily = document.getElementById("font-family").value;
    fontsize = document.getElementById("font-size").value;
    boxshadow = document.getElementById("box-shadow").value;

    //selecionar botão por id
    bt = document.getElementById(identificador);

    bt.style.cssText = "padding:"+padding+";" + "background-color:"+backgroundcolor+";" + "color:"+color+";" + "border:"+border+";" + "border-radius:"+borderradius+";" + "font-family:"+fontfamily+";" + "font-size:"+fontsize+";" + "box-shadow:"+boxshadow+";";

    codigo[identificador+'-css'] = "padding:"+padding+";" + "background-color:"+backgroundcolor+";" + "color:"+color+";" + "border:"+border+";" + "border-radius:"+borderradius+";" + "font-family:"+fontfamily+";" + "font-size:"+fontsize+";" + "box-shadow:"+boxshadow+";";

    caixaselecionada();
}

//função da seleção - caixas de seleção
conteudo.addEventListener('click', function(e) {
    elemento = document.getElementById("elemento");
    identificador = e.target.id;

    caixaselecionada();
});

function caixaselecionada (){

    if(identificador == "conteudo" || identificador == undefined || identificador == ''){
        criar_conteudo.style.cssText = "display: none;";
        estilo.style.cssText = "display: none;";
        codigo_conteudo.style.cssText = "display: none;";
        return;
    }else{
        criar_conteudo.style.cssText = "display: block;";
        estilo.style.cssText = "display: none;";
        codigo_conteudo.style.cssText = "display: none;"; 

        //caixa de seleção
        selecao = document.getElementById("selecao");
        bt = document.getElementById(identificador).getBoundingClientRect();

        selecao.style.top = bt.y-3+'px';
        selecao.style.left = bt.x-3+'px';
        selecao.style.height = bt.height+4+'px';
        selecao.style.width = bt.width+4+'px';

         //escrever id do elemento selecionado
        elemento.innerText = identificador; 
        elemento.style.paddingBottom = "10px";
    }

}

conteudo.addEventListener('click', function(event){
    event.preventDefault();
});

//caixa de seleçao segue o mouse
conteudo.onmouseover = function(e) {
    selecaomouse = document.getElementById("selecao-mouse");
    identificador2 = e.target.id;

    if (identificador2 != "conteudo"){
        if(identificador2){
            bt = document.getElementById(identificador2).getBoundingClientRect();

            selecaomouse.style.top = bt.y-3+'px';
            selecaomouse.style.left = bt.x-3+'px';
            selecaomouse.style.height = bt.height+4+'px';
            selecaomouse.style.width = bt.width+4+'px';
        }
    }else{
        if(identificador2){
            bt = document.getElementById(identificador2).getBoundingClientRect();

            selecaomouse.style.top = bt.y+1+'px';
            selecaomouse.style.left = bt.x+1+'px';
            selecaomouse.style.height = bt.height-4+'px';
            selecaomouse.style.width = bt.width-4+'px';
        }
    }
    
}

//função para enviar estilo e conteúdo aos inputs
function mostrarstyle(){

    //enviar valores para inputs
    bt = document.getElementById(identificador);

    padding = document.getElementById("padding")
    backgroundcolor = document.getElementById("background-color");
    color = document.getElementById("color");
    border = document.getElementById("border");
    borderradius = document.getElementById("border-radius");
    fontfamily = document.getElementById("font-family");
    fontsize = document.getElementById("font-size");
    boxshadow = document.getElementById("box-shadow");

    padding.value = bt.style.padding;
    backgroundcolor.value = bt.style.backgroundColor;
    color.value = bt.style.color;
    border.value = bt.style.border;
    borderradius.value = bt.style.borderRadius;
    fontfamily.value = bt.style.fontFamily;
    fontsize.value = bt.style.fontSize;
    boxshadow.value = bt.style.boxShadow;

    texto = document.getElementById("texto");
    url = document.getElementById("url");
    let identificadoraplicar = document.getElementById(identificador);

    texto.value = identificadoraplicar.innerText;
    url.value = identificadoraplicar.parentNode.href;
}

//função mostrar código
function mostrartextcodigo(){
    mostrarcodigo = document.getElementById("text-code");
    mostrarcodigo.value = '<a href='+url.value+'><button id='+identificador+'>'+texto.value+'</button></a><style>#'+identificador+'{'+codigo[identificador+'-css']+'}</style>';
}