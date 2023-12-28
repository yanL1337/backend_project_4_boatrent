import "react-datepicker/dist/react-datepicker.css";
import { useState, useContext, useEffect, useRef } from "react";
import { RefreshContext } from "../components/Handler";

const ReservierungAdd = ({ boote }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [aviableBoote, setAviableBoote] = useState([]);

  const startRef = useRef();
  const endRef = useRef();

  const refresh = useContext(RefreshContext);

  const addResv = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    await fetch(import.meta.env.VITE_BACKENDURL + "/reservierung/add", {
      method: "POST",
      body: form,
    });

    await fetch(import.meta.env.VITE_BACKENDURL + "/boot/addResv", {
      method: "PUT",
      body: form,
    });

    refresh((prev) => !prev);
    //console.log(obj);
  };

  const getAviableBoot = async () => {
    return await fetch(import.meta.env.VITE_BACKENDURL + "/boot/getAviable", {
      method: "POST",
      body: JSON.stringify({
        start: startRef.current.value,
        end: endRef.current.value,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    if (startSelected && endSelected) {
      getAviableBoot().then((data) => setAviableBoote(data));
    }
  }, [endSelected]);

  return (
    <div className="flex w-fit m-auto border rounded-xl p-10">
      <form className="flex flex-col items-center" onSubmit={addResv}>
        <input
          type="date"
          className="input border"
          name="Startdatum"
          id="Startdatum"
          ref={startRef}
          onChange={() => setStartSelected((prev) => !prev)}
          //onChange={(date) => setStartDate(date)}
        />

        <p>Bis</p>

        <input
          type="date"
          className="input "
          name="Enddatum"
          id="Enddatum"
          ref={endRef}
          onChange={() => setEndSelected((prev) => !prev)}
          //onChange={(date) => setStartDate(date)}
        />

        <select
          className="select select-primary w-full max-w-xs"
          name="Boot"
          id="Boot"
          disabled={
            (startSelected == false) | (endSelected == false) ? true : false
          }
        >
          <option value="">
            {endSelected ? "Boot wählen" : "Zuerst Datum auswählen"}
          </option>
          {aviableBoote.map((elt, index) => {
            return (
              <option key={index} value={elt._id}>
                {elt.Seriennummer}
              </option>
            );
          })}
        </select>

        <input className="btn" type="submit" value="Erstellen" />
      </form>
    </div>
  );
};

export default ReservierungAdd;
