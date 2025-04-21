import { useState } from "react";
import Globe from "../components/Globe";
import Layout from "../components/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Globe />
      <Layout />
    </>
  );
}

export default App;
