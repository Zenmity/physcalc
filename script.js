let displacement;
let time;

function arrayify(string, tf) {
  let newArray;
  newArray = string.split(",");
  for (let i = 0; i < newArray.length; i++) {
    newArray[i] = parseFloat(newArray[i].trim());
    if (!tf) {
      newArray[i] *= 0.01;
    }
  }
  return newArray;
}

let displacementsArray;
let trial1arr;
let trial2arr;
let trial3arr;
let avgarr = [];

let firstLine;
let secondLine;
let thirdLine;
let fourthLine;

let html = ""

function promptValues() {
  firstLine = prompt("Displacements (cm) (value1, value2,...)");
  if (firstLine === "test") {
    firstLine = "25,50,75,100";
    secondLine = "0.71,1.33,2.05,N/A";
    thirdLine = "0.87,1.70,N/A,N/A";
    fourthLine = "0.91,1.84,N/A,N/A";
  } else {
    secondLine = prompt("Trial 1 times (s) (time1, time2, time3,...)");

    thirdLine = prompt("Trial 2 times (s) (time1, time2, time3,...)");

    fourthLine = prompt("Trial 3 times (s) (time1, time2, time3,...)");
  }
  displacementsArray = arrayify(firstLine, false);
  trial1arr = arrayify(secondLine, true);
  trial2arr = arrayify(thirdLine, true);
  trial3arr = arrayify(fourthLine, true);

  for (let i = 0; i < displacementsArray.length; i++) {
    let count = 3
    let x = 0
    let y = 0
    let z = 0
    if (!isNaN(trial1arr[i])) {
      x = trial1arr[i]
    } else {
      count--
    }
    if (!isNaN(trial2arr[i])) {
      y = trial2arr[i]
    } else {
      count--
    }
    if (!isNaN(trial3arr[i])) {
      z = trial3arr[i]
    } else {
      count--
    }
    if (count > 0) {
      avgarr.push((x + y + z) / count)
    } else {
      avgarr.push("N/A")
    }
  }
}

function getAcceleration() {
  let veloFirst = [];
  let veloSecond = [];
  let veloThird = [];
  let veloAvg = []

  let finalFirst = [];
  let finalSecond = [];
  let finalThird = [];
  let finalAvg = []

  let accelFirst = [];
  let accelSecond = [];
  let accelThird = [];
  let accelAvg = []

  let trialArrays = [trial1arr, trial2arr, trial3arr, avgarr];
  let veloArrays = [veloFirst, veloSecond, veloThird, veloAvg];
  let finalArrays = [finalFirst, finalSecond, finalThird, finalAvg];
  let accelArrays = [accelFirst, accelSecond, accelThird, accelAvg];

  for (let i = 0; i < displacementsArray.length; i++) {
    for (let j = 0; j < trialArrays.length; j++) {
      let t = trialArrays[j][i];
      let dx = displacementsArray[i];

      if (t === undefined || isNaN(t)) {
        veloArrays[j].push("N/A");
        finalArrays[j].push("N/A");
        accelArrays[j].push("N/A");
        continue;
      }

      let avgVelo = dx / t;
      veloArrays[j].push(avgVelo);

      let finalVelo = avgVelo * 2;
      finalArrays[j].push(finalVelo);

      let acceleration = finalVelo / t;
      accelArrays[j].push(Math.round(acceleration * 100) / 100);

      //   accelArrays[j].push(acceleration);
    }
  }
  for (let i = 0; i < displacementsArray.length; i++) {
    displacementsArray[i] *= 100
  }
  const compiledArray = [displacementsArray];
  for (let i = 0; i < accelArrays.length; i++) {
    compiledArray.push(accelArrays[i]);
  }
  for (let i = 0; i < compiledArray.length; i++) {
    const arr = compiledArray[i];
    if (i === 0) {
      console.log(`Displacements:          ` + arr);
    } else {
      console.log(`Trial ${i}:                ` + arr);
    }
  }

  let tag = `<hr>
  <table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">${compiledArray[0][0]}</th>
        <th scope="col">${compiledArray[0][1]}</th>
        <th scope="col">${compiledArray[0][2]}</th>
        <th scope="col">${compiledArray[0][3]}</th>
        <th scope="col">${compiledArray[0][4]}</th>
    </tr>
    </thead>
    <tbody>
      <tr>
      <th scope="row">Trial 1</th>
        <td scope="col">${compiledArray[1][0]}</td>
        <td scope="col">${compiledArray[1][1]}</td>
        <td scope="col">${compiledArray[1][2]}</td>
        <td scope="col">${compiledArray[1][3]}</td>
      </tr>
      <tr>
      <th scope="row">Trial 2</th>
        <td scope="col">${compiledArray[2][0]}</td>
        <td scope="col">${compiledArray[2][1]}</td>
        <td scope="col">${compiledArray[2][2]}</td>
        <td scope="col">${compiledArray[2][3]}</td>
      </tr>
      <tr>
      <th scope="row">Trial 3</th>
        <td scope="col">${compiledArray[3][0]}</td>
        <td scope="col">${compiledArray[3][1]}</td>
        <td scope="col">${compiledArray[3][2]}</td>
        <td scope="col">${compiledArray[3][3]}</td>
      </tr>
      <tr>
      <th scope="row">Average</th>
        <td scope="col">${compiledArray[4][0]}</td>
        <td scope="col">${compiledArray[4][1]}</td>
        <td scope="col">${compiledArray[4][2]}</td>
        <td scope="col">${compiledArray[4][3]}</td>
      </tr>
    </tbody>
  </table>`

  html += tag
  document.getElementById("table").innerHTML = html
  return compiledArray
}

let firstMessage = true;

document.getElementById("accel").addEventListener("click", () => {
  if (!firstMessage) {
    console.log("=========================================");
    html
  } else {
    firstMessage = false;
  }
  promptValues();
  getAcceleration();
});
