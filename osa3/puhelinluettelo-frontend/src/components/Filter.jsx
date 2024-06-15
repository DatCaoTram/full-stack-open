const Filter = ({ handleFilterChange }) => {
  return(
    <form>
      <p>filter shown with <input onChange={handleFilterChange}/></p> 
    </form>   
  )
}

export default Filter