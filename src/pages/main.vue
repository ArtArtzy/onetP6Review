<template>
  <div>
    <div class="desktop-only bgImage">
      <div class="mainbox bg3 absolute-center">
        <div class="row q-pt-xl">
          <div class="col-5 relative-position q-pl-md">
            <div class="q-pa-md q-pl-xl">
              <img style="width:400px;" src="../statics/image/main/PC.png" />
            </div>
            <div class="absolute-center text-center" style="width:100%">
              <div style="height:90px"></div>
              <div class="text-h4">{{studentData.name}}</div>

              <div>
                <br />
                <div class="text-h4">คะแนนสะสม</div>
                <br />
                <div class="text-h3">{{totalScore}}</div>
              </div>
            </div>
          </div>
          <div class="col-7 q-px-md">
            <div class="box-menu">
              <div class="row">
                <div class="col-12 q-pa-sm" v-for="i in 8" :key="i">
                  <q-btn
                    rounded
                    style="height:120px;width:100%"
                    class="btn bg-white text-h5"
                    @click="reviewPageBtn(i)"
                  >
                    <div class="row" style="width:100%;height:100px">
                      <div class="col-2">
                        <div>
                          <img
                            style="width:100px;height:100px"
                            :src="'../statics/image/main/'+i+'.png'"
                          />
                        </div>
                      </div>
                      <div class="col-7 text-left q-pt-sm">
                        <div class="q-pt-lg q-px-md">ทบทวนครั้งที่ {{i}} (คาบ 1 - {{i}})</div>
                      </div>
                      <div class="col-3">
                        <div class="q-pt-lg">
                          <q-icon
                            name="fas fa-star"
                            v-if="scoreData[i-1] >= star1"
                            class="q-ma-xs color1"
                          />
                          <q-icon
                            name="fas fa-star"
                            v-if="scoreData[i-1] >= star2"
                            class="q-ma-xs color1"
                          />
                          <q-icon
                            name="fas fa-star"
                            v-if="scoreData[i-1] >= star3"
                            class="q-ma-xs color1"
                          />
                        </div>
                      </div>
                    </div>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-only bgImage">
      <div>
        <div class="relative-position" style="height:70px">
          <div class="absolute-center text-white textTitle">หน้าหลัก</div>
        </div>
        <div class="bg1 q-px-sm q-pb-md">
          <div class="q-pa-md text-center textTitle">{{studentData.name}}</div>
          <div class="bg-white" style="border-radius: 5px;">
            <div class="text-center">
              <span class="textTitle">คะแนนสะสม</span>
              <br />
              <span class="title">{{totalScore}}</span>
            </div>
          </div>
        </div>
        <div class="col-12" v-for="i in 8" :key="i">
          <div
            style=" border-bottom: 1px solid black;"
            @click="reviewPageBtn(i)"
            class="bg-white q-pt-xs"
          >
            <div class="row">
              <div class="col-3">
                <img class="q-pa-sm" style="width:100%" :src="'../statics/image/main/'+i+'.png'" />
              </div>
              <div class="col-5 q-pa-sm textTitle">
                ทบทวนครั้งที่ {{i}}
                <br />
                (คาบ 1 - {{i}})
              </div>
              <div class="col-4 relative-position">
                <div class="absolute-center" style="width:100%">
                  <div class="row q-pb-sm">
                    <q-icon
                      size="sm"
                      name="fas fa-star"
                      v-if="scoreData[i-1] >= star1"
                      class="q-ma-xs color1"
                    />
                    <q-icon
                      size="sm"
                      name="fas fa-star"
                      v-if="scoreData[i-1] >= star2"
                      class="q-ma-xs color1"
                    />
                    <q-icon
                      size="sm"
                      name="fas fa-star"
                      v-if="scoreData[i-1] >= star3"
                      class="q-ma-xs color1"
                    />
                  </div>
                </div>
              </div>
            </div>
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
      studentData: this.$q.localStorage.getItem("studentData"),
      scoreData: [],
      totalScore: 0,
      star1: 10,
      star2: 20,
      star3: 40
    };
  },
  methods: {
    loadScore() {
      db.collection("reviewScore")
        .doc(this.studentData.studentId)
        .get()
        .then(data => {
          if (!data.exists) {
            db.collection("reviewScore")
              .doc(this.studentData.studentId)
              .set({
                score: [0, 0, 0, 0, 0, 0, 0, 0, 0]
              });
            this.scoreData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          } else {
            this.scoreData = data.data().score;
          }
          this.totalScore =
            this.scoreData.reduce((total, num) => {
              return total + num;
            }) * 10;
        });
    },
    startBtn() {
      this.$router.push("/review");
    },
    reviewPageBtn(page) {
      this.$router.push("/review/" + page);
    }
  },
  mounted() {
    this.loadScore();
  }
};
</script>

<style  scoped>
.textTitle {
  font-size: 5vw;
}

.title {
  font-size: 10vw;
}
.mainbox {
  border-radius: 5px;
  width: 1200px;
  height: 650px;
  margin: auto;
  border: 1px solid black;
}
.btn {
  width: 500px;
}
.box-menu {
  height: 550px;
  overflow-y: auto;
}

.box-menu::-webkit-scrollbar {
  width: 20px;
}

/* Track */
.box-menu::-webkit-scrollbar-track {
  background: #fce0c7;
  border: 6px solid #fff0e2;
}

/* Handle */
.box-menu::-webkit-scrollbar-thumb {
  background: #f59085;
  border-radius: 10px;
  border: 1px solid #fff0e2;
}
</style>