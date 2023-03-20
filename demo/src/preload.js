const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("name", {});
window.onload = function () {};
