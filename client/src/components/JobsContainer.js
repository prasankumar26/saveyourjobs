import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppContext } from '../context/appContext'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
 const {getJobs, 
  jobs, 
  isLoading, 
  page, 
  totalJobs, 
  search, 
  searchStatus, 
  searchType, 
  sort,
  numOfPages
} = useAppContext()


 useEffect(() =>{
  getJobs()
  // eslint-disable-next-line
 },[page, search, searchStatus, searchType, sort])

 if(isLoading) {
  return <Loading center />
 }

 if(jobs.length === 0){
  return <Wrapper>
   <h2>No Jobs to Display...</h2>
  </Wrapper>
 }

  return (
    <Wrapper>
    <h5>{totalJobs} job{jobs.length > 1 && 's'} Found </h5>
    <div className="jobs">
     {
      jobs.map((job) =>{
       const {_id} = job
      //  console.log(_id);
       return <Job  key={_id} {...job} />
      })
     }
    </div>
    {numOfPages > 1 && <PageBtnContainer /> } 
    {/* {pagination btns} */}
    </Wrapper>
  )
}
export default JobsContainer