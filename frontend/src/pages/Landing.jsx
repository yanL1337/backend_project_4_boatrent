import Aside from "../components/Aside";

const Landing = ({ boote, resv }) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const unaviable = resv.filter(
    (elt) =>
      new Date(elt.Startdatum) <= today && new Date(elt.Enddatum) >= today
  );

  return (
    <div className="flex items-center m-auto w-fit">
      <div className="flex gap-20 ">
        <section className="text-center">
          <p>Aktuelle Reservierungen</p>
          <p>{resv.length}</p>
        </section>
        <section className="text-center">
          <p>Verfügbare Boote</p>
          <p>{boote.length - unaviable.length}</p>
        </section>
        <section className="text-center">
          <p>Gesamtanzahl Botte</p>
          <p>{boote.length}</p>
        </section>
      </div>
    </div>
  );
};

export default Landing;
