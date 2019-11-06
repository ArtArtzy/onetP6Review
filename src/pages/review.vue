<template>
  <div>
    <div v-if="mode==1">Loading...</div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      mode: 1, // mode= 1 loading, 2= question-answer, 3 summary
studentData: this.$q.localStorage.getItem("studentData"),
    };
  },
  methods: {
    loadData(){
      this.mode = 1;
      //โหลดหาว่าเรียนไปแล้วกี่คาบ
      let dataTemp = []
      let lastSection = 1;
      db.collection("studentScoreLog").where("studentKey", "==" , this.studentData.studentId)
      .where("academicKey","==", this.studentData.academicYearKey).get().then(doc=>{
        if(doc.size > 0){
          for(const item of doc.docs){
          dataTemp.push(item.data().section)
        }
        dataTemp.sort()
        dataTemp.reverse()
        lastSection = dataTemp[0]
        }
        //ทำการสร้าง array ของโจทย์ที่เรียนมาแล้ว
        
        
      })
      
      //ทำการ random เลือกข้อที่ต้องการมาทำ 5 ข้อ
      //สร้าง array ของโจทย์ที่ต้องการ

    }
  },
  mounted () {
    this.loadData();
  },
};
</script>

<style scoped>
</style>