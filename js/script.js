let select_tip_selected = 10;
let percent = [5, 10, 15, 25, 50, 0];
let tip_ammount_val = 0.0;
let tip_person_val = 0.0;
let summary = 0.0;

let tip_item = document.getElementsByClassName("tip_item");
let bill_input = document.getElementById("total_bill_input");
let input_custom = document.getElementById("input_custom");

let total_people_input = document.getElementById("total_people_input");
let total_bill_input_warning = document.getElementById("zero");

let tip_ammount = document.getElementsByClassName("summary_price")[0];
let tip_person = document.getElementsByClassName("summary_price")[1];

let reset_button = document.getElementById("reset");
//console.log(total_people_input.value);
function falseCheck(element) {
  if (element.value == "" || element.value == 0) {
    return true;
  }
  return false;
}

function emptyCheck() {
  if (
    select_tip_selected == 10 &&
    tip_ammount_val == 0 &&
    tip_person_val == 0
  ) {
    reset_button.disabled = true;
  } else {
    reset_button.disabled = false;
  }
}
function calculate() {
  summary = (percent[select_tip_selected] * bill_input.value) / 100;
  tip_ammount_val = summary / total_people_input.value;
  tip_person_val = (bill_input.value * 1 + summary) / total_people_input.value;
}
function softReset() {
  tip_ammount_val = 0.0;
  tip_person_val = 0.0;
}
function hardReset() {
  softReset();
  tip_item[select_tip_selected].classList.remove("active");
  select_tip_selected = 10;
  total_people_input.value = 0;
  bill_input.value = 0;
  input_custom.value = "";
  refresh();
}
function refresh() {
  emptyCheck();
  tip_ammount.innerHTML = "$" + tip_ammount_val.toFixed(2);
  tip_person.innerHTML = "$" + tip_person_val.toFixed(2);
}

emptyCheck();

input_custom.oninput = function () {
  while (input_custom.value.match(/[^\d]/)) {
    input_custom.value = input_custom.value.replace(/[^\d]/, "");
  }

  if (falseCheck(input_custom)) {
    percent[5] = 0;
    softReset();
    refresh();
  } else {
    if (input_custom.value > 100) {
      percent[5] = 100;
      input_custom.value = 100;
    } else {
      percent[5] = input_custom.value * 1;
    }

    if (!falseCheck(bill_input) || !falseCheck(total_people_input)) {
      calculate();
    }
    refresh();
  }
};

for (let i = 0; i < tip_item.length; i++) {
  tip_item[i].onclick = function () {
    if (select_tip_selected < tip_item.length) {
      tip_item[select_tip_selected].classList.remove("active");
    }
    select_tip_selected = i;
    tip_item[select_tip_selected].classList.add("active");
    console.log(select_tip_selected);

    if (total_people_input.value == "" || total_people_input.value == 0) {
      softReset();
    } else {
      calculate();
    }
    refresh();
  };
}

total_people_input.oninput = function () {
  while (total_people_input.value.match(/[^\d]/)) {
    total_people_input.value = total_people_input.value.replace(/[^\d]/, "");
  }

  if (select_tip_selected < tip_item.length) {
    if (total_people_input.value == "" || total_people_input.value == 0) {
      softReset();
    } else {
      calculate();
    }
    refresh();
  }
  if (total_people_input.value == "" || total_people_input.value == 0) {
    total_bill_input_warning.classList.remove("hide");
    total_people_input.classList.add("warning");
  } else {
    total_bill_input_warning.classList.add("hide");
    total_people_input.classList.remove("warning");
  }
};

bill_input.oninput = function () {
  bill_value = bill_input.value;
  while (bill_input.value.match(/[^0-9.]/g)) {
    bill_input.value = bill_input.value.replace(/[^0-9.]/g, "");
  }
  const decimal_count = bill_value.match(/\./g || []).length;
  if (decimal_count > 1) {
    bill_input.value = bill_value.slice(0, -1);
  }
  if (bill_input.value == "" || total_people_input.value == 0) {
    softReset();
  } else {
    if (select_tip_selected < tip_item.length) {
      calculate();
    }
  }
  refresh();
};

reset_button.onclick = function () {
  hardReset();
};
