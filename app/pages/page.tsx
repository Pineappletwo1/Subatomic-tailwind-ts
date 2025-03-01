// Import necessary modules
import React from "../../createElement.js";

// Initialize an empty variables object
let variables: {} = {};

// Define a function to handle changes in the input field
function handleChange(event) {
  event.preventDefault();
  console.log("change");
  // Update the input variable with the new value from the input field
  variables.input = event.target.value;
}

// Define the render function
function render(build, data) {
  // If the build argument is true, call the state function to initialize the variables
  if (build) {
    state();
  }

  // Define the UI using JSX-like syntax
  let ui = (
    <div>
      <h1 class="text-4xl bg-red-400">asdf</h1>
      <button
        onclick={() => {
          // Increase the number of cookies and re-render the UI when the button is clicked
          variables.cookies++;
          render(false, variables);
        }}
      >
        press me
      </button>

      <h1>You have {variables.cookies} cookies</h1>
      <input
        type="text"
        value={variables.input}
        oninput={() => {
          // Call the handleChange function when the input field value changes
          handleChange(event);
        }}
      />
      <button
        onclick={() => {
          // Add the current input value to the todos array and re-render the UI when the button is clicked
          variables.todos.push(variables.input);
          render();
        }}
      >
        Add todo
      </button>
      {variables.todos.map((a) => {
        // Map over the todos array and return an h1 element for each todo
        return <h1>{a}</h1>;
      })}
    </div>
  );
  // If the document object is defined (i.e., if this code is running in a browser environment)
  if (typeof document !== "undefined") {
    // Call the useEffect function with a function to log a message to the console and a dependencies array
    useEffect(() => {
      console.log("use effect to run side effects");
    }, ["cookies"]);
    // Set the innerHTML of the body element to the UI string
    document.body.innerHTML = parseArray(ui);
    // Update the effectVariables object with the current values of the variables
    Object.keys(variables).forEach((a) => {
      effectVariables[a] = variables[a];
    });
  }
  // If the build argument is true, return the UI string and the variables object
  if (build) {
    return [ui, variables];
  }
}

// Call the state function to initialize the variables
state();

// Define a Cookies component that returns an h1 element with the number of cookies
function Cookies() {
  return `<h1>${variables.cookies}</h1>`;
}

// Define a state function to initialize the variables
function state() {
  variables.cookies = 0;
  variables.todos = [1, 2, 3, 4, 5];
  variables.input = "";
  variables.tset = "test";
}

// Define an init function
async function init() {
  try {
  } catch (e) {}
}

// Define the page object with the render function, state function, init function, and other properties
const page = {
  render: render,
  state: state,
  init: init,
  components: [Cookies],
  middleware: [],
  functions: [useEffect, handleChange],
  title: "App created with Subatomic.js",
  description:
    "Subatomic.js is a minimalistic JS framework with PSR and SSR for creating dyanmic web apps.",
  css: [],
  js: [],
};

// Define a useEffect function
function useEffect(func, deps) {
  // If the document object is defined (i.e., if this code is running in a browser environment)
  if (typeof document !== "undefined") {
    let run = false;
    // Check if any of the dependencies have changed
    deps.forEach((a) => {
      if (effectVariables[a] !== variables[a]) {
        run = true;
      }
    });
    // If any of the dependencies have changed, call the function
    if (run) {
      func();
    }
  }
}

// Export the page object
export default page;
