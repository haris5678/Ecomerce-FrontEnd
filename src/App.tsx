// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// import axios from 'axios'
import Header from "./components/Header";
import SignUp from "./components/SignUpForm";

function App() {
  // const [count, setCount] = useState<number>(0)

  // const sendDetails = () =>{
  //   axios.post('http://localhost:4000/api/auth/sign-up', {
  //     "fullName": "Haris",
  //     "email": "haris.test@test.com",
  //     "password": "securepassword",
  //     "roleId":"admin"
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  return (
    <div>
      <Header />
      <SignUp />
    </div>
  );
}

export default App;
