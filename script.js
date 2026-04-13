// START APP
function startApp() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
}


// MAIN FUNCTION
function explainCode() {

    let code = document.getElementById("codeInput").value;
    let output = document.getElementById("output");
    let loader = document.getElementById("loader");
    let language = document.getElementById("language").value;

    if (loader) loader.style.display = "block";

    let explanation = "";
    let lines = code.split("\n");

    lines.forEach((line, index) => {

        line = line.trim();
        if (line === "") return;

        // ---------- VARIABLE ----------
        if (line.match(/(int|float|double|let|var)?\s*\w+\s*=\s*/)) {

            let parts = line.split("=");

            let variable = parts[0]
                .replace(/int|float|double|let|var/g, "")
                .trim();

            let value = parts[1]
                .replace(";", "")
                .trim();

            explanation += `
            <div class="line">
                <strong>Line ${index+1}:</strong> Assigns the value <b>${value}</b> to the variable <b>${variable}</b>
            </div>`;
        }

        // ---------- FOR LOOP ----------
        else if (line.includes("for")) {

            let match = line.match(/(\w+)\s*=\s*(\d+).*<\s*(\d+)/);

            if (match) {
                let variable = match[1];
                let start = parseInt(match[2]);
                let end = parseInt(match[3]);

                explanation += `
                <div class="line">
                    <strong>Line ${index+1}:</strong> Starts a loop where <b>${variable}</b> begins at ${start} and runs until ${end}, increasing by 1 each time
                </div>`;
            } else {
                explanation += `
                <div class="line">
                    <strong>Line ${index+1}:</strong> Begins a loop that repeatedly executes the enclosed block of code
                </div>`;
            }
        }

        // ---------- IF ----------
        else if (line.includes("if")) {

            let condition = line.match(/\((.*)\)/);

            explanation += `
            <div class="line">
                <strong>Line ${index+1}:</strong> Checks whether <b>${condition ? condition[1] : "a condition"}</b> is true before executing the block
            </div>`;
        }

        // ---------- ELSE ----------
        else if (line.includes("else")) {
            explanation += `
            <div class="line">
                <strong>Line ${index+1}:</strong> Executes this block when the previous condition evaluates to false
            </div>`;
        }

        // ---------- PRINT ----------
        else if (line.includes("System.out.println") || line.includes("print") || line.includes("console.log")) {

            let value = line.match(/\((.*)\)/);

            explanation += `
            <div class="line">
                <strong>Line ${index+1}:</strong> Prints <b>${value ? value[1] : "a value"}</b> to the console
            </div>`;
        }

        // ---------- RETURN ----------
        else if (line.includes("return")) {

            let value = line.replace("return", "").replace(";", "").trim();

            explanation += `
            <div class="line">
                <strong>Line ${index+1}:</strong> Returns <b>${value}</b> from the function
            </div>`;
        }

        // ---------- FUNCTION ----------
        else if (line.includes("def") || line.includes("function") || line.includes("void")) {
            explanation += `
            <div class="line">
                <strong>Line ${index+1}:</strong> Defines a function, which is a reusable block of code
            </div>`;
        }

        // ---------- GENERAL ----------
        else {
            explanation += `
            <div class="line">
                <strong>Line ${index+1}:</strong> Executes this statement as part of the program flow
            </div>`;
        }

    });

    setTimeout(() => {
        if (loader) loader.style.display = "none";
        output.innerHTML = explanation;
    }, 500);
}


// CLEAR BUTTON
function clearText() {
    document.getElementById("codeInput").value = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("lineNumbers").innerHTML = "";
}


// COPY BUTTON
function copyOutput() {
    let text = document.getElementById("output").innerText;

    if (text.trim() === "") {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(text);
    alert("Copied successfully!");
}


// LINE NUMBERS
function updateLines() {
    let code = document.getElementById("codeInput").value;
    let count = code.split("\n").length;

    let numbers = "";
    for (let i = 1; i <= count; i++) {
        numbers += i + "<br>";
    }

    document.getElementById("lineNumbers").innerHTML = numbers;
}