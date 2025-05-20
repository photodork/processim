//fcfs
function createInputs() {
    const n = parseInt(document.getElementById('numProcesses').value);
    const container = document.getElementById('inputFields');
    container.innerHTML = "";

    for (let i = 0; i < n; i++) {
      container.innerHTML += `
        <h4>Process ${i+1}</h4>
        Arrival Time: <input type="number" id="at${i}" required>
        Burst Time: <input type="number" id="bt${i}" required><br><br>
      `;
    }
}

function runFCFS() {
  const n = parseInt(document.getElementById('numProcesses').value);
  let processes = [];

  for (let i = 0; i < n; i++) {
    const at = parseInt(document.getElementById(`at${i}`).value);
    const bt = parseInt(document.getElementById(`bt${i}`).value);
    processes.push({ pid: i+1, arrival_time: at, burst_time: bt });
  }

  for(let i = 0; i<processes.length-1; i++){
      for(let j = 0; j<processes.length-i-1; j++){
          if(processes[j].arrival_time > processes[j+1].arrival_time){
              let temp = processes[j];
              processes[j] = processes[j+1];
              processes[j+1] = temp;
          }
      }
  }    

  let current_time = 0;
  let resultHTML = "<table><tr><th>Process</th><th>AT</th><th>BT</th><th>WT</th><th>TAT</th></tr>";
  let ganttHTML = "";
  let timeLine = "";

  processes.forEach(p => {
    if (current_time < p.arrival_time) {
      current_time = p.arrival_time;
    }
    p.start_time = current_time;
    p.completion_time = current_time + p.burst_time;
    p.turnaround_time = p.completion_time - p.arrival_time;
    p.waiting_time = p.turnaround_time - p.burst_time;
    current_time += p.burst_time;

    resultHTML += `<tr>
      <td>P${p.pid}</td>
      <td>${p.arrival_time}</td>
      <td>${p.burst_time}</td>
      <td>${p.waiting_time}</td>
      <td>${p.turnaround_time}</td>
    </tr>`;

    ganttHTML += `<div class="gantt-bar">P${p.pid}</div>`;
    timeLine += `${p.start_time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
  });

  resultHTML += "</table>";
  document.getElementById("resultTable").innerHTML = resultHTML;
  document.getElementById("ganttChart").innerHTML = `<h4>Gantt Chart:</h4>${ganttHTML}<br>${timeLine}${current_time}`;
}

//sjf
function createInputs2() {
    const n = parseInt(document.getElementById('numProcesses2').value);
    const container = document.getElementById('inputFields2');
    container.innerHTML = "";

    for (let i = 0; i < n; i++) {
      container.innerHTML += `
        <h4>Process ${i+1}</h4>
        Arrival Time: <input type="number" id="at${i}" required>
        Burst Time: <input type="number" id="bt${i}" required><br><br>
      `;
    }
}
function runSJF(){
  // const n = parseInt(document.getElementById('numProcesses2').value);
  // let processes = [];

  // for (let i = 0; i < n; i++) {
  //   const at = parseInt(document.getElementById(`at${i}`).value);
  //   const bt = parseInt(document.getElementById(`bt${i}`).value);
  //   processes.push({ pid: i+1, arrival_time: at, burst_time: bt });
  // }

  // processes.sort((a, b) => a.arrival_time - b.arrival_time);

  // let current_time = 0;
  // let resultHTML = "<table><tr><th>Process</th><th>AT</th><th>BT</th><th>WT</th><th>TAT</th></tr>";
  // let ganttHTML = "";
  // let timeLine = "";

  // while (processes.length > 0) {
  //   let availableProcesses = processes.filter(p => p.arrival_time <= current_time);
  //   if (availableProcesses.length === 0) {
  //     current_time++;
  //     continue;
  //   }

  //   availableProcesses.sort((a, b) => a.burst_time - b.burst_time);
  //   let p = availableProcesses[0];

  //   p.start_time = current_time;
  //   p.completion_time = current_time + p.burst_time;
  //   p.turnaround_time = p.completion_time - p.arrival_time;
  //   p.waiting_time = p.turnaround_time - p.burst_time;

  //   current_time += p.burst_time;

  //   resultHTML += `<tr>
  //     <td>P${p.pid}</td>
  //     <td>${p.arrival_time}</td>
  //     <td>${p.burst_time}</td>
  //     <td>${p.waiting_time}</td>
  //     <td>${p.turnaround_time}</td>
  //   </tr>`;

  //   ganttHTML += `<div class="gantt-bar">P${p.pid}</div>`;
  //   timeLine += `${p.start_time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;

  //   processes = processes.filter(proc => proc.pid !== p.pid);
  // }

  // resultHTML += "</table>";
  // document.getElementById("resultTable2").innerHTML = resultHTML;
  // document.getElementById("ganttChart2").innerHTML = `<h4>Gantt Chart:</h4>${ganttHTML}<br>${timeLine}${current_time}`;
}