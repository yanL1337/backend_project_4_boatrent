import { useParams } from "react-router-dom";

const DetailPage = ({ boote, format, resv }) => {
  const id = useParams().id;

  const item =
    format === "Boot"
      ? boote.filter((boot) => boot._id === id)[0]
      : resv.filter((rese) => rese._id === id)[0];

  const imgPath = resv
    ? boote.filter((boot) => boot._id === item.Boot)[0].imgLink
    : null;

  console.log(imgPath);

  return format === "Boot" ? (
    <section className="w-fit flex items-center m-auto">
      <div>
        <img className="w-80" src={item.imgLink} alt="" />
      </div>
      <div className="text-7xl">
        <p>Baujahr: {item.Baujahr}</p>
        <p>Seriennummer: {item.Seriennummer}</p>
        <p>Material: {item.Material}</p>
        <p>Bootsart: {item.Bootsart}</p>
      </div>
    </section>
  ) : (
    <section className="w-fit flex items-center m-auto ">
      <div>
        <img className="w-80" src={imgPath} alt="" />
      </div>
      <div className="text-7xl">
        <p>Startdatum: {new Date(item.Startdatum).toLocaleDateString()}</p>
        <p>Enddatum: {new Date(item.Enddatum).toLocaleDateString()}</p>
        <p>Boot: {item.Boot}</p>
      </div>
    </section>
  );
};

export default DetailPage;
