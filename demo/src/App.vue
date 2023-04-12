<template>
    <el-button @click="scan">搜索</el-button>
    <el-scrollbar max-height="420">
        <el-table :data="blueToothList" stripe>
            <el-table-column prop="deviceId" label="Id" />
            <el-table-column prop="deviceName" label="Name" />
            <el-table-column label="Operate">
                <template #default="scope">
                    <el-button type="primary" @click="() => { select(scope.row) }">连接</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>

<script>
import { BlueTooth } from './utils/blueToothUsing'
export default {
    name: "App",
    components: {
    },
    created() {
        this.blueTooth.onBlueTooth(this.handler);
    },
    unmounted() {
        this.blueTooth
    },
    data() {
        return {
            /**
             * @type {BlueTooth}
             */
            blueTooth: window.blueTooth,//preload.js暴露的模块
            blueToothList: []
        }
    },
    methods: {
        handler(sender, list) {
            this.blueToothList = list;
        },
        scan() {
            navigator
            .bluetooth
            .requestDevice({ acceptAllDevices: true })
            .then(r=>{ console.log(r) })
            .catch(e=>{ console.error(e) })
        },
        select(device) {
            console.log(`You select ${device.deviceName}`)
            this.blueTooth.select(device.deviceId);
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
