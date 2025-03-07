import { useState, useEffect } from "react";
import "./App.css";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  const [code, setCode] = useState("");
  const [review, setReview] = useState(``);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  async function codereview(code) {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/get-review`, { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error in code review:", error);
    }
  }

  return (
    <>
      <div className="header">
        <img src="./icon.webp" alt="" />
        <h2 className="heading">AI CodeMate</h2>
      </div>
      <main>
        <div className="left">
          <div className="code">
            {!code && <div className="placeholder">Write your code here...</div>}
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                border:"none",
                outline:"none",
                borderRadius: "4px",
                fontSize: 16,
                height: "100%",
                width: "100%",
                overflow: "auto",
              }}
            />
          </div>
        </div>

        
        <div onClick={() => codereview(code)} className="review">
          Review
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
