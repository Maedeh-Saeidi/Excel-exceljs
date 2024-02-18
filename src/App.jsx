import React, { useState, useEffect } from "react";
import Table from "./components/Table";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPresenting, setIsPresenting] = useState(false);
  return (
    <div>
      <Table
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isPresenting={isPresenting}
        setIsPresenting={setIsPresenting}
      ></Table>
    </div>
  );
}

export default App;
