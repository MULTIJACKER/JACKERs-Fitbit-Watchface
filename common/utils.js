// Add zero in front of numbers < 10
export function zeroPad(i)
{
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function fancyDate(finalDate)
{
  var day = finalDate.getDate();
  var weekDay;
  var month;
 
  switch(finalDate.getDay())
  {
    case 1:
        weekDay = "MON, ";
        break;
    case 2:
        weekDay = "DIE, ";
        break;
    case 3:
        weekDay = "MIT, ";
        break;
    case 4:
        weekDay = "DON, ";
        break;
    case 5:
        weekDay = "FRE, ";
        break;
    case 6:
        weekDay = "SAM, ";
        break;
    default:
        weekDay = "SON, ";
  }
  

  switch(finalDate.getMonth())
  {
    case 0:
        month = "JANUAR";
        break;
    case 1:
        month = "FEBRUAR";
        break;
    case 2:
        month = "MÄRZ";
        break;
    case 3:
        month = "APRIL";
        break;
    case 4:
        month = "MAI";
        break;
    case 5:
        month = "JUNI";
        break;
    case 6:
        month = "JULI";
        break;
    case 7:
        month = "AUGUST";
        break;
    case 8:
        month = "SEPTEMBER";
        break;
    case 9:
        month = "OKTOBER";
        break;
    case 10:
        month = "NOVEMBER";
        break;      
    default:
        month = "DEZEMBER";     
  }
  finalDate = weekDay + day + ". " + month;
  
  return finalDate;
}

export function fancyHR(hr)
{
  if (hr < 80)
  {
    //green
    return 0;
  }
  else if (hr < 100)
  {
    //yellow
    return 1;
  }
  else if (hr < 120)
  {
    //orange
    return 2;
  }
  else if (hr > 119)
  {
    //red
    return 3;
  }
  else
  {
    //gray
    return 4;
  }
}