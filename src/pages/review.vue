<template>
  <div class="text-body1">
    <div class="text-body1 desktop-only">
      <div class="topBar q-pt-sm q-pl-md text-h5 shadow-3 row justify-between">
        <div>
          <q-btn color="primary" icon="fas fa-home" push @click="backToMenu()" />
        </div>
        <div align="center">Winner O-NET Review</div>

        <div class="q-pr-md" align="right">
          <span>
            <q-btn
              v-show="soundOn == true"
              class="q-mx-sm bg6"
              icon="fas fa-volume-up"
              push
              @click="soundOn = false "
            />

            <q-btn
              v-show=" soundOn == false"
              class="q-mx-sm bg6"
              icon="fas fa-volume-mute"
              push
              @click="soundOn = true"
            />
          </span>

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
      <div style="height:100px"></div>
      <div v-if="mode==2" class="mainbox bg3">
        <div>
          <div class="barlinear row q-px-xl q-pt-md" style="width:100%">
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
        <div v-if="this.questionList[questionNo-1].type == 1" class="q-pt-sm row justify-center">
          <!-- คำถาม -->

          <div class="questionzone text-center text-h5">
            <div
              class="bg2 q-pa-md"
              style="border-radius: 5px;"
              v-html="this.questionList[questionNo-1].question"
            ></div>
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
          <div class="row">
            <div class="col-6 row q-py-md q-pl-xl q-pr-md">
              <div class="bg2" style="width:100%; border-radius: 5px;">
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
                  <q-btn
                    no-caps
                    dense
                    class="choiceNon bg9 col-12 q-my-sm row"
                    v-if="showMark[0]==0"
                  >
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
                  <q-btn
                    no-caps
                    dense
                    class="choiceNon bg9 col-12 q-my-sm row"
                    v-if="showMark[1]==0"
                  >
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
                  <q-btn
                    no-caps
                    dense
                    class="choiceNon bg9 col-12 q-my-sm row"
                    v-if="showMark[2]==0"
                  >
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
                  <q-btn
                    no-caps
                    dense
                    class="choiceNon bg9 col-12 q-my-sm row"
                    v-if="showMark[3]==0"
                  >
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
        <div class="col-12 text-center q-pa-md">
          <q-icon
            name="fas fa-circle"
            class="q-px-md"
            size="22px"
            color="grey"
            v-if="questionNo==1"
          />
          <span v-if="questionNo >=2 ">
            <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[0].answer" />
            <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[0].answer" />
          </span>

          <q-icon
            name="fas fa-circle"
            class="q-px-md"
            size="22px"
            color="grey"
            v-if="questionNo==2"
          />
          <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=1" />
          <span v-if="questionNo >=3 ">
            <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[1].answer" />
            <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[1].answer" />
          </span>

          <q-icon
            name="fas fa-circle"
            class="q-px-md"
            size="22px"
            color="grey"
            v-if="questionNo==3"
          />
          <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=2" />
          <span v-if="questionNo >=4 ">
            <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[2].answer" />
            <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[2].answer" />
          </span>

          <q-icon
            name="fas fa-circle"
            class="q-px-md"
            size="22px"
            color="grey"
            v-if="questionNo==4"
          />
          <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=3" />
          <span v-if="questionNo >=5 ">
            <q-icon name="fas fa-circle" class="q-px-md" color="green" v-if="userAnswer[3].answer" />
            <q-icon name="fas fa-circle" class="q-px-md" color="red" v-if="!userAnswer[3].answer" />
          </span>

          <q-icon
            name="fas fa-circle"
            class="q-px-md"
            size="22px"
            color="grey"
            v-if="questionNo==5"
          />
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
              readonly
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
            <div class="col row justify-between">
              <div style="max-width:100px;width:100%"></div>
              <div class="q-pt-sm" align="center">
                คะแนนปัจจุบัน
                {{totalScore}}
              </div>
              <div align="right">
                <q-icon
                  name="fas fa-star"
                  class="q-ma-sm color1"
                  size="md"
                  v-if="totalScore >= star1*10"
                />
                <q-icon
                  name="fas fa-star"
                  class="q-ma-sm"
                  color="grey"
                  size="md"
                  v-if="totalScore < star1*10"
                />
                <q-icon
                  name="fas fa-star"
                  class="q-ma-sm color1"
                  size="md"
                  v-if="totalScore >= star2*10"
                />
                <q-icon
                  name="fas fa-star"
                  class="q-ma-sm"
                  color="grey"
                  size="md"
                  v-if="totalScore < star2*10"
                />
                <q-icon
                  name="fas fa-star"
                  class="q-ma-sm color1"
                  size="md"
                  v-if="totalScore >= star3*10"
                />
                <q-icon
                  name="fas fa-star"
                  class="q-ma-sm"
                  color="grey"
                  size="md"
                  v-if="totalScore < star3*10"
                />
              </div>
            </div>
          </div>
          <div class="q-pa-lg q-mt-lg q-mx-lg">
            <q-list bordered class="rounded-borders" v-for="i in 5" :key="i">
              <q-expansion-item expand-separator class="bg-white">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      :color="userAnswer[i-1].answer?'secondary' : 'negative'"
                      :name="userAnswer[i-1].answer?'fas fa-check' : 'fas fa-times'"
                    />
                  </q-item-section>

                  <q-item-section>คำถามที่ {{i}}</q-item-section>
                </template>
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
                        <!-- choice 1 -->
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=1 , 'text-secondary' : userAnswer[i-1].correctAnswer ==1}"
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==1" />
                          </div>
                          <div>
                            1.
                            {{questionList[i-1].choice1}}
                          </div>
                        </div>
                        <!-- choice 2 -->
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=2, 'text-secondary' : userAnswer[i-1].correctAnswer ==2}"
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==2" />
                          </div>
                          <div>
                            2.
                            {{questionList[i-1].choice2}}
                          </div>
                        </div>
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=3 , 'text-secondary' : userAnswer[i-1].correctAnswer ==3} "
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==3" />
                          </div>
                          <div>3. {{questionList[i-1].choice3}}</div>
                        </div>
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=4  , 'text-secondary' : userAnswer[i-1].correctAnswer ==4}"
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==4" />
                          </div>
                          <div>4. {{questionList[i-1].choice4}}</div>
                        </div>
                      </div>
                      <div v-else>
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=1 && userAnswer[i-1].userAnswer != 1 , 'text-secondary' : userAnswer[i-1].correctAnswer ==1, 'text-negative' : userAnswer[i-1].correctAnswer !=1 && userAnswer[i-1].userAnswer ==1,}"
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==1" />
                            <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==1" />
                          </div>
                          <div>1. {{questionList[i-1].choice1}}</div>
                        </div>
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=2 && userAnswer[i-1].userAnswer != 2 , 'text-secondary' : userAnswer[i-1].correctAnswer ==2, 'text-negative' : userAnswer[i-1].correctAnswer !=2 && userAnswer[i-1].userAnswer ==2,}"
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==2" />
                            <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==2" />
                          </div>
                          <div>2. {{questionList[i-1].choice2}}</div>
                        </div>
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=3 && userAnswer[i-1].userAnswer != 3 , 'text-secondary' : userAnswer[i-1].correctAnswer ==3, 'text-negative' : userAnswer[i-1].correctAnswer !=3 && userAnswer[i-1].userAnswer ==3,}"
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==3" />
                            <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==3" />
                          </div>
                          <div>3. {{questionList[i-1].choice3}}</div>
                        </div>
                        <div
                          :class="{'text-grey' : userAnswer[i-1].correctAnswer !=4 && userAnswer[i-1].userAnswer != 4 , 'text-secondary' : userAnswer[i-1].correctAnswer ==4, 'text-negative' : userAnswer[i-1].correctAnswer !=4 && userAnswer[i-1].userAnswer ==4,}"
                          class="row"
                        >
                          <div style="width:30px;">
                            <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==4" />
                            <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==4" />
                          </div>
                          <div>4. {{questionList[i-1].choice4}}</div>
                        </div>
                      </div>
                    </div>

                    <!-- กรณีตอบถูก -->
                    <div v-if="questionList[i-1].type ==3">
                      <div
                        class="row"
                        v-if="userAnswer[i-1].correctAnswer == userAnswer[i-1].userAnswer"
                      >
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==1">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>

                            <span class="q-pl-md absolute-center">1</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer1URL"
                            />
                          </div>
                        </div>
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==2">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>

                            <span class="q-pl-md absolute-center">2</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer2URL"
                            />
                          </div>
                        </div>
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==3">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>

                            <span class="q-pl-md absolute-center">3</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer3URL"
                            />
                          </div>
                        </div>
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==4">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>

                            <span class="q-pl-md absolute-center">4</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer4URL"
                            />
                          </div>
                        </div>
                        <!-- wd -->
                      </div>
                      <!-- กรณีตอบผิด -->
                      <div class="row" v-else>
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==1">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>
                            <span v-if="userAnswer[i-1].userAnswer==1">
                              <q-icon color="negative" size="sm" name="fas fa-times" />
                            </span>
                            <span class="q-pl-md absolute-center">1</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer1URL"
                            />
                          </div>
                        </div>
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==2">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>
                            <span v-if="userAnswer[i-1].userAnswer==2">
                              <q-icon color="negative" size="sm" name="fas fa-times" />
                            </span>
                            <span class="q-pl-md absolute-center">2</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer2URL"
                            />
                          </div>
                        </div>
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==3">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>
                            <span v-if="userAnswer[i-1].userAnswer==3">
                              <q-icon color="negative" size="sm" name="fas fa-times" />
                            </span>
                            <span class="q-pl-md absolute-center">3</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer3URL"
                            />
                          </div>
                        </div>
                        <div class="row col-6">
                          <div
                            class="relative-position col-2 self-center"
                            style="width:60px"
                            align="left"
                          >
                            <span v-if="userAnswer[i-1].correctAnswer==4">
                              <q-icon color="secondary" size="sm" name="fas fa-check" />
                            </span>
                            <span v-if="userAnswer[i-1].userAnswer==4">
                              <q-icon color="negative" size="sm" name="fas fa-times" />
                            </span>
                            <span class="q-pl-md absolute-center">4</span>
                          </div>
                          <div class="col">
                            <img
                              style="max-width:100%;height:180px;object-fit:scale-down"
                              :src="questionList[i-1].answer4URL"
                            />
                          </div>
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
    <!-- mobile -->
    <div class="mobile-only orientation-portrait">
      <div class="topBarMobile q-pa-sm shadow-3">
        <div class="row justify-between">
          <div>
            <q-btn color="primary" icon="fas fa-home" push @click="backToMenu()" />
          </div>
          <div class="text-center q-pt-xs titleBar">Winner</div>
          <div class="row" align="right">
            <q-btn
              v-show="soundOn == true"
              class="q-mx-sm bg6"
              icon="fas fa-volume-up"
              push
              @click="soundOn = false "
            />

            <q-btn
              v-show=" soundOn == false"
              class="q-mx-sm bg6"
              icon="fas fa-volume-mute"
              push
              @click="soundOn = true"
            />
            <q-btn color="negative " icon="fas fa-sign-out-alt" push @click="confirm=true" />
          </div>
        </div>
      </div>

      <div>
        <div v-if="mode==1" class="absolute-center">
          <q-spinner-dots color="amber-2" size="100px" />
        </div>

        <div v-if="mode==2">
          <div class="text-center q-pa-sm text-white titleBar">แบบฝึกหัดทบทวน</div>
          <div class="bg3">
            <div>
              <div>
                <div class="row q-pa-sm" style="width:100%">
                  <div class="col-7 row" style="height:10px">
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
                  <div class="col-5 q-pl-md">
                    <div class="text-center q-pt-xs bg2" style="height:60px; border-radius: 5px;">
                      <span>คะแนนปัจจุบัน</span>
                      <br />
                      <span>{{totalScore}}</span>
                    </div>
                  </div>
                </div>

                <!-- <div>คะแนนทั้งหมด {{totalAllScore}}</div> -->
              </div>
              <div v-if="this.questionList[questionNo-1].type == 1" class="row justify-center">
                <!-- คำถาม -->

                <div class="textMobile">
                  <div class="bg2 q-pa-md" v-html="this.questionList[questionNo-1].question"></div>
                </div>
                <!-- choice -->
                <div class="col-12 row justify-center q-pt-md q-px-sm" v-if="!answerMode">
                  <q-btn
                    no-caps
                    dense
                    class="choice1Mobile bg1 col-12 q-my-xs row"
                    @click="answer(1)"
                  >
                    <div class="col-3" style="width:100px  ">
                      <q-icon size="50px" color="white" name="fas fa-motorcycle" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice1}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choice2Mobile bg7 col-12 q-my-xs row"
                    @click="answer(2)"
                  >
                    <div class="col-3" style="width:100px  ">
                      <q-icon size="50px" color="white" name="fas fa-car-side" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice2}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choice3Mobile bg6 col-12 q-my-xs row"
                    @click="answer(3)"
                  >
                    <div class="col-3" style="width:100px  ">
                      <q-icon size="50px" color="white" name="fas fa-helicopter" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice3}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choice4Mobile bg8 col-12 q-my-xs row"
                    @click="answer(4)"
                  >
                    <div class="col-3" style="width:100px  ">
                      <q-icon size="50px" color="white" name="fas fa-plane" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice4}}</div>
                    </div>
                  </q-btn>
                </div>
                <!-- answer -->
                <div class="col-12 row justify-center q-pt-md q-px-sm" v-if="answerMode">
                  <!-- answer1 -->
                  <q-btn
                    no-caps
                    dense
                    class="choiceFalseMobile bg4 col-12 q-my-xs row"
                    v-if="showMark[0]==2"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-times" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice1}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceTrueMobile bg5 col-12 q-my-xs row"
                    v-if="showMark[0]==1"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-check" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice1}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceNonMobile bg9 col-12 q-my-xs row"
                    v-if="showMark[0]==0"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="50px" name="fas fa-motorcycle" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice1}}</div>
                    </div>
                  </q-btn>
                  <!-- answer2 -->
                  <q-btn
                    no-caps
                    dense
                    class="choiceFalseMobile bg4 col-12 q-my-xs row"
                    v-if="showMark[1]==2"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-times" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice2}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceTrueMobile bg5 col-12 q-my-xs row"
                    v-if="showMark[1]==1"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-check" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice2}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceNonMobile bg9 col-12 q-my-xs row"
                    v-if="showMark[1]==0"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="50px" name="fas fa-car-side" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice2}}</div>
                    </div>
                  </q-btn>
                  <!-- answer3 -->
                  <q-btn
                    no-caps
                    dense
                    class="choiceFalseMobile bg4 col-12 q-my-xs row"
                    v-if="showMark[2]==2"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-times" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice3}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceTrueMobile bg5 col-12 q-my-xs row"
                    v-if="showMark[2]==1"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-check" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice3}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceNonMobile bg9 col-12 q-my-xs row"
                    v-if="showMark[2]==0"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="50px" name="fas fa-helicopter" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice3}}</div>
                    </div>
                  </q-btn>
                  <!-- answer4 -->
                  <q-btn
                    no-caps
                    dense
                    class="choiceFalseMobile bg4 col-12 q-my-xs row"
                    v-if="showMark[3]==2"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-times" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice4}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceTrueMobile bg5 col-12 q-my-xs row"
                    v-if="showMark[3]==1"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="70px" name="fas fa-check" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
                        align="left"
                        style="width:100%"
                      >{{this.questionList[questionNo-1].choice4}}</div>
                    </div>
                  </q-btn>
                  <q-btn
                    no-caps
                    dense
                    class="choiceNonMobile bg9 col-12 q-my-xs row"
                    v-if="showMark[3]==0"
                  >
                    <div class="col-3" style="width:100px ">
                      <q-icon size="50px" name="fas fa-plane" color="white" />
                    </div>
                    <div class="col bg-white box relative-position" style="height:90px">
                      <div
                        class="textMobile q-px-md absolute-center"
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
                <div class="row">
                  <div class="col-12 row">
                    <div class="bg2" style="width:100%; border-radius: 5px;">
                      <div
                        class="col-12 questionzone text-left q-py-md textMobile"
                      >{{this.questionList[questionNo-1].question}}</div>
                      <div class="col-12 q-pb-md" align="center">
                        <img style="width:90%" :src="questionList[questionNo-1].questionURL" alt />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 q-py-sm q-pt-md q-px-sm">
                    <div>
                      <!-- choice -->
                      <div class="row justify-center" v-if="!answerMode">
                        <q-btn
                          no-caps
                          dense
                          class="choice1Mobile bg1 col-12 q-my-xs row"
                          @click="answer(1)"
                        >
                          <div class="col-3" style="width:100px  ">
                            <q-icon size="50px" color="white" name="fas fa-motorcycle" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice1}}</div>
                          </div>
                        </q-btn>
                        <!-- 2 -->
                        <q-btn
                          no-caps
                          dense
                          class="choice2Mobile bg7 col-12 q-my-xs row"
                          @click="answer(2)"
                        >
                          <div class="col-3" style="width:100px  ">
                            <q-icon size="50px" color="white" name="fas fa-car-side" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice2}}</div>
                          </div>
                        </q-btn>
                        <!-- 3 -->
                        <q-btn
                          no-caps
                          dense
                          class="choice3Mobile bg6 col-12 q-my-xs row"
                          @click="answer(3)"
                        >
                          <div class="col-3" style="width:100px  ">
                            <q-icon size="50px" color="white" name="fas fa-helicopter" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice3}}</div>
                          </div>
                        </q-btn>
                        <!-- 4 -->
                        <q-btn
                          no-caps
                          dense
                          class="choice4Mobile bg8 col-12 q-my-xs row"
                          @click="answer(4)"
                        >
                          <div class="col-3" style="width:100px  ">
                            <q-icon size="50px" color="white" name="fas fa-plane" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
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
                          class="choiceFalseMobile bg4 col-12 q-my-xs row"
                          v-if="showMark[0]==2"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-times" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice1}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceTrueMobile bg5 col-12 q-my-xs row"
                          v-if="showMark[0]==1"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-check" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice1}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceNonMobile bg9 col-12 q-my-xs row"
                          v-if="showMark[0]==0"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="50px" name="fas fa-motorcycle" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice1}}</div>
                          </div>
                        </q-btn>
                        <!-- answer2 -->
                        <q-btn
                          no-caps
                          dense
                          class="choiceFalseMobile bg4 col-12 q-my-xs row"
                          v-if="showMark[1]==2"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-times" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice2}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceTrueMobile bg5 col-12 q-my-xs row"
                          v-if="showMark[1]==1"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-check" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice2}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceNonMobile bg9 col-12 q-my-xs row"
                          v-if="showMark[1]==0"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="50px" name="fas fa-car-side" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice2}}</div>
                          </div>
                        </q-btn>
                        <!-- answer3 -->
                        <q-btn
                          no-caps
                          dense
                          class="choiceFalseMobile bg4 col-12 q-my-xs row"
                          v-if="showMark[2]==2"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-times" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice3}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceTrueMobile bg5 col-12 q-my-xs row"
                          v-if="showMark[2]==1"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-check" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice3}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceNonMobile bg9 col-12 q-my-xs row"
                          v-if="showMark[2]==0"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="50px" name="fas fa-helicopter" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice3}}</div>
                          </div>
                        </q-btn>
                        <!-- answer4 -->
                        <q-btn
                          no-caps
                          dense
                          class="choiceFalseMobile bg4 col-12 q-my-xs row"
                          v-if="showMark[3]==2"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-times" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice4}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceTrueMobile bg5 col-12 q-my-xs row"
                          v-if="showMark[3]==1"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="70px" name="fas fa-check" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
                              align="left"
                              style="width:100%"
                            >{{this.questionList[questionNo-1].choice4}}</div>
                          </div>
                        </q-btn>
                        <q-btn
                          no-caps
                          dense
                          class="choiceNonMobile bg9 col-12 q-my-xs row"
                          v-if="showMark[3]==0"
                        >
                          <div class="col-3" style="width:100px ">
                            <q-icon size="50px" name="fas fa-plane" color="white" />
                          </div>
                          <div class="col bg-white box relative-position" style="height:90px">
                            <div
                              class="textMobile q-px-md absolute-center"
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
                    class="questionzone bg2 text-left q-pa-md textMobile"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-md"
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
                            class="textMobile q-px-md absolute-center q-py-md"
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
                            class="textMobile q-px-md absolute-center q-py-md"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
                            class="textMobile q-px-md absolute-center q-py-sm"
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
              <div class="col-12 text-center q-pa-md">
                <q-icon
                  name="fas fa-circle"
                  class="q-px-md"
                  size="22px"
                  color="grey"
                  v-if="questionNo==1"
                />
                <span v-if="questionNo >=2 ">
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="green"
                    v-if="userAnswer[0].answer"
                  />
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="red"
                    v-if="!userAnswer[0].answer"
                  />
                </span>

                <q-icon
                  name="fas fa-circle"
                  class="q-px-md"
                  size="22px"
                  color="grey"
                  v-if="questionNo==2"
                />
                <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=1" />
                <span v-if="questionNo >=3 ">
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="green"
                    v-if="userAnswer[1].answer"
                  />
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="red"
                    v-if="!userAnswer[1].answer"
                  />
                </span>

                <q-icon
                  name="fas fa-circle"
                  class="q-px-md"
                  size="22px"
                  color="grey"
                  v-if="questionNo==3"
                />
                <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=2" />
                <span v-if="questionNo >=4 ">
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="green"
                    v-if="userAnswer[2].answer"
                  />
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="red"
                    v-if="!userAnswer[2].answer"
                  />
                </span>

                <q-icon
                  name="fas fa-circle"
                  class="q-px-md"
                  size="22px"
                  color="grey"
                  v-if="questionNo==4"
                />
                <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=3" />
                <span v-if="questionNo >=5 ">
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="green"
                    v-if="userAnswer[3].answer"
                  />
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="red"
                    v-if="!userAnswer[3].answer"
                  />
                </span>

                <q-icon
                  name="fas fa-circle"
                  class="q-px-md"
                  size="22px"
                  color="grey"
                  v-if="questionNo==5"
                />
                <q-icon name="fas fa-circle" class="q-px-md" color="grey" v-if="questionNo<=4" />
                <span v-if="questionNo >=6 ">
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="green"
                    v-if="userAnswer[4].answer"
                  />
                  <q-icon
                    name="fas fa-circle"
                    class="q-px-md"
                    color="red"
                    v-if="!userAnswer[4].answer"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- summary -->
        <div class="row" v-if="mode==3">
          <div class="q-pa-md text-white col-12 text-center">แบบฝึกหัดทบทวน</div>
          <div class="bg3" style="width:100%">
            <div class="row">
              <div class="q-pa-sm text-center">
                <q-knob
                  readonly
                  :min="0"
                  :max="5"
                  v-model="scoreSection"
                  show-value
                  size="90px"
                  :thickness="0.22"
                  color="teal "
                  class="bg10 text-white"
                  style="border-radius:50px;"
                />
              </div>
              <div class="col">
                <div>
                  <q-icon
                    name="fas fa-star"
                    class="q-ma-sm color1"
                    size="md"
                    v-if="totalScore >= star1*10"
                  />
                  <q-icon
                    name="fas fa-star"
                    class="q-ma-sm"
                    color="grey"
                    size="md"
                    v-if="totalScore < star1*10"
                  />
                  <q-icon
                    name="fas fa-star"
                    class="q-ma-sm color1"
                    size="md"
                    v-if="totalScore >= star2*10"
                  />
                  <q-icon
                    name="fas fa-star"
                    class="q-ma-sm"
                    color="grey"
                    size="md"
                    v-if="totalScore < star2*10"
                  />
                  <q-icon
                    name="fas fa-star"
                    class="q-ma-sm color1"
                    size="md"
                    v-if="totalScore >= star3*10"
                  />
                  <q-icon
                    name="fas fa-star"
                    class="q-ma-sm"
                    color="grey"
                    size="md"
                    v-if="totalScore < star3*10"
                  />
                </div>
                <div class="q-px-sm">
                  คะแนนปัจจุบัน
                  <span>{{totalScore}}</span>
                </div>
              </div>
            </div>
            <div class="q-pa-sm">
              <q-list bordered class="rounded-borders" v-for="i in 5" :key="i">
                <q-expansion-item expand-separator class="bg-white">
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-icon
                        :color="userAnswer[i-1].answer?'secondary' : 'negative'"
                        :name="userAnswer[i-1].answer?'fas fa-check' : 'fas fa-times'"
                      />
                    </q-item-section>

                    <q-item-section>คำถามที่ {{i}}</q-item-section>
                  </template>
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
                          <!-- choice 1 -->
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=1 , 'text-secondary' : userAnswer[i-1].correctAnswer ==1}"
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==1" />
                            </div>
                            <div>
                              1.
                              {{questionList[i-1].choice1}}
                            </div>
                          </div>
                          <!-- choice 2 -->
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=2, 'text-secondary' : userAnswer[i-1].correctAnswer ==2}"
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==2" />
                            </div>
                            <div>
                              2.
                              {{questionList[i-1].choice2}}
                            </div>
                          </div>
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=3 , 'text-secondary' : userAnswer[i-1].correctAnswer ==3} "
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==3" />
                            </div>
                            <div>3. {{questionList[i-1].choice3}}</div>
                          </div>
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=4  , 'text-secondary' : userAnswer[i-1].correctAnswer ==4}"
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==4" />
                            </div>
                            <div>4. {{questionList[i-1].choice4}}</div>
                          </div>
                        </div>
                        <div v-else>
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=1 && userAnswer[i-1].userAnswer != 1 , 'text-secondary' : userAnswer[i-1].correctAnswer ==1, 'text-negative' : userAnswer[i-1].correctAnswer !=1 && userAnswer[i-1].userAnswer ==1,}"
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==1" />
                              <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==1" />
                            </div>
                            <div>1. {{questionList[i-1].choice1}}</div>
                          </div>
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=2 && userAnswer[i-1].userAnswer != 2 , 'text-secondary' : userAnswer[i-1].correctAnswer ==2, 'text-negative' : userAnswer[i-1].correctAnswer !=2 && userAnswer[i-1].userAnswer ==2,}"
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==2" />
                              <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==2" />
                            </div>
                            <div>2. {{questionList[i-1].choice2}}</div>
                          </div>
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=3 && userAnswer[i-1].userAnswer != 3 , 'text-secondary' : userAnswer[i-1].correctAnswer ==3, 'text-negative' : userAnswer[i-1].correctAnswer !=3 && userAnswer[i-1].userAnswer ==3,}"
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==3" />
                              <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==3" />
                            </div>
                            <div>3. {{questionList[i-1].choice3}}</div>
                          </div>
                          <div
                            :class="{'text-grey' : userAnswer[i-1].correctAnswer !=4 && userAnswer[i-1].userAnswer != 4 , 'text-secondary' : userAnswer[i-1].correctAnswer ==4, 'text-negative' : userAnswer[i-1].correctAnswer !=4 && userAnswer[i-1].userAnswer ==4,}"
                            class="row"
                          >
                            <div style="width:30px;">
                              <q-icon name="fas fa-check" v-if="userAnswer[i-1].correctAnswer ==4" />
                              <q-icon name="fas fa-times" v-if="userAnswer[i-1].userAnswer ==4" />
                            </div>
                            <div>4. {{questionList[i-1].choice4}}</div>
                          </div>
                        </div>
                      </div>

                      <!-- กรณีตอบถูก -->
                      <div v-if="questionList[i-1].type ==3">
                        <div v-if="userAnswer[i-1].correctAnswer == userAnswer[i-1].userAnswer">
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==1">
                                <q-icon color="secondary" size="sm" name="fas fa-check" />
                              </span>

                              <span class="q-pl-md absolute-center">1</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer1URL"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==2">
                                <q-icon color="secondary" size="sm" name="fas fa-check" />
                              </span>

                              <span class="q-pl-md absolute-center">2</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer2URL"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==3">
                                <q-icon color="secondary" size="sm" name="fas fa-check" />
                              </span>

                              <span class="q-pl-md absolute-center">3</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer3URL"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==4">
                                <q-icon color="secondary" size="sm" name="fas fa-check" />
                              </span>

                              <span class="q-pl-md absolute-center">4</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer4URL"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- กรณีตอบผิด -->
                        <div v-else>
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==1">
                                <q-icon color="secondary" size="sm" name="fas fa-check" />
                              </span>
                              <span v-if="userAnswer[i-1].userAnswer==1">
                                <q-icon color="negative" size="sm" name="fas fa-times" />
                              </span>
                              <span class="q-pl-md absolute-center">1</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer1URL"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==2">
                                <q-icon color="secondary " size="sm" name="fas fa-check" />
                              </span>
                              <span v-if="userAnswer[i-1].userAnswer==2">
                                <q-icon color="negative" size="sm" name="fas fa-times" />
                              </span>
                              <span class="q-pl-md absolute-center">2</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer2URL"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==3">
                                <q-icon color="secondary" size="sm" name="fas fa-check" />
                              </span>
                              <span v-if="userAnswer[i-1].userAnswer==3">
                                <q-icon color="negative" size="sm" name="fas fa-times" />
                              </span>
                              <span class="q-pl-md absolute-center">3</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer3URL"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class="relative-position col-2 self-center"
                              style="width:60px"
                              align="left"
                            >
                              <span v-if="userAnswer[i-1].correctAnswer==4">
                                <q-icon color="secondary" size="sm" name="fas fa-check" />
                              </span>
                              <span v-if="userAnswer[i-1].userAnswer==4">
                                <q-icon color="negative" size="sm" name="fas fa-times" />
                              </span>
                              <span class="q-pl-md absolute-center">4</span>
                            </div>
                            <div class="col">
                              <img
                                style="max-width:100%;height:180px;object-fit:scale-down"
                                :src="questionList[i-1].answer4URL"
                              />
                            </div>
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
                  class="bg5 q-ma-xs text-white"
                  style="width:190px"
                  label="เริ่มทำต่อ"
                  @click="doIt()"
                />
                <q-btn
                  class="bg-white q-ma-xs"
                  style="width:190px"
                  label="กลับเมนูหลัก"
                  @click="backToMenu()"
                />
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
      confirm: false,
      soundOn: true
    };
  },
  methods: {
    logout() {
      this.notifyGreen("ออกจากระบบ");
      this.$q.localStorage.set("studentData", "");
      this.$router.push("/");
    },
    async loadData() {
      this.questionList = [];
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
        let sectionId = this.sectionList[i - 1].id;
        db.collection("question")
          .doc("Server")
          .collection("data")
          .where("section", "==", sectionId)
          // .where("type", "==", 3)
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
      }, 5000);

      //ทำการ random เลือกข้อที่ต้องการมาทำ 5 ข้อ
      //สร้าง array ของโจทย์ที่ต้องการ
    },
    answer(choice) {
      var audioTrue = new Audio("../statics/correct.mp3");
      var audioFalse = new Audio("../statics/fail.mp3");
      this.showMark = [0, 0, 0, 0];
      if (choice == this.questionList[this.questionNo - 1].correctAnswer) {
        //กรณีตอบถูก
        if (this.soundOn) {
          audioTrue.play();
        }
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
        if (this.soundOn) {
          audioFalse.play();
        }

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
      if (this.questionNo >= 5) {
        setTimeout(() => {
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
        }, 2000);

        setTimeout(() => {
          this.mode = 3;
        }, 3000);
      } else {
        setTimeout(() => {
          this.questionNo++;
          this.answerMode = false;
        }, 3000);
      }
    },
    backToMenu() {
      this.$router.push("/main");
    },
    doIt() {
      this.questionList.splice(0, 5);
      this.answerMode = false;
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
    if (this.studentData == "") {
      this.$router.push("/");
      return;
    }
    this.loadData();

    // Temp data//
    // this.mode = 3;
    // this.totalScore = 100;
    // this.totalAllScore = 300;
    // this.scoreSection = 3;
    //*********** Sample data */ For type 1/2
    // this.questionList = [
    //   {
    //     answer1URL: "",
    //     answer2URL: "",
    //     answer3URL: "",
    //     answer4URL: "",
    //     choice1: "Fall",
    //     choice2: "Summer",
    //     choice3: "Spring",
    //     choice4: "Winter",
    //     correctAnswer: 2,
    //     description:
    //       "โจทย์ : ฤดูกาลใดที่มีอุณหภูมิสูงที่สุด<br>\nตอบ : Summer แปลว่า ฤดูร้อน เพราะ Fall แปลว่า ฤดูใบไม้ร่วง, Spring แปลว่า ฤดูใบไม้ผลิ, Winter แปลว่า ฤดูหนาว",
    //     orderId: 250,
    //     practiceKey: "UTPM6GudYhB7zMbvIWoi",
    //     question: "Which season has the hottest temperature?",
    //     questionURL: "",
    //     section: "UTPM6GudYhB7zMbvIWoi",
    //     type: 1
    //   },
    //   {
    //     answer1URL: "",
    //     answer2URL: "",
    //     answer3URL: "",
    //     answer4URL: "",
    //     choice1: "bacon, eggs, and sausages",
    //     choice2: "pizza and spaghetti",
    //     choice3: "steamed rice and beef curry",
    //     choice4: "roasted chicken and papaya salad",
    //     correctAnswer: 4,
    //     description:
    //       "โจทย์ : ข้อใดต่อไปนี้คืออาหารไทย<br>\nตอบ : roasted chicken and papaya salad <br>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เพราะมีคำสำคัญ คือ papaya salad แปลว่า ไก่ย่าง และ ส้มตำ",
    //     orderId: 200,
    //     practiceKey: "UTPM6GudYhB7zMbvIWoi",
    //     question: "Which of the following is Thai food?",
    //     questionURL: "",
    //     section: "UTPM6GudYhB7zMbvIWoi",
    //     type: 1
    //   },
    //   {
    //     answer1URL: "",
    //     answer2URL: "",
    //     answer3URL: "",
    //     answer4URL: "",
    //     choice1: "Winter, Summer",
    //     choice2: "Rainy, Summer",
    //     choice3: "Spring, Rainy",
    //     choice4: "Winter, Autumn",
    //     correctAnswer: 1,
    //     description:
    //       "โจทย์ : ฤดูกาลใดที่พบทั้งในประเทศอเมริกาและประเทศไทย<br>\nตอบ : Winter, Summer แปลว่า ฤดูหนาว และฤดูร้อน <br>\n        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ประเทศไทยมี 3 ฤดู คือ ฤดูร้อน(Summer) ฤดูหนาว(Winter) ฤดูฝน(Rainy)<br>\n        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ประเทศอเมริกามี 4 ฤดู คือ ฤดูใบไม้ผลิ(Spring) ฤดูร้อน(Summer) ฤดูใบไม้ร่วง(Fall) ฤดูหนาว(Winter)",
    //     orderId: 220,
    //     practiceKey: "UTPM6GudYhB7zMbvIWoi",
    //     question: "Which seasons can be found in both America and Thailand?",
    //     questionURL: "",
    //     section: "UTPM6GudYhB7zMbvIWoi",
    //     type: 1
    //   },
    //   {
    //     answer1URL: "",
    //     answer2URL: "",
    //     answer3URL: "",
    //     answer4URL: "",
    //     choice1: "They carve ghost pumpkins.",
    //     choice2: "They splash water on each other.",
    //     choice3: "They send handmade cards to their fathers.",
    //     choice4: "They give jasmine flowers to their mothers.",
    //     correctAnswer: 1,
    //     description:
    //       "โจทย์ : ในวันที่ 31 ตุลาคม เด็กๆ และผู้ใหญ่เฉลิมฉลองฮาโลวีน ปกติพวกเขาทำอะไรกัน<br>\nตอบ : They carve ghost pumpkins. แปลว่า พวกเขาแกะสลักฟักทองรูปผี เพราะมีคำสำคัญคือ ghost pumpkins",
    //     orderId: 270,
    //     practiceKey: "UTPM6GudYhB7zMbvIWoi",
    //     question:
    //       "On October 31, children and adults celebrate Halloween. What do they usually do?",
    //     questionURL: "",
    //     section: "UTPM6GudYhB7zMbvIWoi",
    //     type: 1
    //   },
    //   {
    //     answer1URL: "",
    //     answer2URL: "",
    //     answer3URL: "",
    //     answer4URL: "",
    //     choice1: "Summer",
    //     choice2: "Winter",
    //     choice3: "Rainy",
    //     choice4: "Autumn",
    //     correctAnswer: 4,
    //     description:
    //       "โจทย์ : ฤดูกาลใดที่ไม่สามารถพบในประเทศไทย<br>\nตอบ : Autumn แปลว่า ฤดูใบไม้ร่วง<br>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เพราะ ประเทศไทยมี 3 ฤดู คือ ฤดูร้อน(Summer) ฤดูหนาว(Winter) ฤดูฝน(Rainy)",
    //     orderId: 210,
    //     practiceKey: "UTPM6GudYhB7zMbvIWoi",
    //     question: "Which season can not be found in Thailand?",
    //     questionURL: "",
    //     section: "UTPM6GudYhB7zMbvIWoi",
    //     type: 1
    //   }
    // ];
    // this.userAnswer = [
    //   { no: 1, userAnswer: 2, correctAnswer: 2, answer: true },
    //   { no: 2, userAnswer: 2, correctAnswer: 4, answer: false },
    //   { no: 3, userAnswer: 4, correctAnswer: 1, answer: false },
    //   { no: 4, userAnswer: 2, correctAnswer: 1, answer: false },
    //   { no: 5, userAnswer: 4, correctAnswer: 4, answer: true }
    // ];
    //*********** Sample data */ For type 3
    // this.questionList = [
    //   {
    //     answer1URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FwpAgEzvNyEINo3IWQ6Jq-1.jpg?alt=media&token=a618a756-2c30-4a0b-b188-22cadf1b9d44",
    //     answer2URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FwpAgEzvNyEINo3IWQ6Jq-2.jpg?alt=media&token=16135c2e-9bad-4ed4-a529-c860d2ef7314",
    //     answer3URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FwpAgEzvNyEINo3IWQ6Jq-3.jpg?alt=media&token=bd89086c-96aa-4abc-b980-7f9515fe00c6",
    //     answer4URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FwpAgEzvNyEINo3IWQ6Jq-4.jpg?alt=media&token=8cf9d930-d873-42ed-a3fb-31ed566499e1",
    //     choice1: "",
    //     choice2: "",
    //     choice3: "",
    //     choice4: "",
    //     correctAnswer: 2,
    //     description:
    //       'โจทย์ : แผนภาพใดบรรยายประโยค "นักเรียนส่วนมากเล่นวอลเลย์บอลหลังเลิกเรียน"\nตอบ : most แปลว่า ส่วนใหญ่ / ส่วนมาก',
    //     orderId: 710,
    //     practiceKey: "ZA2TDcOSW8zBy8PDPrIc",
    //     question:
    //       'Which chart describes the sentence,"Most students play volleyball after class"?',
    //     questionURL: "",
    //     section: "ZA2TDcOSW8zBy8PDPrIc",
    //     type: 3
    //   },
    //   {
    //     answer1URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FOQLUCBddayUPMTXJXYTP-1.jpg?alt=media&token=b9f63221-57b3-402b-b6ba-051eafa47cd1",
    //     answer2URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FOQLUCBddayUPMTXJXYTP-2.jpg?alt=media&token=c184d9f2-e8c6-45fd-af9d-761500c512b3",
    //     answer3URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FOQLUCBddayUPMTXJXYTP-3.jpg?alt=media&token=4af7f48c-aa75-49c2-892b-245c406e678f",
    //     answer4URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FOQLUCBddayUPMTXJXYTP-4.jpg?alt=media&token=94493084-c8da-4ad0-b375-fe524986e538",
    //     choice1: "",
    //     choice2: "",
    //     choice3: "",
    //     choice4: "",
    //     correctAnswer: 2,
    //     description:
    //       "โจทย์ : ทะเลเป็น 85% ของพื้นผิวโลก ในขณะที่พื้นดินเป็น 15% กราฟใดถูกต้อง\nตอบ : กราฟที่เป็นทะเลที่มีพื้นที่มากกว่าพื้นดินสามในสี่ของกราฟ",
    //     orderId: 730,
    //     practiceKey: "ZA2TDcOSW8zBy8PDPrIc",
    //     question:
    //       "The sea is 85% of the earth's surface while land is 15% Which graph is correct?",
    //     questionURL: "",
    //     section: "ZA2TDcOSW8zBy8PDPrIc",
    //     type: 3
    //   },
    //   {
    //     answer1URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FLnv4WCQSDVOGOhQlEEZu-1.jpg?alt=media&token=7dbd13e3-ce9b-41b8-a81c-e7704113e7a5",
    //     answer2URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FLnv4WCQSDVOGOhQlEEZu-2.jpg?alt=media&token=392ff4c0-7ffb-4aee-8e80-0460aefedd90",
    //     answer3URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FLnv4WCQSDVOGOhQlEEZu-3.jpg?alt=media&token=1aacc6bd-6d94-44a3-ad45-a65f063b2f94",
    //     answer4URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FLnv4WCQSDVOGOhQlEEZu-4.jpg?alt=media&token=60d503d4-31bd-4591-a211-dc594003031f",
    //     choice1: "",
    //     choice2: "",
    //     choice3: "",
    //     choice4: "",
    //     correctAnswer: 1,
    //     description:
    //       "โจทย์ : ในปี 2012 วรรณาได้คะแนนภาษาอังกฤษ 60 คะแนน ในปี 2013 เธอได้มากว่า คะแนนเดิม 10 คะแนน แผนภูมิใดถูกต้อง\nตอบ : ภาพที่คะแนนในปี 2013 มีคะแนนมากกว่าปี 2012 อยู่ 10 คะแนน\n",
    //     orderId: 793,
    //     practiceKey: "ZA2TDcOSW8zBy8PDPrIc",
    //     question:
    //       "In 2012  Wanna got 60 points in English. In 2013, she got ten more points. Which diagram is correct?",
    //     questionURL: "",
    //     section: "ZA2TDcOSW8zBy8PDPrIc",
    //     type: 3
    //   },
    //   {
    //     answer1URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FCKGc951JLBEXRwOxXgD5-1.jpg?alt=media&token=2c19e7df-4ce0-4ffe-8252-4ecfc673c8e2",
    //     answer2URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FCKGc951JLBEXRwOxXgD5-2.jpg?alt=media&token=2dcd0af2-ee4b-4275-9653-6a38297475f8",
    //     answer3URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FCKGc951JLBEXRwOxXgD5-3.jpg?alt=media&token=962c0899-fb63-4c74-9eef-ad283e960e64",
    //     answer4URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2FCKGc951JLBEXRwOxXgD5-4.jpg?alt=media&token=22a19219-2455-4468-9065-c910ecb66a96",
    //     choice1: "",
    //     choice2: "",
    //     choice3: "",
    //     choice4: "",
    //     correctAnswer: 1,
    //     description:
    //       " โจทย์ : แผนภูมิใดอภิบายปรโยค “นักเรียนส่วนมากเล่นฟุตบอลหลังเลิกเรียน”\n ตอบ : ภาพแผนภูมิที่มีพื้นที่ของฟุตบอลมากที่สุด\n",
    //     orderId: 791,
    //     practiceKey: "ZA2TDcOSW8zBy8PDPrIc",
    //     question:
    //       "Which chart describes the sentence, “ Most students play football after class”?",
    //     questionURL: "",
    //     section: "ZA2TDcOSW8zBy8PDPrIc",
    //     type: 3
    //   },
    //   {
    //     answer1URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F9nc6ZyGiMCettoaZY4Vp-1.jpg?alt=media&token=28cfbc3c-a247-4cf4-a09a-0c7e6ed2a793",
    //     answer2URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F9nc6ZyGiMCettoaZY4Vp-2.jpg?alt=media&token=08b3ebd6-237d-4eab-b7f7-3a38c8fa706f",
    //     answer3URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F9nc6ZyGiMCettoaZY4Vp-3.jpg?alt=media&token=83d80657-0e59-43fb-8466-7b6ccad6917b",
    //     answer4URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F9nc6ZyGiMCettoaZY4Vp-4.jpg?alt=media&token=deb21ddd-290b-4b6a-b1d0-43cf48bf3b25",
    //     choice1: "",
    //     choice2: "",
    //     choice3: "",
    //     choice4: "",
    //     correctAnswer: 3,
    //     description:
    //       "โจทย์ : ในพิพิธภัณฑ์สัตว์น้ำ มีปลา 60 ตัว ปู 40 ตัว กุ้ง 30 ตัว และ ปลาหมึก 50 ตัว กราฟใดถูกต้อง \nตอบ : ภาพที่มี ปลา 60 ตัว ปู 40 ตัว กุ้ง 30 ตัว และ ปลาหมึก 50 ตัว\n",
    //     orderId: 795,
    //     practiceKey: "ZA2TDcOSW8zBy8PDPrIc",
    //     question:
    //       "In an aquarium, there are 60 fish, 40 crabs, 30 shrimps and 50 squids. Which graph is correct?",
    //     questionURL: "",
    //     section: "ZA2TDcOSW8zBy8PDPrIc",
    //     type: 3
    //   },
    //   {
    //     answer1URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F6POJz8ONFiER7kWEPaq5-1.jpg?alt=media&token=4418321f-9bb8-4704-bb6c-69f142fe3fae",
    //     answer2URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F6POJz8ONFiER7kWEPaq5-2.jpg?alt=media&token=d1654ae3-57e3-401c-b0c9-0f3d6cf06070",
    //     answer3URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F6POJz8ONFiER7kWEPaq5-3.jpg?alt=media&token=7568b0d6-3d51-431b-a7d4-90f82ca17d8e",
    //     answer4URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2F6POJz8ONFiER7kWEPaq5-4.jpg?alt=media&token=7ddc57ce-1c19-4249-8142-1fb3536ac95f",
    //     choice1: "",
    //     choice2: "",
    //     choice3: "",
    //     choice4: "",
    //     correctAnswer: 2,
    //     description:
    //       "โจทย์ : ในพิพิธภัณฑ์สัตว์น้ำ มีปลา 40 ตัว ปู 30 ตัว กุ้ง 50 ตัว และปลาหมึก 60 ตัว กราฟใดถูกต้อง\nตอบ : ตามรูปภาพที่มีกราฟแสดงจำนวนที่ถูก",
    //     orderId: 740,
    //     practiceKey: "ZA2TDcOSW8zBy8PDPrIc",
    //     question:
    //       "In an aquarium, the are 40 fish, 30 crabs, 50 shrimps and 60 squids. Which graph is correct?",
    //     questionURL: "",
    //     section: "ZA2TDcOSW8zBy8PDPrIc",
    //     type: 3
    //   },
    //   {
    //     answer1URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2Fcj6HRJ1p390d7LGm2jOI-1.jpg?alt=media&token=f4d7f425-1e20-48bb-87ce-0fcd6b8005e5",
    //     answer2URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2Fcj6HRJ1p390d7LGm2jOI-2.jpg?alt=media&token=eaee5f4d-d7ca-420d-ad87-c6793cc5ed21",
    //     answer3URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2Fcj6HRJ1p390d7LGm2jOI-3.jpg?alt=media&token=ad27fd95-23cc-4aca-a259-f3be5b898c7a",
    //     answer4URL:
    //       "https://firebasestorage.googleapis.com/v0/b/onet-p6.appspot.com/o/practice%2Fimage%2Fcj6HRJ1p390d7LGm2jOI-4.jpg?alt=media&token=7c170fc4-2cde-4acd-b585-383b2de563ec",
    //     choice1: "",
    //     choice2: "",
    //     choice3: "",
    //     choice4: "",
    //     correctAnswer: 4,
    //     description:
    //       "โจทย์ : นักเรียนต้องนำไม้เพื่อทำกองไฟ แผนที่บอกว่า จากที่ตั้งแคมป์ไป 400 เมตร ทางใต้ และอีก 200 เมตร ทางด้านตะวันออกมีไม้อยู่ที่นั้น แผนที่ใดถูก <br>\nตอบ : เนื่องจากมีคำสำคัญ คือ south (ทิศใต้) = เดินตรงมาด้านล่าง และ east (ทิศตะวันออก) = การเลี้ยวขวา",
    //     orderId: 100,
    //     practiceKey: "UyCOegTPqhwBfb5nDtNJ",
    //     question:
    //       "Students have to get wood for a campfire. The map says, “From the campsite, go 400 metres to the south, and another 200 metres to the east. The wood is there.”",
    //     questionURL: "",
    //     section: "UyCOegTPqhwBfb5nDtNJ",
    //     type: 3
    //   }
    // ];
    // console.log("test");
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
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choice2 {
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choice3 {
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choice4 {
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceFalse {
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceTrue {
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceNon {
  width: 92%;
  text-align: center;
  border-radius: 10px;
}
.choiceFalse3 {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceTrue3 {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceNon3 {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choice1Mobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choice2Mobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choice3Mobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choice4Mobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceFalseMobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceTrueMobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceNonMobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceFalse3Mobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceTrue3Mobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
.choiceNon3Mobile {
  width: 100%;
  text-align: center;
  border-radius: 10px;
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
  font-size: 5vw;
}
.textMobile {
  font-size: 5vw;
}
</style>