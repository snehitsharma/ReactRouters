import React from 'react';
import {render} from 'react-dom'
//import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router,Routes, Route, Navigate, Link, Outlet, useParams, NavLink,useNavigate,useLocation } from 'react-router-dom';

//const root = ReactDOM.createRoot(document.getElementById('root'));
render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/myapps" element={<Navigate replace to="/learn"/>}></Route>
      <Route path="learn" element={<Learn/>}> 
        <Route path='Courses' element={<Courses/>}>
          <Route path=':courseid' element={<CourseId/>}/>
          </Route> 
        <Route path='Bundles' element={<Bundles/>}/> 
      </Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);

function Home(){
  return(
    <div>
      <h1>Home ROute</h1>
    </div>
  )
}
function Learn(){

  return(
    <div>
      <h1>Learn</h1>
      <h4>all videos are listed here</h4>
      <Link className='btn btn-success' to="/learn/courses">Courses</Link>
      {" "}
      <Link className='btn btn-primary' to="/learn/bundles">Bundles</Link>
      <Outlet/>
    </div>
  )
}

function Courses(){
  const courseList = ["React","Express","MongoDB","Node.js","Angular"]
  const randomCourseName =  courseList[Math.floor(Math.random()* courseList.length)]
  return(
    <div>
      <h1>Course List</h1>
      <h4>Course card</h4>
      <p>addition testing</p>
      
      <NavLink 
      style ={({isActive}) => {
        return {
          backgroundColor : isActive ? "pink" : "yellow"
        }
      }
    }
      
      to={`/learn/courses/${randomCourseName}`}>
        {randomCourseName}
      </NavLink>
      <NavLink className="btn btn-light" to={`/learn/courses/test`} >
        test
      </NavLink>
      <Outlet />
    </div>  
  )
}

function Bundles(){
  return(
    <div>
      <h1>Bundle List</h1>
      <h4>Bundle Card</h4> 
    </div>
  )
}

function CourseId(){
  const navigate =useNavigate()
  const {courseid} = useParams()
  return(
    <div>
      <h1>url params is: {courseid}</h1> 
      <button className='btn btn-warning'
      onClick={()=>{
        navigate("/dashboard",{state :courseid} );
      }
      }
      >price</button>
    </div>
  )
}

function Dashboard(){
  const location = useLocation()
  return(
    <div>
      <h1>Info that i got here is {location.state}</h1> 
    </div>
  )
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
