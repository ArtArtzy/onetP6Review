<template>
  <div>
    <div class="desktop-only">
      <div class="absolute-center">
        <div>
          <div class="relative-position">
            <div class="absolute-center q-pt-sm" style="width:70%;">
              <img style="width:100%;margin-bottom:-10px" src="../statics/image/Review.png" />
            </div>
            <div>
              <img
                style="width:100%;max-width:450px;margin-bottom:-10px"
                src="../statics/image/BarPC.png"
              />
            </div>
          </div>

          <div class="box bg3">
            <div class="q-px-xl q-pt-md">
              <div class="q-py-sm">
                <span>
                  <q-input
                    class="bg-white"
                    outlined
                    v-model="input.username"
                    type="number"
                    label="ชื่อผู้ใช้งาน"
                  />
                </span>
              </div>
              <div class="q-py-sm">
                <span>
                  <q-input
                    class="bg-white"
                    outlined
                    v-model="input.password"
                    type="password"
                    label="รหัสผ่าน"
                  />
                </span>
              </div>
            </div>

            <div class="text-center q-pt-md q-pb-xl q-px-xl">
              <q-btn
                class="bg5 text-white"
                @click="login()"
                style="width:100%"
                label="เข้าสู่ระบบ"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span class="absolute-bottom-right q-px-md q-py-sm text-white">V {{version}}</span>
      </div>
    </div>

    <div class="mobile-only">
      <div class="absolute-center q-px-md" style="width:100%;max-width: 450px;">
        <div>
          <div class="relative-position">
            <div class="absolute-center q-pt-sm" style="width:70%;">
              <img style="width:100%;margin-bottom:-10px" src="../statics/image/Review.png" />
            </div>
            <div>
              <img
                style="width:100%;max-width:450px;margin-bottom:-10px"
                src="../statics/image/BarPC.png"
              />
            </div>
          </div>
          <div class="bg3 boxmobile">
            <div class="q-px-xl q-pt-md">
              <div class="q-py-sm">
                <span>
                  <q-input
                    class="bg-white"
                    outlined
                    v-model="input.username"
                    type="number"
                    label="ชื่อผู้ใช้งาน"
                  />
                </span>
              </div>
              <div class="q-py-sm">
                <span>
                  <q-input
                    class="bg-white"
                    outlined
                    v-model="input.password"
                    type="password"
                    label="รหัสผ่าน"
                  />
                </span>
              </div>
              <div class="text-center q-pt-md q-pb-xl">
                <q-btn
                  class="bg5 text-white"
                  @click="login()"
                  style="width:100%"
                  label="เข้าสู่ระบบ"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span class="absolute-bottom-right q-px-md q-py-sm text-white">V {{version}}</span>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      let userData = {
        schoolKey: ""
      };
      //Check input ว่าครบถ้วนหรือเปล่า ถ้าไม่ครบให้ขึ้นแจ้งเตือน
      if (this.input.username == "" || this.input.password == "") {
        this.notifyRed("เบอร์โทรศัพท์ / รหัสผ่านไม่ถูกต้อง");
        return;
      } else {
        //หาปีการศึกษาปัจจุบัน
        let d = new Date();
        let currentMonth = d.getMonth();
        let currentYear = d.getFullYear() + 543; //ปีการศึกษาปัจจุบัน
        if (currentMonth <= 4) {
          currentYear = currentYear - 1;
        }

        //ทำการหา schoolCode ก่อน จากข้อมูลที่ input
        let schoolCode = Number(this.input.username.substring(0, 3));
        db.collection("School")
          .where("schoolCode", "==", schoolCode)
          .get()
          .then(doc => {
            if (doc.size > 0) {
              let schoolKey = doc.docs[0].id;
              userData.schoolKey = schoolKey;
            } else {
              this.notifyRed("ชื่อผู้ใช้งาน / รหัสผ่านไม่ถูกต้อง");
              return;
            }

            //Check academicYear Code ว่ามีการลงทะเบียนในเทอมปัจจุบันหรือไหม
            db.collection("AcademicYear")
              .where("school", "==", userData.schoolKey)
              .where("academicYear", "==", currentYear)
              .get()
              .then(doc2 => {
                if (doc2.size >= 0) {
                  let academicYearKey = doc2.docs[0].id;
                  userData.academicYearKey = academicYearKey;
                } else {
                  this.notifyRed("ชื่อผู้ใช้งาน / รหัสผ่านไม่ถูกต้อง");
                  return;
                }
                //ทำการค้นข้อมูลนักเรียน ดูจาก username / password  / ปีการศึกษา / schoolCode
                let userName = this.input.username.substring(3);
                db.collection("Student")
                  .where("schoolCode", "==", userData.schoolKey)
                  .where("password", "==", this.input.password)
                  .where("year", "==", userData.academicYearKey)
                  .where("studentId", "==", userName)
                  .get()
                  .then(doc3 => {
                    if (doc3.size > 0) {
                      userData.name = doc3.docs[0].data().name;
                      userData.surname = doc3.docs[0].data().surname;
                      userData.room = doc3.docs[0].data().room;
                      userData.no = doc3.docs[0].data().no;
                      userData.schoolCode = schoolCode;
                      userData.year = currentYear;
                      userData.studentId = doc3.docs[0].id;
                      this.$q.localStorage.set("studentData", userData);
                      this.$router.push("/main");
                    } else {
                      this.notifyRed("ชื่อผู้ใช้งาน / รหัสผ่านไม่ถูกต้อง");
                      return;
                    }
                  });
              });
          });
      }
    },
    checklogin() {
      let local = this.$q.localStorage.getItem("studentData");
      if (local == "" || local == null) {
      } else {
        this.$router.push("/welcomeback");
      }
    }
  },
  mounted() {
    this.checklogin();
  }
};
</script>

<style scoped>
.font {
  font-weight: bold;
  font-weight: 1000;
}
.boxmobile {
  width: 100%;

  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 2px solid #353535;
  border-top: none;
}
.box {
  width: 450px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 4px solid #353535;
  border-top: none;
}
</style>