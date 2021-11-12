import React, { useEffect, useState } from 'react'
import { ListGroup } from "react-bootstrap"
import dl from "../../api/dl";
import * as queryString from 'query-string';
import users from "../../api/users"
import groups from "../../api/groups"
// import groups from '../../api/groups';

const ModuleSearch = (props) => {

    const problemState = props.problemState
    const [showFilter, setShowFilter] = useState(false)
    const { setLastNumber, triggerSearch, searchVal, searchState, dataSet, hasMore } = props;
    const [problemList, setProblemList] = useState([]);
    // console.log(triggerSearch);

    useEffect(async () => {
        const problemData = await dl.get("/model/problem_category")
        const problems = problemData.data.data.payload;
        setProblemList(problems);
    }, [])

    return (
        <div className="d-flex align-items-center">
            <form action="#" className="w-100 pt-0 pb-0 ms-auto d-flex align-items-center">
                <div className="w-100 search-form-2">
                    <i className="ti-search font-xs cursor-pointer" onClick={(e) => {
                        const now = new Date().getTime()
                        dataSet([])
                        setLastNumber(-1)
                        hasMore(true)
                        triggerSearch("true" + now)
                        // getData()
                    }}></i>
                    <input type="text" value={searchVal} onChange={(e) => {
                        searchState(e.target.value)
                    }} className="w-100 form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search" />
                </div>

            </form>
            <div onClick={(e) => { setShowFilter(!showFilter) }} className="btn-round-md cursor-pointer ms-2 bg-greylight theme-dark-bg rounded-3">
                <i className="feather-filter font-xss text-grey-500 cursor-pointer"></i>
            </div>
            {showFilter ?
                <div id="filters">
                    <ListGroup variant="flush">
                        <ListGroup.Item disabled>Problem Category</ListGroup.Item>
                        <ListGroup.Item action onClick={()=>{
                            problemState("") 
                            setShowFilter(false);}
                            }>All Category</ListGroup.Item>
                        {problemList.map((e) => {
                            return <ListGroup.Item action key={e.id} onClick={(event) => {
                                problemState(e.id);
                                setShowFilter(false);
                            }}>{e.name}</ListGroup.Item>
                        })}
                    </ListGroup>
                </div>
                : ""
            }
        </div>
    )
}

export default ModuleSearch
