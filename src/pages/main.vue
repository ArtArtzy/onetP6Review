<template>
  <div>
    <div class="desktop-only">
      <div class="topBar q-pt-sm q-pl-md shadow-3 row">
        <div class="col-9 text-h5">Winner O-NET Review</div>
        <div class="col-3 q-pr-md" align="right">
          <q-btn color="negative" icon="fas fa-sign-out-alt" push @click="confirm=true" />
        </div>
      </div>
      <q-dialog v-model="confirm" persistent>
        <q-card style="width:400px; border: 5px solid black;border-radius:10px ">
          <q-card-section class="row items-center">
            <span class="text-h6 text-center col-12">คุณต้องการออกจากระบบหรือไม่?</span>
          </q-card-section>
          <q-card-actions>
            <div class="row justify-center col-12">
              <div class="q-px-sm q-pb-lg">
                <q-btn
                  flat
                  size="md"
                  style="width:100px; border: 3px solid red"
                  label="ยกเลิก"
                  color="negative"
                  v-close-popup
                />
              </div>
              <div class="q-px-sm q-pb-lg">
                <q-btn
                  class="bg5 text-white"
                  @click="logout()"
                  size="md"
                  style="width:100px"
                  label="ตกลง"
                  v-close-popup
                />
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div>
        <div style="height:100px"></div>
        <div class="mainbox bg3">
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
                        <div class="col-3" align="left">
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
    </div>
    <div class="mobile-only orientation-portrait">
      <div class="topBarMobile q-pa-sm q-pl-md shadow-3 row">
        <div class="col-10 titleBar q-pt-xs">Winner O-NET Review</div>
        <div class="col" align="right">
          <q-btn
            style="width:100%; max-width:100px;height:100%"
            color="negative"
            icon="fas fa-sign-out-alt"
            push
            @click="confirm=true"
          />
        </div>
      </div>
      <div>
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
              <div class>
                <img class="q-pa-sm" style="width:100px" :src="'../statics/image/main/'+i+'.png'" />
              </div>
              <div class="row col q-px-sm">
                <div class="col-6 textTitle">
                  ทบทวนครั้งที่ {{i}}
                  <br />
                  (คาบ 1 - {{i}})
                </div>
                <div class="col-6 relative-position">
                  <div class="absolute-center" style="width:100%">
                    <div class="row justify-center">
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
    <rotate />
  </div>
</template>

<script>
import rotate from "../components/dontsleep.vue";
import { db } from "../router/index.js";
export default {
  components: {
    rotate
  },
  data() {
    return {
      studentData: this.$q.localStorage.getItem("studentData"),
      scoreData: [],
      totalScore: 0,
      star1: 10,
      star2: 20,
      star3: 40,
      confirm: false
    };
  },
  methods: {
    loadVersion() {
      this.snapVersion = db
        .collection("version")
        .doc("review")
        .onSnapshot(data => {
          if (this.version != data.data().version) {
            window.location.reload(true);
          }
        });
    },
    logout() {
      this.notifyGreen("ออกจากระบบ");
      this.$q.localStorage.set("studentData", "");
      this.$router.push("/");
    },
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
    if (this.studentData == "") {
      this.$router.push("/");
      return;
    }
    this.loadScore();
    this.loadVersion();
  }
};
</script>

<style  scoped>
.textTitle {
  font-size: 20px;
}

.title {
  font-size: 20px;
}
.mainbox {
  border-radius: 5px;
  width: 1200px;
  height: 650px;
  margin: auto;
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
.topBar {
  height: 50px;
  background-color: #0a9e9c;
  color: white;
}
.topBarMobile {
  background-color: #0a9e9c;
  color: white;
}
.titleBar {
  font-size: 20px;
}
@media screen and (min-width: 1200px) {
  div {
    font-size: 5vw;
  }
}
</style>