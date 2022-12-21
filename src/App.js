import React, { useState, useEffect } from "react";
import './App.css';


const App = () => {
  //Posición de los barcos del jugador humano  
  const [jugadas, setJugadas] = useState(
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
  //Posición de los barcos del computador  
  const [jugadasPC, setJugadasPC] = useState(
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]);
  //Turno
  const [turn, setTurn] = useState("pc")
  //Crea tiros del computador
  const [pcTurn, setPCTurn] = useState(
    (Math.floor(Math.random() * 99))
  );
  //console.log(pcTurn)

  //Texto que aparece en el div
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  //const [message, setMessage] = useState("");

  //índices de los barcos container 1
  const [ship1, setShip1] = useState([0, 1, 2, 3, 4]);
  const [ship2, setShip2] = useState([9, 19, 29, 39]);
  const [ship3, setShip3] = useState([40, 50, 60, 70]);
  const [ship4, setShip4] = useState([53, 54, 55]);
  const [ship5, setShip5] = useState([90, 91, 92, 93]);


  //índices de los barcos container 2
  const [ship6, setShip6] = useState([0, 10, 20, 30]);
  const [ship7, setShip7] = useState([16, 17, 18, 19]);
  const [ship8, setShip8] = useState([24, 34, 44, 54, 64]);
  const [ship9, setShip9] = useState([81, 82, 83, 84]);
  const [ships10, setShips10] = useState([97, 98, 99]);

  //función del container 1. PC TURN
  const fireTorpedo = (pcTurn) => {
    let indexShips = jugadas.map((item, index) => { //Función para conocer el índice de los barcos del container 1
      if (item === 2) return index
    }).filter(element => element !== undefined)

    setText("");

    let celdas = [...jugadas]
    for (let i = 0; i < celdas.length; i++) {
      if (celdas[pcTurn] === 1) {
        celdas[pcTurn] = 2 //shooted
        setText("One of the PC's ships was shooted!");

        //console.log("I was shooted")
      }
      else if (celdas[pcTurn] === 0) {
        celdas[pcTurn] = 3; //missed shot
        setText("The computer missed the shot!");
      }
    }
    setJugadas(celdas);
    if (turn !== null) { //condición inicial para poder jugar
      setTimeout(setTurn, 3000, "human");
      shootedShips(indexShips);
    }
  }
  let indexShipsPC = [];
  //función container 2. Human's Turn
  const fireTorpedo2 = (index) => {
    indexShipsPC = jugadasPC.map((item, index) => { //Función para conocer el índice de los barcos del container 2
      if (item === 2) return index
    }).filter(element => element !== undefined)
    setText("");
    let celdas = [...jugadasPC];
    for (let i = 0; i < celdas.length; i++) {
      if (celdas[index] === 1) {
        celdas[index] = 2 //shoot
        //console.log("I was shooted")

        setText("Well done! You shot a PC's ship");
      }
      else if (celdas[index] === 0) {
        celdas[index] = 3; //missed shot
        setText("");
        setText("You missed the shot! ");
      }
    }
    setJugadasPC(celdas);
    setPCTurn((Math.floor(Math.random() * 99)));
    if (turn !== null) { //condición inicial para poder jugar
      setTimeout(setTurn, 3000, "pc");
      setTimeout(fireTorpedo, 3000, pcTurn);
      shootedShipsPC(indexShipsPC);
    }

  }
  const [ship1Message, setShip1Message] = useState("");
  const [ship2Message, setShip2Message] = useState("");
  const [ship3Message, setShip3Message] = useState("");
  const [ship4Message, setShip4Message] = useState("");
  const [ship5Message, setShip5Message] = useState("");
  const [ship6Message, setShip6Message] = useState("");
  const [ship7Message, setShip7Message] = useState("");
  const [ship8Message, setShip8Message] = useState("");
  const [ship9Message, setShip9Message] = useState("");
  const [ship10Message, setShip10Message] = useState("");

  let shooted1 = "";
  let shooted2 = "";
  let shooted3 = "";
  let shooted4 = "";
  let shooted5 = "";
  let shooted6= "";
  let shooted7 = "";
  let shooted8 = "";
  let shooted9 = "";
  let shooted10 = ""; 

  // Función para determinar cuando un barco del usuario "PC" está hundido y cuando ya no tiene barcos disponibles: "GAME OVER"
  const shootedShipsPC = (indexShipsPC) => {
    
    if (indexShipsPC.includes(0) && indexShipsPC.includes(10) && indexShipsPC.includes(20) && indexShipsPC.includes(30)) {
      shooted6 = true;
      setShip6Message("Ship 6 was sunked");
    }

    if (indexShipsPC.includes(16) && indexShipsPC.includes(17) && indexShipsPC.includes(18) && indexShipsPC.includes(19)) {
      shooted7 = true;
      setShip7Message("Ship 7 was sunked");
    }

    if (indexShipsPC.includes(24) && indexShipsPC.includes(34) && indexShipsPC.includes(44) && indexShipsPC.includes(54) && indexShipsPC.includes(64)) {
      shooted8 = true;
      setShip8Message("Ship 8 was sunked");
    }

    if (indexShipsPC.includes(81) && indexShipsPC.includes(82) && indexShipsPC.includes(83) && indexShipsPC.includes(84)) {
      shooted9 = true;
      setShip9Message("Ship 9 was sunked");
    }

    if (indexShipsPC.includes(97) && indexShipsPC.includes(98) && indexShipsPC.includes(99)) {
      shooted10 = true;
      setShip10Message("Ship 10 was sunked");
    }
    if (shooted6 === true && shooted7 === true && shooted8 === true && shooted9 === true && shooted10 === true) {
      setText("GAME OVER! Human's wins")
      alert("GAME OVER! Human's wins");
      setTurn(null); //se termina el juego. Ya no se puede seguir haciendo jugadas.
      window.location.reload();
    }
  }
  console.log(turn)

  // Función para determinar cuando un barco del usuario "humano" está hundido y cuando ya no tiene barcos disponibles: "GAME OVER"
  const shootedShips = (indexShips) => {

    if (indexShips.includes(0) && indexShips.includes(1) && indexShips.includes(2) && indexShips.includes(3) && indexShips.includes(4)) {
      shooted1 = true;
      setShip1Message("Ship 1 was sunked");
    }

    if (indexShips.includes(9) && indexShips.includes(19) && indexShips.includes(29) && indexShips.includes(39)) {
      shooted2 = true;
      setShip2Message("Ship 2 was sunked"); 
    }

    if (indexShips.includes(40) && indexShips.includes(50) && indexShips.includes(60) && indexShips.includes(70)) {
      shooted3 = true;
      setShip3Message("Ship 3 was sunked");
    }

    if (indexShips.includes(53) && indexShips.includes(54) && indexShips.includes(55)) {
      shooted4 = true;
      setShip4Message("Ship 4 was sunked");
    }

    if (indexShips.includes(93) && indexShips.includes(92) && indexShips.includes(91) && indexShips.includes(90)) {
      shooted5 = true;
      setShip5Message("Ship 5 was sunked");
    }

    if (shooted1 === true && shooted2 === true && shooted3 === true && shooted4 === true && shooted5 === true) {
      setText2("GAME OVER! Human's wins")
      alert("GAME OVER! PC's wins");
      setTurn(null); //se termina el juego. Ya no se puede seguir haciendo jugadas.
      window.location.reload();
    }
  }


  const reiniciar = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Welcome to the battleship game</h1>
      <div className="reset-btn" onClick={(e) => reiniciar(e)}>Reset Game</div>
      {turn === "human" ?
        <div className="container1">
          <h3 id="h31">It's PC's turn</h3>
          <div className="tablero1" id="tablero1">
            {jugadas.map((celda, index) => {
              return (
                <div className={
                  jugadas[index] === 0 ? "celda" : (jugadas[index] === 3 ? "celda torpedo" : (jugadas[index] === 2 ? "celda shooted" : "celda barco1"))}
                  key={index}></div>
              )
            })};
          </div>
          <div className="panel two">Announcements
            <div className="messShipText2">{text2}</div>
            <div className="messShip">Hola</div>
            <div className="messShip">{ship2Message}</div>
            <div className="messShip">{ship3Message}</div>
            <div className="messShip">{ship4Message}</div>
            <div className="messShip">{ship5Message}</div>
          </div>
        </div>
        :
        <div className="container2">
          <h3 id="h32">It's Human's turn</h3>
          <div className="tablero" id="tablero2">
            {jugadasPC.map((celda, index) => {
              return (
                <div className={
                  jugadasPC[index] === 0 ? "celda" : (jugadasPC[index] === 3 ? "celda torpedo2" : (jugadasPC[index] === 2 ? "celda shooted2" : "celda barco2"))}
                  key={index} onClick={() => setTimeout(fireTorpedo2(index), 4000)}></div>
              )
            })};
          </div>
          <div className="panel one">Announcements
            <div className="messShipText">{text}</div>
            <div className="messShip">{ship6Message}</div>
            <div className="messShip">{ship7Message}</div>
            <div className="messShip">{ship8Message}</div>
            <div className="messShip">{ship9Message}</div>
            <div className="messShip">{ship10Message}</div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
