import React, { useEffect, useState } from 'react'
import { ListGroup } from "react-bootstrap"
import dl from "../../api/dl";
import * as queryString from 'query-string';
import users from "../../api/users"
import groups from "../../api/groups"
// import groups from '../../api/groups';

const ModuleSearch = (props) => {

    const setProblemCategory = props.problemState
    const [showFilter, setShowFilter] = useState(false)
    // const setSearch = props.searchState
    // const search = props.searchVal
    // const  = props.triggerSearch;
    const {setLastNumber,triggerSearch,search,setSearch} = props;
    const [problemList, setProblemList] = useState([]);
    console.log(triggerSearch);

    // const triggerSearch = async () => {
    //     props.loader(true) ;
    //     const access_token = localStorage.getItem("access_token");
    //     const AuthStr = 'Bearer '.concat(access_token);
    //     const stringifiedQuery = queryString.stringify({
    //         problem: problemCategory,
    //         keyword: search,
    //         type: props.model,
    //         lastNumber: props.lastNumber
    //     })
    //     console.log(stringifiedQuery);
    //     if (props.model == "groups") {
    //         const groupData = await groups.get("/groups/" + stringifiedQuery,
    //         {headers: { 'Authorization': AuthStr}}
    //         ).then((res) => {
    //             props.setData(res.data.data.payload);
    //             props.loader(false)
    //         }).catch((e) => {
    //             console.log(e.response.data.message);
    //         })
    //     }
    //     else {
    //         const userData = await users.get("/users/" + stringifiedQuery,
    //         {headers: { 'Authorization': AuthStr}}
    //         ).then((res) => {
    //             props.setData(res.data.data.payload);
    //             props.loader(false)
    //         }).catch((e) => {
    //             console.log(e.response.data.message);
    //         })
    //     }
    // }

    useEffect(async () => {
        const problemData = await dl.get("/model/problem_category")
        const problems = problemData.data.data.payload;
        setProblemList(problems);
    }, [])

    return (
        <>
            <form action="#" className="pt-0 pb-0 ms-auto">
                <div className="search-form-2 ms-2">
                    <i className="ti-search font-xs cursor-pointer" onClick={(e) => {
                        triggerSearch(true)
                        setLastNumber(-1)
                    }}></i>
                    <input type="text" value={search} onChange={(e) => {
                        setSearch(e.target.value)
                    }} className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search here." />
                </div>

            </form>
            <div onClick={(e) => { setShowFilter(!showFilter) }} className="btn-round-md cursor-pointer ms-2 bg-greylight theme-dark-bg rounded-3">
                <i className="feather-filter font-xss text-grey-500 cursor-pointer"></i>
            </div>
            {showFilter ?
                <div id="filters">
                    <ListGroup variant="flush">
                        <ListGroup.Item disabled>Problem Category</ListGroup.Item>
                        {problemList.map((e) => {
                            return <ListGroup.Item action key={e.id} onClick={(event) => {
                                setProblemCategory(e.id);
                                setShowFilter(false);
                            }}>{e.name}</ListGroup.Item>
                        })}
                    </ListGroup>
                </div>
                : ""
            }
        </>
    )
}

export default ModuleSearch
