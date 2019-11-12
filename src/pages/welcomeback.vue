<template>
  <div>
    <!-- main div -->
    <!-- For desktop only -->
    <div class="desktop-only row bgImage">
      <!-- รูปภาพ -->
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
                <span></span>
              </div>
              <div class="q-py-sm" align="center">
                <span>
                  <img src="../statics/image/personal.png" style="width:100px;" />
                </span>
              </div>
            </div>

            <div class="text-center q-pt-md q-px-xl">
              <q-btn
                class="bg5 text-white"
                @click="login()"
                style="width:100%"
                label="เข้าสู่ระบบ"
              />
            </div>
            <div @click="logout()" class="text-center q-pa-md">
              <u class="cursor-pointer">
                <span>เข้าสู่ระบบด้วยบัญชีผู้ใช้อื่น</span>
              </u>
            </div>
          </div>
        </div>
      </div>
      <span class="absolute-bottom-right q-px-md q-py-sm text-white">V {{version}}</span>
    </div>
    <!-- For mobile only -->
    <div class="mobile-only row orientation-portrait">
      <!-- รูปภาพ -->
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
                <span></span>
              </div>
              <div class="q-py-sm" align="center">
                <span>
                  <img src="../statics/image/personal.png" style="width:80px;" />
                </span>
              </div>
            </div>

            <div class="text-center q-pt-md q-px-xl">
              <q-btn
                class="bg5 text-white"
                @click="login()"
                style="width:100%"
                label="เข้าสู่ระบบ"
              />
            </div>
            <div @click="logout()" class="text-center q-pa-md">
              <u class="cursor-pointer">
                <span>เข้าสู่ระบบด้วยบัญชีผู้ใช้อื่น</span>
              </u>
            </div>
          </div>
        </div>
      </div>
      <span class="absolute-bottom-right q-px-md q-py-sm text-white">V {{version}}</span>
    </div>
    <rotate />
  </div>
</template>

<script>
import rotate from "../components/dontsleep.vue";
export default {
  components: {
    rotate
  },
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
  width: 450px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 4px solid #353535;
  border-top: none;
}
.boxmobile {
  width: 100%;

  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 2px solid black;
  border-top: none;
}
</style>