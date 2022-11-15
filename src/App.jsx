import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Die from "./components/Die";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  let [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    let allHeld = dice.every((die) => die.isHeld);
    let firstValue = dice[0].value;
    let allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  let boxes = dice.map((die) => (
    <Die
      key={die.id}
      number={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function getNewDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((old) =>
      old.map((die) => (die.id == id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  return (
    <div className="page">
      {tenzies && <Confetti width={360} />}
      <div className="container">
        <Header />
        <main>
          <ul>{boxes}</ul>
        </main>
        <button onClick={getNewDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </div>
  );
}

export default App;
