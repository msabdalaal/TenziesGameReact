export default function Die(props) {
  return (
    <div className="box">
      <li onClick={props.holdDice} className={props.isHeld ? "active" : ""}>
        {props.number}
      </li>
    </div>
  );
}
