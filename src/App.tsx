import { Navbar } from "./components/NavBar"
import { Calendar } from "./components/Calendar"

export function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Calendar />
    </div >
  )
}