<template>
  <div class="posts" style="margin: auto; background-color: #BBDFF6; color: black">
    <h1>Cast Ballot</h1>
    <div style="padding: 5px; margin: auto; width: auto; max-width: 800px; height: auto; border: 2px solid black">
    <div class="parentContainer">
    <div class="regVoterInput">
      <div class="leftContent">
      <img alt="Candidate1" src="../assets/candidate1.png" style="height:300px"><br>
      <label for="one">
        <b> Ritu Singh </b>
      </label>
      </div>
      <div class="rightContent">
      <p>
        Helpful and cheerful in nature, Ritu is an aspiring technical manager. <br>
        Coming from India, she is an enthusiastic person who keeps passion for <br>
        coding and dreams one day to travel all the seven continents
      </p>
      </div>
    </div>
    <div style="font-size: large; font-weight: bold; color: green">
    <label> Vote for Ritu Singh </label>
    <input type="radio" id="one" value="Ritu Singh" v-model="picked">
    </div>
    </div>
    <br>
    <br>
    <br>

    <div class="parentContainer">
    <div class="regVoterInput">
      <div class="leftContent">
      <img alt="Candidate2" src="../assets/candidate2.png" style="height:300px"><br>
      <label for="two">
        <b> Mark Hughes </b>
      </label>
      </div>
      <div class="rightContent">
        <p>
          He comes from the Eastern continent of Australia. He is captain of <br>
          Basketball team and is an avid bike rider. He dreams of doing a Euro trip on his bike <br>
          someday.
        </p>
      </div>
    </div>
    <div style="font-size: large; font-weight: bold; color: green">
    <label> Vote for Mark Hughes </label>
    <input type="radio" id="two" value="Mark Hughes" v-model="picked">
    </div>
    </div>
    <br>
    <br>
    <br>

    <div>
    <img alt="Candidate3" src="../assets/candidate3.png" style="height:300px"><br>
    <label for="three"> <b> Ashton Goot </b> </label>
    <p> He loves to sing and play her guitar. Hailing from the <br>
    beautiful country of Switzerland, he dreams of having his own Solo <br>
    song album one day </p>
    </div>
    <div style="font-size: large; font-weight: bold; color: green">
    <label> Vote for Ashton Goot </label>
    <input type="radio" id="three" value="Ashton Goot" v-model="picked">
    </div>
    <br>
    <span v-if="picked">
    <h2>
      Picked:
      <b>{{ picked }}</b>
    </h2>
    </span>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="castBallot">
      <!-- <input type="text" value="2sww593dc034wb2twdk91r" v-model="input.electionId" class="voterIDText">
      <br>-->
      <input type="text" v-model="input.voterId" placeholder="Enter VoterId" class="voterIDText">
      <br>
      <button type="submit" class= "standardButton">
      <span> Cast Vote </span>
      </button>
      <br>
    </form>

    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id="loader" ref="Spinner"></vue-instant-loading-spinner>
  </div>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      input: {},
      picked: null,
      response: null
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async castBallot() {
      await this.runSpinner();

      const electionRes = await PostsService.queryWithQueryString('election');

      let electionId = electionRes.data[0].Key;

      console.log("picked: ");
      console.log(this.picked);
      console.log("voterId: ");
      console.log(this.input.voterId);
      this.response = null;



      //error checking for making sure to vote for a valid party
      if (this.picked === null ) {
        console.log('this.picked === null')

        let response = "You have to pick a party to vote for!";
        this.response = response;
        await this.hideSpinner();

      } else if (this.input.voterId === undefined) {
        console.log('this.voterId === undefined')

        let response = "You have to enter your voterId to cast a vote!";
        this.response = response;
        await this.hideSpinner();

      } else {

        const apiResponse = await PostsService.castBallot(
          electionId,
          this.input.voterId,
          this.picked
        );

        console.log('apiResponse: &&&&&&&&&&&&&&&&&&&&&&&');
        console.log(apiResponse);

        if (apiResponse.data.error) {
          this.response= apiResponse.data.error;
          await this.hideSpinner();
        } else if (apiResponse.data.message) {
          this.response= `Could not find voter with voterId ${this.input.voterId}
            in the state. Make sure you are entering a valid voterId`;
          await this.hideSpinner();
        }
        else {
          let response = `Successfully recorded vote for ${this.picked} party
            for voter with voterId ${apiResponse.data.voterId}. Thanks for
            doing your part and voting!`;

          this.response = response;

          console.log("cast ballot");
          console.log(this.input);
          await this.hideSpinner();
        }
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
