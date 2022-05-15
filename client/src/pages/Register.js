import {useState, useEffect} from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'

// initialstate 
const initialState = {
 name: '',
 email: '',
 password: '',
 isMember: true,
}


const Register = () => {
  //  after register navigate to dashboard page
   const navigate = useNavigate()

   // state values 
 const [values,setValues] = useState(initialState)


//  use context
 const {user, isLoading,showAlert,displayAlert, registerUser, loginUser} = useAppContext() 

 // glocal state and use Navigate 

// handlechange 
const handleChange = (e) =>{
  setValues({...values, [e.target.name]: e.target.value})
}

// Onsubmit 
 const onSubmit = (e) =>{
  e.preventDefault()
const {name,email,password,isMember} = values
if(!email || !password || (!isMember && !name)){
  displayAlert()
  return
}
const currentUser = {name,email,password}
if(isMember){
 loginUser(currentUser)
} else {
  registerUser(currentUser)
}
 }

//  toggle member reg or login 
const toggleMember = () =>{
 setValues({...values, isMember: !values.isMember})
}

//  after register navigate to dashboard page
useEffect (() =>{
   if(user){
     setTimeout(() =>{
       navigate('/')
     },3000)
   }
}, [user,navigate])
 
  return <Wrapper className='full-page'>
          <form className='form' onSubmit={onSubmit}>
           <Logo />
          <h3> {values.isMember ? 'Login' : 'Register'} </h3>
          {showAlert ?<Alert /> : null }  
          {/* name Input  */}
       {
        !values.isMember && (
         <FormRow 
         type="text"
         name="name" 
         value={values.name} 
         handleChange={handleChange}
         />
        )
       }
         <FormRow 
         type="Email"
         name="email" 
         value={values.email} 
         handleChange={handleChange}
         />
         <FormRow 
         type="Password"
         name="password" 
         value={values.password} 
         handleChange={handleChange}
         />
          <button className="btn btn-block" disabled={isLoading}>
           Submit
          </button>

           <p>
            {values.isMember ? 'Not a Member?' : 'Already A Member?'}
           <button className="member-btn" type='button' onClick={toggleMember} >
            {values.isMember ? 'Register' : 'Login'}
           </button>
           </p>


          </form>
  </Wrapper>
}

export default Register