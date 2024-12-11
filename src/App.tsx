import { Navbar } from "./components/NavBar"
import { Calendar } from "./components/Calendar"
import { Sidebar } from "./components/Sidebar"

export function App() {
  return (
    <div className="flex">
      <Navbar />
      <Sidebar />
      <div className="ml-64 w-full">
        <Calendar />
      </div>
    </div>
  )
}