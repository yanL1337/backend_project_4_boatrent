// Importieren des Link-Komponenten von React Router für die Navigation.
import { Link } from "react-router-dom";

// ListItem-Komponente, die ein Element und ein Format als Props erhält.
const ListItem = ({ item, format }) => {
  // Überprüfen, ob das Format 'Boot' ist. Wenn ja, wird ein spezifisches Layout für ein Boot gerendert.
  return format === "Boot" ? (
    // Artikel-Tag für die Boot-Darstellung mit stilistischen Klassen.
    <article className="border p-20 gap-10 flex-wrap flex justify-center items-center h-90 ">
      {/* Rendern verschiedener Bootseigenschaften. */}
      <p>Baujahr: {item.Baujahr}</p>
      <p>Seriennummer: {item.Seriennummer}</p>
      <p>Material: {item.Material}</p>
      <p>Bootsart: {item.Bootsart}</p>
      {/* Anzeigen des Bildes des Boots, falls verfügbar. */}
      <div>
        <img className="w-40" src={item.imgLink} alt="" />
      </div>
      {/* Link zu einer Detailseite für das Boot, dynamisch basierend auf der Boot-ID. */}
      <Link to={`/boot/${item._id}`} className="btn bordered">
        Details
      </Link>
    </article>
  ) : (
    // Andernfalls wird angenommen, dass das Format nicht 'Boot' ist und ein alternatives Layout gerendert.
    <article className="border p-20 gap-10 flex-wrap flex justify-center items-center ">
      {/* Datumswerte werden zu lesbareren Formaten konvertiert. */}
      <p>Startdatum: {new Date(item.Startdatum).toLocaleDateString()}</p>
      <p>Enddatum: {new Date(item.Enddatum).toLocaleDateString()}</p>
      {/* ID des zugehörigen Boots wird angezeigt. */}
      <p>Boot: {item.Boot}</p>
      <Link to={`/reservierung/${item._id}`} className="btn bordered">
        Details
      </Link>
    </article>
  );
};

// Export der ListItem-Komponente für die Verwendung in anderen Teilen der Anwendung.
export default ListItem;
