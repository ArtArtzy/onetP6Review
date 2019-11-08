<template>
  <div class="bgImage text-body1">
    <div class="topBar q-pt-sm q-pl-md text-h5 shadow-3 row">
      <div class="col-9">Winner O-NET Review</div>
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
    <div v-if="mode==1" class="absolute-center">
      <q-spinner-dots color="amber-2" size="100px" />
    </div>
    <div v-if="mode==2" class="mainbox">
      <div style="height:100px"></div>
      <div>
        <div class="barlinear row q-px-xl q-pt-md bg3" style="width:100%">
          <div class="col-10 row" style="height:10px">
            <q-linear-progress
              class="color1"
              stripe
              style="height: 15px"
              :value="totalScore/(star3*10)"
            />
            <div class="col-3 relative-position" align="right">
              <q-icon
                style="right:-11px"
                name="fas fa-star"
                class="q-ma-xs color1 absolute-right"
                v-if="totalScore >= star1*10"
              />
              <q-icon
                style="right:-11px"
                name="fas fa-star"
                class="q-ma-xs text-grey absolute-right"
                v-if="totalScore < star1*10"
              />
              <br />
              <br />
              <span class="absolute-bottom-right" style="right:-11px">{{star1*10}}</span>
            </div>
            <div class="col relative-position" align="right">
              <q-icon
                style="right:-11px"
                name="fas fa-star"
                class="q-ma-xs color1 absolute-right"
                v-if="totalScore >= star2*10"
              />
              <q-icon
                style="right:-11px"
                name="fas fa-star"
                class="q-ma-xs text-grey absolute-right"
                v-if="totalScore < star2*10"
              />
              <br />
              <span class="absolute-bottom-right" style="right:-11px">{{star2*10}}</span>
            </div>
            <div class="col-6 relative-position" align="right">
              <q-icon
                style="right:-11px"
                name="fas fa-star"
                class="q-ma-xs color1 absolute-right"
                v-if="totalScore >= star3*10"
              />
              <q-icon
                style="right:-11px"
                name="fas fa-star"
                class="q-ma-xs text-grey absolute-right"
                v-if="totalScore < star3*10"
              />
              <br />
              <span class="absolute-bottom-right" style="right:-11px">{{star3*10}}</span>
            </div>
          </div>
          <div class="col-2 q-pl-md">
            <div class="text-center q-pa-sm bg2" style="height:60px; border-radius: 5px;">
              <span>คะแนนปัจจุบัน</span>
              <br />
              <span>{{totalScore}}</span>
            </div>
          </div>
        </div>

        <!-- <div>คะแนนทั้งหมด {{totalAllScore}}</div> -->
      </div>
      <div v-if="this.questionList[questionNo-1].type == 1" class="q-pt-sm row justify-center bg3">
        <!-- คำถาม -->

        <div class="questionzone text-center text-h5">
          <div
            class="bg2 q-pa-md"
            style="border-radius: 5px;"
          >{{this.questionList[questionNo-1].question}}</div>
        </div>
        <!-- choice -->
        <div class="col-12 row justify-center q-pt-md" v-if="!answerMode">
          <q-btn
            no-caps
            dense
            class="choice1 bg1 col-12 q-my-sm cursor-pointer row"
            @click="answer(1)"
          >
            <div class="col-3" style="width:100px  ">
              <q-icon size="50px" color="white" name="fas fa-motorcycle" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice1}}</div>
            </div>
          </q-btn>
          <q-btn
            no-caps
            dense
            class="choice2 bg7 col-12 q-my-sm cursor-pointer row"
            @click="answer(2)"
          >
            <div class="col-3" style="width:100px  ">
              <q-icon size="50px" color="white" name="fas fa-car-side" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice2}}</div>
            </div>
          </q-btn>
          <q-btn
            no-caps
            dense
            class="choice3 bg6 col-12 q-my-sm cursor-pointer row"
            @click="answer(3)"
          >
            <div class="col-3" style="width:100px  ">
              <q-icon size="50px" color="white" name="fas fa-helicopter" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice3}}</div>
            </div>
          </q-btn>
          <q-btn
            no-caps
            dense
            class="choice4 bg8 col-12 q-my-sm cursor-pointer row"
            @click="answer(4)"
          >
            <div class="col-3" style="width:100px  ">
              <q-icon size="50px" color="white" name="fas fa-plane" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice4}}</div>
            </div>
          </q-btn>
        </div>
        <!-- answer -->
        <div class="col-12 row justify-center q-pt-md" v-if="answerMode">
          <!-- answer1 -->
          <q-btn no-caps dense class="choiceFalse bg4 col-12 q-my-sm row" v-if="showMark[0]==2">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-times" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice1}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceTrue bg5 col-12 q-my-sm row" v-if="showMark[0]==1">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-check" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice1}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[0]==0">
            <div class="col-3" style="width:100px ">
              <q-icon size="50px" name="fas fa-motorcycle" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice1}}</div>
            </div>
          </q-btn>
          <!-- answer2 -->
          <q-btn no-caps dense class="choiceFalse bg4 col-12 q-my-sm row" v-if="showMark[1]==2">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-times" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice2}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceTrue bg5 col-12 q-my-sm row" v-if="showMark[1]==1">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-check" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice2}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[1]==0">
            <div class="col-3" style="width:100px ">
              <q-icon size="50px" name="fas fa-car-side" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice2}}</div>
            </div>
          </q-btn>
          <!-- answer3 -->
          <q-btn no-caps dense class="choiceFalse bg4 col-12 q-my-sm row" v-if="showMark[2]==2">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-times" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice3}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceTrue bg5 col-12 q-my-sm row" v-if="showMark[2]==1">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-check" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice3}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[2]==0">
            <div class="col-3" style="width:100px ">
              <q-icon size="50px" name="fas fa-helicopter" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice3}}</div>
            </div>
          </q-btn>
          <!-- answer4 -->
          <q-btn no-caps dense class="choiceFalse bg4 col-12 q-my-sm row" v-if="showMark[3]==2">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-times" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice4}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceTrue bg5 col-12 q-my-sm row" v-if="showMark[3]==1">
            <div class="col-3" style="width:100px ">
              <q-icon size="70px" name="fas fa-check" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice4}}</div>
            </div>
          </q-btn>
          <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[3]==0">
            <div class="col-3" style="width:100px ">
              <q-icon size="50px" name="fas fa-plane" color="white" />
            </div>
            <div class="col bg-white box relative-position" style="height:90px">
              <div
                class="text-h5 q-px-md absolute-center"
                align="left"
                style="width:100%"
              >{{this.questionList[questionNo-1].choice4}}</div>
            </div>
          </q-btn>
        </div>
      </div>

      <!-- โจทย์แบบ 2 -->
      <div v-if="this.questionList[questionNo-1].type == 2">
        <!-- คำถาม -->
        <div class="row bg3">
          <div class="col-6 row q-py-md q-pl-xl q-pr-md">
            <div class="bg2" style="width:100%">
              <div
                class="col-12 questionzone text-left q-py-md text-h5"
              >{{this.questionList[questionNo-1].question}}</div>
              <div class="col-12 q-my-md" align="center">
                <img style="width:90%" :src="questionList[questionNo-1].questionURL" alt />
              </div>
            </div>
          </div>
          <div class="col-6 q-py-sm q-pr-lg">
            <div>
              <!-- choice -->
              <div class="row justify-center" v-if="!answerMode">
                <q-btn
                  no-caps
                  dense
                  class="choice1 bg1 col-12 q-my-sm cursor-pointer row"
                  @click="answer(1)"
                >
                  <div class="col-3" style="width:100px  ">
                    <q-icon size="50px" color="white" name="fas fa-motorcycle" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice1}}</div>
                  </div>
                </q-btn>
                <!-- 2 -->
                <q-btn
                  no-caps
                  dense
                  class="choice2 bg7 col-12 q-my-sm cursor-pointer row"
                  @click="answer(2)"
                >
                  <div class="col-3" style="width:100px  ">
                    <q-icon size="50px" color="white" name="fas fa-car-side" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice2}}</div>
                  </div>
                </q-btn>
                <!-- 3 -->
                <q-btn
                  no-caps
                  dense
                  class="choice3 bg6 col-12 q-my-sm cursor-pointer row"
                  @click="answer(3)"
                >
                  <div class="col-3" style="width:100px  ">
                    <q-icon size="50px" color="white" name="fas fa-helicopter" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice3}}</div>
                  </div>
                </q-btn>
                <!-- 4 -->
                <q-btn
                  no-caps
                  dense
                  class="choice4 bg8 col-12 q-my-sm cursor-pointer row"
                  @click="answer(4)"
                >
                  <div class="col-3" style="width:100px  ">
                    <q-icon size="50px" color="white" name="fas fa-plane" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice4}}</div>
                  </div>
                </q-btn>
              </div>
              <!-- answer -->
              <div class="row justify-center" v-if="answerMode">
                <!-- answer1 -->
                <q-btn
                  no-caps
                  dense
                  class="choiceFalse bg4 col-12 q-my-sm row"
                  v-if="showMark[0]==2"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-times" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice1}}</div>
                  </div>
                </q-btn>
                <q-btn
                  no-caps
                  dense
                  class="choiceTrue bg5 col-12 q-my-sm row"
                  v-if="showMark[0]==1"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-check" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice1}}</div>
                  </div>
                </q-btn>
                <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[0]==0">
                  <div class="col-3" style="width:100px ">
                    <q-icon size="50px" name="fas fa-motorcycle" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice1}}</div>
                  </div>
                </q-btn>
                <!-- answer2 -->
                <q-btn
                  no-caps
                  dense
                  class="choiceFalse bg4 col-12 q-my-sm row"
                  v-if="showMark[1]==2"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-times" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice2}}</div>
                  </div>
                </q-btn>
                <q-btn
                  no-caps
                  dense
                  class="choiceTrue bg5 col-12 q-my-sm row"
                  v-if="showMark[1]==1"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-check" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice2}}</div>
                  </div>
                </q-btn>
                <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[1]==0">
                  <div class="col-3" style="width:100px ">
                    <q-icon size="50px" name="fas fa-car-side" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice2}}</div>
                  </div>
                </q-btn>
                <!-- answer3 -->
                <q-btn
                  no-caps
                  dense
                  class="choiceFalse bg4 col-12 q-my-sm row"
                  v-if="showMark[2]==2"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-times" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice3}}</div>
                  </div>
                </q-btn>
                <q-btn
                  no-caps
                  dense
                  class="choiceTrue bg5 col-12 q-my-sm row"
                  v-if="showMark[2]==1"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-check" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice3}}</div>
                  </div>
                </q-btn>
                <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[2]==0">
                  <div class="col-3" style="width:100px ">
                    <q-icon size="50px" name="fas fa-helicopter" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice3}}</div>
                  </div>
                </q-btn>
                <!-- answer4 -->
                <q-btn
                  no-caps
                  dense
                  class="choiceFalse bg4 col-12 q-my-sm row"
                  v-if="showMark[3]==2"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-times" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice4}}</div>
                  </div>
                </q-btn>
                <q-btn
                  no-caps
                  dense
                  class="choiceTrue bg5 col-12 q-my-sm row"
                  v-if="showMark[3]==1"
                >
                  <div class="col-3" style="width:100px ">
                    <q-icon size="70px" name="fas fa-check" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice4}}</div>
                  </div>
                </q-btn>
                <q-btn no-caps dense class="choiceNon bg9 col-12 q-my-sm row" v-if="showMark[3]==0">
                  <div class="col-3" style="width:100px ">
                    <q-icon size="50px" name="fas fa-plane" color="white" />
                  </div>
                  <div class="col bg-white box relative-position" style="height:90px">
                    <div
                      class="text-h5 q-px-md absolute-center"
                      align="left"
                      style="width:100%"
                    >{{this.questionList[questionNo-1].choice4}}</div>
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- รูปภาพ -->
      </div>

      <!-- โจทย์แบบ 3 -->
      <div class="bg3" v-if="this.questionList[questionNo-1].type == 3">
        <!-- คำถาม -->
        <div class="q-pt-sm">
          <div
            class="questionzone bg2 text-left q-pa-md text-h5"
          >{{this.questionList[questionNo-1].question}}</div>
          <!-- answer -->
          <div class="row q-px-xl q-pt-sm" v-if="!answerMode ">
            <div class="q-px-sm col-6 cursor-pointer">
              <q-btn
                no-caps
                dense
                style="width:100%"
                class="choice1 bg1 col-12 q-my-sm cursor-pointer row"
                @click="answer(1)"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-motorcycle" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer1URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
            <div class="q-px-sm col-6 cursor-pointer">
              <q-btn
                no-caps
                dense
                style="width:100%"
                class="choice2 bg7 col-12 q-my-sm cursor-pointer row"
                @click="answer(2)"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-car-side" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-md"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer2URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
            <div class="q-px-sm col-6 cursor-pointer">
              <q-btn
                no-caps
                dense
                style="width:100%"
                class="choice3 bg6 col-12 q-my-sm cursor-pointer row"
                @click="answer(3)"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-helicopter" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-md"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer3URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
            <div class="q-px-sm col-6 cursor-pointer">
              <q-btn
                no-caps
                dense
                style="width:100%"
                class="choice4 bg8 col-12 q-my-sm cursor-pointer row"
                @click="answer(4)"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-plane" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-md"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer4URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
          </div>
          <div class="col-12 row q-px-xl q-pt-sm justify-center" v-if="answerMode">
            <div class="q-px-sm col-6">
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[0]==2"
                class="choiceFalse3 bg4 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-times" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer1URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[0]==1"
                class="choiceTrue3 bg5 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-check" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer1URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[0]==0"
                class="choiceNon3 bg9 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-motorcycle" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer1URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
            <div class="q-px-sm col-6">
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[1]==2"
                class="choiceFalse3 bg4 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-times" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer2URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[1]==1"
                class="choiceTrue3 bg5 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-check" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer2URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[1]==0"
                class="choiceNon3 bg9 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-helicopter" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer2URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
            <div class="q-px-sm col-6">
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[2]==2"
                class="choiceFalse3 bg4 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-times" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer3URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[2]==1"
                class="choiceTrue3 bg5 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-check" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer3URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[2]==0"
                class="choiceNon3 bg9 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-helicopter" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer2URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
            <div class="q-px-sm col-6">
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[3]==2"
                class="choiceFalse3 bg4 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-times" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer4URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[3]==1"
                class="choiceTrue3 bg5 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-check" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer4URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
              <q-btn
                no-caps
                dense
                style="width:100% "
                v-if="showMark[3]==0"
                class="choiceNon3 bg9 col-12 q-my-sm row"
              >
                <div class="col-3" style="width:110px  ">
                  <q-icon size="50px" color="white" name="fas fa-plane" />
                </div>
                <div class="col bg-white box relative-position" style="height:200px">
                  <div
                    class="text-h5 q-px-md absolute-center q-py-sm"
                    align="center"
                    style="width:100%"
                  >
                    <img
                      :src="this.questionList[questionNo-1].answer4URL"
                      alt
                      class="sizeimg q-pa-md"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- ตัวบอกข้อ -->
      <div class="col-12 text-center bg3 q-pa-md">
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
    <div class="row justify-center item-center q-pt-xl" v-if="mode==3">
      <div class="mainbox bg3">
        <div class="relative-position q-mx-md" style="height:30px">
          <q-knob
            :min="0"
            :max="5"
            v-model="scoreSection"
            show-value
            size="90px"
            :thickness="0.22"
            color="teal "
            class="q-ma-md absolute-left bg10 text-white"
            style="border-radius:50px;"
          />
        </div>

        <div class="row bg2 q-mx-xl">
          <div class="col-3 q-py-sm text-center">
            คะแนนปัจจุบัน
            <br />
            {{totalScore}}
          </div>
          <div class="col" align="center">
            <div>
              <q-icon
                name="fas fa-star"
                class="q-ma-md color1"
                size="md"
                v-if="totalScore >= star1*10"
              />
              <q-icon
                name="fas fa-star"
                class="q-ma-md"
                color="grey"
                size="md"
                v-if="totalScore < star1*10"
              />
              <q-icon
                name="fas fa-star"
                class="q-ma-md color1"
                size="md"
                v-if="totalScore >= star2*10"
              />
              <q-icon
                name="fas fa-star"
                class="q-ma-md"
                color="grey"
                size="md"
                v-if="totalScore < star2*10"
              />
              <q-icon
                name="fas fa-star"
                class="q-ma-md color1"
                size="md"
                v-if="totalScore >= star3*10"
              />
              <q-icon
                name="fas fa-star"
                class="q-ma-md"
                color="grey"
                size="md"
                v-if="totalScore < star3*10"
              />
            </div>
          </div>
          <div
            style="border:1px solid black"
            class="col-2 rounded-borders bg-white q-pa-sm text-center"
          >
            คะแนนทั้งหมด
            <br />
            {{totalAllScore}}
          </div>
        </div>
        <div class="q-pa-lg q-mt-lg q-mx-lg">
          <q-list bordered class="rounded-borders" v-for="i in 5" :key="i">
            <q-expansion-item
              switch-toggle-side
              expand-separator
              class="bg-white"
              :icon="userAnswer[i-1].answer?'fas fa-check' : 'fas fa-times'"
              :label="'คำถามที่ '+ i"
            >
              <q-card class="bg-white">
                <q-card-section>
                  <div>{{questionList[i-1].question}}</div>
                  <!-- รูปภาพกรณี 2 -->
                  <div v-if="questionList[i-1].type ==2">
                    <img :src="questionList[i-1].questionURL" class="sizeimg2" />
                  </div>
                  <!-- แสดงคำตอบในกรณี 1 และ 2 -->
                  <div v-if="questionList[i-1].type !=3 ">
                    <div v-if="userAnswer[i-1].answer">
                      <div :class="{'text-grey' : userAnswer[i-1].correctAnswer !=1}">
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==1" />
                        {{questionList[i-1].choice1}}
                      </div>
                      <div :class="{'text-grey' : userAnswer[i-1].correctAnswer !=2}">
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==2" />
                        {{questionList[i-1].choice2}}
                      </div>
                      <div :class="{'text-grey' : userAnswer[i-1].correctAnswer !=3}">
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==3" />
                        {{questionList[i-1].choice3}}
                      </div>
                      <div :class="{'text-grey' : userAnswer[i-1].correctAnswer !=4}">
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==4" />
                        {{questionList[i-1].choice4}}
                      </div>
                    </div>
                    <div v-else>
                      <div
                        :class="{'text-grey' : userAnswer[i-1].correctAnswer !=1 && userAnswer[i-1].userAnswer != 1}"
                      >
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==1" />
                        <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==1" />
                        {{questionList[i-1].choice1}}
                      </div>
                      <div
                        :class="{'text-grey' : userAnswer[i-1].correctAnswer !=2 && userAnswer[i-1].userAnswer != 2}"
                      >
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==2" />
                        <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==2" />
                        {{questionList[i-1].choice2}}
                      </div>
                      <div
                        :class="{'text-grey' : userAnswer[i-1].correctAnswer !=3 && userAnswer[i-1].userAnswer != 3}"
                      >
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==3" />
                        <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==3" />
                        {{questionList[i-1].choice3}}
                      </div>
                      <div
                        :class="{'text-grey' : userAnswer[i-1].correctAnswer !=4 && userAnswer[i-1].userAnswer != 4}"
                      >
                        <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==4" />
                        <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==4" />
                        {{questionList[i-1].choice4}}
                      </div>
                    </div>
                  </div>

                  <!-- กรณีตอบถูก -->
                  <div v-if="questionList[i-1].type ==3">
                    <div v-if="userAnswer[i-1].correctAnswer == userAnswer[i-1].userAnswer">
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==1">
                          <q-icon name="fas fa-check" />
                        </span>
                        <img :src="questionList[i-1].answer1URL" />
                      </div>
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==2">
                          <q-icon name="fas fa-check" />
                        </span>
                        <img :src="questionList[i-1].answer2URL" />
                      </div>
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==3">
                          <q-icon name="fas fa-check" />
                        </span>
                        <img :src="questionList[i-1].answer3URL" />
                      </div>
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==4">
                          <q-icon name="fas fa-check" />
                        </span>
                        <img :src="questionList[i-1].answer4URL" />
                      </div>
                    </div>
                    <!-- กรณีตอบผิด -->
                    <div v-else>
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==1">
                          <q-icon name="fas fa-check" />
                        </span>
                        <span v-if="userAnswer[i-1].userAnswer==1">
                          <q-icon name="fas fa-times" />
                        </span>
                        <img :src="questionList[i-1].answer1URL" />
                      </div>
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==2">
                          <q-icon name="fas fa-check" />
                        </span>
                        <span v-if="userAnswer[i-1].userAnswer==2">
                          <q-icon name="fas fa-times" />
                        </span>
                        <img :src="questionList[i-1].answer2URL" />
                      </div>
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==3">
                          <q-icon name="fas fa-check" />
                        </span>
                        <span v-if="userAnswer[i-1].userAnswer==3">
                          <q-icon name="fas fa-times" />
                        </span>
                        <img :src="questionList[i-1].answer3URL" />
                      </div>
                      <div>
                        <span v-if="userAnswer[i-1].correctAnswer==4">
                          <q-icon name="fas fa-check" />
                        </span>
                        <span v-if="userAnswer[i-1].userAnswer==4">
                          <q-icon name="fas fa-times" />
                        </span>
                        <img :src="questionList[i-1].answer4URL" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div v-html="questionList[i-1].description"></div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator />
          </q-list>
          <div class="q-pa-md" align="center">
            <q-btn
              class="bg-white q-mx-sm"
              style="width:190px"
              label="กลับเมนู"
              @click="backToMenu()"
            />
            <q-btn
              class="bg5 q-mx-sm text-white"
              style="width:190px"
              label="เริ่มทำต่อ"
              @click="doIt()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- โจทย์แบบ 1  -->
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
      star3: 40,
      scoreData: [],
      totalScore: 0,
      choiceAnswer: [1, 2, 3, 4],
      choiceData: [],
      questionNo: 1,
      userAnswer: [],
      answerMode: false,
      showMark: [],
      scoreSection: 0,
      totalAllScore: 0,
      confirm: false
    };
  },
  methods: {
    logout() {
      this.notifyGreen("ออกจากระบบ");
      this.$q.localStorage.set("studentData", "");
      this.$router.push("/");
    },
    async loadData() {
      this.mode = 1;
      this.userAnswer = [];
      this.scoreSection = 0;
      db.collection("reviewScore")
        .doc(this.studentData.studentId)
        .get()
        .then(data => {
          this.scoreData = data.data().score;
          this.totalScore = this.scoreData[this.page - 1] * 10;
          this.totalAllScore =
            this.scoreData.reduce((total, num) => {
              return total + num;
            }) * 10;
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
        this.scoreSection += 1;
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
        }, 3000);
      }
    },
    backToMenu() {
      this.$router.push("/main");
    },
    doIt() {
      this.questionList.splice(0, 5);
      if (this.questionList.length <= 5) {
        this.questionNo = 1;
        this.userAnswer = [];
        this.scoreSection = 0;
        this.loadData();
      } else {
        this.mode = 2;
        this.questionNo = 1;
        this.userAnswer = [];
        this.scoreSection = 0;
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.box {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.mainbox {
  border-radius: 5px;
  width: 1200px;
  margin: auto;
}
.questionzone {
  width: 92%;
  margin: auto;
}
.choice {
  border: 1px solid black;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.sizeimg {
  width: 350px;
  height: 200px;
  object-fit: scale-down;
}
.sizeimg2 {
  width: 500px;
  height: 400px;
  object-fit: scale-down;
}
.barlinear {
  width: 700px;
}
.choice1 {
  border: 4px solid #f59085;
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choice2 {
  border: 4px solid #67c7c6;
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choice3 {
  border: 4px solid #0d5d76;
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choice4 {
  border: 4px solid #efb71c;
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceFalse {
  border: 4px solid #c74c56;
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceTrue {
  border: 4px solid #0a9e9c;
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceNon {
  border: 4px solid #a0a4a8;
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceFalse3 {
  border: 4px solid #c74c56;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceTrue3 {
  border: 4px solid #0a9e9c;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceNon3 {
  border: 4px solid #a0a4a8;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.topBar {
  height: 50px;
  background-color: #0a9e9c;
  color: white;
}
</style>