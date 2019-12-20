let vectorDone = [];
let vectorStart = [];
let arrRes;
let arrData;

function csvJSON(csvText){
  let lines = [];
  const linesArray = csvText.split('\n');
  
  linesArray.forEach((e) => {
    const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
    lines.push(row);
  });
  lines.splice(lines.length - 1, 1);
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}

let dataset;
let datasetTest;

function loadFile(o){
  var fr = new FileReader();
  fr.onload = function(e) {
    dataset = [...showDataFile(e, o)];
    $('#table-list').slideDown(2500, function(){
      $('#get-vector').css('display','block');
      $('#get-vector-next').css('display','block');
    });
  };
  fr.readAsText(o.files[0]);
}

function loadFileTest(o){
  var fr = new FileReader();
  fr.onload = function(e) {
    datasetTest = [...showDataFileTest(e, o)];
    $('#table-list-test').slideDown(2500, function(){
      $('#get-vector').css('display','block');
      $('#get-vector-next').css('display','block');
    });
  };
  fr.readAsText(o.files[0]);
}



function showDataFile(e, o) {
  let data = csvJSON(e.target.result);
  data = removeGK(data);
  let listMidfielderDefender = ['LB', 'RB', 'LCB', 'CB', 'RCB','CDM', 'LDM', 'RDM']
  let listMidfielderStrikers = ['LM', 'RM', 'CAM', 'LAM', 'RAM']
  let listMidfielder = ['LCM', 'CM', 'RCM'];
    let listStrikers = ['ST', 'CF', 'LF', 'LS', 'LW', 'RF', 'RS', 'RW'];
    let listDefender = ['LWB', 'RWB'];
  for (let [i, value] of data.entries()) {
    let html = 
    `<tr id="choice-vector${i}" onclick="pushVectorStart(${i})">
      <th id="choice-vector-name${i}" class="name"><img class="avatar" src="${value.Photo}"/> ${value.Name}</th>
      <td>${i}</td>
      <td>${value.ID}</td>
      <td class="position${i}">NULL</td>
      <td>${value.Acceleration}</td>
      <td>${value.SprintSpeed}</td>
      <td>${value.Finishing}</td>
      <td>${value.Volleys}</td>
      <td>${value.ShotPower}</td>
      <td>${value.LongShots}</td>
      <td>${value.Positioning}</td>
      <td>${value.Penalties}</td>
      <td>${value.Vision}</td>
      <td>${value.ShortPassing}</td>
      <td>${value.Curve}</td>
      <td>${value.FKAccuracy}</td>
      <td>${value.LongPassing}</td>
      <td>${value.Crossing}</td>
      <td>${value.BallControl}</td>
      <td>${value.Dribbling}</td>
      <td>${value.Agility}</td>
      <td>${value.Reactions}</td>
      <td>${value.Balance}</td>
      <td>${value.Composure}</td>
      <td>${value.HeadingAccuracy}</td>
      <td>${value.Interceptions}</td>
      <td>${value.Marking}</td>
      <td>${value.StandingTackle}</td>
      <td>${value.SlidingTackle}</td>
      <td>${value.Jumping}</td>
      <td>${value.Stamina}</td>
      <td>${value.Strength}</td>
      <td>${value.Aggression}</td>
    </tr>`;
    $('#table-list tbody').append(html);
    if (listMidfielderStrikers.find(element => element == data[i].Position) != undefined) {
      $(`.position${i}`).text('Midfielder/Strikers');
    }
    if (listMidfielderDefender.find(element => element == data[i].Position) != undefined) {
      $(`.position${i}`).text('Midfielder/Defender');
    }
    if (listMidfielder.find(element => element == data[i].Position) != undefined) {
      $(`.position${i}`).text('Midfielder');
    }
    if (listStrikers.find(element => element == data[i].Position) != undefined) {
      $(`.position${i}`).text('Strikers');
    }
    if (listDefender.find(element => element == data[i].Position) != undefined) {
      $(`.position${i}`).text('Defender');
    }
  }
  return data;
}

function showDataFileTest(e, o) {
  let data = csvJSON(e.target.result);
  data = removeGK(data);
  for (let [i, value] of data.entries()) {
    let html = 
    `<tr id="choice-vector${i}" onclick="checkPosition(${i})">
      <th id="choice-vector-name${i}" class="name"><img class="avatar" src="${value.Photo}"/> ${value.Name}</th>
      <td>${i}</td>
      <td>${value.ID}</td>
      <td>${value.Acceleration}</td>
      <td>${value.SprintSpeed}</td>
      <td>${value.Finishing}</td>
      <td>${value.Volleys}</td>
      <td>${value.ShotPower}</td>
      <td>${value.LongShots}</td>
      <td>${value.Positioning}</td>
      <td>${value.Penalties}</td>
      <td>${value.Vision}</td>
      <td>${value.ShortPassing}</td>
      <td>${value.Curve}</td>
      <td>${value.FKAccuracy}</td>
      <td>${value.LongPassing}</td>
      <td>${value.Crossing}</td>
      <td>${value.BallControl}</td>
      <td>${value.Dribbling}</td>
      <td>${value.Agility}</td>
      <td>${value.Reactions}</td>
      <td>${value.Balance}</td>
      <td>${value.Composure}</td>
      <td>${value.HeadingAccuracy}</td>
      <td>${value.Interceptions}</td>
      <td>${value.Marking}</td>
      <td>${value.StandingTackle}</td>
      <td>${value.SlidingTackle}</td>
      <td>${value.Jumping}</td>
      <td>${value.Stamina}</td>
      <td>${value.Strength}</td>
      <td>${value.Aggression}</td>
    </tr>`;
    $('#table-list-test tbody').append(html);
  }
  return data;
}

function removeGK(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].Position == 'GK') {
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}

function phanNhom(data, vector, value_r, value_epochs, value_a) {
  for (let k = 0; k < value_epochs; k++) {
    for (let i = 0; i < data.length; i++) {
      let min = 0;
      let minValue = 10000;
      for (let v = 0; v < vector.length; v++) {
        let value = Math.sqrt(
                    Math.pow(data[i].Acceleration - vector[v].Acceleration, 2)
                  + Math.pow(data[i].SprintSpeed - vector[v].SprintSpeed, 2)
                  + Math.pow(data[i].Finishing - vector[v].Finishing, 2)
                  + Math.pow(data[i].Volleys - vector[v].Volleys, 2)
                  + Math.pow(data[i].ShotPower - vector[v].ShotPower, 2)
                  + Math.pow(data[i].LongShots - vector[v].LongShots, 2)
                  + Math.pow(data[i].Positioning - vector[v].Positioning, 2)
                  + Math.pow(data[i].Penalties - vector[v].Penalties, 2)
                  + Math.pow(data[i].Vision - vector[v].Vision, 2)
                  + Math.pow(data[i].ShortPassing - vector[v].ShortPassing, 2)
                  + Math.pow(data[i].Curve - vector[v].Curve, 2)
                  + Math.pow(data[i].FKAccuracy - vector[v].FKAccuracy, 2)
                  + Math.pow(data[i].LongPassing - vector[v].LongPassing, 2)
                  + Math.pow(data[i].Crossing - vector[v].Crossing, 2)
                  + Math.pow(data[i].BallControl - vector[v].BallControl, 2)
                  + Math.pow(data[i].Dribbling - vector[v].Dribbling, 2)
                  + Math.pow(data[i].Agility - vector[v].Agility, 2)
                  + Math.pow(data[i].Reactions - vector[v].Reactions, 2)
                  + Math.pow(data[i].Balance - vector[v].Balance, 2)
                  + Math.pow(data[i].Composure - vector[v].Composure, 2)
                  + Math.pow(data[i].HeadingAccuracy - vector[v].HeadingAccuracy, 2)
                  + Math.pow(data[i].Interceptions - vector[v].Interceptions, 2)
                  + Math.pow(data[i].Marking - vector[v].Marking, 2)
                  + Math.pow(data[i].StandingTackle - vector[v].StandingTackle, 2)
                  + Math.pow(data[i].SlidingTackle - vector[v].SlidingTackle, 2)
                  + Math.pow(data[i].Jumping - vector[v].Jumping, 2)
                  + Math.pow(data[i].Stamina - vector[v].Stamina, 2)
                  + Math.pow(data[i].Strength - vector[v].Strength, 2)
                  + Math.pow(data[i].Aggression - vector[v].Aggression, 2)
                  );
        if (minValue > value) {
          minValue = value;
          min = v;
        }
      }
      
      vector[min].Acceleration = vector[min].Acceleration + value_a * (data[i].Acceleration - vector[min].Acceleration);
      vector[min].SprintSpeed = vector[min].SprintSpeed + value_a * (data[i].SprintSpeed - vector[min].SprintSpeed);
      vector[min].Finishing = vector[min].Finishing + value_a * (data[i].Finishing - vector[min].Finishing);
      vector[min].Volleys = vector[min].Volleys + value_a * (data[i].Volleys - vector[min].Volleys);
      vector[min].ShotPower = vector[min].ShotPower + value_a * (data[i].ShotPower - vector[min].ShotPower);
      vector[min].LongShots = vector[min].LongShots + value_a * (data[i].LongShots - vector[min].LongShots);
      vector[min].Positioning = vector[min].Positioning + value_a * (data[i].Positioning - vector[min].Positioning);
      vector[min].Penalties = vector[min].Penalties + value_a * (data[i].Penalties - vector[min].Penalties);
      vector[min].Vision = vector[min].Vision + value_a * (data[i].Vision - vector[min].Vision);
      vector[min].ShortPassing = vector[min].ShortPassing + value_a * (data[i].ShortPassing - vector[min].ShortPassing);
      vector[min].Curve = vector[min].Curve + value_a * (data[i].Curve - vector[min].Curve);
      vector[min].FKAccuracy = vector[min].FKAccuracy + value_a * (data[i].FKAccuracy - vector[min].FKAccuracy);
      vector[min].LongPassing = vector[min].LongPassing + value_a * (data[i].LongPassing - vector[min].LongPassing);
      vector[min].Crossing = vector[min].Crossing + value_a * (data[i].Crossing - vector[min].Crossing);
      vector[min].BallControl = vector[min].BallControl + value_a * (data[i].BallControl - vector[min].BallControl);
      vector[min].Dribbling = vector[min].Dribbling + value_a * (data[i].Dribbling - vector[min].Dribbling);
      vector[min].Agility = vector[min].Agility + value_a * (data[i].Agility - vector[min].Agility);
      vector[min].Reactions = vector[min].Reactions + value_a * (data[i].Reactions - vector[min].Reactions);
      vector[min].Balance = vector[min].Balance + value_a * (data[i].Balance - vector[min].Balance);
      vector[min].Composure = vector[min].Composure + value_a * (data[i].Composure - vector[min].Composure);
      vector[min].HeadingAccuracy = vector[min].HeadingAccuracy + value_a * (data[i].HeadingAccuracy - vector[min].HeadingAccuracy);
      vector[min].Interceptions = vector[min].Interceptions + value_a * (data[i].Interceptions - vector[min].Interceptions);
      vector[min].Marking = vector[min].Marking + value_a * (data[i].Marking - vector[min].Marking);
      vector[min].StandingTackle = vector[min].StandingTackle + value_a * (data[i].StandingTackle - vector[min].StandingTackle);
      vector[min].SlidingTackle = vector[min].SlidingTackle + value_a * (data[i].SlidingTackle - vector[min].SlidingTackle);
      vector[min].Jumping = vector[min].Jumping + value_a * (data[i].Jumping - vector[min].Jumping);
      vector[min].Stamina = vector[min].Stamina + value_a * (data[i].Stamina - vector[min].Stamina);
      vector[min].Strength = vector[min].Strength + value_a * (data[i].Strength - vector[min].Strength);
      vector[min].Aggression = vector[min].Aggression + value_a * (data[i].Aggression - vector[min].Aggression);
    }
    let clonedArray = JSON.parse(JSON.stringify(vector))
    let arrValueVector = [];
    for (let objData of clonedArray) {
      let strValueVector = '';
      for (let key in objData) {
        let valueVectorRound = Math.round((objData[key] + 0.00001) * 100) / 100;
        strValueVector = strValueVector + valueVectorRound + ', ';
      }
      arrValueVector.push(strValueVector);
    }
    let html = `<div class="col s1 name-vector">Lần ${k + 1}</div>
      <div class="col s11 list-vector">
        <div class="col s4">
          <div class="input-field input-outlined">
            <input value="${arrValueVector[0]}" id="midfielder" class="fit-input" type="text">
            <label class="active" for="midfielder">Midfielder</label>
          </div>
        </div>
        <div class="col s4">
          <div class="input-field input-outlined">
            <input value="${arrValueVector[1]}" id="strikers" class="fit-input" type="text">
            <label class="active" for="strikers">Strikers</label>
          </div>
        </div>
        <div class="col s4">
          <div class="input-field input-outlined">
            <input value="${arrValueVector[2]}" id="defender" class="fit-input" type="text">
            <label class="active" for="defender">Defender</label>
          </div>
        </div>
      </div>`;
    $('#vector-loop').append(html);
    value_a = value_a / 2;
  }
  $('#create-training').css('display','block');
  return vector;
}

function space(data, vector) {
  let arrResult = [];
  let countMidfielder = 0;
  let countStrikers = 0;
  let countDefender = 0;
  let countMidfielderError = 0;
  let countStrikersError = 0;
  let countDefenderError = 0;
  for (let i = 0; i < data.length; i++) {
    let min = 10000;
    let id = 0;
    for (let v = 0; v < vector.length; v++) {
      let d = Math.round((Math.sqrt(
              Math.pow(data[i].Acceleration - vector[v].Acceleration, 2)
              + Math.pow(data[i].SprintSpeed - vector[v].SprintSpeed, 2)
              + Math.pow(data[i].Finishing - vector[v].Finishing, 2)
              + Math.pow(data[i].Volleys - vector[v].Volleys, 2)
              + Math.pow(data[i].ShotPower - vector[v].ShotPower, 2)
              + Math.pow(data[i].LongShots - vector[v].LongShots, 2)
              + Math.pow(data[i].Positioning - vector[v].Positioning, 2)
              + Math.pow(data[i].Penalties - vector[v].Penalties, 2)
              + Math.pow(data[i].Vision - vector[v].Vision, 2)
              + Math.pow(data[i].ShortPassing - vector[v].ShortPassing, 2)
              + Math.pow(data[i].Curve - vector[v].Curve, 2)
              + Math.pow(data[i].FKAccuracy - vector[v].FKAccuracy, 2)
              + Math.pow(data[i].LongPassing - vector[v].LongPassing, 2)
              + Math.pow(data[i].Crossing - vector[v].Crossing, 2)
              + Math.pow(data[i].BallControl - vector[v].BallControl, 2)
              + Math.pow(data[i].Dribbling - vector[v].Dribbling, 2)
              + Math.pow(data[i].Agility - vector[v].Agility, 2)
              + Math.pow(data[i].Reactions - vector[v].Reactions, 2)
              + Math.pow(data[i].Balance - vector[v].Balance, 2)
              + Math.pow(data[i].Composure - vector[v].Composure, 2)
              + Math.pow(data[i].HeadingAccuracy - vector[v].HeadingAccuracy, 2)
              + Math.pow(data[i].Interceptions - vector[v].Interceptions, 2)
              + Math.pow(data[i].Marking - vector[v].Marking, 2)
              + Math.pow(data[i].StandingTackle - vector[v].StandingTackle, 2)
              + Math.pow(data[i].SlidingTackle - vector[v].SlidingTackle, 2)
              + Math.pow(data[i].Jumping - vector[v].Jumping, 2)
              + Math.pow(data[i].Stamina - vector[v].Stamina, 2)
              + Math.pow(data[i].Strength - vector[v].Strength, 2)
              + Math.pow(data[i].Aggression - vector[v].Aggression, 2)
              ) + 0.00001) * 100) / 100;
      if (d < min) {
        id = v;
        min = d;
      }
    }
    
    let html = `<div id="clustering-p${i}" class="clustering-item">
      <img class="clustering-avatar" src="${data[i].Photo}">
      <span class="clustering-name">${data[i].Name}</span>
      <span style="font-color: red" class="clustering-name">${data[i].Position}</span>
    </div>`;

    let listMidfielder = ['CAM', 'CDM', 'LCM', 'CM', 'LAM', 'LDM', 'LM', 'RAM', 'RCM', 'RDM', 'RM', 'LB', 'RB', 'CB', 'LCB', 'RCB'];
    let listStrikers = ['ST', 'CF', 'LF', 'LS', 'LW', 'RF', 'RS', 'RW', 'LM', 'RM', 'CAM', 'LAM', 'RAM'];
    let listDefender = ['CB', 'LB', 'LCB', 'LWB', 'RB', 'RCB', 'RWB', 'LDM', 'CDM', 'RDM'];

    // let listMidfielder = ['CAM', 'CDM', 'LCM', 'CM', 'LAM', 'LDM', 'LM', 'RAM', 'RCM', 'RDM', 'RM', 'LB', 'RB'];
    // let listStrikers = ['ST', 'CF', 'LF', 'LS', 'LW', 'RF', 'RS', 'RW', 'LM', 'RM', 'CAM', 'LAM', 'RAM'];
    // let listDefender = ['CB', 'LB', 'LCB', 'LWB', 'RB', 'RCB', 'RWB'];
    if (id == 0) {
      countMidfielder++;
      $(`.position${i}`).addClass("midfielder");
      $(`.position${i}`).text('Midfielder');
      $('#clustering-midfielder').append(html);
      if (listMidfielder.find(element => element == data[i].Position) == undefined) {
        countMidfielderError++;
        $(`#clustering-p${i}`).addClass("clustering-error");
      }
      arrResult.push('Midfielder');
    } else if (id == 1) {
      countStrikers++;
      $(`.position${i}`).addClass("strikers");
      $(`.position${i}`).text('Strikers');
      $('#clustering-strikers').append(html);
      if (listStrikers.find(element => element == data[i].Position) == undefined) {
        countStrikersError++
        $(`#clustering-p${i}`).addClass("clustering-error");
      }
      arrResult.push('Strikers');
    } else if (id == 2) {
      countDefender++;
      $(`.position${i}`).addClass("defender");
      $(`.position${i}`).text('Defender');
      $('#clustering-defender').append(html);
      if (listDefender.find(element => element == data[i].Position) == undefined) {
        countDefenderError++;
        $(`#clustering-p${i}`).addClass("clustering-error");
      }
      arrResult.push('Defender');
    }
  }
  $(`#midfielder-ok`).text(`Sai số: ${Math.round(((countMidfielderError / countMidfielder * 100) + 0.00001) * 100) / 100}%`);
  $(`#strikers-ok`).text(`Sai số: ${Math.round(((countStrikersError / countStrikers * 100) + 0.00001) * 100) / 100}%`);
  $(`#defender-ok`).text(`Sai số: ${Math.round(((countDefenderError / countDefender * 100) + 0.00001) * 100) / 100}%`);
  return arrResult;
}

function createDataset(datas) {
  let arrData = [];
  for (let [i, obj] of datas.entries()) {
    let arrTemp = [];
    for (let key in obj) {
      if (key != 'ID' && key != 'Name' && key != 'Position' && key != 'Photo') {
        arrTemp.push(parseInt(obj[key]));
      }
    }
    arrData.push(arrTemp);
  }
  return arrData;
}

function strToObj(str){
  var obj = {};
  if(str&&typeof str ==='string'){
      var objStr = str.match(/\{(.)+\}/g);
      eval("obj ="+objStr);
  }
  return obj
}

let idIsPushVectorStart = [];
let countPushVectorStart = 0;

function pushVectorStart(i) {
  if (countPushVectorStart >= 3) {
    alert(`Không được phép thêm quá 3 vector`);
  } else if (idIsPushVectorStart.find(element => element == i) != undefined) {
    alert(`Vector này đã được thêm trước đó, vui lòng chọn vector khác`);
  } else {
    let data = dataset[i];
    delete data.Name;
    delete data.ID;
    delete data.Position;
    delete data.Photo;
    $(`#choice-vector${i}`).addClass('choice-vector');
    $(`#choice-vector-name${i}`).addClass('choice-vector');
    idIsPushVectorStart.push(i);
    countPushVectorStart++;
    let s = JSON.stringify(data).replace(/\:\"/g, '\: ');
    s = s.replace(/\"\,/g, '\,');
    s = s.replace(/\"\}/g, '\}');
    let a = JSON.parse(s);
    vectorStart.push(a);
    console.log(vectorStart);
  }
}



function getVectorWeights() {
  let value_r = $(`#value_r`).val();
  let value_epochs = $(`#value_epochs`).val();
  let value_a = $(`#value_a`).val();
  vectorDone = phanNhom(dataset, vectorStart, value_r, value_epochs, value_a);
}

function createDataTraining() {
  $(".clustering-item").remove();
  $('.show-clustering').slideDown(2000, function(){
    $('.m-file-upload').css('display','block');
  });
  arrRes = space(dataset, vectorDone);
  arrData = createDataset(dataset);
  
  console.log(arrRes);
  console.log(arrData);
}

function checkPosition(i){
  let knn = new KNN(arrData, arrRes);
  let data = datasetTest[i];
  delete data.Name;
  delete data.ID;
  delete data.Position;
  delete data.Photo;
  let arrDataTest = [];
  for (let key in data) {
    arrDataTest.push(parseInt(data[key]));
  }
  let datasetCheck = [];
  datasetCheck.push(arrDataTest);

  let ans = knn.predict(datasetCheck);
  alert(ans);
}