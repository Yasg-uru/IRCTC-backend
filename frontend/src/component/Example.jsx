import { useState } from "react";

function Example() {
  const [trying, settrying] = useState(false);
  return (
    <div>
      <p>
        hello i am yash choudhary and i am a mern stack developer and mean stack
        also
      </p>
      <button
        onClick={() => {
          settrying(true);
        }}
      >click to render another component </button>{" "}
{
    trying && Ex2()
}
    </div>
  );
}
export default Example;
function Ex2(){
    return <div className="text-red-500 font-bold text-3xl">
        hey this is a another function that renders on theExample component 


    </div>
}