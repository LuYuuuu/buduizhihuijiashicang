<script setup>
import { BorderBox1 as DvBorderBox1 } from '@kjgl77/datav-vue3'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'
import axios from 'axios'

// 时间相关
const monthTime = ref(null)
const timeChange = ref(null)
function formatTime() {
  const date = moment().format('YYYY-MM-DD HH:mm:ss');
  return date;
}
// 顶部信息相关
const infoChange = ref(null)
let info = ref({})
function getInfo() {
  // axios.get('http://192.168.0.99:8082/other/student/getStudentDashboardInfo/').then((res) => {
  axios.get('http://'+window.location.host + '/prod-central-api/other/student/getStudentDashboardInfo/').then((res) => {
    console.log('顶部信息 :>> ', res.data.data);
    info.value = res.data.data;
  })
}
// 学生信息相关
const stuInfoChange = ref(null)
let stuInfo = ref([])
function getStuInfo() {
  // axios.get('http://192.168.0.99:8082/other/student/getAssessingStudents/').then((res) => {
  axios.get('http://'+window.location.host + '/prod-central-api/other/student/getAssessingStudents/').then((res) => {
    console.log('学生信息 :>> ', res.data.rows);
    stuInfo.value = res.data.rows;
  })
}

onMounted(() => {
  // 先请求一次信息
  getInfo();
  getStuInfo();
  // 每秒钟进行时间更新
  const timerId = setInterval(() => {
    //将值时间赋予monthTime变量
    monthTime.value = formatTime();
  }, 1000);
  timeChange.value = timerId;
  // 顶部信息更新
  const infoId = setInterval(() => {
    getInfo();
  }, 2000);
  infoChange.value = infoId;
  // 学员信息更新
  const studentInfoId = setInterval(() => {
    getStuInfo();
  }, 2000);
  stuInfoChange.value = studentInfoId;
})

onBeforeUnmount(() => {
  // 清理定时器
  if (timeChange) {
    clearInterval(timeChange);
    clearInterval(infoChange);
    clearInterval(stuInfoChange);
  }
});
</script>

<template>
  <div id="app">
    <!-- 顶部标题 -->
    <div class="main-title">
      <div class="decoration">
        <dv-decoration7>
          <div class="title">指挥复盘系统</div>
        </dv-decoration7>
      </div>
    </div>
    <!-- 顶部信息 -->
    <div class="main-info">
      <dv-border-box1 class="main-info-box">
        <div class="info">
          <div>时间：{{ monthTime }}</div>
          <div>总人数：{{ info.numberOfStudent }} </div>
          <div>已考核人数：{{info.completedNumber}}</div>
          <div>待考核人数：{{ info.incompleteNumber }}</div>
        </div>
      </dv-border-box1>
    </div>
    <!-- 学员信息 -->
    <div class="part-info">
      <dv-border-box1 class="main-info-box">
        <div class="info">
          <div class="item" v-for="stu in stuInfo" :key="stu.serialNumber">
            <dv-border-box7>
              <div class="stu">
                <el-row style="width: 100%;">
                  <el-col :span="24" style="margin-bottom: 5px;">序号：{{ stu.serialNumber }}</el-col>
                  <el-col :span="12" style="margin-bottom: 5px;">姓名：{{ stu.studentName }}</el-col>
                  <el-col :span="12" style="margin-bottom: 5px;">部职别：{{ stu.major }}</el-col>
                </el-row>
              </div>
            </dv-border-box7>
          </div>
        </div>
      </dv-border-box1>
    </div>

  </div>
</template>

<style scoped lang="less">
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("./assets/background.jpg");
  background-position: center center;
  color: #fff;

  .main-title {
    width: 100%;
    height: 2rem;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      width: 100%;
      font-size: 2rem;
      text-align: center;
      margin: 0 5px;
    }
  }

  .main-info {
    width: 94vw;
    height: 20vh;
    margin: 20px auto;

    .main-info-box {
      width: 100%;
      height: 100%;

      .info {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 1.25rem;

        div {
          margin: 3px 0;
        }
      }
    }
  }

  .part-info {
    width: 94vw;
    height: 70vh;
    margin: 20px auto;

    .main-info-box {
      width: 100%;
      height: 100%;

      .info {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 5% 3%;
        justify-content: start;
        flex-direction: column;
        font-size: 1.20rem;

        .item {
          width: 95%;
          height: 19%;
          margin-bottom: 2%;

          .stu {
            padding: 2% 5%;
            box-sizing: border-box;
            display: flex;
            align-items: start;
            justify-content: start;
            flex-direction: column;
            text-align: start;
          }
        }
      }
    }
  }
}
</style>
