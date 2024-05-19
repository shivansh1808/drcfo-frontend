import React from 'react'
import { useState } from 'react'
import InputComp from './InputComp'
import logo from '../../assets/images/logo.png'
import './PersonalDetails.css'

const PersonalDetails = () => {

  // const [formState, setFormState]=useState("personalDetails")
  const [formState, setFormState]=useState("clinicDetails")


  return (
    <div className='details_screen'>
        {/* <img src={logo} alt=''/> */}
        <div>
            <img className='detail_form_logo' src={logo} alt="logo"/>
            <div>Progress bar</div>

            {
              formState === "personalDetails" ? 
              (<div>
                  <div>
                    <div className="details_title">
                      Personal Details
                    </div>
                    <div className='details_desc'>
                      Kindly fill the information below
                    </div>
                  </div>
                  <div className='personal_details_form'>
                    <InputComp
                                title={"Full Name"}
                                placeholderText={"Enter your Full Name"}
                    />
                    <InputComp
                                title={"Total Year of Experience "}
                                placeholderText={"Enter total year of Experience"}
                    />
                    <InputComp
                                title={"Education"}
                                placeholderText={"Enter your Education deatils"}
                    />
                    <InputComp
                                title={`Add Specialities* (You can add multiple specialities)`}
                                placeholderText={"Type to add Specialities"}
                    />
                  </div>
                  <div>
                      Add Bio*
                      <input
                            type="text"
                            placeholder='Add your Bio here...'
                      >
                      </input>
                  </div>
              </div>)
            :
              formState === "clinicDetails" ? 
              (
                <div>
                  <div className='details_head'>
                    <div className="details_title">Clinic Details/Location</div>
                    <div className='details_desc'> It’s going to take only few minutes</div>
                  </div>
                  <div className='personal_details_form'>
                    <InputComp
                                title={"Clinic Name*"}
                                placeholderText={"Enter clinic name"}
                    />
                    <InputComp
                                title={"Consultation fee*"}
                                placeholderText={"Enter consultation fee"}
                    />
                    <InputComp
                                title={"House/Street/Gali Number*"}
                                placeholderText={"Enter your House/Street/Gali Number"}
                    />
                    <InputComp
                                title={"Sec/Area/Locality"}
                                placeholderText={"Enter your Sec/Area/Locality"}
                    />
                    <InputComp
                                title={`City*`}
                                placeholderText={"Enter your City"}
                    />
                    <InputComp
                                title={`State*`}
                                placeholderText={"Enter your State"}
                    />
                    <InputComp
                                title={`Pincode*`}
                                placeholderText={"Enter your Pincode"}
                    />
                    <div>
                      Add current location to get better result
                      <div>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 12.7961C0.197182 12.356 0.536604 12.1881 1.0146 12.2192C1.42728 12.2461 1.84423 12.2125 2.25752 12.2296C2.46081 12.2382 2.51575 12.1588 2.53285 11.9745C2.68058 10.3464 3.18239 8.83068 4.06208 7.45596C5.82084 4.70713 8.32072 3.07908 11.5513 2.58401C11.6185 2.57364 11.6844 2.5596 11.7516 2.55105C12.058 2.51117 12.2113 2.33312 12.2113 2.01691C12.2113 1.62745 12.207 1.2386 12.2125 0.849134C12.2198 0.343076 12.5415 -0.00182407 12.9939 7.25781e-06C13.4481 0.00122814 13.7643 0.34796 13.7673 0.854017C13.7698 1.39487 13.768 1.93572 13.768 2.48512C14.2063 2.5541 14.6324 2.60782 15.0536 2.68901C19.2073 3.48869 22.5386 6.84857 23.3145 11.0179C23.3762 11.35 23.4262 11.6851 23.4567 12.0215C23.472 12.193 23.5404 12.2296 23.6948 12.2272C24.16 12.2199 24.6258 12.2241 25.091 12.2247C25.6477 12.2254 25.9963 12.5202 26 12.9921C26.0036 13.4737 25.6526 13.7722 25.0794 13.7734C24.6227 13.774 24.1655 13.7789 23.7089 13.771C23.5465 13.7679 23.4738 13.8027 23.4574 13.9883C23.0282 18.8187 19.2256 22.7811 14.4175 23.416C14.3674 23.4227 14.3174 23.4343 14.2673 23.4422C13.9348 23.4923 13.7686 23.683 13.7686 24.0142C13.7686 24.3274 13.7472 24.6424 13.7735 24.9531C13.8144 25.4372 13.6526 25.7918 13.2039 26H12.7979C12.3529 25.8083 12.182 25.4683 12.207 24.9903C12.2302 24.56 12.2058 24.1278 12.2149 23.6968C12.2186 23.5344 12.1612 23.4752 12 23.4624C11.7308 23.441 11.4622 23.4056 11.196 23.3592C6.70786 22.5833 3.18971 18.9537 2.58413 14.4761C2.55299 14.2459 2.52125 14.0152 2.48889 13.774C1.97732 13.774 1.49443 13.7521 1.01521 13.7802C0.536604 13.8082 0.199014 13.6416 0.00122094 13.2027V12.7967L0 12.7961ZM12.9805 21.9705C17.9192 21.9851 21.9599 17.9464 21.9599 12.9951C21.9599 8.05053 17.9576 4.04358 13.0024 4.02771C8.07226 4.01245 4.04559 8.02306 4.01934 12.9744C3.9937 17.9098 8.02403 21.9558 12.9805 21.9705Z" fill="#194AF5"/>
                          <path d="M7.68731 12.8743C7.70136 9.99358 10.0314 7.67496 12.9013 7.68657C15.7962 7.69818 18.1043 10.029 18.0865 12.9232C18.0688 15.7898 15.74 18.0987 12.8781 18.0865C9.999 18.0743 7.67388 15.7385 7.68731 12.8743Z" fill="#194AF5"/>
                      </svg>

                            Add Current Location
                      </div>
                    </div>
                  </div>

                </div>
              )
              :
              <div>
                404
              </div>
            }
        </div>
        <div>
          Save & Next
        </div>

    </div>
  )
}

export default PersonalDetails