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
//importar codigo JSON como string
let varcodigo; //onde chega 1°
let importcodigo = new Object(); //traduzir o que esta em varcodigo para objeto
//variavel da área de texto
let mostrarcodigo = document.getElementById("text-code");
let arquivo = document.getElementById("arquivo");



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

    conteudo.insertAdjacentHTML('beforeend', '<p style="text-align:center;"><a href='+url+'><button id='+identificador+'>'+texto+'</button></a></p>');
    codigo[identificador+'-html-url'] = url;
    codigo[identificador+'-html-texto'] = texto;

    if (codigo[identificador+'-css'] == undefined){
        codigo[identificador+'-css'] = "";
    }else{
        codigo[identificador+'-css'] = importcodigo[identificador+'-css'];
    }  

    caixaselecionada();
} 



//função da seleção - caixas de seleção
conteudo.addEventListener('click', function(e) {
    elemento = document.getElementById("elemento");
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

    //caixa de seleção
    selecao = document.getElementById("selecao");
    bt = document.getElementById(identificador).getBoundingClientRect();

    selecao.style.top = bt.y-2+'px';
    selecao.style.left = bt.x-1+'px';
    selecao.style.height = bt.height+2+'px';
    selecao.style.width = bt.width+1+'px';

    mostrartextcodigo()
}

conteudo.addEventListener('click', function(event){
    event.preventDefault();
});

//caixa de seleçao segue o mouse
conteudo.onmouseover = function(e) {
    selecaomouse = document.getElementById("selecao-mouse");
    identificador2 = e.target.id;

    if (identificador2){
        bt = document.getElementById(identificador2).getBoundingClientRect();

        selecaomouse.style.top = bt.y-2+'px';
        selecaomouse.style.left = bt.x-1+'px';
        selecaomouse.style.height = bt.height+2+'px';
        selecaomouse.style.width = bt.width+1+'px';
    }
}



//função mostrar código
function mostrartextcodigo(){
    mostrarcodigo = document.getElementById("text-code");
    mostrarcodigo.value = '<a href='+url+'><button id='+identificador+'>'+texto+'</button></a><style>#'+identificador+'{'+codigo[identificador+'-css']+'}</style>';
}



//função aplicar estilo
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



//função importar
function importar(){

    arquivo = document.getElementById("arquivo");
    arquivo.click(); 

}

arquivo.addEventListener('change', function () {

    varcodigo = new FileReader();

    varcodigo.addEventListener('load', function(){
        varcodigo = varcodigo.result

        Object.assign(importcodigo, JSON.parse(varcodigo));

        for (let loop = 1; loop <= (Object.keys(importcodigo).length)/3; loop ++){
            url = importcodigo["a"+loop+"-html-url"];
            texto = importcodigo["a"+loop+"-html-texto"];
            confirmarcriar ();
            //selecionar botão por id
            bt = document.getElementById(identificador);
            console.log(loop +" /--/ "+ (Object.keys(importcodigo).length)/3);

            bt.style.cssText =  importcodigo["a"+loop+"-css"];
            codigo["a"+loop+"-css"] = importcodigo["a"+loop+"-css"];
            caixaselecionada();
        }
        arquivo.value = "";
    });

    varcodigo.readAsText(this.files[0])
});



//função exportar
function exportar(){
    let codeblob= new Blob([JSON.stringify(codigo)], {type : 'text/json'});
    const link= window.document.createElement('a');
    link.href = window.URL.createObjectURL(codeblob);
    link.download = 'index.json';
    link.click();
    window.URL.revokeObjectURL(link.href);
}