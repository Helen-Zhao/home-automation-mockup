/*UI Display logic functions*/
function showTemperature(value, id){
        document.getElementById(id + "temp").innerHTML = value + "&deg;C";
}

function showValue(value, sliderId){
  var id = sliderId.substring(0, sliderId.length-6);

  if (document.getElementById(id + "switch").checked){
    document.getElementById(id + "value").innerHTML = value;
  } else {
    document.getElementById(id + "value").innerHTML = "Off";
  }
}

function activateSlider(value, switchId){
  var slider = document.getElementById(switchId.substring(0,switchId.length-6) + "slider");

        if(value == true){
          slider.disabled = false;
          if(switchId.substring(0,2) == "el"){
            showValue(slider.value, slider.id);
          }
        } else if(value == false){
          document.getElementById(switchId.substring(0,switchId.length-6) + "value").innerHTML = "Off";
          slider.disabled = true;
        }
}

function activateTextfield(value, id){
  var textfield = document.getElementById(id.substring(0,2) + "textfield");
  var wbbutton = document.getElementById(id.substring(0,2) + "button");

  if(value == true){
    textfield.disabled = false;
    wbbutton.disabled = false;
  } else {
    textfield.disabled = true;
    wbbutton.disabled = true;
  }
}

/*Toast making*/
function notifyOnOff(messageId, checked){
  var onOrOff = "";
  if(checked == true){
    onOrOff = "on";
  } else {
    onOrOff = "off";
  }
  var message = messageId + " turned " + onOrOff + ".";
      toastr.success(message);
      updateLog(message);
}

function notify(message){
  toastr.success(message);
  updateLog(message);
}

/* Log updating */
function updateLog(message){
    var log = '<div class="panel panel-default">';
    log += '<div class="panel-body">';
    log += '<div class="p">'+ message +'</div>';
    log += '<span class="subscript pull-right">Just now</span>';
    log += '</div>';
    log += '</div>';
    $('#logs').prepend(log);
  /*  $('#logs').remove('');*/
}

function getDateTime() {
  var today = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = today.getDate() + " " + months[today.getMonth()] + ", " + today.getFullYear();
  var ampm = "";
  var hour = today.getHours();
  if (hour > 12){
    ampm = "PM";
    hour = hour - 12;
  } else {
    ampm = "AM";
  }
  if(hour < 10){
    hour = "0" + hour;
  }
  var minutes = today.getMinutes();
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  var seconds = today.getSeconds();
  if(seconds < 10){
    seconds = "0" + seconds;
  }
  var time = hour + ":" + minutes + ":" + seconds + " " + ampm;

  document.getElementById("date").innerHTML = date;
  document.getElementById("time").innerHTML = time;

  setTimeout(getDateTime, 1000);
}

function setWbMessage(){
  document.getElementById("currentMessage").innerHTML = document.getElementById("wbtextfield").value;
  document.getElementById("wbtextfield").value = "Message";
  notify("New message displayed on Whiteboard.");
}

/*Date/Time initialiser*/
getDateTime();

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

/*Masonry intialiser*/
$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
  gutter: '.gutter-sizer'
});
