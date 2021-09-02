import React,{Component} from 'react';

const friendList = [
    {
        imageUrl: 'user.png',
        name: 'Anthony Daugloi',
        friend: '12',
        followers: 512
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        friend: '18',
        followers: 428
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        friend: '28',
        followers: 321
    },
]

class SuggestedFriends extends Component {
    render() {
        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggested</h4>
                    <a href="/defaultmember" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                </div>
                {friendList.map((value , index) => (
                <div className="wrap" key={index}>
                    <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
                        <figure className="avatar me-3"><img src={`assets/images/${value.imageUrl}`} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> Followers {value.followers} </span></h4>
                    </div>
                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                        <a href="/defaultmember" className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Follow</a>
                        <a href="/defaultmember" className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">View Profile</a>
                    </div>
                </div>

                ))}

                
            </div>
        );
    }
}

export default SuggestedFriends;