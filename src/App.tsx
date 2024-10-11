import { useState } from "react";
import Monaco from "./Monaco";
import { Visualizer } from "./Visualizer";
import { defaultCode, defaultExample, fetchExample } from "./examples";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [example, setExample] = useState<string>(defaultExample);
  const exampleQuery = useQuery({
    queryKey: ["example", example],
    queryFn: () => fetchExample(example),
    staleTime: Infinity,
    retry: false,
    retryOnMount: false,
  });
  const [modifiedCode, setModifiedCode] = useState<string | null>(null);
  const currentCode = modifiedCode ?? exampleQuery.data;
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-1/3 resize-x overflow-auto">
          <Monaco setModifiedCode={setModifiedCode} exampleQuery={exampleQuery} example={example} setExample={setExample} />
        </div>

        <div className="flex w-2/3">
          <Visualizer egraph={currentCode || defaultCode} />
        </div>
      </div>
      <footer className="p-2 fixed bottom-0 min-w-full text-xs text-gray-500 text-right dark:text-gray-400">
        <a href="https://github.com/saulshanabrook/egraph-visualizer" target="_blank" className="hover:underline">
          github.com/saulshanabrook/egraph-visualizer
        </a>
      </footer>
    </>
  );
}

export default App;
