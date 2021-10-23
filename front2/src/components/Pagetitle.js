import React,{Component} from 'react';
import ModuleSearch from './Search/ModuleSearch';

class Pagetitle extends Component {
    render() {
        const {title} = this.props;
        const {link} = this.props ;
        const {showlink} = this.props ;
        // const {model} = this.props; 
        // const {loader} = this.props; 
        const {problemState} = this.props ;
        const {searchState} = this.props; 
        const {triggerSearch} = this.props; 
        const {searchVal} = this.props; 
        const {setLastNumber} = this.props; 

        console.log(showlink);
        return (
            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">{title}
                {this.props.showlink && <a className="btn btn-primary ms-2" href={link.url}>{link.text}</a>}
               <ModuleSearch triggerSearch={triggerSearch} problemState={problemState} searchState={searchState} searchVal={searchVal} setLastNumber={setLastNumber}/>
                
                </h2>
            </div>            
        );
    }
}

export default Pagetitle;


