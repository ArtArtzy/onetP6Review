<template>
  <div>
    <!-- main div -->
    <div class="row bgImage content-start absolute-center">
      <!-- รูปภาพ -->
      <div class="fixed-center q-pa-md box bg2">
        <div class="text-center">
          <img class="logo" src="../statics/image/Review.png" />
        </div>
        <div class="text-h6 text-center q-pb-md">{{studentData.name}} {{studentData.surname}}</div>

        <!-- Login Btn -->
        <div>
          <q-btn @click="login()" label="เข้าสู่ระบบ" class="btnlogin q-mt-sm btn" />
        </div>
        <div @click="logout()" class="text-center q-pa-md">
          <u class="cursor-pointer">
            <span>เข้าสู่ระบบด้วยบัญชีผู้ใช้อื่น</span>
          </u>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentData: this.$q.localStorage.getItem("studentData")
    };
  },
  methods: {
    login() {
      this.$router.push("/main");
    },
    logout() {
      this.notifyGreen("ออกจากระบบ");
      this.$q.localStorage.set("studentData", "");
      this.$router.push("/");
    }
  }
};
</script>

<style  scoped>
.logo {
  width: 300px;
}
.btnlogin {
  width: 100%;
}
.btn {
  width: 300px;
  color: #ffffff;
  background: #42cb58;
}
.logindiv {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background: #0f2753;
}
.box {
  width: 400px;
  border: 1px solid black;
  border-radius: 15px;
  text-align: center;
}
</style>