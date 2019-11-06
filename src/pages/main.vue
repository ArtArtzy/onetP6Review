<template>
  <div>
    <div class="mainbox absolute-center">
      <div class="absolute-center relative-position">
        <div class="row">
         <div class="col-12 q-ma-sm" v-for= "i in 8" :key="i">
           <q-btn class="btn" @click=reviewPageBtn(i) >ทบทวนครั้งที่ {{i}} (คาบ 1 - {{i}})

           <q-icon name="fas fa-star" v-if="scoreData[i-1] >= star1" class="q-ma-xs" />
             <q-icon name="fas fa-star" v-if="scoreData[i-1] >= star2" class="q-ma-xs" />
               <q-icon name="fas fa-star" v-if="scoreData[i-1] >= star3" class="q-ma-xs" />
           </q-btn>
           </div>
      
        </div>
   
        
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
      scoreData : [],

      star1 : 10,
      star2: 20,
      star3: 30
    }
  },
  methods: {
    loadScore(){
      db.collection("reviewScore").doc(this.studentData.studentId).get().then(data=>{
        if(!data.exists){
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
    },
    reviewPageBtn(page){
      this.$router.push("/review/" + page)
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
  width: 500px;
}
</style>