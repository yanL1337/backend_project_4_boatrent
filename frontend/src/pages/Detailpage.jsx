import { useParams } from "react-router-dom";

const DetailPage = ({ boote }) => {
  const id = useParams().id;

  const boot = boote.filter((boot) => boot._id === id)[0];

  console.log(boot);
  return (
    <section className="w-fit flex items-center m-auto">
      <div>
        <img className="w-80" src={boot.imgLink} alt="" />
      </div>
      <div className="text-7xl">
        <p>Baujahr: {boot.Baujahr}</p>
        <p>Seriennummer: {boot.Seriennummer}</p>
        <p>Material: {boot.Material}</p>
        <p>Bootsart: {boot.Bootsart}</p>
      </div>
    </section>
  );
};

export default DetailPage;
