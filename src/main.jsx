import { StrictMode } from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './components/store/sotre.js'

// const routes = createBrowserRouter([
//   {
//     path:'/',
//     element:<App/>,
//     children:[
//       {
//         path:'/contact',
//         element:<Contact/>
//       },
//       {
//         path:'/dashboard',
//         element:<Dashboard/>
//       }
//     ]
//   }
// ])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={routes} /> */}
      <App />
    </Provider>
  </StrictMode>,
)
