import React, { Component } from "react";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DemoData
} from "react-big-scheduler";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import withDragDropContext from "./withDnDContext";
import "react-big-scheduler/lib/css/style.css";
import schedulerConfig from "./config/schedulerConfig";

class SchedulerWidget extends Component {
  constructor(props) {
    super(props);

    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);

    const td = new Date()
    this.schedulerData = new SchedulerData(td, ViewTypes.Week)
    this.schedulerData.localeMoment.locale("en");
    this.state = {
      viewModel: this.schedulerData,
      reRender: false,
      modal: {
        showModal: false,
        data: {
          content: "",
          btn: {}
        }
      }
    };

  }

  componentDidUpdate(prevProps) {
    if (prevProps.resources !== this.props.resources) {
      this.schedulerData.setResources(this.props.resources);
      this.schedulerData.setEvents(this.props.events);
      this.setState({
        reRender: new Date().getTime()
      });
    }
  }

  render() {
    const { viewModel } = this.state;
    return (
      <div>
        <div>
          <h3 style={{ textAlign: "center" }}>Book Your Slot</h3>
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
            onScrollLeft={this.onScrollLeft}
            onScrollRight={this.onScrollRight}
            onScrollTop={this.onScrollTop}
            onScrollBottom={this.onScrollBottom}
            toggleExpandFunc={this.toggleExpandFunc}
          />
          <Modal show={this.state.modal.showModal} onHide={(e) => {
            this.setState({
              modal: {
                showModal: false, data: {
                  content: "",
                  btn: {}
                }
              }
            })
          }}>
            <Modal.Header closeButton>
              <Modal.Title>Booking Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modal.data.content}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => {
                this.setState({
                  modal: {
                    showModal: false, data: {
                      content: "",
                      btn: {}
                    }
                  }
                })
              }}>
                Close
              </Button>
              <Button variant="primary" onClick={this.state.modal.data.btn.func}>
                {this.state.modal.data.btn.text}
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    );
  }

  prevClick = schedulerData => {
    schedulerData.prev();
    const head = schedulerData.headers;
    this.props.setDateRange({
      startDate: new Date(head[0].time).toISOString(),
      endDate: new Date(head[head.length - 1].time).toISOString()
    })
    // this.props.setStartDate(head[0].time); 
    // this.props.setStartDate(head[head.length - 1].time); 
    // schedulerData.setEvents(this.props.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    const head = schedulerData.headers;
    this.props.setDateRange({
      startDate: new Date(head[0].time).toISOString(),
      endDate: new Date(head[head.length - 1].time).toISOString()
    })
    this.setState({
      viewModel: schedulerData
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title
      }}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title
      }}`
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    start = start.split(" ")[0];
    end = end.split(" ")[0];
    slotName = slotName.split(" ")[0];

    const startTime = moment(start + ' ' + slotName).toISOString();
    const endTime = moment(startTime).add("30", "minute").toISOString();
    const bookSlot = () => {
      let newFreshId = new Date().getTime()
      let newEvent = {
        id: newFreshId,
        title: "New event you just created",
        start: startTime,
        end: endTime,
        resourceId: slotId,
        bgColor: "purple"
      };
      schedulerData.addEvent(newEvent);
      this.setState({
        viewModel: schedulerData
      });
    }
    const content = "Book a appointment on " + startTime + "\n" + "Appointment Timing: " + startTime + " - " + endTime;
    const data = {
      content,
      btn: {
        func: bookSlot,
        text: "Confirm Appointment"
      }
    }
    this.setState({ modal: { showModal: true, data } })
  };

  updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id
        }, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id
        }, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    this.setState({
      viewModel: schedulerData
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      window.confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title
        }, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData
      });
    }
  };

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData
      });

      schedulerContent.scrollLeft = 10;
    }
  };

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollBottom");
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData
    });
  };
}

export default withDragDropContext(SchedulerWidget);