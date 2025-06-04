import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects'; 
import Imageview from './components/Imageview';
import Parcours from './components/Parcours';
import Competences from './components/Competences';
import Contact from './components/Contact'

function App() {
  return (
    <div>
      <Navbar/>

      <Imageview/>
      {/* other components or pages */}
      <About/>
      <Parcours/>
      <Competences/>
   
      <Projects/>
      <Contact/>

    </div>
  );
}

export default App;
