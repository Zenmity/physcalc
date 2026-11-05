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

let firstLine;
let secondLine;
let thirdLine;
let fourthLine;

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
}

function getAcceleration() {
  let veloFirst = [];
  let veloSecond = [];
  let veloThird = [];

  let finalFirst = [];
  let finalSecond = [];
  let finalThird = [];

  let accelFirst = [];
  let accelSecond = [];
  let accelThird = [];

  let trialArrays = [trial1arr, trial2arr, trial3arr];
  let veloArrays = [veloFirst, veloSecond, veloThird];
  let finalArrays = [finalFirst, finalSecond, finalThird];
  let accelArrays = [accelFirst, accelSecond, accelThird];

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
  displacementsArray[i] *= 100 }
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
}

let firstMessage = true;

document.getElementById("accel").addEventListener("click", () => {
  if (!firstMessage) {
    console.log("=========================================");
  } else {
    firstMessage = false;
  }
  promptValues();
  getAcceleration();
});
