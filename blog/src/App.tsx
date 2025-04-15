import {Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RoutesConfig from './routes'; 


function App(): JSX.Element { 
  return ( 
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        > 
          <Suspense fallback={<div>
              <div className="flex justify-center items-center h-screen bg-purple-700"> 
                <div className="text-3xl font-bold text-white">Loading...</div>
              </div>
            </div>}> 
            <Routes> 
              <Route path="/*" element={<RoutesConfig />}/> 
            </Routes>
          </Suspense> 
        </Router>
       
  )
}

export default App
