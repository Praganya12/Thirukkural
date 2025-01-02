import { useState } from "react";
import produce from "immer";
import "./App.css";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
import { Like } from "./components/Like/Like";
import TodoList from "./components/TodoList";
import MeasurementConverter from "./components/MeasurementConverter";
import DataFetch from "./components/DataFetch";
import Thirukkural from "./components/Thirukkural";
import TodoApp from "./components/TodoApp";
function App() {
  let items = ["New york", "San franciso", "India", "Tokyo", "London"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  // const [alertVisible, setAlertVisibility] = useState(false);

  // const [isVisible, setVisibility] = useState(false);

  //updating objects
  // const [drink, setDrink] = useState({
  //   title: "Americano",
  //   price: 5,
  // });
  // const handleClick = () => {
  //   // const newDrink = {
  //   //   ...drink,
  //   //   price: 6,
  //   // };

  //   setDrink({ ...drink, price: 8 });
  // };

  // // let count = 0;

  // const handleClick = () => {
  //   setVisibility(true);
  //   // count++;
  //   console.log(isVisible);
  // };

  // updating nested objects
  // const [customer, setCustomer] = useState({
  //   name: "John",
  //   address: {
  //     city: "San francisco",
  //     zipCode: 94111,
  //   },
  // });

  // const handleClick = () => {
  //   setCustomer({
  //     ...customer,
  //     address: { ...customer.address, zipCode: 604407 },
  //   });
  // };

  // updating array
  // const [tags, setTags] = useState(["happy", "cheerfu;l"]);
  // const handleClick = () => {
  //   // add
  //   setTags([...tags, "exciting"]);

  //   // remove
  //   setTags(tags.filter((tag) => tag !== "happy"));

  //   // update
  //   setTags(tags.map((tag) => (tag === "happy" ? "happiness" : tag)));
  // };

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);
  const handleClick = () => {
    setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
    // draft -- copy of bugs array
  };
  return (
    // <div className="App">
    //   <ListGroup
    //     items={items}
    //     heading="Cities"
    //     onSelectItem={handleSelectItem}
    //   />
    // </div>
    // <div>
    //   {alertVisible && (
    //     <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>
    //   )}
    //   <Button color="primary" onClick={() => setAlertVisibility(true)}>
    //     My button
    //   </Button>
    // </div>
    // <div>
    //   <Like onClick={() => console.log("Clicked")} />
    // </div>
    // <div>
    //   <button onClick={handleClick}>Show</button>
    // </div>
    // <>
    //   <Message />
    //   <Message />
    // </>
    // <div>
    //   {bugs.map((bug) => (
    //     <p key={bug.id}>
    //       {bug.title} {bug.fixed ? "Fixed" : "New"}
    //     </p>
    //   ))}
    //   <button onClick={handleClick}>Click me</button>
    // </div>

    <div>
      {/* <MeasurementConverter/> */}
      {/* <DataFetch/> */}
      {/* <TodoList /> */}
      {/* <Thirukkural/> */}
      <TodoApp/>
    </div>
  );
}
export default App;
