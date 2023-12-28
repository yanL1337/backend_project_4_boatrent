const ListItem = ({ item, format }) => {
  return format === "Boot" ? (
    <article className="border p-20 gap-10 flex-wrap flex justify-center items-center ">
      <p>Baujahr: {item.Baujahr}</p>
      <p>Seriennummer: {item.Seriennummer}</p>
      <p>Material: {item.Material}</p>
      <p>Bootsart: {item.Bootsart}</p>
      <div>
        <img src={item.imgLink} alt="" />
      </div>
    </article>
  ) : (
    <article className="border p-20 gap-10 flex-wrap flex justify-center items-center ">
      <p>Startdatum: {item.Startdatum}</p>
      <p>Enddatum: {item.Enddatum}</p>
      <p>Boot: {item.Boot}</p>
    </article>
  );
};

export default ListItem;
