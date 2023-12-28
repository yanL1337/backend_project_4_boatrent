import Aside from "../components/Aside";

const Landing = ({ boote }) => {
  return (
    <div className="flex items-center">
      <div className="flex gap-20 ">
        <section>
          <p>Aktuelle Reservierungen</p>
          <p>10</p>
        </section>
        <section>
          <p>Verfügbare Boote</p>
          <p>10</p>
        </section>
        <section>
          <p>Gesamtanzahl Botte</p>
          <p>{boote.length}</p>
        </section>
      </div>
    </div>
  );
};

export default Landing;
