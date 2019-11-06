<template>
  <div>
    <div v-if="mode==1">Loading...</div>
    <div v-if="mode==2" class="mainBox absolute-center">
      <div>คะแนนปัจจุบัน {{totalScore}}</div>
      <div>คะแนนทั้งหมด {{totalAllScore}}</div>

      <!-- โจทย์แบบ 1  -->
      <div v-if="this.questionList[questionNo-1].type == 1" class="row justify-center">
        <!-- คำถาม -->
        <div
          class="questionzone bg-orange-1 text-center q-pa-md"
        >{{this.questionList[questionNo-1].question}}</div>
        <!-- choice -->
        <div class="col-12 row justify-center" v-if="!answerMode">
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(1)"
          >{{this.questionList[questionNo-1].choice1}}</div>
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(2)"
          >{{this.questionList[questionNo-1].choice2}}</div>
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(3)"
          >{{this.questionList[questionNo-1].choice3}}</div>
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(4)"
          >{{this.questionList[questionNo-1].choice4}}</div>
        </div>
        <!-- answer -->
        <div class="col-12 row justify-center" v-if="answerMode">
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[0]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[0]==1" />
            {{this.questionList[questionNo-1].choice1}}
          </div>
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[1]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[1]==1" />
            {{this.questionList[questionNo-1].choice2}}
          </div>
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[2]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[2]==1" />
            {{this.questionList[questionNo-1].choice3}}
          </div>
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[3]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[3]==1" />
            {{this.questionList[questionNo-1].choice4}}
          </div>
        </div>
      </div>

      <!-- โจทย์แบบ 2 -->
      <div v-if="this.questionList[questionNo-1].type == 2">
        <!-- คำถาม -->
        <div
          class="questionzone bg-orange-1 text-center q-pa-md"
        >{{this.questionList[questionNo-1].question}}</div>
        <!-- รูปภาพ -->

        <div class="col-12" align="center">
          <img :src="questionList[questionNo-1].questionURL" alt />
        </div>

        <!-- choice -->
        <div class="col-12 row justify-center" v-if="!answerMode">
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(1)"
          >{{this.questionList[questionNo-1].choice1}}</div>
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(2)"
          >{{this.questionList[questionNo-1].choice2}}</div>
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(3)"
          >{{this.questionList[questionNo-1].choice3}}</div>
          <div
            class="choice q-py-md col-12 q-my-sm cursor-pointer"
            @click="answer(4)"
          >{{this.questionList[questionNo-1].choice4}}</div>
        </div>
        <!-- answer -->
        <div class="col-12 row justify-center" v-if="answerMode">
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[0]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[0]==1" />
            {{this.questionList[questionNo-1].choice1}}
          </div>
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[1]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[1]==1" />
            {{this.questionList[questionNo-1].choice2}}
          </div>
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[2]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[2]==1" />
            {{this.questionList[questionNo-1].choice3}}
          </div>
          <div class="choice q-py-md col-12 q-my-sm">
            <q-icon name="fas fa-times" color="red" v-if="showMark[3]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[3]==1" />
            {{this.questionList[questionNo-1].choice4}}
          </div>
        </div>
      </div>

      <!-- โจทย์แบบ 3 -->
      <div v-if="this.questionList[questionNo-1].type == 3">
       
        <!-- คำถาม -->
        <div
          class="questionzone bg-orange-1 text-center q-pa-md"
        >{{this.questionList[questionNo-1].question}}</div>
        <!-- answer -->
        <div class="row" v-if="!answerMode">
          <div class="q-pa-md col-6 cursor-pointer" @click="answer(1)">
            1.
            <img :src="this.questionList[questionNo-1].answer1URL" alt class="sizeimg" />
          </div>
          <div class="q-pa-md col-6 cursor-pointer" @click="answer(2)">
            2.
            <img :src="this.questionList[questionNo-1].answer2URL" alt class="sizeimg" />
          </div>
          <div class="q-pa-md col-6 cursor-pointer" @click="answer(3)">
            3.
            <img :src="this.questionList[questionNo-1].answer3URL" alt class="sizeimg" />
          </div>
          <div class="q-pa-md col-6 cursor-pointer" @click="answer(4)">
            4.
            <img :src="this.questionList[questionNo-1].answer4URL" alt class="sizeimg" />
          </div>
        </div>
        <!-- answer -->
        <!-- answer -->
        <div class="col-12 row justify-center" v-if="answerMode">
          <div class="q-pa-md col-6">
            <q-icon name="fas fa-times" color="red" v-if="showMark[0]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[0]==1" />
            <img :src="this.questionList[questionNo-1].answer1URL" alt class="sizeimg" />
          </div>
          <div class="q-pa-md col-6">
            <q-icon name="fas fa-times" color="red" v-if="showMark[1]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[1]==1" />
            <img :src="this.questionList[questionNo-1].answer2URL" alt class="sizeimg" />
          </div>
          <div class="q-pa-md col-6">
            <q-icon name="fas fa-times" color="red" v-if="showMark[2]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[2]==1" />
            <img :src="this.questionList[questionNo-1].answer3URL" alt class="sizeimg" />
          </div>
          <div class="q-pa-md col-6">
            <q-icon name="fas fa-times" color="red" v-if="showMark[3]==2" />
            <q-icon name="fas fa-check" color="green" v-if="showMark[3]==1" />
            <img :src="this.questionList[questionNo-1].answer4URL" alt class="sizeimg" />
          </div>
        </div>
      </div>

      <!-- ตัวบอกข้อ -->
      <div class="col-12 text-center">
        <q-icon name="fas fa-circle" class="q-px-md" size="22px" color="grey" v-if="questionNo==1" />
        <span v-if="questionNo >=2 ">
          <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[0].answer" />
          <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[0].answer" />
        </span>

        <q-icon name="fas fa-circle" class="q-px-md" size="22px" color="grey" v-if="questionNo==2" />
        <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=1" />
        <span v-if="questionNo >=3 ">
          <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[1].answer" />
          <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[1].answer" />
        </span>

        <q-icon name="fas fa-circle" class="q-px-md" size="22px" color="grey" v-if="questionNo==3" />
        <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=2" />
        <span v-if="questionNo >=4 ">
          <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[2].answer" />
          <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[2].answer" />
        </span>

        <q-icon name="fas fa-circle" class="q-px-md" size="22px" color="grey" v-if="questionNo==4" />
        <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=3" />
        <span v-if="questionNo >=5 ">
          <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[3].answer" />
          <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[3].answer" />
        </span>

        <q-icon name="fas fa-circle" class="q-px-md" size="22px" color="grey" v-if="questionNo==5" />
        <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=4" />
        <span v-if="questionNo >=6 ">
          <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[4].answer" />
          <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[4].answer" />
        </span>
      </div>
    </div>


    <!-- summary -->
    <div v-if="mode==3">
       <div>คะแนนปัจจุบัน {{totalScore}}</div>
      <div>คะแนนทั้งหมด {{totalAllScore}}</div>
      <q-knob
        :min="0"
        :max="5"
        v-model="scoreSection"
        show-value
        size="50px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
      <div class="q-pa-md" style="max-width: 550px">
        <q-list bordered class="rounded-borders" v-for="i in 5" :key="i" >
      
  
          <q-expansion-item switch-toggle-side expand-separator 
          :icon="userAnswer[i-1].answer?'fas fa-check' : 'fas fa-times'"  :label="questionList[i-1].question">
     
            <q-card>
              <q-card-section>
                <div v-if="questionList[i-1].type ==1">
                  <div>{{questionList[i-1].choice1}}</div>
                  <div>{{questionList[i-1].choice2}}</div>
                  <div>{{questionList[i-1].choice3}}</div>
                  <div>{{questionList[i-1].choice4}}</div>
                </div>
                <div v-if="questionList[i-1].type ==2">
                  <div><img :src="questionList[i-1].questionURL" style="width:80%" ></div>
                   <div>{{questionList[i-1].choice1}}</div>
                  <div>{{questionList[i-1].choice2}}</div>
                  <div>{{questionList[i-1].choice3}}</div>
                  <div>{{questionList[i-1].choice4}}</div>
                </div>
                <!-- กรณีตอบถูก -->
                <div v-if="questionList[i-1].type ==3">
                  <div v-if="userAnswer[i-1].correctAnswer == userAnswer[i-1].userAnswer">
                  <div>
                    <span v-if="userAnswer[i-1].correctAnswer==1"><q-icon name="fas fa-check"/></span>
                    <img :src="questionList[i-1].answer1URL" >
                  </div>
                  <div>
                    <span v-if="userAnswer[i-1].correctAnswer==2"><q-icon name="fas fa-check"/></span>
                    <img :src="questionList[i-1].answer2URL" >
                  </div>
                   <div>
                    <span v-if="userAnswer[i-1].correctAnswer==3"><q-icon name="fas fa-check"/></span>
                    <img :src="questionList[i-1].answer3URL" >
                  </div>
                   <div>
                    <span v-if="userAnswer[i-1].correctAnswer==4"><q-icon name="fas fa-check"/></span>
                    <img :src="questionList[i-1].answer4URL" >
                  </div>
                  </div>
                  <!-- กรณีตอบผิด -->
                  <div v-else>
                     <div>
                    <span v-if="userAnswer[i-1].correctAnswer==1"><q-icon name="fas fa-check"/></span>
                    <span v-if="userAnswer[i-1].userAnswer==1"><q-icon name="fas fa-times"/></span>
                    <img :src="questionList[i-1].answer1URL" >
                  </div>
                  <div>
                    <span v-if="userAnswer[i-1].correctAnswer==2"><q-icon name="fas fa-check"/></span>
                    <span v-if="userAnswer[i-1].userAnswer==2"><q-icon name="fas fa-times"/></span>
                    <img :src="questionList[i-1].answer2URL" >
                  </div>
                   <div>
                    <span v-if="userAnswer[i-1].correctAnswer==3"><q-icon name="fas fa-check"/></span>
                    <span v-if="userAnswer[i-1].userAnswer==3"><q-icon name="fas fa-times"/></span>
                    <img :src="questionList[i-1].answer3URL" >
                  </div>
                   <div>
                    <span v-if="userAnswer[i-1].correctAnswer==4"><q-icon name="fas fa-check"/></span>
                    <span v-if="userAnswer[i-1].userAnswer==4"><q-icon name="fas fa-times"/></span>
                    <img :src="questionList[i-1].answer4URL" >
                  </div>
                  </div>
                </div>
                <hr>
               <div v-html="questionList[i-1].description">
                 
               </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
           <q-separator />
         
        </q-list>
        <q-btn label="เริ่มทำต่อ" @click="doIt()"/>
        <q-btn label="กลับเมนู" @click="backToMenu()"/>
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
      page: Number(this.$route.params.page),
      sectionList: [],
      questionList: [],
      star1: 10,
      star2: 20,
      star3: 30,
      scoreData: [],
      totalScore: 0,
      choiceAnswer: [1, 2, 3, 4],
      choiceData: [],
      questionNo: 1,
      userAnswer: [],
      answerMode: false,
      showMark: [],
      scoreSection:0,
      totalAllScore :0
    };
  },
  methods: {
    async loadData() {

      this.mode = 1;
      this.userAnswer = [];
      this.scoreSection = 0
      db.collection("reviewScore")
        .doc(this.studentData.studentId)
        .get()
        .then(data => {
          this.scoreData = data.data().score;
          this.totalScore = this.scoreData[this.page - 1] * 10;
          this.totalAllScore =
            this.scoreData.reduce((total, num) => {
              return total + num;
            }) * 10
        });
       
     
      //load คาบเรียนพร้อม index
      await db
        .collection("Section")
        .orderBy("orderId")
        .get()
        .then(doc => {
          doc.forEach(data => {
            let dataTemp = {
              id: data.id
            };
            let dataFinal = { ...dataTemp, ...data.data() };
            this.sectionList.push(dataFinal);
          });
        });

      //เก็บโจทย์ในเรื่องที่เกี่ยวข้อง
      for (let i = 1; i <= this.page; i++) {
        let sectionId = this.sectionList[i].id;
        db.collection("question")
          .doc("Server")
          .collection("data")
          .where("section", "==", sectionId)
          // .where("type","==",3)
          .get()
          .then(doc => {
            doc.forEach(data => {
              this.questionList.push(data.data());
            });
          });
      }
      setTimeout(() => {
        this.questionList.sort(() => {
          return 0.5 - Math.random();
        });
        this.mode = 2;
      }, 2000);

      //ทำการ random เลือกข้อที่ต้องการมาทำ 5 ข้อ
      //สร้าง array ของโจทย์ที่ต้องการ
    },
    answer(choice) {
      this.showMark = [0, 0, 0, 0];
      if (choice == this.questionList[this.questionNo - 1].correctAnswer) {
        //กรณีตอบถูก
        let dataTemp = {
          no: this.questionNo,
          userAnswer: choice,
          correctAnswer: this.questionList[this.questionNo - 1].correctAnswer,
          answer: true
        };
        this.userAnswer.push(dataTemp);
        this.showMark[dataTemp.correctAnswer - 1] = 1;
        //update score
        this.totalScore += 10;
        this.scoreData[this.page - 1] += 1;
        this.scoreSection += 1
        db.collection("reviewScore")
          .doc(this.studentData.studentId)
          .set({ score: this.scoreData });
      } else {
        //กรณีตอบผิด
        let dataTemp = {
          no: this.questionNo,
          userAnswer: choice,
          correctAnswer: this.questionList[this.questionNo - 1].correctAnswer,
          answer: false
        };
        this.userAnswer.push(dataTemp);
        this.showMark[dataTemp.correctAnswer - 1] = 1;
        this.showMark[dataTemp.userAnswer - 1] = 2;
      }
      this.answerMode = true;
      setTimeout(() => {
        this.questionNo++;
        this.answerMode = false;
      }, 1000);
      if (this.questionNo >= 5) {
        setTimeout(() => {
          this.mode = 3;
        }, 1000);
      }
    },
    backToMenu(){
      this.$router.push("/main")
    },
    doIt(){
      this.questionList.splice(0,5)
      if(this.questionList.length <=5){
         this.questionNo =1
          this.userAnswer = [];
          this.scoreSection = 0
        this.loadData()
      } else {
        this.mode=2
        this.questionNo =1
          this.userAnswer = [];
          this.scoreSection = 0
          
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.mainBox {
  width: 1000px;
  height: 600px;
}
.questionzone {
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
.sizeimg {
  width: 350px;
}
</style>