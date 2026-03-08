import Router from "./routes/Router";
import {AuthProvider} from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
   
  );
}

export default App;