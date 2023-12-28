import { useContext, useRef } from "react";
import Aside from "../components/Aside";
import { RefreshContext } from "../components/Handler";

const BooteAdd = () => {
  const refresh = useContext(RefreshContext);

  const addBoot = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    await fetch(import.meta.env.VITE_BACKENDURL + "/boot/add", {
      method: "POST",
      body: form,
    });

    refresh((prev) => !prev);
    //console.log(obj);
  };
  return (
    <div className="flex">
      <form className="flex flex-col" onSubmit={addBoot}>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          id="Baujahr"
          name="Baujahr"
          placeholder="Baujahr.."
        />
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          id="Seriennummer"
          name="Seriennummer"
          placeholder="Seriennummer..."
        />
        <select
          name="Material"
          className="select select-primary w-full max-w-xs"
          id="Material"
        >
          <option value="Seelen">Seelen</option>
        </select>
        <select
          className="select select-primary w-full max-w-xs"
          name="Bootsart"
          id="Bootsart"
        >
          <option value="Tauchboot">Tauchboot</option>
        </select>
        <input
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          type="file"
          id="imgLink"
          name="imgLink"
        />
        <input className="btn" type="submit" value="Erstellen" />
      </form>
    </div>
  );
};

export default BooteAdd;
