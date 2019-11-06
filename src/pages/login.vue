<template>
  <div class="absolute-center">
    <div class="box">
      <div class="q-pa-sm">
        <span>
          <q-input outlined v-model="input.username" type="number" label="ชื่อผู้ใช้งาน" />
        </span>
      </div>
      <div class="q-pa-sm">
        <span>
          <q-input outlined v-model="input.password" type="password" label="รหัสผ่าน" />
        </span>
      </div>
      <div class="text-center q-pa-sm">
        <q-btn @click="login()" style="width:100%" label="เข้าสู่ระบบ" />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      input: {
        username: "1073163",
        password: "6406"
      }
    };
  },
  methods: {
    login() {
      let userData = {
        schoolKey:''
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
                      userData.studentId = doc3.docs[0].id
                      this.$q.localStorage.set("studentData",userData);
                      this.$router.push("/main");
                     
                      
                      
                    } else {
                      this.notifyRed("ชื่อผู้ใช้งาน / รหัสผ่านไม่ถูกต้อง");
                      return;
                    }
                  });
              });
          });
      }
    }
  }
};
</script>

<style scoped>
.box {
  width: 320px;
}
</style>