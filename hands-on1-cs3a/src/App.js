import './App.css';
import Description from './Components/userinfo/Description/Description';
import Name from './Components/userinfo/Name/Name';
import Section from './Components/userinfo/Section/Section';
import { useState } from 'react';
function App() {
  
  const [userinfo,setuserInfo]= useState({firstName: "John Adrian",
    middleInitial: " C.",
    lastName: " Llanita",
    Section: "BSCS-3A",
    Description: "Hi"

  })
  
  function updateName(){
    userinfo.firstName= " Adrian ";
    setuserInfo({...userinfo})
    return userinfo;
  }
  function moon(){
    return userinfo
  }

  
  
  return (
    <div className="App">
      <div className="App">
     <Name
     firstName={userinfo.firstName}
     middleInitial={userinfo.middleInitial}
     lastName={userinfo.lastName}/>
     <Section
     Section={userinfo.Section}/>
     <Description
     Description={userinfo.Description}/>
     <div className='moon'>

     </div>
     <button type='button' onClick={updateName}>button</button>
     <button type='moon' onClick= {moon}>Move the moon</button>
    </div>
    </div>
    

  );
}

export default App;
