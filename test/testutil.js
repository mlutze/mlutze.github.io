function reportTest(name, result, details) {
    let nameTd = document.createElement("td");
    let resultTd = document.createElement("td");
    let detailsTd = document.createElement("td");

    nameTd.innerText = name;
    resultTd.innerText = result;
    detailsTd.innerText = details;

    if (result === "Failure") {
        resultTd.style.color = "red";
    } else if (result === "Success") {
        resultTd.style.color = "darkgreen";
    }

    let tr = document.createElement("tr");
    tr.appendChild(nameTd);
    tr.appendChild(resultTd);
    tr.appendChild(detailsTd);


    let table = document.getElementById("results");
    table.appendChild(tr)
}

function assert(bool) {
    if (!bool) {
        throw new Error(" Assertion Failed")
    }
}

function test(name, pred) {
    try {
        pred()
        reportTest(name, "Success", "")
    } catch (error) {
        reportTest(name, "Failure", error.message)
    }
}