import { Navbar } from "./components/NavBar"
import { Calendar } from "./components/Calendar"
import { Sidebar } from "./components/Sidebar"

export function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full">
          <Calendar />
        </div>
      </div>
    </div >
  )
}