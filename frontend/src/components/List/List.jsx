import AddItem from "./AddItem";
import ListItem from "./ListItem";

const List = ({ data, linkTo, format }) => {
  return (
    <div className="flex flex-col  w-fit m-auto items-center ">
      <AddItem linkTo={linkTo} />
      <section className="grid grid-cols-3 gap-5 ">
        {data.map((item, index) => {
          return <ListItem key={index} item={item} format={format} />;
        })}
      </section>
    </div>
  );
};

export default List;
