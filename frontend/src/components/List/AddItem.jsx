import { Link } from "react-router-dom";

const AddItem = ({ linkTo }) => {
  return (
    <div className="mb-5 ">
      <Link className="btn w-20 bg-orange-700" to={linkTo}>
        +
      </Link>
    </div>
  );
};

export default AddItem;
