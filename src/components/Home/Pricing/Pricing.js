import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Pricing.css";
const pricingType = [
  {
    id: 1,
    title: "Basic",
    desc: "Best for new clinics with less number of patients",
    cost: "₹ 1,999/-",
  },
  {
    id: 2,
    title: "Basic +",
    desc: "Best for mid-scale clinics with less number of patients",
    cost: "₹ 2,999/-",
  },
  {
    id: 3,
    title: "Advanced",
    desc: "Best for large clinics with medium number of patients",
    cost: "₹ 3,999/-",
  },
  {
    id: 4,
    title: "Advanced +",
    desc: "Best for Larger clinics with huge number of patients",
    cost: "₹ 5,999/-",
  },
];
const pricingList = [
  {
    title: "Clinic Management",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Patient Management",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Intregated with my health vaultApp",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Intregated with DRCFO App",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Reciept Management",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Video Consultation",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Data Security via AES 256 Encryption",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Server-AWS HIPPA Complaint",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "ABDM Complaint",
    basic: true,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Website Generator",
    basic: false,
    basicPlus: true,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Legal Compliance management",
    basic: false,
    basicPlus: false,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Accounts Management",
    basic: false,
    basicPlus: false,
    advance: true,
    advancePlus: true,
  },
  {
    title: "Sales and Purchase Management",
    basic: false,
    basicPlus: false,
    advance: false,
    advancePlus: true,
  },
  {
    title: "No. of Prescription Generation (per year)",
    basic: "1999",
    basicPlus: "Unlimited",
    advance: "Unlimited",
    advancePlus: "Unlimited",
  },
  {
    title: "No. Clinic Posting for Online Appointment",
    basic: "one",
    basicPlus: "one",
    advance: "2",
    advancePlus: "2",
  },
  {
    title: "No Of Free SMS (per Year)",
    basic: "100",
    basicPlus: "1000",
    advance: "1500",
    advancePlus: "2000",
  },
  {
    title: "Subscription charges (per year excluding Taxes)",
    basic: "₹ 1,999/-",
    basicPlus: "₹ 2,999/-",
    advance: "₹ 3,999/-",
    advancePlus: "₹ 5,999/-",
  },
];
const PricingCard = ({ item }) => {
  return (
    <div className="pricing_card">
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
      {/* <span>{item.cost}</span> */}
    </div>
  );
};
const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className="pricing_wrapper">
        <h1>Set up your clinic, pay the price later</h1>
        <button>Take a free trail now!</button>
        <div className="pricing_card_container">
          {pricingType.map((item, i) => (
            <PricingCard item={item} key={i} />
          ))}
        </div>
      </div>
      <div className="price_table">
        <table>
          <colgroup></colgroup>
          <colgroup></colgroup>
          <colgroup></colgroup>
          <colgroup></colgroup>
          <colgroup></colgroup>
          <colgroup></colgroup>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>
                <h2>Basic</h2>
              </th>
              <th>
                <h2>Basic +</h2>
              </th>
              <th>
                <h2>Advanced</h2>
              </th>
              <th>
                <h2>Advanced +</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>S. No.</th>
              <th>Features</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>

            {pricingList.map((item, i) => (
              <tr>
                <td>{i + 1}.</td>
                <td>{item.title}</td>
                <td>
                  {item.basic == true ? (
                    <svg
                      className="svg_tick"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : item.basic == false ? null : item.basic == "one" ? (
                    "1"
                  ) : typeof item.basic === "string" ? (
                    `${item.basic}`
                  ) : null}
                </td>
                <td>
                  {item.basicPlus == true ? (
                    <svg
                      className="svg_tick"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : item.basicPlus == false ? null : item.basicPlus ==
                    "one" ? (
                    "1"
                  ) : typeof item.basicPlus === "string" ? (
                    `${item.basicPlus}`
                  ) : null}
                </td>
                <td>
                  {item.advance == true ? (
                    <svg
                      className="svg_tick"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : item.advance == false ? null : item.advance == "one" ? (
                    "1"
                  ) : typeof item.advance === "string" ? (
                    `${item.advance}`
                  ) : null}
                </td>
                <td>
                  {item.advancePlus == true ? (
                    <svg
                      className="svg_tick"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : item.advancePlus == false ? null : item.advancePlus ==
                    "one" ? (
                    "1"
                  ) : typeof item.advancePlus === "string" ? (
                    `${item.advancePlus}`
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button>Take a free trail now!</button>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
