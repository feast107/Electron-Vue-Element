export class BlueTooth {
    /**
     * 选择id
     * @param {string} id
     * @returns
     */
    select(id) {}
    /**
     * 取消搜索
     * @returns
     */
    cancel() {}
    /**
     * 收到来自ipcMain发送的设备列表
     * @param {function<Array>} handler
     * @returns
     */
    onBlueTooth(handler) {}
    offBlueTooth() {}
}
