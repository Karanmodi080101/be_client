import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  DragDropProvider,
  EditRecurrenceMenu,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import React from 'react';
import { CalenderView } from 'src/app/shared/constants/global-constant';
import { APIRoutes } from 'src/app/shared/constants/routes';

class Calender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentView: CalenderView.Month,
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
      currentDate: new Date(),
      // empId: +localStorage?.getItem('empId')
      //   ? +localStorage.getItem('empId')
      //   : null
      empId: JSON.parse(sessionStorage.getItem('currentUser'))?.userId
    };
  }

  componentWillMount() {
    this.getInitialData();
  }

  getInitialData = () => {
    axios.get(APIRoutes.task.url).then((response) => {
      let allTasks = [];
      console.log('task from calendar', response.data);
      response.data.forEach((task) => {
        allTasks.push({
          id: task._id,
          title: task.title,
          startDate: new Date(task.startDate),
          endDate: new Date(task.endDate),
          notes: task?.description,
          assignedToId: task?.assignedToId
        });
      });
      //console.log('alltask', allTasks);
      this.setState({
        data: allTasks
      });
      //console.log('alltask2', this.state.data);
    });
  };

  onChangeView = (currentView) => {
    this.setState({ currentView: currentView });
  };

  changeAddedAppointment = (addedAppointment) => {
    this.setState({ addedAppointment: addedAppointment });
  };

  changeAppointmentChanges = (appointmentChanges) => {
    this.setState({ appointmentChanges: appointmentChanges });
  };

  changeEditingAppointment = (editingAppointment) => {
    this.setState({ editingAppointment: editingAppointment });
  };

  commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const newTask = {
        title: added?.title,
        description: added?.notes,
        startDate: new Date(added?.startDate),
        endDate: new Date(added?.endDate),
        assignedToId: this.state.empId //empId changed to userId
      };
      // console.log('added', newTask);
      //console.log('local', localStorage);
      // console.log(
      //   'local',
      //   JSON.parse(sessionStorage.getItem('currentUser'))?.userId
      // );
      axios.post(APIRoutes.task.url, newTask).then((response) => {
        console.log('calender response', response);
        if (response?.data) {
          this.setState({
            data: [
              ...this.state.data,
              {
                id: response?.data?._id,
                title: response?.data?.title,
                startDate: response?.data?.startDate,
                endDate: response?.data?.endDate,
                notes: response?.data?.description
              }
            ]
          });
        }
      });
    }

    if (changed) {
      //console.log('state', this.state.data);
      this.state.data.forEach((task, index) => {
        if (changed[task.id]) {
          task.id = changed[task.id]?.id ? changed[task.id]?.id : task.id;
          task.title = changed[task.id]?.title
            ? changed[task.id]?.title
            : task.title;
          task.startDate = changed[task.id]?.startDate
            ? changed[task.id]?.startDate
            : task.startDate;
          task.endDate = changed[task.id]?.endDate
            ? changed[task.id]?.endDate
            : task.endDate;
          task.notes = changed[task.id]?.notes
            ? changed[task.id]?.notes
            : task.notes;
          //task['assignedToId'] = changed[task?.assignedToId]; //this.state.data.assignedToId;
          task.assignedToId = changed[task.assignedToId]?.assignedToId
            ? changed[task.assignedToId]?.assignedToId
            : task.assignedToId;

          axios
            .put(`${APIRoutes.task.url}/${task.id}`, task)
            .then((response) => {
              if (response?.data) {
                let prevData = this.state.data;
                prevData[index] = task;
                this.setState({
                  data: prevData
                });
                console.log('newdata', this.state.data);
              }
            });
          this.getInitialData();
        }
      });
    }

    if (deleted !== undefined) {
      axios.delete(`${APIRoutes.task.url}/${deleted}`).then((response) => {
        if (response?.data) {
          console.log('response?.data; ', response?.data);
          this.setState({
            data: this.state.data.filter(
              (appointment) => appointment.id !== deleted
            )
          });
        }
      });
    }

    this.getInitialData();
  };

  appointmentComponent = (props) => {
    if (props.isDraggable) {
      console.log('props.isDraggable: ', props.isDraggable);
      return <Appointments.Appointment {...props} />;
    }
    return (
      <Appointments.Appointment
        {...props}
        style={{ ...props.style, cursor: 'not-allowed' }}
      />
    );
  };

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <Paper>
          <Scheduler data={this.state.data}>
            <ViewState
              defaultCurrentDate={this.state.currentDate}
              currentViewName={this.state.currentView}
              onCurrentViewNameChange={this.onChangeView}
            />

            <EditingState
              onCommitChanges={this.commitChanges}
              addedAppointment={this.state.addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}
              appointmentChanges={this.state.appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}
              editingAppointment={this.state.editingAppointment}
              onEditingAppointmentChange={this.changeEditingAppointment}
            />

            <WeekView startDayHour={10} endDayHour={19} />
            <WeekView
              name={CalenderView.WorkWeek}
              displayName={CalenderView.WorkWeek}
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView
              name={CalenderView.Month}
              displayName={CalenderView.Month}
            />
            <DayView name={CalenderView.Day} displayName={CalenderView.Day} />

            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <TodayButton />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <ConfirmationDialog />
            <Appointments
              appointmentComponent={this.appointmentComponent}
              isDraggable={true}
            />
            <AppointmentTooltip showCloseButton showOpenButton />
            <AppointmentForm />
            <DragDropProvider allowDrag={(id) => true} />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}

export default Calender;
