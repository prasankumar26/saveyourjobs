import React, {useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'
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
} from './actions'

// Add Register user localstorage values in initialState 
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

// initialState 
export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  // register user 
  user: user? JSON.parse(user) : null,
  token:token,
  userLocation: userLocation || '',
  // nav toggle
  showSidebar: false,

  // create job 
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  // all jobs 
  jobs:[],
  totalJobs: 0,
  numOfPages:1,
  page: 1,
  // showstats 
  stats:{},
  monthlyApplications: [],
  // search
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}


const AppContext = React.createContext()
const AppProvider = ({ children }) => {
 const [state, dispatch] = useReducer(reducer, initialState)



 //axios for update user
 const authFetch = axios.create({
   baseURL: '/api/v1/',
 })

//  Interceptorsrequest 
authFetch.interceptors.request.use((config) =>{
  config.headers.common['Authorization'] = `Bearer ${state.token}`
  return config
}, (error)=>{
  return Promise.reject(error)
})
//  response
authFetch.interceptors.response.use((response) =>{
  return response
}, (error)=>{
  // console.log(error.response);
  if(error.response.status === 401){
   logOutUser()
  }
  return Promise.reject(error)
})


 // displayAlert 
 const displayAlert = () =>{
  dispatch({type:DISPLAY_ALERT})
  clearAlert()
 }

 // clearAlert 
 const clearAlert = () =>{
  setTimeout(() =>{
   dispatch({type: CLEAR_ALERT})
  },3000)
 }

//  add to LocalStorage 
const addUserToLocalStorage = ({user, token, location}) =>{
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('location', location)
}

//  Remove to LocalStorage
const RemoveUserToLocalStorage = ({user, token, location}) =>{
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('location')
}


//  register user 
 const registerUser = async (currentUser) =>{
  // REGISTER_USER_BEGIN 
   dispatch({type: REGISTER_USER_BEGIN})
   try {
     const response = await axios.post('/api/v1/auth/register', currentUser)
    //  console.log(response );
     const {user,token,location} = response.data
     // REGISTER_USER_SUCCESS 
     dispatch({
       type: REGISTER_USER_SUCCESS,
       payload: {user, token,location}
    })
    // local storage comming 
    addUserToLocalStorage({user,token,location})
   } catch (error) {
    //  console.log(error.response); 
    // REGISTER_USER_ERROR 
     dispatch({
       type: REGISTER_USER_ERROR,
       payload:{msg: error.response.data.msg}
     })
   }
   clearAlert()
 }

//  Login user 
 const loginUser = async (currentUser) =>{
  // LOGIN_USER_BEGIN 
  dispatch({type: LOGIN_USER_BEGIN})
  try {
    const {data} = await axios.post('/api/v1/auth/login', currentUser)
   //  console.log(response );
    const {user,token,location} = data
    // LOGIN_USER_SUCCESS 
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {user, token,location}
   })
   // local storage comming 
   addUserToLocalStorage({user,token,location})
  } catch (error) {
   // LOGIN_USER_ERROR 
    dispatch({
      type: LOGIN_USER_ERROR,
      payload:{msg: error.response.data.msg}
    })
  }
  clearAlert()
 }

//  toggle navbar 
 const toggleSidebar = () =>{
   dispatch({type: TOGGLE_SIDEBAR})
 }

//  logout user 
const logOutUser = () =>{
  dispatch({type: LOGOUT_USER})
  RemoveUserToLocalStorage()
}


// Update User 
const updateUser = async (currentUser) =>{
  dispatch({type: UPDATE_USER_BEGIN})
  try {
    const {data} = await authFetch.patch('/auth/updateUser', currentUser)

    // destructure value from data 
    const {user,location,token} = data

    // update user success 
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload:{user,location,token}
    })
    
    // local storage comming 
    addUserToLocalStorage({user,token,location})
  } catch (error) {
    if(error.response.status !== 401) {
      dispatch({
        type:UPDATE_USER_ERROR,
        payload: {msg: error.response.data.msg}
      })
    }
  }
  clearAlert()
}

// jobs form handlechange 
const handleChange = ({name,value}) =>{
  dispatch({type: HANDLE_CHANGE, 
  payload:{name,value}
  })
}

// CLEAR_VALUES 
 const clearValues = () =>{
   dispatch({type: CLEAR_VALUES})
 }

//  create Job 
const createJob = async () =>{
  dispatch({type: CREATE_JOB_BEGIN})
  try {
    const {position, company, jobLocation,  jobType, status} = state
    await authFetch.post('/jobs', {
      position,
      company, 
      jobLocation,  
      jobType, 
      status,
    })
    dispatch({type:CREATE_JOB_SUCCESS})
    dispatch({type: CLEAR_VALUES})
  } catch (error) {
    if(error.response.status === 401) return
    dispatch({type: CREATE_JOB_ERROR, payload: {msg: error.response.data.msg}})
  }
  clearAlert()
}

// Get all Jobs 
const getJobs = async () =>{

  const {page, search, searchStatus, searchType, sort } = state

    let url =`/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if(search){
      url = url + `&search=${search}`
    }


    dispatch({type:GET_JOBS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {jobs,totalJobs,numOfPages} = data
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload:{
          jobs,
          totalJobs,
          numOfPages,
        }
      })
    } catch (error) {
      logOutUser()
    }
    clearAlert()
}

// setedit job 
const seteditJob = (id) =>{
  dispatch({type: SET_EDIT_JOB, payload: {id}})
}

// edit job 
const editJob = async () =>{
  dispatch({type: EDIT_JOB_BEGIN})
  try {
    const {position, company, jobLocation, jobType, status} = state
    await authFetch.patch(`/jobs/${state.editJobId}`, {
      company,
      position,
      jobLocation,
      jobType,
      status,
    })
    dispatch({type: EDIT_JOB_SUCCESS})
    dispatch({type: CLEAR_VALUES})
  } catch (error) {
    if(error.response.status === 401) return
    dispatch({type: EDIT_JOB_ERROR, payload:{msg:error.response.data.msg},
    })
  }
  clearAlert()
}

// delete job 
const deleteJob = async (jobId) =>{
  dispatch({type: DELETE_JOB_BEGIN})
 try {
    await authFetch.delete(`/jobs/${jobId}`)
    getJobs()
 } catch (error) {
  logOutUser()
 }
}


// show stats 

const showStats = async () =>{
 dispatch ({ type: SHOW_STATS_BEGIN })
 try {
   const {data} = await authFetch('/jobs/stats')
   dispatch({
     type: SHOW_STATS_SUCCESS,
     payload: {
       stats: data.defaultStates,
       monthlyApplications: data.monthlyApplications,
     }
   })
 } catch (error) {
   logOutUser()
 }
 clearAlert()
}

const clearFilters = () =>{
  dispatch({type: CLEAR_FILTERS})
}

// change page
const changePage  = (page) =>{
  dispatch({type : CHANGE_PAGE, payload: {page} })
}



  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logOutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        seteditJob,
        deleteJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}



// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }