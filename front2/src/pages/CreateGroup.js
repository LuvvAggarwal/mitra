import React, { useState, Fragment, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
// import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
import Select from 'react-select';
import dl from "../api/dl"
import groups from "../api/groups"
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
const img_url = require("../utils/imgURL") ;
const Joi = require("joi")
const data_type = require("../validation/dataTypes");
const errorSetter = require("../utils/errorSetter")
// import { ph_number } from "../../../server/config/validations/dataTypes";



const CreateGroup = () => {

    // if(User == undefined) window.location.replace("/login")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ph_number, setPh_number] = useState("");
    const [profile_img, setProfileImg] = useState("");
    const [cover_img, setCoverImg] = useState("");
    const [profile_img_url, setProfileImgURL] = useState("");
    const [cover_img_url, setCoverImgURL] = useState("")
    const [problem, setProblem] = useState("");
    const [bio, setBio] = useState("");
    const [showError, setShowError] = useState("");
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState("");
    const [success, setSuccess] = useState("");
    const [disable, setDisable] = useState(false);
    const [problemList, setProblemList] = useState([]);
    // const countryList = []
    const fetchData = async () => {
        try {
            const problemData = await dl.get("/model/problem_category")
            const problems = problemData.data.data.payload;
            setProblemList(problems);
        } catch (error) {
            // console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    const updateProfile = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        setDisable(true)
        // console.log(e);
        // console.log('starte');
        const schema = Joi.object({
            name: data_type.str_250_req,
            email: data_type.email,
            ph_number: data_type.ph_number,
            problem: data_type.id,
            // help_type: data_type.id_opt,
            // address: data_type.str_250_req,
            bio: data_type.text_req,
            profile_img_url: data_type.img_url,
            cover_img_url: data_type.img_url,
        })
        const validate = {
            name,
            email,
            ph_number,
            problem,
            // help_type,
            bio,
            profile_img_url,
            cover_img_url,
        }

        const { error } = schema.validate(validate)
        // console.log(JSON.stringify(error));
        if (error) {
            setShowError(true)
            // console.log(error);
            setError(error.details[0].message)
        } else {
            // this.setDisable(true);
            try {
                const updateProfileForm = document.getElementById("updateProfileForm")
                // console.log(updateProfileForm);
                let formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("ph_number", ph_number);
                formData.append("bio", bio);
                formData.append("problem_category", problem);
                formData.append("profile_photo", profile_img);
                formData.append("cover_photo", cover_img)
                // console.log(formData.getAll("keys"));

                const access_token = localStorage.getItem("access_token");
                const AuthStr = 'Bearer '.concat(access_token);
                // console.log(AuthStr);
                const response = await groups.post("/create", formData,
                    { headers: { 'Authorization': AuthStr, 'Content-Type': 'multipart/form-data' } }
                ).then((res) => {
                    // console.log(res.data);
                    setDisable(false)
                    setShowSuccess(true)
                    setSuccess(res.data.message)
                }).catch((e) => {
                    setDisable(false)
                    setShowError(true)
                    setError(errorSetter(e))
                })

            } catch (e) {
                setShowError(true);
                setError(errorSetter(e))
            }
        }

    }
        return (
            <Fragment>
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
                    {showError && <Alert variant="danger" style={{ zIndex: "10000000" }} onClose={() => setShowError(false)} dismissible>
                        <Alert.Heading className="font-weight-bold">Error</Alert.Heading>
                        <p>
                            {error}
                        </p>
                    </Alert>}
                    {showSuccess && <Alert variant="primary" style={{ zIndex: "10000000" }} onClose={() => setShowSuccess(false)} dismissible>
                        <Alert.Heading className="font-weight-bold">Success</Alert.Heading>
                        <p>
                            {success}
                        </p>
                    </Alert>}
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="middle-wrap">
                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                        <Link to="/defaultsettings" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                        <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Create Group</h4>
                                    </div>
                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4 text-center">


                                                <label>
                                                    <figure className="avatar ms-auto me-auto mb-0 mt-2 w100"><img src={profile_img_url == "" ? "https://via.placeholder.com/300x300.png" : img_url(profile_img_url)} alt="avater" className="shadow-sm rounded-3 w-100" />

                                                    </figure>
                                                    <input type="file" className="input-file" onChange={(e) => {
                                                        setProfileImg(e.target.files[0])
                                                        // console.log(e);
                                                        const url = URL.createObjectURL(e.target.files[0])
                                                        setProfileImgURL(url)
                                                        // console.log(url);
                                                    }} />
                                                </label>

                                            </div>
                                        </div>

                                        <form className="mt-3" id="updateProfileForm" onSubmit={updateProfile}>
                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Name</label>
                                                        <input type="text" className="form-control" id="name"
                                                            value={name} onChange={(e) => { setName(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Email</label>
                                                        <input type="text" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Phone</label>
                                                        <input type="text" className="form-control"
                                                            value={ph_number} onChange={(e) => { setPh_number(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className={`col-lg-12 mb-3`}>
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Problem</label>
                                                        <select id="problem" className="form-control" data-live-search="true" value={problem} onChange={(e) => { setProblem(e.target.value) }}>
                                                            <option value="" disabled>Please Select</option>
                                                            {problemList.map(e => {
                                                                return (
                                                                    <option data-tokens={e.name} key={e.id} value={e.id}>{e.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="bio">Bio</label>
                                                        <textarea className="form-control h75 scroll-bar w-100 rounded-xxl p-2 ps-2 font-xssss text-grey-500 fw-500 theme-dark-bg" id="bio" rows="3" value={bio} onChange={(e) => { setBio(e.target.value) }}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <div className="card mt-3 border-0">
                                                        <div className="card-body d-flex justify-content-between align-items-end p-0">
                                                            <div className="form-group mb-0 w-100">
                                                                <input type="file" name="file" id="file" className="input-file" onChange={(e) => {
                                                                    setCoverImg(e.target.files[0]);
                                                                    const url = URL.createObjectURL(e.target.files[0])
                                                                    setCoverImgURL(url)
                                                                }} />
                                                                <label htmlFor="file" className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed" >
                                                                    {cover_img_url == "" &&
                                                                        <>
                                                                            <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                                                            <span className="js-fileName">Drag and drop or click to replace Cover Image</span>
                                                                        </>
                                                                    }
                                                                    {cover_img_url !== "" && <figure className="avatar ms-auto me-auto mb-0 mt-2 w100per"><img src={img_url(cover_img_url)} alt="avater" className="shadow-sm rounded-3 w100per" />

                                                                    </figure>}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <button className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                                                        disabled={disable}
                                                        type="submit"
                                                    // onClick={updateProfile}
                                                    >Create</button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div >

                <Popupchat />
                <Appfooter />
            </Fragment >
        );

}


export default CreateGroup;