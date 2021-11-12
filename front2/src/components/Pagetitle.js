import React, { Component } from 'react';
import ModuleSearch from './Search/ModuleSearch';

class Pagetitle extends Component {
    render() {
        const { title } = this.props;
        const { link } = this.props;
        const { showlink } = this.props;
        // const {model} = this.props; 
        // const {loader} = this.props; 
        const { problemState, dataSet, triggerSearch, searchState, setLastNumber, searchVal, hasMore} = this.props;
        return (
            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">{title}
                    {this.props.showlink && <a className="btn btn-primary ms-2 d-flex align-items-center" href={link.url}><span className="feather-edit-2 font-xxs"></span>{link.text}</a>}
                    <div className="d-none d-sm-block ms-auto"><ModuleSearch triggerSearch={triggerSearch} problemState={problemState} searchState={searchState} searchVal={searchVal} setLastNumber={setLastNumber} dataSet={dataSet} hasMore={hasMore} /></div>

                </h2>
                <div className="d-sm-none d-block mt-2"><ModuleSearch triggerSearch={triggerSearch} problemState={problemState} searchState={searchState} searchVal={searchVal} setLastNumber={setLastNumber} dataSet={dataSet} hasMore={hasMore}/></div>
            </div>
        );
    }
}

export default Pagetitle;


