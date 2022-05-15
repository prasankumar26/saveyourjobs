import { 
  DISPLAY_ALERT, 
  CLEAR_ALERT,
  // register user 
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  // login user 
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  // nav toggle 
  TOGGLE_SIDEBAR,
  // logout user 
  LOGOUT_USER,
  // update user 
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  // jobs handleChange form
  HANDLE_CHANGE,
  CLEAR_VALUES,
  // create job 
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  // get all jobs 
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  // edit job 
  SET_EDIT_JOB,
  // delete job 
  DELETE_JOB_BEGIN,
  // edit job 
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  // show stats 
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  // clear search filters 
  CLEAR_FILTERS,
  // changepage 
  CHANGE_PAGE
} from "./actions"
import { initialState } from "./appContext"

const reducer = (state,action) =>{

 // display alert 
if(action.type === DISPLAY_ALERT){
 return {
  ...state,
  showAlert: true,
  alertType: 'danger',
  alertText: 'Please provide all values!',
}
}

// clear alert 
if(action.type === CLEAR_ALERT){
 return {
  ...state,
  showAlert: false,
  alertType: ' ',
    alertText: ' ',
}
}

// register user 
if(action.type === REGISTER_USER_BEGIN){
  return {...state, isLoading:true}
}
if(action.type === REGISTER_USER_SUCCESS){
  return {
    ...state, 
    isLoading:false,
    token: action.payload.token,
    user: action.payload.user,
    userLocation: action.payload.location,
    jobLocation: action.payload.location,
    showAlert: true,
    alertType:'success',
    alertText: 'User Created Redirecting...'
  }
}
if(action.type === REGISTER_USER_ERROR){
  return {
    ...state, 
    isLoading:false,
    showAlert: true,
    alertType:'danger',
    alertText: action.payload.msg,
  }
}


// login user 
if(action.type === LOGIN_USER_BEGIN){
  return {...state, isLoading:true}
}
if(action.type === LOGIN_USER_SUCCESS){
  return {
    ...state, 
    isLoading:false,
    token: action.payload.token,
    user: action.payload.user,
    userLocation: action.payload.location,
    jobLocation: action.payload.location,
    showAlert: true,
    alertType:'success',
    alertText: 'LOGIN SUCCESSFUL! Redirecting...'
  }
}
if(action.type === LOGIN_USER_ERROR){
  return {
    ...state, 
    isLoading:false,
    showAlert: true,
    alertType:'danger',
    alertText: action.payload.msg,
  }
}

// nav toggle 
if(action.type === TOGGLE_SIDEBAR){
  return{...state, showSidebar: !state.showSidebar }
}

// logout User 
if(action.type === LOGOUT_USER){
  return {
    ...initialState,
    user: null,
    token: null,
    userLocation: '',
    jobLocation: '',
  }
}


// update user 
if(action.type === UPDATE_USER_BEGIN){
  return {...state, isLoading:true}
}
if(action.type === UPDATE_USER_SUCCESS){
  return {
    ...state, 
    isLoading:false,
    token: action.payload.token,
    user: action.payload.user,
    userLocation: action.payload.location,
    jobLocation: action.payload.location,
    showAlert: true,
    alertType:'success',
    alertText: 'User Updated Successfully...'
  }
}
if(action.type === UPDATE_USER_ERROR){
  return {
    ...state, 
    isLoading:false,
    showAlert: true,
    alertType:'danger',
    alertText: action.payload.msg,
  }
}

// handle change jobs form
if(action.type === HANDLE_CHANGE){
  return {
    ...state,
    page:1, 
    [action.payload.name]:action.payload.value,
  }
}

// clearValues job form 
if(action.type === CLEAR_VALUES){
  const initialState = {
    // job 
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: state.userLocation,
  jobType: 'full-time',
  status: 'pending',
  }
  return {
    ...state, 
    ...initialState,
  }
}

// create job
if(action.type === CREATE_JOB_BEGIN){
  return {...state, isLoading:true}
}
if(action.type === CREATE_JOB_SUCCESS){
  return {
    ...state, 
    isLoading:false,
    showAlert: true,
    alertType:'success',
    alertText: 'New job Created!',
  }
}
if(action.type === CREATE_JOB_ERROR){
  return {
    ...state, 
    isLoading:false,
    showAlert: true,
    alertType:'danger',
    alertText: action.payload.msg,
  }
}

// Get all Jobs 
if(action.type === GET_JOBS_BEGIN) {
  return {
    ...state,
    isLoading: true,
    showAlert: false,
  }
}
if(action.type === GET_JOBS_SUCCESS){
  return {
    ...state,
    isLoading: false,
    jobs: action.payload.jobs,
    totalJobs: action.payload.totalJobs,
    numOfPages: action.payload.numOfPages,
  }
}

// edit job 
if(action.type === SET_EDIT_JOB){
  const job = state.jobs.find((job) => job._id === action.payload.id)
  // console.log(job);
  const {_id, position, company, jobLocation, jobType, status} = job
  return {
    ...state, 
    isEditing:true, 
    editJobId: _id,
    position, 
    company, 
    jobLocation, 
    jobType, 
    status,
  }
}


// delete job 
if(action.type === DELETE_JOB_BEGIN){
  return {...state, isLoading:true}
}


// edit job 
if(action.type === EDIT_JOB_BEGIN){
  return {
    ...state, 
    isLoading:true,
  }
}
if(action.type === EDIT_JOB_SUCCESS){
  return {
    ...state, 
    isLoading:false,
    showAlert: true,
    alertType:'success',
    alertText: 'Job Updated !',
  }
}
if(action.type === EDIT_JOB_ERROR){
  return {
    ...state, 
    isLoading:false,
    showAlert: true,
    alertType:'danger',
    alertText: action.payload.msg,
  }
}

// show stats 
if(action.type === SHOW_STATS_BEGIN){
  return {
    ...state, 
    isLoading:true,
    showAlert:false,
  }
}
if(action.type === SHOW_STATS_SUCCESS){
  return {
    ...state, 
    isLoading:false,
    stats: action.payload.stats,
    monthlyApplications: action.payload.monthlyApplications
  }
}

// search clear filters 
if(action.type === CLEAR_FILTERS){
  return {
  ...state,
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  }
}

// change page 
if(action.type === CHANGE_PAGE){
  return {...state, page: action.payload.page }
}

 // Error 
 throw new Error(`No such action : ${action.type}`)
}


export default reducer