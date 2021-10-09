import React, { useState } from 'react'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import { Button } from 'react-bootstrap'





export default function HomePage(props) {
  const [signUP, setSignUP] = useState(false);
  const [signIN, setSignIN] = useState(false);

  return (
    <main>
      <h1>BONGO</h1>
      <h2 className="header"><p>"He can do it. So can you!"</p></h2>
      <Button onClick={()=>{setSignUP(true)}}>Sign Up</Button>
      <Button onClick={()=>{setSignIN(true)}}>Sign In</Button>
      {signUP && <SignUp closeModal={setSignUP} />}
      {signIN && <SignIn closeModal={setSignIN} />}
      
    </main>
  )
}
