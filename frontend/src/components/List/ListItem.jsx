import { Link } from "react-router-dom";

const ListItem = ({ item, format }) => {
  return format === "Boot" ? (
    <article className="border p-20 gap-10 flex-wrap flex justify-center items-center h-90 ">
      <p>Baujahr: {item.Baujahr}</p>
      <p>Seriennummer: {item.Seriennummer}</p>
      <p>Material: {item.Material}</p>
      <p>Bootsart: {item.Bootsart}</p>
      <div>
        <img className="w-40" src={item.imgLink} alt="" />
      </div>
      <Link to={`/boot/${item._id}`} className="btn bordered">
        Details
      </Link>
    </article>
  ) : (
    <article className="border p-20 gap-10 flex-wrap flex justify-center items-center ">
      <p>Startdatum: {new Date(item.Startdatum).toLocaleDateString()}</p>
      <p>Enddatum: {new Date(item.Enddatum).toLocaleDateString()}</p>
      <p>Boot: {item.Boot}</p>
    </article>
  );
};

export default ListItem;
