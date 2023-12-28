import DatePicker from "react-datepicker";
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
    startSelected ? console.log("dAWD") : null;
    if (startSelected && endSelected) {
      console.log(startRef.current.value);
      getAviableBoot().then((data) => setAviableBoote(data));
    }
  }, [startSelected, endSelected]);

  return (
    <div className="flex">
      <form className="flex flex-col items-center" onSubmit={addResv}>
        {/* <DatePicker
          placeholderText="Startdatum"
          id="Startdatum"
          name="Startdatum"
          className="input input-bordered input-primary w-full max-w-xs"
          onSelect={() => setStartSelected((prev) => !prev)}
          selected={startDate}
          //dateFormat={"dd.MM.yyyy"}
          onChange={(date) => setStartDate(date)}
        /> */}

        <input
          type="date"
          className="input "
          name="Startdatum"
          id="Startdatum"
          ref={startRef}
          onInput={() => setStartSelected((prev) => !prev)}
          //onChange={(date) => setStartDate(date)}
        />

        <p>Bis</p>

        <input
          type="date"
          className="input "
          name="Enddatum"
          id="Enddatum"
          ref={endRef}
          onSelect={() => setEndSelected((prev) => !prev)}
          //onChange={(date) => setStartDate(date)}
        />

        {/* <DatePicker
          placeholderText="Endtdatum"
          id="Enddatum"
          name="Enddatum"
          className="input input-bordered input-primary w-full max-w-xs"
          onSelect={() => setEndSelected((prev) => !prev)}
          selected={endDate}
          //dateFormat={"dd.MM.yyyy"}
          onChange={(date) => setEndDate(date)}
        /> */}

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
