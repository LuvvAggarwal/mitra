import { SummaryPos,ViewTypes  } from "react-big-scheduler" 

export default {
  
    defaultEventBgColor: '#80C5F6',
    selectedAreaColor: '#7EC2F3',
    nonWorkingTimeHeadColor: '#999999',
    nonWorkingTimeHeadBgColor: '#fff0f6',
    nonWorkingTimeBodyBgColor: '#fff0f6',
    summaryColor: '#666',
    summaryPos: SummaryPos.TopRight,
    groupOnlySlotColor: '#F8F8F8',

    resourceName: 'Resource Name',
    taskName: 'Task Name',
    agendaViewHeader: 'Agenda',
    addMorePopoverHeaderFormat: 'MMM D, YYYY dddd',
    eventItemPopoverDateFormat: 'MMM D',
    nonAgendaDayCellHeaderFormat: 'ha',
    nonAgendaOtherCellHeaderFormat: 'ddd M/D',

    minuteStep: 30,

    views: [
        {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
        {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
        {viewName: 'Month', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
        {viewName: 'Quarter', viewType: ViewTypes.Quarter, showAgenda: false, isEventPerspective: false},
        {viewName: 'Year', viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false},
    ],
}