import React, { useEffect, useState } from 'react'
import './VideoModal.css'
import { useParams } from "react-router-dom";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Conference from "./Conference";
import axios from '../../axios'
import ConferenceFooter from "./ConferenceFooter";
import ConferenceHeader from "./ConferenceHeader";

const VideoModal = ({videoModal, setVideoModal}) => {


    const hmsActions = useHMSActions();
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const [token, setToken] = useState("");
    const { id } = useParams();

    
  console.log("token", token);
  useEffect(() => {
    // fetch(
    //   `https://drco-all-backend-617u.onrender.com/videoConsultation/create?id=${id}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("1: ", data);
    //     if (data.message == "Room Created!!") {
    //       checkRoom();
    //     }
    //   });
      axios.get(`/videoConsultation/create?id=${id}`).then((res)=>{
        console.log("1: ", res.data);
        if (res.data.message === "Room Created!!") {
          checkRoom();
        }
      })
  }, []);
  const checkRoom = () => {
    // fetch(
    //   `https://drco-all-backend-617u.onrender.com/videoConsultation/join?id=${id}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("2: ", data);
    //     getToken(data.id, localStorage.getItem("doctor_id"));
    //   });
    axios.get(`/videoConsultation/join?id=${id}`).then((res)=>{
      console.log("2: ", res.data);
      getToken(res.data.id, localStorage.getItem("doctor_id"));
    })
  };
  const getToken = (id, user) => {
    // fetch(
    //   `https://drco-all-backend-617u.onrender.com/videoConsultation/token?id=${id}&user=${user}&role=host`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("3: ", data);
    //     setToken(data.message);
    //   });
      axios.get(`/videoConsultation/token?id=${id}&user=${user}&role=host`).then(
        (res)=>{
          console.log("3: ", res.data);
          setToken(res.data.message);
      })
  };
  const joinRoom = (e) => {
    e.preventDefault();
    hmsActions.join({
      userName: "Docter",
      authToken: token,
    });
  };

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <>
    { 
        isConnected 
        // true
        ? (
      <>
        <div>
          <ConferenceHeader/>
          <Conference />
          <ConferenceFooter />
        </div>
      </>
    ) : (
    <div className='video-modal'>
        <div className='video-cross'
             onClick={()=>{
              if(setVideoModal!=null){
                setVideoModal(!videoModal)
              }
             }}  >
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.04883 2.12451L21.3543 21.43" stroke="#545B74" stroke-width="2.75839" stroke-linecap="round"/>
                <path d="M21.3574 2.12451L2.05193 21.43" stroke="#545B74" stroke-width="2.75839" stroke-linecap="round"/>
            </svg>
        </div>
        <div className='video-modal-left'>
            <div className='video-stream'></div>
            <div className='video-controls'>
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6391 41.0564C18.5751 41.0221 18.5129 40.9848 18.4479 40.9534C17.9526 40.7113 17.6738 40.1741 17.7736 39.6516C17.8838 39.0683 18.318 38.6683 18.8934 38.6634C20.1703 38.6526 21.4473 38.6585 22.7243 38.6576C22.8392 38.6576 22.9541 38.6576 23.0878 38.6576V35.4735C22.5736 35.3608 22.0491 35.2725 21.5396 35.1294C19.1966 34.4716 17.2952 33.1168 15.8497 31.0964C14.4936 29.2024 13.8221 27.0526 13.7873 24.69C13.7788 24.1058 14.0707 23.6636 14.5661 23.4862C15.0323 23.3195 15.5738 23.4646 15.8412 23.8989C15.9815 24.1273 16.071 24.4283 16.0813 24.7008C16.151 26.6056 16.6859 28.3348 17.8264 29.8367C19.1636 31.5983 20.8964 32.7051 23.0379 33.0002C26.3321 33.454 28.9915 32.2473 30.9551 29.4612C31.9599 28.0358 32.3874 26.3938 32.4336 24.6341C32.4543 23.845 33.0419 23.3323 33.768 23.4382C34.3368 23.5215 34.7408 24.0391 34.7314 24.69C34.6966 27.0644 34.0204 29.224 32.6492 31.1229C31.0445 33.3442 28.9162 34.7353 26.2982 35.3019C26.0091 35.3647 25.7162 35.4058 25.4205 35.4578V38.6585C25.5382 38.6585 25.6503 38.6585 25.7623 38.6585C26.997 38.6585 28.2316 38.6566 29.4662 38.6585C30.1687 38.6595 30.6245 39.0163 30.7451 39.6516C30.8543 40.229 30.5511 40.729 29.922 41.0103C29.905 41.0181 29.8937 41.0407 29.8796 41.0564H18.6391Z" fill="#545B74"/>
                    <path d="M30.3146 19.5803C30.3146 21.2613 30.3217 22.9413 30.3128 24.6223C30.2969 27.4996 28.734 29.8288 26.1851 30.7914C23.0159 31.9878 19.298 29.9308 18.4582 26.4875C18.3077 25.8701 18.2227 25.2172 18.2183 24.5802C18.1953 21.2295 18.1847 17.8788 18.2148 14.529C18.2396 11.7836 19.4272 9.75836 21.7822 8.56663C25.0638 6.90531 29.1915 8.96325 30.0774 12.6937C30.2217 13.3017 30.2925 13.9434 30.3048 14.5711C30.3358 16.2409 30.3155 17.9106 30.3155 19.5803H30.3146Z" fill="#545B74"/>
                    <circle cx="24.2588" cy="24.4404" r="22.0976" stroke="#545B74" stroke-width="3.67785"/>
                </svg>
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.4987 17.1096V32.59C36.4359 32.7007 36.3875 32.8222 36.3089 32.9201C35.9518 33.3625 35.3716 33.3686 34.9377 32.9328C33.1792 31.1672 31.4236 29.3997 29.6663 27.6329C29.607 27.5733 29.543 27.5186 29.4451 27.4287C29.4451 27.9301 29.4523 28.3805 29.4433 28.8302C29.4324 29.3469 29.4481 29.869 29.3792 30.3789C29.1562 32.0333 27.5953 33.7193 25.3985 33.7065C22.2144 33.6877 19.0308 33.7096 15.8467 33.6926C15.3952 33.6901 14.9245 33.6281 14.4972 33.4865C12.8861 32.9535 11.8219 31.4681 11.7983 29.7632C11.7826 28.6558 11.7941 27.5478 11.7941 26.4398C11.7941 24.3131 11.7959 22.1865 11.7929 20.0592C11.7923 19.4532 11.8654 18.86 12.1361 18.3155C12.8982 16.7832 14.1225 15.956 15.8442 15.9518C19.0284 15.9432 22.212 15.9493 25.3961 15.9499C25.4844 15.9499 25.5732 15.953 25.6614 15.9578C27.6883 16.0672 29.2819 17.6183 29.4185 19.6562C29.4686 20.405 29.4384 21.1593 29.4445 21.9111C29.4451 21.995 29.4445 22.0795 29.4445 22.2163C29.5508 22.1154 29.6149 22.0582 29.6753 21.9975C31.417 20.2501 33.1568 18.5002 34.9039 16.7577C35.0417 16.6203 35.2175 16.4915 35.3994 16.4362C35.8744 16.2909 36.2612 16.545 36.4981 17.1102L36.4987 17.1096Z" fill="#545B74"/>
                    <circle cx="24.1445" cy="24.4404" r="22.0976" stroke="#545B74" stroke-width="3.67785"/>
                </svg>
            </div>            
        </div>
        <div className='video-modal-right'>
            <div className='video-modal-head'>
                Starting Video Consulting
            </div>
            <div className='video-modal-desc'>
                Connecting With Mr. Vikash Kumar Mehta
            </div>
            <div className='video-join'
                    onClick={(joinRoom)}>
                Join Now
            </div>

        </div>
    </div>
    )
}
    </>
  )
}

export default VideoModal