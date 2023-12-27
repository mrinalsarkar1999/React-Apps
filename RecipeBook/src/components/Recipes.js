import Card from "./Card";

export default function Recipes(data) {
  const cArray = data.data.map((item) => (
    <Card
      key={item.id}
      /*Spreading the object like we do in ES6*/
      {...item}
    />
  ));
  return (
    <div className="recipes">
      <h3 className="recipe-heading">Recipes</h3>
      <div className="cardContainer">{cArray}</div>
    </div>
  );
}
