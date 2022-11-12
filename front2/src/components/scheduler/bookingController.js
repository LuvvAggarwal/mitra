import booking from "../../api/booking";
import users from "../../api/users";
import timeConfig from "./config/timeConfig"
export default class BookingController {
    constructor(user, token, counsoler) {
        this.token = token;
        this.user = user;
        this.counsoler = counsoler;
    }

    async getEvents(startDate, endDate) {
        const events = [];
        await booking.get(`/slot/cn=${this.counsoler.id}/st=${startDate}/et=${endDate}`, { headers: { 'Authorization': this.token } }).then((res) => {
            const payload = res.data.data.payload;
            payload.forEach(e => {
                const event = {
                    id: e.id,
                    bgColor: "#3184ff",
                    start: e.start_time,
                    end: e.end_time,
                    resourceId: e.resource_id,
                    startResizable: false,
                    endResizable: false,
                    movable: false,
                    showPopover: true,
                    title: "Meeting"
                }
                if (this.counsoler == e.counsoler || this.user.id == e.user) {
                    event.title = e.counsoler_user + " - " + e.user_user + "\n" + "Meeting Link - " + e.meeting_link;
                }
                events.push(event)
            });
        }).catch(e => {
            console.log(e);
        })
        return events;
    }

    async getResources(time_slot) {
        let resources = [];
        // await users.get("/profile/" + this.counsoler, { headers: { 'Authorization': this.token } })
        // .then(res=>{
        //     const payload = res.data.data.payload
        //     const time_slot = payload.time_slot;
        const st = time_slot.split(" :: ")[0];
        const et = time_slot.split(" :: ")[1];
        for (const key in timeConfig) {
            if (Object.hasOwnProperty.call(timeConfig, key)) {
                const element = timeConfig[key];
                if (key >= st && key <= et) {
                    const resource = {
                        id: key,
                        name: element
                    }
                    resources.push(resource)
                }
            }
        }
        // }).catch(e =>{
        //     console.log(e);
        // }).finally(()=>{
        // })
        resources = resources.sort((a, b) => {
            return a.id - b.id
        })
        return resources;
    }
};