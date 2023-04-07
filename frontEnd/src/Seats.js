import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const Seats = ({
  setPP,
  setGP,
  setSeatName,
  setTotal,
  city,
  theatre,
  time,
}) => {
  const [platinumPrice, setPlatinumPrice] = useState(0);
  const [goldPrice, setGoldPrice] = useState(0);

  const [countA, setCountA] = useState([]);
  const [countB, setCountB] = useState([]);

  const [value, setValue] = useState([]);
  const [maxSeat, setMaxSeat] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const movie = path.split("/")[2];

  const Datas = JSON.parse(localStorage.getItem("dbdata"));

  let val =
    Datas &&
    Datas.map((item) => {
      if (
        item.movie === movie &&
        item.city === city &&
        item.time === time &&
        item.theatre === theatre
      ) {
        return item.seatName;
      }
    });

  const platinum = [];
  const gold = [];

  for (let i = 1; i <= 40; i++) {
    platinum.push(i);
  }

  for (let i = 41; i <= 80; i++) {
    gold.push(i);
  }

  //--------------------------

  let arr =
    val &&
    val
      .filter((val) => {
        return val;
      })
      .flat();

  // console.log(arr);

  const getA = (e, id) => {
    if (countA.includes(id)) {
      const btn = countA.filter((item) => {
        return item !== id;
      });
      setPlatinumPrice(platinumPrice - 750);
      setCountA(btn);
    } else {
      if (countA.length + countB.length < 4) {
        setCountA([...countA, id]);

        setPlatinumPrice(platinumPrice + 750);
        setValue([...value, e.target.value]);
      } else {
        alert("You Can Select Max Four Seats");
      }
    }

    if (value.includes(e.target.value)) {
      let val = value.filter((item) => {
        return item !== e.target.value;
      });

      setValue(val);
    }
  };

  const getB = (e, id) => {
    if (countB.includes(id)) {
      setGoldPrice(goldPrice - 550);

      const btn = countB.filter((item) => {
        return item !== id;
      });
      setCountB(btn);
    } else {
      if (countA.length + countB.length < 4) {
        setCountB([...countB, id]);
        setGoldPrice(goldPrice + 550);
        setValue([...value, e.target.value]);
      } else {
        alert("You Can Select Max Four Seats");
      }
    }

    if (value.includes(e.target.value)) {
      let val = value.filter((item) => {
        return item !== e.target.value;
      });

      setValue(val);
    }
  };

  // pass the data to about page..
  setPP(platinumPrice);
  setGP(goldPrice);
  setSeatName(value);
  setTotal(platinumPrice + goldPrice);

  //-------------------

  const navigate = useNavigate();

  console.log();

  return (
    <div className="bookSeat">
      <div className="selected-details"></div>

      <hr />
      <div className="platinum">
        <h3 style={{ fontFamily: "monospace" }}>Platinum 750rs</h3>

        <div className="seat-A">
          {platinum.map((item) => {
            return (
              <button
                style={
                  countA.includes(item)
                    ? { backgroundColor: "green" }
                    : { backgroundColor: null }
                }
                className="A-seats"
                value={item}
                key={item}
                disabled={arr && arr?.includes(item.toString())}
                onClick={(e) => getA(e, item)}
              >
                {`A${item}`}
              </button>
            );
          })}
        </div>
      </div>

      <div className="gold">
        <h3 style={{ fontFamily: "monospace" }}>Gold 550rs</h3>
        <div className="seat-B">
          {gold.map((item) => {
            return (
              <button
                style={
                  countB.includes(item)
                    ? { backgroundColor: "green" }
                    : { backgroundColor: null }
                }
                className="B-seats"
                value={item}
                key={item}
                disabled={arr && arr?.includes(item.toString())}
                onClick={(e) => getB(e, item)}
              >{`A${item}`}</button>
            );
          })}
        </div>
      </div>

      <div className="show-screen">
        <div className="screen">
          <h6>all eyes this way please..</h6>
        </div>
      </div>
    </div>
  );
};

export default Seats;
