import React from "react";
import Modal from "react-modal";
import searchicon from "../../assets/images/dashboard_search_icon.png";
import DatePicker from "react-datepicker";
const ClickOutHandler = require("react-onclickout");

const customStyles = {
  content: {
    left: "20%",
    height: "90vh",
    width: "75vw",
    zIndex: 10,
    margin: 0,
    padding: "20px 0",
  },
};

const PatientDetailsExpanded = ({
  modalIsOpen,
  setIsOpen,
  exportPDF,
  endDate,
  startDate,
  setOpen,
  open,
  datefrom,
  dateto,
  filteredConfirmedData,
  onChange,
}) => {
  const id = localStorage.getItem("doctor_id");
  const clickOut = (e) => {
    setOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Example Modal"
    >
      {" "}
      <div className="legal_expand_search_bar">
        <img
          src={searchicon}
          alt="search"
          className="legal_expand_search_icon"
        />
        <input
          type="text"
          placeholder="Search patient name, date"
          className="legal_expand_search_input"
          // onChange={handleChange}
        />
      </div>
      <div class="legal_container expanded">
        <div className="d-flex justify-content-between align-items-center legal_topBar">
          <h2>Patient Details</h2>
          <div className="d-flex align-items-center">
            <div className="export_dropdown">
              <p
                className="btn btn-primary dropdown-toggle export_btn "
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Export
              </p>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li onClick={exportPDF} className="dropdown-item">
                  Export as PDF
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href={
                      startDate && endDate
                        ? `https://drco-all-backend-617u.onrender.com/get/docter/export?id=${id}&file=excel&from=${datefrom}&to=${dateto}`
                        : `https://drco-all-backend-617u.onrender.com/get/docter/export?id=${id}&file=excel`
                    }
                  >
                    Export as XLS
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                className="date_filter_btn"
                // onClick={() => setOpen(!open)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="28" height="28" fill="url(#pattern0)" />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_4862_2818"
                        transform="scale(0.0111111)"
                      />
                    </pattern>
                    <image
                      id="image0_4862_2818"
                      width="90"
                      height="90"
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADdklEQVR4nO3az04TURTH8d+ZKTWRhS7UxGJjfAcRTYjRrexdCDQWTCS6Mio1LkxdEPljcGc0EdBqfQKNCzUxkYUKvoMBqQoL3ShK2zkuSo1RQjt07syZm/NZjp3ryUmZNvAFlFJKKaWUUkoppexBUQ9gFDMNF5aOEVM/GN0AOtb/5SOAWYL3cDSbfhXGKNYu+lLh8wG34k2B+HiDl74kOGdGs3s/mJzHykUPP1g8ROw8BWNXk7essEcnxgdT86Zmsm7RF++V9idcngOw2+ety3CpcyyTWjAxl2Pi0Ci5Lt+B/yUDwB5UcTvoeeqsekdfmfnUyfDetXIGg4+MZ/e9CWqmuqYWnb9b2v4zyRMM6gV4R9BDhOAXwFfdSluxnCByuNwHwgiAZAtnfgNQXGv3Lt86mV5t9OJEMyeuJr1JgM4C3MJcUaL8WLZj8q8LN3MzpSTAIy0cuhPA+eR3SgAYavTihs/ofJ4dgDItDBQ9F4//vVSpohjM4dRf29HmrPswbFYiGe6PZxPvaPIALoQxjClcQe9/1zyvP5CzQYXajjbX1DN6rZ0vbPtBZWb0ofZsihUizueml8puW7kIAF6lrY8Z11o89iuAR+X2aq6pGVr8z0QZniodJIfnWjnDYe/wjYH026Bm+nNu0AdGaXwwNQ/mZ1u9nwhPTCwZsGzRAICEMwRgeQt3fnE9nAt6nDrrFj2WSS2wRz0AVnzctkxEPSMDHYum5rJu0UDtEVJ13S4QXjTx8ucEp2v0dOq9yZms+jDcSO5+6SiYMwC6AaTXLy8wYZaZChPZ1OsIx1NKKaWUCli0X+8EdRemRbZoad2FaZEsWmJ3YVroi5baXZgW+u86pHYXpoX6jpbcXZgmpesw0V2YFseuw0h3YVoMuw6j3YVpMe86wu4uTJPRdVRx6t9LQXUXpsWs6+DruemlSsDdhWlyuw7J3YVpoT6jJXcXpoX/YSi0uzAt9EVL7S5Mi+TrncTuwrTIuw7tLpRSSimlghT51ztfYtyBxGbRce9AYrFoGzoQ8Yu2pQMR+6esOls6ENHvaJs6ECldh18SOpA4dh1+iehAYth1+CWqA4l51+GX9A5ERtfhl6AOJGZdh18iOhC5XYdfNnUgop/RNnUgohcNwJoORPyibelAxC8asKMDEf1huBHtQJRSSimllFJKKaWi9xtYbgR2QxFhogAAAABJRU5ErkJggg=="
                    />
                  </defs>
                </svg>
                {open && (
                  <ClickOutHandler onClickOut={clickOut}>
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                      calendarClassName="legal_calender_range"
                    />
                  </ClickOutHandler>
                )}
              </button>
            </div>
          </div>
          {/* {startDate && (
            <p className="legal_reset_btn" onClick={reset}>
              Reset
            </p>
          )} */}
        </div>
        <ul class="legal_responsive_table">
          <li class="table-header">
            <div class="col_1">S. No.</div>
            <div class="col_2">Date</div>
            <div class="col_3">Name</div>
            <div class="col_4">Service</div>
            <div class="col_5">Fees Recieved</div>
            <div class="col_6">Date of Reciept</div>
          </li>
          {filteredConfirmedData.map((item, index) => (
            <li class="table-row" key={item._id}>
              <div class="col_1">{index + 1}</div>
              <div class="col_2">{item?.slot?.date}</div>
              <div class="col_3">{item?.detials?.name}</div>
              <div class="col_4">{item.prescription.complain}</div>
              <div class="col_5">{item?.fees}</div>
              <div class="col_6">
                {item.status.paymentDate.length
                  ? item.status.paymentDate
                  : "Paid On Visit"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default PatientDetailsExpanded;
