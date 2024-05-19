import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import tw from '../../../assets/images/home/tw.png'
import ig from '../../../assets/images/home/in.png'
import fb from '../../../assets/images/home/ig.png'
import li from "../../../assets/images/home/in.png";
import ContactSvg from "../../../assets/images/home/ContactUs.svg";
import './ContactUs.css'

function ContactUs() {
    return (
        <div >
            <Navbar />
            <div id='ContactUs-Container-Bg'>
                <div className='text-center' id='ContactUs-HeadName'>Contact Us</div>
                <div className='container' id='ContactUs-Container'>
                    <div className='row'>
                        <div className='col-7'>
                            <div className='ms-5'>
                                <div className='row'>
                                    <span className='Contact-Us-Head'>Call us at</span>
                                    <span className='Contact-Us-foot'>+91 94150 20199</span>
                                </div>
                                <div className='row'>
                                    <span className='Contact-Us-Head'>Mail us at</span>
                                    <span className='Contact-Us-foot'>akhil@drcfo.in</span>
                                </div>
                                <div className='row'>
                                    <span className='Contact-Us-Head'>Address</span>
                                    <span className='Contact-Us-foot'>
                                        <div>C 5, 2nd Floor K K Apartment</div>
                                        <div >Opposite Narmada Bhawan (Near Ganna Sansthan)</div>
                                    </span>
                                </div>
                                <div className='row'>
                                    <span className='Contact-Us-Head'>Connect with us</span>
                                    <div className="d-flex" id="Social-Icon-div">
                                        <div>
                                            <img className='Social-Icon-Svg' src={tw} alt="" />
                                        </div>
                                        <div>
                                            <img className='Social-Icon-Svg ms-4' src={li} alt="" />
                                        </div>
                                        <div>
                                            <img className='Social-Icon-Svg ms-4' src={ig} alt="" />
                                        </div>
                                        <div>
                                            <img className='Social-Icon-Svg ms-4' src={fb} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-5 row align-items-center'>
                            <div class="row justify-content-center">
                                <img src={ContactSvg} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactUs