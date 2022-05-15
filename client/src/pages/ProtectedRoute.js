import { useAppContext } from "../context/appContext"
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({children}) => {
const {user} = useAppContext()
// if there is no user  kick back to landing page 
if(!user){
 return <Navigate to="/landing" />
}
 return children
}
export default ProtectedRoute