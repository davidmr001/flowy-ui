INSTANCE_TASK_STATES = {
  "NULL": {
    "color": "#434343",
    "backgroundColor": "#ffffff"
  },
  "COMPLETED": {
    "color": "#ffffff",
    "backgroundColor": "#6DA34D"
  },
  "WAITING_FOR_INPUT": {
    "color": "#434343",
    "backgroundColor": "#FFA400"
  },
  "ERROR": {
    "color": "#ffffff",
    "backgroundColor": "#F34213"
  },
  "READY_TO_PROCESS": {
    "color": "#434343",
    "backgroundColor": "#30C5FF"
  },
  "QUEUED": {
    "color": "#ffffff",
    "backgroundColor": "#2F4858"
  },
  "PROCESSING": {
    "color": "#434343",
    "backgroundColor": "#BFF89F"
  },
  "ABORTED": {
    "color": "#434343",
    "backgroundColor": "#F34213"
  }
}

THEME = {
  mainColor: "#00ff00",
  highlightColor: "#dedede",
  panelBackgroundColor: "#ffffff",

  textColor: "#080708",
  textSize: 12,

  strokeColor: "#ababab",
  strokeWidth: 2,
  roundRadius: 5,

  buttonStrokeColor: "#434343",
  buttonSuccessBackground: INSTANCE_TASK_STATES["COMPLETED"]["backgroundColor"],
  buttonErrorBackground: INSTANCE_TASK_STATES["ERROR"]["backgroundColor"],
  buttonWarningBackground: INSTANCE_TASK_STATES["WAITING_FOR_INPUT"]["backgroundColor"],

  shadowSize: 15,
  shadowOffsetY: 5,
  shadowOffsetX: 0,

  taskSelectionBorder: 20,
  taskSelectionLineColor: "#dedede",
  taskSelectionBorderLineWidth: 20,

  linkSelectionLineColor: "#dedede",
  linkSelectionBorderLineWidth: 10,
  linkOverLineColor: "#ababab"
}
