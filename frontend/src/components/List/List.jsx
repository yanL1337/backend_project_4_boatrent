import AddItem from "./AddItem";
import ListItem from "./ListItem";

const List = ({ data, linkTo, format }) => {
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <AddItem linkTo={linkTo} />
      <section className="grid grid-cols-3 gap-5">
        {data.map((item, index) => {
          return <ListItem key={index} item={item} format={format} />;
        })}
      </section>
    </div>
  );
};

export default List;
