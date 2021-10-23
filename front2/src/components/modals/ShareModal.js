import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import post_action from "../../api/postAction";

const ShareModal = ({ id, title, des, showAlert, alertConfig }) => {
  const [show, setShow] = useState(false);
  const toggleOpen = () => setShow(!show);
  const menuClass = `${show ? " show" : ""}`;
  const staticStr = "Mitra: A friend for Everyone";
  const access_token = localStorage.getItem("access_token");
  const AuthStr = 'Bearer '.concat(access_token);
  const share = async(platform) => {
    const body = {
      shared_on: platform,
      share_link: `${process.env.PUBLIC_URL}/post/${id}`,
    };
    await post_action
      .post(`/share/id=${id}`, body, { headers: { Authorization: AuthStr } })
      .then((res) => {
        showAlert();
        alertConfig({
          variant: "success",
          text: "Post shared on " + platform,
          icon: "check",
          strongText: "Success:",
        });
      })
      .catch((e) => {
        showAlert();
        alertConfig({
          variant: "danger",
          text: e.response ? e.response.data.message : "Problem in processing",
          icon: "alert-octagon",
          strongText: "Error:",
        });
      });
  };
  return (
    <div
      className={`cursor-pointer ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ${menuClass}`}
      id={`dropdownMenu${id}`}
      data-bs-toggle="dropdown"
      aria-expanded="false"
      onClick={toggleOpen}
    >
      <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
      <span className="d-none-xs">Share</span>
      <div
        className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl theme-dark-bg border-0 shadow-lg right-0 ${menuClass}`}
        aria-labelledby={`dropdownMenu${id}`}
      >
        <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
          Share{" "}
          <i
            className="feather-x cursor-pointer ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"
            onClick={toggleOpen}
          ></i>
        </h4>
        <div className="card-body p-0 d-flex">
          <ul className="d-flex align-items-center justify-content-between mt-2">
            <li className="me-1 cursor-pointer">
              <FacebookShareButton
                // url={`http://localhost:3000/post/id=${id}`}
                // url={`${process.env.PUBLIC_URL}/post/${id}`}
                url="https://www.youtube.com/"
                quote={`${staticStr} \n ${title} \n ${des}`}
                hashtag="Mitra"
                onShareWindowClose={()=>share("facebook")}
              >
                <FacebookIcon iconFillColor="white" round={true}></FacebookIcon>
              </FacebookShareButton>
            </li>
            <li className="me-1 cursor-pointer">
              <TwitterShareButton
                // url={`http://localhost:3000/post/id=${id}`}
                url={`${process.env.PUBLIC_URL}/post/${id}`}
                title={title}
                via="mitra"
                hashtags={["mitra", "a_friend_for_everyone"]}
                onShareWindowClose={()=>share("twitter")}
              >
                <TwitterIcon iconFillColor="white" round={true}></TwitterIcon>
              </TwitterShareButton>
            </li>
            <li className="me-1 cursor-pointer">
              <LinkedinShareButton
                // url={`http://localhost:3000/post/id=${id}`}
                url={`${process.env.PUBLIC_URL}/post/${id}`}
                title={title}
                summary={des}
                source={"Mitra"}
                onShareWindowClose={()=>share("linkedin")}
              >
                <LinkedinIcon iconFillColor="white" round={true}></LinkedinIcon>
              </LinkedinShareButton>
            </li>
            <li className="me-1 cursor-pointer">
              <WhatsappShareButton
                // url={`http://localhost:3000/post/id=${id}`}
                url={`${process.env.PUBLIC_URL}/post/${id}`}
                title={title}
                separator={des}
                onShareWindowClose={()=>share("whatsapp")}
              >
                <WhatsappIcon iconFillColor="white" round={true}></WhatsappIcon>
              </WhatsappShareButton>
            </li>
            <li className="me-1 cursor-pointer">
              <TelegramShareButton
                // url={`http://localhost:3000/post/id=${id}`}
                url={`${process.env.PUBLIC_URL}/post/${id}`}
                title={title}
                onShareWindowClose={()=>share("telegram")}
              >
                <TelegramIcon iconFillColor="white" round={true}></TelegramIcon>
              </TelegramShareButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
