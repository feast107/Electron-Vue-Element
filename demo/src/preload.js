const { contextBridge, ipcRenderer } = require("electron");

const BlueTooth = {
    /**
     * 选择id
     * @param {string} id
     * @returns
     */
    select(id) {
        ipcRenderer.send("select-blueTooth", id);
    },
    /**
     * 取消搜索
     * @returns
     */
    cancel() {
        ipcRenderer.send("cancel-blueTooth");
    },
    /**
     * 收到来自ipcMain发送的设备列表
     * @param {function<Array>} handler
     * @returns
     */
    onBlueTooth(handler) {
        ipcRenderer.on("blueTooth-list", handler);
    },
    offBlueTooth() {
        ipcRenderer.off("blueTooth-list");
    }
}

contextBridge.exposeInMainWorld("blueTooth", BlueTooth);
window.onload = function () {};
