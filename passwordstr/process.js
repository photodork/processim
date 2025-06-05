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
        Arrival Time: <input type="number" id="at2${i}" required>
        Burst Time: <input type="number" id="bt2${i}" required><br><br>
      `;
    }
}
function runSJF(){
  const n = parseInt(document.querySelector(`#numProcesses2`).value)
  let processes = [];
  for(let i = 0; i<n; i++){
    const at = parseInt(document.querySelector(`#at2${i}`).value)
    const bt = parseInt(document.querySelector(`#bt2${i}`).value)
    processes.push({pid: i+1, arrival_time: at, burst_time: bt})
  }
  let current_time = 0
  let resultHTML = "<table><tr><th>Process</th><th>AT</th><th>BT</th><th>WT</th><th>TAT</th></tr>";
  let ganttHTML = ""
  let timeLine = ""
  let count = 0

  while(count < n){
    let min = Infinity
    let idx = -1
    for(let i = 0; i<n; i++){
      if(!processes[i].completed && processes[i].arrival_time <= current_time){
        if(processes[i].burst_time < min){
          min = processes[i].burst_time
          idx = i
        }
      }
    }
    if(idx == -1){
      current_time++
      continue
    }
    processes[idx].start_time = current_time;
    processes[idx].completion_time = current_time + processes[idx].burst_time;
    processes[idx].turnaround_time = processes[idx].completion_time - processes[idx].arrival_time;
    processes[idx].waiting_time = processes[idx].turnaround_time - processes[idx].burst_time;
    resultHTML += `<tr>
      <td>P${processes[idx].pid}</td>
      <td>${processes[idx].arrival_time}</td>
      <td>${processes[idx].burst_time}</td>
      <td>${processes[idx].waiting_time}</td>
      <td>${processes[idx].turnaround_time}</td>
    </tr>`;
    ganttHTML += `<div class="gantt-bar">P${processes[idx].pid}</div>`;
    timeLine += `${processes[idx].start_time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`

    current_time += processes[idx].burst_time
    processes[idx].completed = true;
    count++
  }
  resultHTML += "</table>";
  document.querySelector(`#resultTable2`).innerHTML = resultHTML
  document.querySelector(`#ganttChart2`).innerHTML = `<h4>Gantt Chart:</h4>${ganttHTML}<br>${timeLine}${current_time}`
}

//priority scheduling(non-preemptive)
function createInputs3(){
  const n = parseInt(document.querySelector(`#numProcesses3`).value)
  let container = document.querySelector(`#inputFields3`) 
  container.innerHTML = ""
  for(let i = 0; i<n; i++){
    container.innerHTML += `
      <h4>Process ${i+1}</h4>
      Arrival Time: <input type="number" id="at3${i}" required>
      Burst Time: <input type="number" id="bt3${i}" required>
      Priority: <input type="number" id="p${i}" required>
      <br><br>`
  }
}

function runPS() {
  let n = parseInt(document.querySelector(`#numProcesses3`).value);
  let processes = [];

  for (let i = 0; i < n; i++) {
    const at = parseInt(document.querySelector(`#at3${i}`).value);
    const bt = parseInt(document.querySelector(`#bt3${i}`).value);
    const p = parseInt(document.querySelector(`#p${i}`).value);
    processes.push({ pid: i + 1, arrival_time: at, burst_time: bt, priority: p });
  }

  let current_time = 0;
  let completed = 0;
  let resultHTML = "<table><tr><th>Process</th><th>AT</th><th>BT</th><th>Priority</th><th>WT</th><th>TAT</th></tr>";
  let ganttHTML = "";
  let timeLine = "";

  while (completed < n) {

    let ready = processes.filter(p => p.arrival_time <= current_time && !p.completed);

    if (ready.length === 0) {
      ganttHTML += `<div class="gantt-bar" style="padding-left:3px; padding-right:3px;">Idle</div>`;
      timeLine += `${current_time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
      current_time++;
      continue;
    }

    ready.sort((a, b) => a.priority - b.priority);
    let current = ready[0];

    current.start_time = current_time;

    current.completed = true;
    completed++;

    let completion_time = current_time + current.burst_time;
    let tat = completion_time - current.arrival_time;
    let wt = tat - current.burst_time;

    resultHTML += `<tr>
      <td>${current.pid}</td>
      <td>${current.arrival_time}</td>
      <td>${current.burst_time}</td>
      <td>${current.priority}</td>
      <td>${wt}</td>
      <td>${tat}</td>
    </tr>`;

    ganttHTML += `<div class="gantt-bar">P${current.pid}</div>`;
    timeLine += `${current.start_time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;

    current_time = completion_time;
  }

  timeLine += `${current_time}`; 

  resultHTML += "</table>";

  document.querySelector("#resultTable3").innerHTML = resultHTML;
  document.querySelector("#ganttChart3").innerHTML = ganttHTML + `<br>${timeLine}`;
}


//round robin
function createInputs4(){
  const n = parseInt(document.querySelector(`#numProcesses4`).value)
  let container = document.querySelector(`#inputFieldsRR`) 
  container.innerHTML = ""
  for(let i = 0; i<n; i++){
    container.innerHTML += `
      <h4>Process ${i+1}</h4>
      Arrival Time: <input type="number" id="at4${i}" required>
      Burst Time: <input type="number" id="bt4${i}" required>
      <br><br>`
  }
}
function runRR() {
  const n = parseInt(document.querySelector("#numProcesses4").value);
  const tq = parseInt(document.querySelector("#timeQuantum").value);
  const processes = [];

  if (!tq || tq <= 0 || !n || n <= 0) return;

  // Collect process data
  for (let i = 0; i < n; i++) {
    const at = parseInt(document.querySelector(`#at4${i}`).value);
    const bt = parseInt(document.querySelector(`#bt4${i}`).value);
    processes.push({
      pid: i + 1,
      arrival: at,
      burst: bt,
      remaining: bt,
      completion: 0
    });
  }

  let time = 0;
  const queue = [];
  const gantt = [];
  const visited = new Array(n).fill(false);
  let completed = 0;

  // Sort processes by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  // Start from the first arrived process
  queue.push(0);
  visited[0] = true;

  while (queue.length > 0) {
    const idx = queue.shift();
    const process = processes[idx];

    // If process is starting first time
    const startTime = time;
    const runTime = Math.min(tq, process.remaining);
    time += runTime;
    process.remaining -= runTime;

    gantt.push({
      pid: process.pid,
      start: startTime,
      end: time
    });

    // Add newly arrived processes to queue
    for (let i = 0; i < n; i++) {
      if (!visited[i] && processes[i].arrival <= time) {
        queue.push(i);
        visited[i] = true;
      }
    }

    // Re-queue current process if not finished
    if (process.remaining > 0) {
      queue.push(idx);
    } else {
      process.completion = time;
      completed++;
    }

    // If queue is empty, jump to next arriving process
    if (queue.length === 0 && completed < n) {
      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          queue.push(i);
          visited[i] = true;
          time = Math.max(time, processes[i].arrival);
          break;
        }
      }
    }
  }

  // Calculate TAT and WT
  let result = `
    <table border="1" cellpadding="5">
      <tr><th>Process</th><th>AT</th><th>BT</th><th>CT</th><th>TAT</th><th>WT</th></tr>
  `;
  for (let p of processes) {
    const tat = p.completion - p.arrival;
    const wt = tat - p.burst;
    result += `<tr>
      <td>P${p.pid}</td>
      <td>${p.arrival}</td>
      <td>${p.burst}</td>
      <td>${p.completion}</td>
      <td>${tat}</td>
      <td>${wt}</td>
    </tr>`;
  }
  result += `</table>`;
  document.querySelector("#resultTableRR").innerHTML = result;

  // Gantt Chart with timeline
  let ganttHTML = `<div style="display:flex;flex-wrap:wrap;margin-top:10px;">`;
  let timeLine = "";

  for (let g of gantt) {
    ganttHTML += `<div class="gantt-bar">P${g.pid}</div>`;
    timeLine += `${g.start}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
  }
  timeLine += `${gantt[gantt.length - 1].end}`;

  ganttHTML += `</div><div style="margin-top:5px;">${timeLine}</div>`;
  document.querySelector("#ganttChartRR").innerHTML = ganttHTML;
}