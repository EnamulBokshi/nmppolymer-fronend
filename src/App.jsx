import { Footer,Header, Main} from "./components"
import { Contact, Dashboard } from "./pages"
function App() {
  return (
    <>
    <Header />
    {/* <Contact /> */}
    <main className="p-5">
      {/* <CategoryAccordion categories={['Produts','Plastics','Pipe']}/> */}
        <Main />
    </main>
     <Footer />
     {/* <Dashboard /> */}
    </>
  )
}
export default App
