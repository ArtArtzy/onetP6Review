<template>
  <div>
    <div class="mainbox absolute-center">
      <div class="absolute-center relative-position">
        <div class="row">
          <div class="col-6">คะแนนสะสม 4000</div>
          <div class="col-6">คะแนนประจำอาทิตย์ 1500</div>
        </div>
        <br />
        <q-btn class="btn" color="primary" label="เริ่มเรียน" @click="startBtn()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startBtn() {
      this.$router.push("/review");
    }
  }
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
  width: 400px;
}
</style>