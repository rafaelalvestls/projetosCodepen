var carta0 = {
  nome: "Chun Li",
  imagem: "https://i.pinimg.com/originals/53/2f/83/532f8341b184acbabeb2e517813a4759.gif",
  atributos:{
    ataque: 70, 
    defesa: 62, 
    magia: 85
  }
}

var carta1 = {
  nome: "Ryu",
  imagem: "http://4.bp.blogspot.com/-efr4-vtrw4M/VQmCVXJqDwI/AAAAAAAANwM/mGfQKusK9Lw/s1600/Ryu%2B2.gif",
  atributos:{
    ataque: 75, 
    defesa: 70, 
    magia: 55
  }
}

var carta2 = {
  nome: "Ken",
  imagem: "https://i.pinimg.com/originals/e2/3c/fa/e23cfa42ba3750d916da7f329f7b1319.gif",
  atributos:{
    ataque: 72, 
    defesa: 68, 
    magia: 81
  }
}

var carta3 = {
  nome: "Blanka",
  imagem: "https://thumbs.gfycat.com/MediumShowyAlligatorsnappingturtle-size_restricted.gif",
  atributos:{
    ataque: 72, 
    defesa: 65, 
    magia: 79
  }
} 

var carta4 = {
  nome: "Vega",
  imagem: "http://1.bp.blogspot.com/-0t5BIua3uMY/VQ3aZ4CaGTI/AAAAAAAAOSw/cUYk1-0hzp8/s1600/Vega%2B1.gif",
  atributos:{
    ataque: "SUPER TRUNFO", 
    defesa: "SUPER TRUNFO", 
    magia: "SUPER TRUNFO"
  }
}

var carta5 = {
  nome: "Mika",
  imagem: "https://i.pinimg.com/originals/29/28/36/292836c20ccc8b329c1b59856033f20d.gif",
  atributos:{
    ataque: 75, 
    defesa: 68, 
    magia: 94  
  }
}

var cartaMaquina
var cartaJogador
var cartas = [carta0, carta1, carta2, carta3, carta4, carta5]

var pontosJogador = 0
var pontosMaquina = 0
atualizaPlacar()
atualizaQuantidadeDeCartas()

function proximaRodada(){
  var divCartas = document.getElementById("cartas")
  divCartas.innerHTML = `<div id = "carta-jogador" class = "carta"></div> <div id = "carta-maquina" class = "carta"></div>`
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = "" 
}

function atualizaQuantidadeDeCartas(){
  var divQuantidadeCartas = document.getElementById("quantidade-cartas")
  var html = "Quantidade de cartas no jogo: " + cartas.length
  
  divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar(){
  var divPlacar = document.getElementById("placar")
  var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Máquina"
  
  divPlacar.innerHTML = html
  
}

function sortearCarta(){
//  if(cartas.length == 0){
  //  if(pontosJogador > pontosMaquina){
    //  alert('Parabéns, você venceu!')
    //}else if(pontosJogador < pontosMaquina){
     // alert('Você perdeu')
    //}else{
     // alert('Empatou')
    //}
    //return false;
  //}
  var sorteio = cartas.length
  var numeroCartaMaquina = parseInt(Math.random()*sorteio)
  cartaMaquina = cartas[numeroCartaMaquina]
  cartas.splice(numeroCartaMaquina, 1)
 // console.log(sorteio + "maquina")
 // console.log(numeroCartaMaquina + "maquina")
  //console.log(cartaMaquina + "maquina")
  sorteio = cartas.length
  var numeroCartaJogador = parseInt(Math.random()*sorteio)
  while(numeroCartaJogador == numeroCartaMaquina && numeroCartaJogador > sorteio){
    numeroCartaJogador = parseInt(Math.random()*sorteio)
  }
  cartaJogador = cartas[numeroCartaJogador]
  cartas.splice(numeroCartaJogador, 1)
  //console.log(sorteio + "jogador")
  //console.log(numeroCartaJogador + "jogador")
  //console.log(cartaJogador + "jogador")
  sorteio = cartas.length
  document.getElementById('btnSortear').disabled = true
  document.getElementById('btnJogar').disabled = false
  exibeCartaJogador()
}

function exibeCartaJogador(){
  var divCartaJogador = document.getElementById("carta-jogador")
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
  
  var nome = `<p class="carta-subtitle">${cartaJogador.nome} </p>`
  var opcoesTexto = ""
  if(cartaJogador.atributos.magia == "SUPER TRUNFO"){
    for(var atributo in cartaJogador.atributos){
    opcoesTexto += "<p type = 'text' name = 'atributo' value = '" + atributo + "'>" + atributo + ": " + cartaJogador.atributos[atributo] + "<br>"
    }
  }
  else{
      for(var atributo in cartaJogador.atributos){
    opcoesTexto += "<input type = 'radio' name = 'atributo' value = '" + atributo + "'>" + atributo + ": " + cartaJogador.atributos[atributo] + "<br>"
      }
  }
  
  var html = "<div id='opcoes' class='carta-status'>"
  
  divCartaJogador.innerHTML = moldura+nome+html+opcoesTexto
}

function jogar(){
  var divResultado = document.getElementById("resultado")
  var atributoSelecionado = obtemAtributoSelecionado()
  console.log(atributoSelecionado)
  exibeCartaMaquina()
  if(atributoSelecionado == undefined){
    htmlResultado = '<p class="resultado-final">Você perdeu a rodada para a máquina porque não selecionou um atributo de batalha!</p>'
   pontosMaquina++
  }else if(cartaJogador.atributos.magia== "SUPER TRUNFO"){
   htmlResultado = '<p class="resultado-final">Você venceu a rodada! SUPER TRUNFO</p>'
   pontosJogador++
 } else if(cartaMaquina.atributos.magia == "SUPER TRUNFO"){
   htmlResultado = '<p class="resultado-final">Você perdeu a rodada para o SUPER TRUNFO da máquina!</p>'
   pontosMaquina++
 } else if(cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]){
    htmlResultado = '<p class="resultado-final">Você venceu a rodada!</p>'
   pontosJogador++
  }else if(cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]){
    htmlResultado = '<p class="resultado-final">Você perdeu a rodada! A carta da máquina é mais forte.</p>'
    pontosMaquina++
  }else if(cartaJogador.atributos[atributoSelecionado] == cartaMaquina.atributos[atributoSelecionado]) {
    htmlResultado = '<p class="resultado-final">Empatou!</p>'
  }
  
  divResultado.innerHTML = htmlResultado
  document.getElementById('btnJogar').disabled = true
  //exibeCartaMaquina()
  atualizaQuantidadeDeCartas()
  atualizaPlacar()
  if(cartas.length == 0){
    document.getElementById('btnProximaRodada').disabled = true
    var divTextoFinal = document.getElementById("textoInstrucao")
    var htmlFinal = ""
    if(pontosJogador > pontosMaquina){
      htmlFinal = `<div style = "background-color: purple; color: white;"><h2> FIM DE JOGO : Parabéns, você derrotou a máquina! </h2></div>`
    }else if(pontosJogador < pontosMaquina){
      htmlFinal = `<div style = "background-color: purple; color: white;"><h2> FIM DE JOGO : Você foi derrotado pela máquina! </h2></div>`
    }else{
      htmlFinal = `<div style = "background-color: purple; color: white;"><h2> FIM DE JOGO : Empate! </h2></div>`
    }
    divTextoFinal.innerHTML = htmlFinal
    return false
  }
  document.getElementById('btnProximaRodada').disabled = false
}

function obtemAtributoSelecionado(){
  var radioAtributo = document.getElementsByName('atributo')
  if(cartaJogador.atributos.magia != "SUPER TRUNFO"){
    if(radioAtributo[0].checked || radioAtributo[1].checked || radioAtributo[2].checked){
         for(var i = 0; i < radioAtributo.length; i++){
            if(radioAtributo[i].checked){
              return radioAtributo[i].value
            }
         }
      }  
  }else if(cartaJogador.atributos.magia == "SUPER TRUNFO"){
      return false
  }
}

function exibeCartaMaquina(){
  var divCartaMaquina = document.getElementById("carta-maquina")
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
  
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome} </p>`
  var opcoesTexto = ""
  for(var atributo in cartaMaquina.atributos){
    opcoesTexto += "<p type = 'text' name = 'atributo' value = '" + atributo + "'>" + atributo + ": " + cartaMaquina.atributos[atributo] + "<br>"
  }
  
  var html = "<div id='opcoes' class='carta-status'>"
  
  divCartaMaquina.innerHTML = moldura+nome+html+opcoesTexto
}