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
      Priority: <input type="number id="p${i}" required>
      <br><br>`
  }
}

function runPS(){
  
}