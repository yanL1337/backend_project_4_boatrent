import { Link } from "react-router-dom";

const AddItem = ({ linkTo }) => {
  return (
    <div className="mb-5">
      <Link className="btn" to={linkTo}>
        +
      </Link>
    </div>
  );
};

export default AddItem;
