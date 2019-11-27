<template>
  <div class="posts" style="margin: auto; background-color: #BBDFF6; color: black">
      <h1>2019 University of Windsor Election</h1>
    <h3>If you are a registered voter, enter your voterId below</h3>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="validateVoter">
      <input type="text" v-model="loginData.voterId" placeholder="Enter VoterId" class="voterIDText">
      <br>

      <button type="submit" class="standardButton">
        <span> Login </span>
      </button>
      <br>

      <span v-if="loginReponse">
        <b>{{ loginReponse.data }}</b>
      </span>
      <br>
    </form>

    <br>
    <h3>Otherwise, fill out the form below to register!</h3>

    <div style="padding: 5px; width: 500px; height: 250px; margin: auto; border: 2px solid black">
    <span style="font-weight: bold">
    <p> <u> VOTER REGISTRATION FORM </u> </p>
    </span>
    <form v-on:submit="registerVoter">
      <p class="regVoterInput">
      <label class="regVoterLabel"> LICENSE NUMBER </label>
      <input type="text" v-model="registerData.voterId" placeholder="Enter Drivers License" class="standardInputText">
      </p> <br>

      <p class="regVoterInput">
      <label class="regVoterLabel"> REGISTRAR ID </label>
      <input type="text" v-model="registerData.registrarId" placeholder="Enter Registrar ID" class="standardInputText">
      </p> <br>

      <p class="regVoterInput">
      <label class="regVoterLabel"> FIRST NAME </label>
      <input type="text" v-model="registerData.firstName" placeholder="Enter first name" class="standardInputText">
      </p> <br>

      <p class="regVoterInput">
      <label class="regVoterLabel"> LAST NAME </label>
      <input type="text" v-model="registerData.lastName" placeholder="Enter last name" class="standardInputText">
      </p> <br><br>

      <button type="submit" class="standardButton">
        <span> Register </span>
      </button>

    </form>
    </div>
    <br>
    <span v-if="registerReponse">
      <b>{{ registerReponse.data }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      loginData: {},
      registerData: {},
      registerReponse: {
        data: ""
      },
      loginReponse: {
        data: ""
      }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async registerVoter() {

      await this.runSpinner();
      const apiResponse = await PostsService.registerVoter(
        this.registerData.voterId,
        this.registerData.registrarId,
        this.registerData.firstName,
        this.registerData.lastName
      );

      console.log(apiResponse);
      this.registerReponse = apiResponse;
      await this.hideSpinner();
    },

    async validateVoter() {
      await this.runSpinner();

      if (!this.loginData.voterId) {
        console.log("!thislogin");
        let response = 'Please enter a VoterId';
        this.loginReponse.data = response;
        await this.hideSpinner();
      } else {
        const apiResponse = await PostsService.validateVoter(
          this.loginData.voterId
        );
        console.log("apiResponse");
        console.log(apiResponse.data);

        if (apiResponse.data.error) {
          // console.log(apiResponse);
          console.log(apiResponse.data.error);
          this.loginReponse = apiResponse.data.error;
        } else {
          this.$router.push("castBallot");
        }

        console.log(apiResponse);
        this.loginReponse = apiResponse;
        // this.$router.push('castBallot')
        await this.hideSpinner();
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
