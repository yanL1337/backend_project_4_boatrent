import Aside from "../components/Aside";
import List from "../components/List/List";

const Boote = ({ boote }) => {
  return (
    <div>
      <List linkTo={"/Boote/add"} data={boote} format={"Boot"} />
    </div>
  );
};

export default Boote;
