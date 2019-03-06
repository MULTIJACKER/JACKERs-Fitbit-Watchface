import { BodyPresenceSensor } from "body-presence";
import clock from "clock";
import date from "date";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { preferences } from "user-settings";
import * as util from "../common/utils";
//import * as hrm from "hrm.js";


// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const bps = new BodyPresenceSensor();
const hrm = new HeartRateSensor();

// Starts the sensors
bps.start();
hrm.start();
//hrm.initialize();

const bpsData = document.getElementById("bps-data");
let dat = document.getElementById("dat");
let hrmData = document.getElementById("hrm-data");
const Time = document.getElementById("Time");
const TimeSec = document.getElementById("TimeSec");


// Update the <text> element every tick with the current time
clock.ontick = (evt) =>
{
  
  let today = evt.date;
  let hours = util.zeroPad(today.getHours());
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  var finalDate = new Date(Date.now());
  
  function refreshData()
  {
    const data =
    {
      bps:
      {
        presence: bps.present
      },
      hrm:
      {
        heartRate: hrm.heartRate ? hrm.heartRate : 0
      }
    }
  }

  refreshData();
  setInterval(refreshData, 1000);
  
  Time.text = `${hours}:${mins}`;
  TimeSec.text = `${secs}`;

  if (hrm.heartRate != null && bps.present == 1)
  {
    switch (util.fancyHR(hrm.heartRate))
    {
        case 0:
            hrmData.text = hrm.heartRate;
            hrmData.style.fill = "green";
            break;
        case 1:
            hrmData.text = hrm.heartRate;
            hrmData.style.fill = "yellow";
            break;
        case 2:
            hrmData.text = hrm.heartRate;
            hrmData.style.fill = "orange";
            break;
        case 3:
            hrmData.text = hrm.heartRate;
            hrmData.style.fill = "red";
            break;
        case 4:
            hrmData.text = "--";
            hrmData.style.fill = "gray";
            break;
        default:
            hrmData.text = "--";
            hrmData.style.fill = "gray";
    }
  }
  else
  {
    hrmData.text = "--";
    hrmData.style.fill = "gray";
  }
  
  dat.text = util.fancyDate(finalDate);
}
