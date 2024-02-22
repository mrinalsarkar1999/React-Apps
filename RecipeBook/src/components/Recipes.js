import Card from "./Card";

export default function Recipes(data) {
  var cusine;
  if(data.data.length>0){
    cusine = data.data[0].cusine;
  }
  else{
    cusine = "No Recipes found";
  }
  const cArray = data.data.map((item) => (
    <Card
      key={item.id}
      /*Spreading the object like we do in ES6*/
      {...item}
    />
  ));
  return (
    <div className="recipes">
      <h3 className="recipe-heading">{cusine}</h3>
      <div className="cardContainer">{cArray}</div>
    </div>
  );
}
