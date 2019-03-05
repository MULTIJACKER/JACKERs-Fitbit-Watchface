import { BodyPresenceSensor } from "body-presence";
import clock from "clock";
import date from "date";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { preferences } from "user-settings";
import * as util from "../common/utils";


// Update the clock every second
//clock.granularity = "seconds";

// Get a handle on the <text> element
const bps = new BodyPresenceSensor();
const hrm = new HeartRateSensor();

// Starts the sensors
bps.start();
hrm.start();

const bpsData = document.getElementById("bps-data");
let dat = document.getElementById("dat");
let hrmDataGreen = document.getElementById("hrm-data-green");
let hrmDataYellow = document.getElementById("hrm-data-yellow");
let hrmDataOrange = document.getElementById("hrm-data-orange");
let hrmDataRed = document.getElementById("hrm-data-red");
let hrmDataGray = document.getElementById("hrm-data-gray");
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
  setInterval(refreshData, 500);  
  
  Time.text = `${hours}:${mins}`;
  TimeSec.text = `${secs}`;

  if (hrm.heartRate != null && bps.present == 1)
  {
    //hrmData.text = hrm.heartRate;
    switch (util.fancyHR(hrm.heartRate))
    {
        case 0:
            hrmDataGreen.text = hrm.heartRate;
            hrmDataYellow.text = "";
            hrmDataOrange.text = "";
            hrmDataRed.text = "";
            hrmDataGray.text = "";
            break;
        case 1:
            hrmDataYellow.text = hrm.heartRate;
            hrmDataGreen.text = "";
            hrmDataOrange.text = "";
            hrmDataRed.text = "";
            hrmDataGray.text = "";
            break;
        case 2:
            hrmDataOrange.text = hrm.heartRate;
            hrmDataGreen.text = "";
            hrmDataYellow.text = "";
            hrmDataRed.text = "";
            hrmDataGray.text = "";
            break;
        case 3:
            hrmDataRed.text = hrm.heartRate;
            hrmDataGreen.text = "";
            hrmDataYellow.text = "";
            hrmDataOrange.text = "";
            hrmDataGray.text = "";
            break;
        case 4:
            hrmDataGray.text = hrm.heartRate;
            hrmDataGreen.text = "";
            hrmDataYellow.text = "";
            hrmDataOrange.text = "";
            hrmDataRed.text = "";
            break;
        default:
            hrmDataGray.text = "--";
            hrmDataGreen.text = "";
            hrmDataYellow.text = "";
            hrmDataOrange.text = "";
            hrmDataRed.text = "";
    }
  }
  else
  {
    //Gray
    hrmDataGray.text = "--";
    hrmDataGreen.text = "";
    hrmDataYellow.text = "";
    hrmDataOrange.text = "";
    hrmDataRed.text = "";
  }

  dat.text = util.fancyDate(finalDate);
}