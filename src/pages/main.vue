<template>
  <div>
    <div class="mainbox absolute-center">
      <div class="absolute-center relative-position">
        <div class="row">
          <div class="col-6">คะแนนสะสม 4000</div>
          <div class="col-6">คะแนนประจำอาทิตย์ 1500</div>
        </div>
        <br />
        <q-btn class="btn" color="primary" label="เริ่มเรียน" @click="startBtn()" />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      studentData: this.$q.localStorage.getItem('studentData'),
      scoreData : []
    }
  },
  methods: {
    loadScore(){
      db.collection("reviewScore").doc(this.studentData.studentId).get().then(data=>{
        if(!data.exists){
          console.log('test2');
          db.collection("reviewScore").doc(this.studentData.studentId).set({
            score : [0,0,0,0,0,0,0,0,0]
          })
        } else {
          this.scoreData = data.data().score
        }
      })
    },
    startBtn() {
      this.$router.push("/review");
    }
  },
  mounted () {
    this.loadScore();
  },
};
</script>

<style  scoped>
.mainbox {
  width: 1200px;
  height: 650px;
  margin: auto;
  border: 1px solid black;
}
.btn {
  width: 400px;
}
</style>