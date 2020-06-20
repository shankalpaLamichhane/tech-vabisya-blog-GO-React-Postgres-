import React,{useState} from 'react'
import DatePicker from 'react-date-picker'
import { searchPostFromSearchBar,clearPost } from '../../../actions/postAction';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  
  const [formData,setFormData] = useState({
    category:'',
    postDate:new Date(),
    searchParameter:'',
    sortParameter:'ASC'
  })

  const [toCustomSearch,setToCustomSearch] = useState(false)
  
  const {category,postDate,searchParameter} = formData;

  const onChange = e => {
    setFormData({...formData,[e.target.name]:e.target.value})

  }

  const onSubmit = async e => {
    e.preventDefault()
    clearPost()
    console.log('FORM DATA IS ::: '+JSON.stringify(formData))
    props.searchPostFromSearchBar(formData)
    console.log('ON SUBMIT ASYNC CHECK')
    // if(!props.loading && props.posts!=null)
    setToCustomSearch(true)
  }

  if(toCustomSearch){
    return (<Redirect to="/custom-search"></Redirect>)
  }

  return(
    // toCustomSearch?
    // (<Redirect to="/custom-search"></Redirect>):
    <form onSubmit={e => onSubmit(e)}>
    <div style={{display:'flex',justifyContent:'space-evenly',margin:'10px'}}>
    <label for="category">Category :</label>

<select id="category" name="category" value={category} onChange={onChange} defaultValue="tech">
  <option>* Select Category</option>
  <option value="TECH">Technology</option>
  <option value="BUSI">Business</option>
  <option value="FOOD">Food</option>
</select>

<label for="postDate">Posted Date:</label>
<input type="date" id="postDate" name="postDate" onChange={onChange} value={postDate}/>

<label for="searchParameter">Search</label>
<input type="text"id="searchParameter" name="searchParameter" placeholder="Search Here" onChange={onChange} value={searchParameter}/>

<input type="submit"></input>
</div>
</form>
)
}

SearchBar.propTypes = {
  searchPostFromSearchBar: PropTypes.func.isRequired,
}

export default connect(null,{searchPostFromSearchBar})(withRouter(SearchBar))