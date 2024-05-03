import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [form, setForm] = useState({})
  const [user, setUser] = useState([])

  const handleForm = (e)=>{
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:3000/create",{
    method: "POST",
    body: JSON.stringify(form),
    headers:{
      'Content-Type' : "application/json"
    }
  })
    const data = await response.json()
    console.log(data)
  }

  const getUser = async ()=>{
    const response = await fetch("http://localhost:3000/demo",{
      method: "GET",
      
    })
    const userData = await response.json();
    setUser(userData)
  }


  useEffect(() => {
    getUser()
  }, [])
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>{JSON.stringify(form)}</p>
        <input type="text" placeholder='username' name='username' onChange={handleForm} />
        <input type="text" placeholder='password' name='password' onChange={handleForm} />
        <input type="submit" />
      </form>
      <div>
        <ul>
          {
            user.map((user)=>(
              <li key={user._id}>Name: {user.username}, Password: {user.password}, Booking_Time: {user.createdAt}</li>
            
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App
