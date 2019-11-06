<template>
  <div >
    <div v-if="mode==1">Loading...</div>
  <div v-if="mode==2" class="mainBox absolute-center">
    <div>คะแนนปัจจุบัน {{totalScore}}</div>

  <!-- โจทย์แบบ 1  -->
    <div v-if="this.questionList[questionNo-1].type == 1" class="row justify-center">
      <!-- คำถาม -->
     <div class="questionzone bg-orange-1 text-center q-pa-md">
       {{this.questionList[questionNo-1].question}}
     </div>
      <div class="choice q-py-md col-12 q-my-sm cursor-pointer" @click="answer(1)"> 1.{{this.questionList[questionNo-1].choice1}} </div>
      <div  class="choice q-py-md col-12 q-my-sm cursor-pointer" @click="answer(2)"> 2.{{this.questionList[questionNo-1].choice2}} </div>
      <div  class="choice q-py-md col-12 q-my-sm cursor-pointer" @click="answer(3)"> 3.{{this.questionList[questionNo-1].choice3}} </div>
      <div  class="choice q-py-md col-12 q-my-sm cursor-pointer" @click="answer(4)"> 4.{{this.questionList[questionNo-1].choice4}} </div>
    </div>
    <div v-if="this.questionList[0].type == 2">
     2 
    </div>
    <div v-if="this.questionList[0].type == 3">
     3 
    </div>
    <div class="col-12 text-center">
      <q-icon name="fas fa-circle" class="q-px-md" color="grey" />
      <q-icon name="fas fa-circle" class="q-px-md" color="grey" />
      <q-icon name="fas fa-circle" class="q-px-md" color="grey" />
      <q-icon name="fas fa-circle" class="q-px-md" color="grey" />
      <q-icon name="fas fa-circle" class="q-px-md" color="grey" />
    </div>
  </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      mode: 1, // mode= 1 loading, 2= question-answer, 3 summary
studentData: this.$q.localStorage.getItem("studentData"),
      page : Number(this.$route.params.page),
      sectionList : [],
      questionList: [],
      star1 : 10,
      star2: 20,
      star3: 30,
      scoreData : [],
      totalScore: 0,
      choiceAnswer: [1,2,3,4],
      choiceData: [],
      questionNo:1 ,
      userAnswer: [],
    };
  },
  methods: {
    async loadData(){
      this.mode = 1;
      this.userAnswer = []
      db.collection("reviewScore").doc(this.studentData.studentId).get().then(data=>{
         this.scoreData = data.data().score
         this.totalScore = this.scoreData[this.page - 1] * 10
      
       })
      //load คาบเรียนพร้อม index
      await db.collection("Section").orderBy("orderId").get().then(doc=>{
        doc.forEach(data=>{
          let dataTemp = { 
            id : data.id
          }
          let dataFinal = {...dataTemp, ...data.data()}
          this.sectionList.push(dataFinal)
        })
        
      })
      
      //เก็บโจทย์ในเรื่องที่เกี่ยวข้อง
      for(let i = 1; i<= this.page; i++){
        let sectionId = this.sectionList[i].id
        db.collection("question").doc("Server").collection("data").where("section","==",sectionId)
        .where("type","==",1)
        .get().then(doc=>{
          doc.forEach(data=>{
            this.questionList.push(data.data())
          })
        })
      }
      setTimeout(() => {
        this.questionList.sort(()=>{
          return 0.5  - Math.random()
        })
        this.mode=2
       
      }, 2000);

      
      //ทำการ random เลือกข้อที่ต้องการมาทำ 5 ข้อ
      //สร้าง array ของโจทย์ที่ต้องการ

    },
    answer(choice){
      if(choice == this.questionList[questionNo-1].correctAnswer){
        //กรณีตอบถูก
        let dataTemp = {
          no: questionNo,
          userAnswer : choice,
          correctAnswer : this.questionList[questionNo-1].correctAnswer,
          answer : true
        }
        this.userAnswer.push(dataTemp)
        //update score
      } else {
        //กรณีตอบผิด
        let dataTemp = {
          no: questionNo,
          userAnswer : choice,
          correctAnswer : this.questionList[questionNo-1].correctAnswer,
          answer : false
        }
        this.userAnswer.push(dataTemp)
      }
    }
   
  },
  mounted () {
    this.loadData();

  },
};
</script>

<style scoped>
.mainBox{
  width: 1000px;
  height: 600px;
  border: 1px solid black;
  
}
.questionzone{
  width: 90%;
  height: 70px;
margin: auto;
}
.choice {
  border: 1px solid black;
  width: 80%;
  text-align: center;
  border-radius: 10px;
}
</style>