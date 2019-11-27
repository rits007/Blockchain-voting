<template>
  <div class="posts" style="margin: auto; background-color: #BBDFF6; color: black; height: 400px">
    <h1>AI Based Authorization of Voter</h1>
    <br>
    <div class="cameraCaptureBlock">
    <VueCamera />
    </div>

    <br>
      <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import VueCamera from '@mrjeffapp/vuejs-camera'

export default {
  name: "response",
  data() {
    return {
     input: {
        data: ""
      }
    };
  },
  name: 'app',
  components: {
    VueCamera
  },
  methods: {
    async queryByKey() {
        this.runSpinner();
      console.log('this.input: ');
      console.log(this.input);
      if (!this.input.key) {
        console.log('this.input$#: ');
        let response = 'Please enter a Key to query for.';
        this.input.data = response;
        this.hideSpinner();
      } else {
        this.runSpinner();
        const apiResponse = await PostsService.queryByKey(this.input.key);
        console.log(apiResponse);
        this.input = apiResponse;
        this.hideSpinner();
      }
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>
