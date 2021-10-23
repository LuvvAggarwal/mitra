import React, { useState, Fragment, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
import Select from 'react-select';
import dl from "../api/dl"
import users from "../api/users"
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
const img_url = require("../utils/imgURL") ;
const Joi = require("joi")
const data_type = require("../validation/dataTypes");
// import { ph_number } from "../../../server/config/validations/dataTypes";



const UpdateProfile = () => {

    const { setCurrentUser, User } = useContext(UserContext);
    // if(User == undefined) window.location.replace("/login")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ph_number, setPh_number] = useState("");
    const [address, setAddress] = useState("");
    const [profile_img, setProfileImg] = useState("");
    const [cover_img, setCoverImg] = useState("");
    const [profile_img_url, setProfileImgURL] = useState("");
    const [cover_img_url, setCoverImgURL] = useState("")
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [type, setType] = useState("");
    const [problem, setProblem] = useState("");
    const [bio, setBio] = useState("");
    const [help_type, setHelp_type] = useState("");
    const [showError, setShowError] = useState("");
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState("");
    const [success, setSuccess] = useState("");
    const [disable, setDisable] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [problemList, setProblemList] = useState([]);
    const [helpList, setHelpList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    // const countryList = []
    const fetchData = async () => {
        try {
            const problemData = await dl.get("/model/problem_category")
            const problems = problemData.data.data.payload;
            setProblemList(problems);

            const helpData = await dl.get("/model/help_type");
            const helps = helpData.data.data.payload;
            setHelpList(helps);

            const countryResponse = await dl.get("/countries");
            const countries = countryResponse.data.data.payload
            setCountryList(countries);
            // setRestaurants(countries.data.data.restaurant);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        fetchData()
        if (User) {
            User.then((res) => {
                console.log(res);
                if (res) {
                    console.log("my");
                    setEmail(() => { if (res.email != null) return res.email; else return ""; })
                    setName(() => { if (res.name != null) return res.name; else return ""; })
                    setPh_number(() => { if (res.ph_number != null) return res.ph_number; else return ""; })
                    setAddress(() => { if (res.address != null) return res.address; else return ""; })
                    setType(() => { if (res.type != null) return res.type; else return ""; })
                    setBio(() => { if (res.bio != null) return res.bio; else return ""; })
                    setProfileImgURL(() => { if (res.profile_photo != null) return res.profile_photo; else return ""; })
                    setCoverImgURL(() => { if (res.cover_photo != null) return res.cover_photo; else return ""; })
                    if (res.cities != null) {
                        setCountry(res.cities.states.countries.id)
                        const stateSelect = document.getElementById("state")
                        let state_opt = document.createElement('option');
                        state_opt.value = res.cities.states.id;
                        state_opt.innerHTML = res.cities.states.name;
                        stateSelect.appendChild(state_opt)
                        setState(res.cities.states.id)
                        const citySelect = document.getElementById("city")
                        let city_opt = document.createElement('option');
                        city_opt.value = res.cities.id;
                        city_opt.innerHTML = res.cities.name;
                        citySelect.appendChild(city_opt)
                        setCity(res.cities.id)
                    }
                    if (res.problem != null) {
                        const problemSelect = document.getElementById("problem")
                        let problem_opt = document.createElement('option');
                        problem_opt.value = res.problem.id;
                        problem_opt.innerHTML = res.problem.name;
                        problemSelect.appendChild(problem_opt)
                        setProblem(res.problem.id)
                    }
                    if (res.help != null) {
                        const helpSelect = document.getElementById("help")
                        let help_opt = document.createElement('option');
                        help_opt.value = res.help.id;
                        help_opt.innerHTML = res.help.name;
                        helpSelect.appendChild(help_opt)
                        setProblem(res.help.id)
                    }
                }
            })
        }
    }, [])



    const getStates = async () => {
        const stateResponse = await dl.get(`/states/${country}`);
        console.log(country);
        const states = stateResponse.data.data.payload
        setStateList(states);
    }

    const getCities = async () => {
        const cityResponse = await dl.get(`/cities/${state}`);
        // console.log(country);
        const cities = cityResponse.data.data.payload
        setCityList(cities);
    }

    useEffect(() => { if (country != "") getStates() }, [country])
    useEffect(() => { if (state != "") getCities() }, [state])

    const updateProfile = async (e) => {
        e.preventDefault()
        console.log(e.target);
        setDisable(true)
        console.log(e);
        console.log('starte');
        const schema = Joi.object({
            name: data_type.str_250_req,
            email: data_type.email,
            ph_number: data_type.ph_number,
            problem: data_type.id,
            // help_type: data_type.id_opt,
            address: data_type.str_250_req,
            bio: data_type.text_req,
            city: data_type.id,
            state: data_type.id,
            country: data_type.id,
            profile_img_url: data_type.img_url,
            cover_img_url: data_type.img_url,
        })
        const validate = {
            name,
            email,
            ph_number,
            problem,
            // help_type,
            address,
            bio,
            city,
            state,
            country,
            profile_img_url,
            cover_img_url,
        }

        const { error } = schema.validate(validate)
        console.log(JSON.stringify(error));
        if (error) {
            setShowError(true)
            console.log(error);
            setError(error.details[0].message)
        } else {
            // this.setDisable(true);
            try {
                const updateProfileForm = document.getElementById("updateProfileForm")
                console.log(updateProfileForm);
                let formData = new FormData();
                formData.append("name", name);
                formData.append("ph_number", ph_number);
                formData.append("address", address);
                formData.append("city", city);
                formData.append("bio", bio);
                formData.append("problem_category", problem);
                formData.append("type", type);
                formData.append("help_type", help_type);
                formData.append("profile_photo", profile_img);
                formData.append("cover_photo", cover_img)
                console.log(formData.getAll("keys"));

                const access_token = localStorage.getItem("access_token");
                const AuthStr = 'Bearer '.concat(access_token);
                console.log(AuthStr);
                const response = await users.put("/update", formData,
                    { headers: { 'Authorization': AuthStr, 'Content-Type': 'multipart/form-data' } }
                ).then((res) => {
                    console.log(res.data);
                    setDisable(false)
                    setShowSuccess(true)
                    setSuccess(res.data.message)
                }).catch((e) => {
                    setDisable(false)
                    setShowError(true)
                    setError(e.response.data.message)
                })

            } catch (e) {
                console.log(e);
            }
        }

    }

    if (User == undefined) return (
        <Redirect to="/login"></Redirect>
    )
    else {
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
                                        <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Update Profile</h4>
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
                                                        console.log(url);
                                                    }} />
                                                </label>

                                            </div>
                                        </div>

                                        <form className="mt-3" id="updateProfileForm" onSubmit={updateProfile}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Name</label>
                                                        <input type="text" className="form-control" id="name"
                                                            value={name} onChange={(e) => { setName(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Type</label>
                                                        <select className="form-control" value={type} onChange={(e) => { setType(e.target.value) }}>
                                                            <option value="" disabled>Please Select</option>
                                                            <option value="USER">User</option>
                                                            <option value="COUNSALER">Counsaler</option>
                                                            <option value="NGO">NGO</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Email</label>
                                                        <input type="text" disabled className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
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
                                                <div className={`col-lg-${type == "USER" ? 12 : 6} mb-3`}>
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
                                                {type != "USER" && <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">Help Type</label>
                                                        <select id="help" className="form-control" value={help_type} onChange={(e) => { setHelp_type(e.target.value) }}>
                                                            <option value="" disabled>Please Select</option>
                                                            {helpList.map(e => {
                                                                return (
                                                                    <option key={e.id} value={e.id}>{e.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>}
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-4 mb-3">
                                                    {/* <div className="form-group"> */}
                                                    <label className="mont-font fw-600 font-xsss mb-2">Country</label>
                                                    <select className="form-control" value={country} onChange={(e) => { setCountry(e.target.value) }}>
                                                        <option value="" disabled>Please Select</option>
                                                        {countryList.map(e => {
                                                            return (
                                                                <option key={e.id} value={e.id}>{e.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {/* </div> */}
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">State</label>
                                                        <select id="state" className="form-control" value={state} onChange={(e) => { setState(e.target.value) }}>
                                                            <option value="" disabled>Please Select</option>
                                                            {stateList.map((e) => {
                                                                return (
                                                                    <option key={e.id} value={e.id}>{e.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss mb-2">City</label>
                                                        <select id="city" className="form-control" value={city} onChange={(e) => { setCity(e.target.value) }}>
                                                            <option value="" disabled>Please Select</option>
                                                            {cityList.map((e) => {
                                                                return (
                                                                    <option key={e.id} value={e.id}>{e.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="address">Address</label>
                                                        <textarea className="form-control h75 scroll-bar bor-0 w-100 rounded-xxl p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" id="address" rows="3" value={address} onChange={(e) => { setAddress(e.target.value) }}></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="bio">Bio</label>
                                                        <textarea className="form-control h75 scroll-bar bor-0 w-100 rounded-xxl p-2 ps-2 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" id="bio" rows="3" value={bio} onChange={(e) => { setBio(e.target.value) }}></textarea>
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
                                                    <button className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                                                        disabled={disable}
                                                        type="submit"
                                                    // onClick={updateProfile}
                                                    >Update</button>
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

}


export default UpdateProfile;