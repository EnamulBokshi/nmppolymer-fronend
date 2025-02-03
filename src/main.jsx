import { StrictMode } from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './components/store/sotre.js'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={routes} /> */}
     <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
