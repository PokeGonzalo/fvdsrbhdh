import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Game from './pages/Game'
import Ranking from "./pages/Ranking"
import Profile from "./pages/Profile"
import Market from "./pages/Market"
import Publications from "./pages/Publications"
import LandingPage from "./pages/LandingPage"
import Stories from "./pages/Stories"
import StoryDetail from "./pages/StoryDetail"
import StoryGame from './pages/StoryGame'
import UserProfile from './pages/UserProfile'
import DemoGame from "./pages/DemoGame"
import DemoFinish from './pages/DemoFinish'
import AvatarEditor from "./pages/AvatarEditor"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
    path="/"
    element={<LandingPage />}
/>

<Route
    path="/login"
    element={<Login />}
/>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/game"
          element={<Game />}
/>
<Route
  path="/game/:categoria"
  element={<Game />}
/>
<Route
  path="/ranking"
  element={<Ranking />}
/>
<Route
    path="/profile"
    element={<Profile />}
/>
<Route
    path="/market"
    element={<Market />}
/>
<Route

    path="/publications"

    element={<Publications />}

/>

<Route
    path="/stories"
    element={<Stories />}
/>

<Route
    path="/story/:idHistoria"
    element={<StoryDetail />}
/>

<Route
    path="/story-game/:idHistoria/:idPregunta"
    element={<StoryGame />}
/>

<Route
    path="/landing"
    element={<LandingPage />}
/>

<Route
    path="/demo"
    element={<DemoGame />}
/>

<Route
    path="/demo-finish"
    element={<DemoFinish />}
/>

<Route
    path="/avatar-editor"
    element={<AvatarEditor />}
/>

<Route
    path="/user/:idUsuario"
    element={<UserProfile />}
/>
      </Routes>

    </BrowserRouter>
  )
}

export default App