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
    <div className="w-fit flex m-auto">
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
          <option value="GFK">GFK</option>
          <option value="Holz">Holz</option>
          <option value="Metall">Metall</option>
          <option value="Pappe">Pappe</option>
        </select>
        <select
          className="select select-primary w-full max-w-xs"
          name="Bootsart"
          id="Bootsart"
        >
          <option value="Tretboot">Tretboot</option>
          <option value="Segelboot">Segelboot</option>
          <option value="Luftkissenboot">Luftkissenboot</option>
          <option value="Geisterschiff">Geisterschiff</option>
          <option value="Containerschiff">Containerschiff</option>
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
