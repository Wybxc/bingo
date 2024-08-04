/* @refresh reload */
import { ErrorBoundary, render } from "solid-js/web";

import "theme-toggles/css/inner-moon.min.css";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <ErrorBoundary
      fallback={(err, reset) => (
        <div>
          <p>Error: {err.toString()}</p>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  ),
  // biome-ignore lint/style/noNonNullAssertion: <root> is not null
  root!,
);
