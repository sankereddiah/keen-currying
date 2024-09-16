import { Component } from "react";
import "./styles.css";

class Single extends Component {
  state = { data: [] };

  render() {
    let { filter } = this.props;
    let { data } = this.state;
    console.log(filter);

    let { strMeal, strArea, strMealThumb, strCategory, strInstructions } =
      filter;

    return (
      <div className="card-container">
        <h1>{strMeal}</h1>
        <img src={strMealThumb} alt={strMeal} className="image" />

        <p>{strArea}</p>
        <p>{strCategory}</p>
        <h1 className="dis">Description</h1>
        <p className="text">{strInstructions}</p>
        <h1 className="dis">ingredience</h1>
        <ul className="list-container">
          <li>{filter.strIngredient1}</li>
          <li>{filter.strIngredient2}</li>
          <li>{filter.strIngredient3}</li>
          <li>{filter.strIngredient4}</li>
          <li>{filter.strIngredient5}</li>
        </ul>
      </div>
    );
  }
}

let Card = ({ data, change }) => {
  let { idMeal, strMealThumb, strMeal, strArea } = data;
  let changing = () => {
    change(idMeal);
  };
  return (
    <li key={idMeal} className="item" onClick={changing}>
      <img src={strMealThumb} alt={strMeal} className="image" />
      <p>{strMeal}</p>
      <p>{strArea}</p>
    </li>
  );
};

export default class App extends Component {
  state = { items: [], input: "chicken", id: "" };
  update = (event) => {
    this.setState({ input: event.target.value }, this.getData);
  };

  change = (value) => {
    this.setState({ id: value });
  };

  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    let { input } = this.state;
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    let result = await data.json();
    this.setState({ items: result.meals });
  };

  render() {
    let { items, id } = this.state;
    let state = items === null;
    let filter;
    if (items != null) {
      filter = items.filter((each) => each.idMeal === id);
    }

    console.log(filter);

    return (
      <div className="container">
        <nav className="nav">
          <p>Meals</p>
          <div>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </nav>
        <input
          type="search"
          onChange={this.update}
          className="input"
          placeholder="Enter Name"
        />
        {id === "" ? (
          <ul className="bottom">
            {items.map((each) => (
              <Card data={each} change={this.change} />
            ))}
          </ul>
        ) : (
          <Single filter={filter["0"]} />
        )}
      </div>
    );
  }
}
