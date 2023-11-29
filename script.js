document.addEventListener("DOMContentLoaded", function () {//uso del DOM
    const sequence = [];                                   // creamos las variables que necesitamos
    let userSequence = [];                                //secuencia y secuencia del usuario (arrays vacios)
    let level = 0;                                        //nivel y puntuacion (igualados a 0)
    let score = 0;
    const colors = ["rojo", "verde", "amarillo", "azul"];// array con los colores
    let gameStarted = false;                             // y variable booleana para saber si el juego esta apagado o encendido
  
    const startButton = document.getElementById("start");// aqui asociamos el botón de start que esta en el html a una variable
   startButton.addEventListener("click", startGame);    //asociamos el click del botón con la funcion empezar juego
  
    function startGame() {                              // funcion empezar juego (no recibe nada)
      if (!gameStarted) {                               // si el statement de la variable gameStarted es contrario se iniciara esta función
        gameStarted = true;                             // empezará
        startButton.disabled = true;                     // desactiva el boton de start ( al perder con el alert se reactibará)
        score = 0;                                       // declaro otra vez que score es 0 ya que si juegas varias veces necesitas reinicializar la variable
        nextRound();                                      //inicializamos la siguiente función
      }
    }
  
    function nextRound() {                                //función para pasar rondas (no recibe nada)
      userSequence = [];                                 // resetea la secuencia del usuario (array vacio)
      level++;                                            // sube un nivel (el nivel estaba declarado a 0 ln4)     
      const randomColor = colors[Math.floor(Math.random() * 4)];// Agrega un nuevo color a la secuencia (coge una posicion aleatoria del array de colores)
      sequence.push(randomColor);
      showSequence();                                   // función que muestra la secuencia al jugador
    }
  
    function showSequence() {                           // declaración de la función que enseña la secuencia de la máquina
      let i = 0;                                        // variable del vector
      const interval = setInterval(function () {         //declaras variable constante interval y que recoja los valoresde la propia función
        highlightColor(sequence[i]);                    // ejecuta la función de la ln41
        i++;                                            // añade 1 al i para avanzar en el vector
        if (i >= sequence.length) {                     //if, si la posicion de i es mayor que la longitud del vector de secuencia 
          clearInterval(interval);                      // se ejecuta la función que borra el contenido de interval
          enableUserInput();                             // se ejecuta la función que deja al usuario contestar (ln57)
        }
      }, 1000);                                          // Intervalo de 1000ms entre cada color en la secuencia
    }
  
    function highlightColor(color) {                      // función para resaltar los colores
      const colorElement = document.querySelector(`.${color}`);// creas una constante que reconozca el color que has pulsado desde el html
      colorElement.classList.add("active");                     
      playAudio(color);                                     // Reproduce el sonido correspondiente al color
  
      setTimeout(() => {                                     // función para declara el intervalo entre encendidos de la secuencia
        colorElement.classList.remove("active");            // se apagan los botones 
      }, 500);                                              // Resalta el color durante 500ms
    }
  
    function playAudio(color) {                               // función para reproducir el sonido de cada botón
      const audio = document.getElementById("audio-" + color);// con esto reconoce las etiquetas que he usado en el html para declararlo
      audio.currentTime = 0;                                  // reproduce el audio desde el principio
      audio.play();                                           // reproduce el audio
    }
  
    function enableUserInput() {                               //función para que el usuario escriba su secuencia
      document.querySelectorAll(".pulsador div").forEach(function (element) {// Después de mostrar la secuencia, habilita la interacción del usuario con los colores
        element.addEventListener("click", handleUserClick);                 
      });
    }
  
    function handleUserClick(event) {                     // función que permite clickar al usuario
      const clickedColor = event.target.classList[0];      // crea una variable constante para los colores de la lista que se han pulsado
      highlightColor(clickedColor);                         // llama a la función que resalta los colores cuando son pulsados
      userSequence.push(clickedColor);                      // reemplaza los colores pulsados en el array de la secuencia del jugador
      if (!checkUserInput()) {                            // Verifica si la secuencia del usuario coincide con la secuencia del juego
        endGame();                                        // Termina el juego
      } else if (userSequence.length === sequence.length) {// si el vector coincide y tiene el mismo tamaño
        score++;                                            // sube la puntuación
        setTimeout(nextRound, 1000);                        // llama a la funcion timeout y pasa a la siguiente ronda y 1000ms de intervalo
      }
    }
  
    function checkUserInput() {                               // función para comprobar que coinciden las secuencias
      for (let i = 0; i < userSequence.length; i++) {         // bucle de i para recorer ambos vectores
        if (userSequence[i] !== sequence[i]) {                  // si los arrays difieren 
          return false;                                         // hace que la función devuelva false
        }
      }
      return true;                                              // si no difiere devuelve true
    }
  
    function endGame() {
      
      const audiod = document.getElementById("audio-death");  // Obtén la referencia al elemento de audio con el ID "audio-death"
    
      
      audiod.currentTime = 0;                                 // Establece el tiempo de reproducción del audio al principio
    
     
      audiod.addEventListener('ended', function () {          // Agrega un event listener para el evento 'ended' del elemento de audio
        gameStarted = false;                                  // Desactiva la variable que indica que el juego está en curso
        startButton.disabled = false;                        // Habilita el botón de inicio que estaba deshabilitado durante el juego
        level = 0;                                          // Reinicia el nivel del juegO
        sequence.length = 0;                                // Reinicia la secuencia de juego
        alert("AGUANTASTE " + score + " RONDAS, pulsa <START> para probar otro intento");// Muestra un mensaje de alerta con la puntuación y las instrucciones
        document.querySelectorAll(".pulsador div").forEach(function (element) {// Desactiva los event listeners de clic en los botones del juego
          element.removeEventListener("click", handleUserClick);
        });
      });
      audiod.play();                                          // Inicia la reproducción del audio
    }
    
  });
  