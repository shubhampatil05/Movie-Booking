import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Payment = () => {
  const [data, setData] = useState({
    cardNumber: "",
    cardHolder: "",
    Month: "",
    Year: "",
    cvv: "",
  });

  // add all the previous and current data in array

  const [add, setAdd] = useState([]);

  // flip the ATM when CVV get focused
  const [flip, setFlip] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });

    if (data.cardNumber.length > 16) {
      alert("Card Number Can't Be More Than 16 Digit");
      setData({ ...data, cardNumber: data.cardNumber.slice(0, -1) });
    }
    if (!/^[a-zA-Z ]*$/.test(data.cardHolder)) {
      setData({ ...data, cardHolder: data.cardHolder.slice(0, -1) });
    }
  };

  const handleValidation = () => {
    if (data.cardNumber.length > 16) {
      setData({ ...data, cardNumber: data.cardNumber.slice(0, -1) });
    }
    if (!/^[a-zA-Z ]*$/.test(data.cardHolder)) {
      setData({ ...data, cardHolder: data.cardHolder.slice(0, -1) });
    }
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  // render data on button click..

  const Submit = () => {
    // e.preventDefault();

    setAdd(() => {
      return [...add, data];
    });

    setData({
      cardNumber: "",
      cardHolder: "",
      Month: "",
      Year: "",
      cvv: "",
    });
  };

  const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));
  const movieImg = JSON.parse(localStorage.getItem("poster"));
  const paymentBy = JSON.parse(localStorage.getItem("userEmail"));
  const handleConfirm = async (e) => {
    e.preventDefault();

    if (
      data.cardNumber.length === 16 &&
      !isNaN(data.cardNumber) &&
      data.cardHolder.length !== "" &&
      isNaN(data.cardHolder) &&
      data.cvv.length === 3 &&
      !isNaN(data.cvv)
    ) {
      setFlip(true);
      Submit();

      alert("Payment Successfull");
      navigate("/BookedTicket");

      const { city, theatre, time } = bookingInfo.info;
      const { movie, total, seatName } = bookingInfo;
      const res = await fetch("http://localhost:5200/bookingDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("jwtToken")
          )}`,
        },
        body: JSON.stringify({
          city,
          theatre,
          time,
          movie,
          total,
          seatName,
          movieImg,
          paymentBy,
        }),
      });
      const data = await res.json();
    } else {
      alert("Invalid Details..");
      setFlip(true);
    }
  };

  const handleFlip = () => {
    setFlip(false);
  };

  const Flip = () => {
    setFlip(true);
  };

  return (
    <>
      <div className="container-fluid">
        {flip ? (
          <div className="ATM-Card">
            <div className="logos">
              <img
                className="logoOne"
                src="https://cdn-icons-png.flaticon.com/512/6404/6404100.png"
                alt="logo"
              />

              <img
                className="logoTwo"
                src="https://www.freepnglogos.com/uploads/visa-card-logo-9.png"
                alt="logoTwo"
              />
            </div>

            <div className="card-number">
              {data.cardNumber.length > 0 ? (
                <h1>{data.cardNumber}</h1>
              ) : (
                <h1>**** **** **** ****</h1>
              )}
            </div>
            <div className="card-info">
              <div className="card-holder">
                <h5>Card Holder</h5>
                {data.cardHolder.length > 0 ? (
                  <h3>{data.cardHolder}</h3>
                ) : (
                  <h3>**********</h3>
                )}
              </div>

              <div className="card-expiry">
                <h5>Expiry Date</h5>
                {data.Month === "" && data.Year === "" ? (
                  <h3>00/00</h3>
                ) : (
                  <h3>
                    {data.Month}/{data.Year}
                  </h3>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="ATM-Card">
            <div className="blackStrip"></div>
            <div className="cvv">
              <h3 className="cvv-number">{data.cvv}</h3>
            </div>

            <div className="info">
              <p>
                CVV number is present on the back side of your card on the
                magnetic strip. It verifies that the card is physically
                available with the individual using it during the transaction.
                Debit and credit cards are mainly used for online transactions
                or for other virtual payment gateways.
              </p>
            </div>
          </div>
        )}

        <div className="main-page">
          <form onSubmit={() => Submit}>
            <div className="Form">
              <label style={{ fontWeight: "bold" }} htmlFor="Card Number">
                Card Number
              </label>

              <input
                type="number"
                autoComplete="off"
                placeholder="Enter Card Number"
                className="form-control text-input"
                onChange={handleChange}
                value={data.cardNumber}
                name="cardNumber"
                maxLength="16"
                required
                id="num"
                onFocus={Flip}
                onKeyUp={handleValidation}
              />
              <br />
              <label htmlFor="Card Holder">Card Holder</label>
              <input
                type="text"
                autoComplete="off"
                placeholder="Card Holder"
                className="form-control number-input"
                onChange={handleChange}
                value={data.cardHolder}
                name="cardHolder"
                required
                maxLength="13"
                onFocus={Flip}
                onKeyUp={handleValidation}
              />
              <br />

              <div className="ExpiryAndCVV">
                <div className="labels">
                  <label htmlFor="Expiration">Expiration</label>
                  <label htmlFor="CVV" className="CVV">
                    Card CVV
                  </label>
                </div>

                <div className="MYCVV">
                  <select
                    onClick={handleClick}
                    name="Month"
                    onFocus={Flip}
                    required
                  >
                    <option disabled selected value="">
                      Month
                    </option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>

                  <select
                    onClick={handleClick}
                    name="Year"
                    onFocus={Flip}
                    required
                  >
                    <option disabled selected value="">
                      Year
                    </option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>

                  <input
                    id="CVV"
                    type="text"
                    maxLength="3"
                    placeholder="Add CVV"
                    onChange={handleChange}
                    value={data.cvv}
                    name="cvv"
                    required
                    onFocus={handleFlip}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Pay"
                className="btn btn-success submit-btn"
                id="btn"
                onClick={handleConfirm}
              />
            </div>
          </form>
        </div>

        {/* <table className="table table-hover">
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Holder Name</th>
              <th>Expiry</th>
              <th>CVV</th>
            </tr>
          </thead>

          {add &&
            add.map((ele, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{ele.cardNumber}</td>
                    <td>{ele.cardHolder}</td>
                    <td>
                      {ele.Month}/{ele.Year}
                    </td>
                    <td>{ele.cvv}</td>
                  </tr>
                </tbody>
              );
            })}
        </table> */}
      </div>
    </>
  );
};

export default Payment;
