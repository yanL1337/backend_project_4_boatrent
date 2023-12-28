import Aside from "../components/Aside";
import List from "../components/List/List";

const Reservierungen = ({ resv }) => {
  return (
    <div className="flex">
      <List linkTo={"/Reservierung/add"} data={resv} format={"Reservierung"} />
    </div>
  );
};

export default Reservierungen;
