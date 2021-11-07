// DOM Elements Required
const runEditor = document.querySelector(".run-editor-btn");
const consoleWindow = document.querySelector(".console__output");
// Ace Editor Config
let editor = ace.edit("jsEditor");

let consoleMessages = [];

let editorConfig = {
    clearConsole() {
        consoleMessages.length = 0;

        while (consoleWindow.firstChild) {
            consoleWindow.removeChild(consoleWindow.firstChild);
        }
    },
    printToConsole() {
        consoleMessages.forEach((message) => {
            const consoleLogMessage = document.createElement("p");
            consoleLogMessage.classList = message.class;
            consoleLogMessage.innerText = `> ${message.message}`;

            consoleWindow.appendChild(consoleLogMessage);
        });
    },
    initialise() {
        let initialCode = "// Let's write your first Javascript";
        // Editor Theme
        editor.setTheme("ace/theme/dracula");
        // Editor Language
        editor.session.setMode("ace/mode/javascript");
        // Remove Print Margin
        editor.setShowPrintMargin(false);
        // Editor Config Options
        editor.setOptions({
            selectionStyle: "text",
            highlightActiveLine: false,
            highlightSelectedWord: false,
            cursorStyle: "ace",
            highlightGutterLine: false,
            showGutter: true,
            enableSnippets: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableEmmet: true,
        });
        // Display Initial Code
        editor.setValue(initialCode);
    },
};

runEditor.addEventListener("click", () => {
    // Reset Console
    editorConfig.clearConsole();
    let jsCode = editor.getValue();

    try {
        new Function(jsCode)();
    } catch (err) {
        console.error(err);
    }

    editorConfig.printToConsole();
});

editorConfig.initialise();
