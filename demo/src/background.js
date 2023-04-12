"use strict";

import { app, protocol, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import path from "path";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        title: "Your window title",
        icon: null, //path.join(__static,"./icon.ico"),
        width: 800,
        height: 600,
        fullscreenable: true,
        autoHideMenuBar: true,
        frame: true,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "/preload.js"),
        },
        closable: true,
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }

    let isConnecting = false;
    /**
     * 当触发 @type {navigator.blueTooth.requestDevice(...)}
     */
    win.webContents.on(
        "select-bluetooth-device",
        (event, deviceList, callback) => {
            event.preventDefault();
            if (!isConnecting) {
                isConnecting = true;
                let selected = () => {};
                let cancelled = () => {};
                let off = () => {
                    ipcMain.off("select-blueTooth", selected);
                    ipcMain.off("cancel-blueTooth", cancelled);
                };
                selected = (e, ...args) => {
                    isConnecting = false;
                    off();
                    callback(args[0]);
                };
                cancelled = (e, _) => {
                    isConnecting = false;
                    off();
                    callback("");
                };

                `当${ipcMain}接收到选择或者取消`;
                ipcMain.on("select-blueTooth", selected);
                ipcMain.on("cancel-blueTooth", cancelled);
            }
            if (deviceList && deviceList.length > 0) {
                `通过${ipcMain}吧蓝牙列表发送给${ipcRenderer}`;
                win.webContents.send("blueTooth-list", deviceList);
            }
        }
    );
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS);
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}
