const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("variableName", {});
window.onload = function () {};
