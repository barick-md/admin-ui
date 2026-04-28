import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Exercise from './exercise.jsx'
import Login from './login.jsx'
import UserPost from './UserPost.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserPost/>
  </StrictMode>,
)
