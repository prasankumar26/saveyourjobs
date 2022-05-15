import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext()

  const handleSearch = (e) =>{
    if (isLoading) return
    handleChange({name: e.target.name, value: e.target.value})
    }


    const handleSubmit = (e) =>{
      e.preventDefault()
      clearFilters()
    }

  return (
    <Wrapper>
    <form className='form'>
      <h4>search form</h4>
      {/* search position */}
      <div className='form-center'>
        <FormRow
          type='text'
          name='search'
          value={search}
          handleChange={handleSearch}
        ></FormRow>
        {/* rest of the inputs */}
        <FormRowSelect 
         labeltext='status'
         name='searchStatus'
         value={searchStatus}
         handleChange={handleSearch}
         list={['all', ...statusOptions]}
        />
        {/* rest of the sort by type */}
        <FormRowSelect 
         labeltext='type'
         name='searchType'
         value={searchType}
         handleChange={handleSearch}
         list={['all', ...statusOptions]}
        />
        {/*  sort  */}
        <FormRowSelect 
         name='sort'
         value={sort}
         handleChange={handleSearch}
         list={sortOptions}
        />
        <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit} >
          Clear filters
        </button>
      </div>
    </form>
  </Wrapper>
  )
}
export default SearchContainer