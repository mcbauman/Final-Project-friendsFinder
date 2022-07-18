import COF from "../components/COF.png";
import "../components/welcome.scss";

export default function Welcome(props) {
  function click() {
    props.setDisplay("hide welcome");
    props.setDisplay2("show");
  }
  return (
    <div className={props.disp}>
      <img src="COF.png" alt="the circle of friends" />
      <h1>the Circle of friends </h1><br/>
      <p>why we came and foremost how we came together</p>
      <a onClick={click}> come and see your friends here</a>
    </div>
  );
}
