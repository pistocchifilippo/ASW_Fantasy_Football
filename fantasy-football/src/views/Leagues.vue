<template>
  <v-main>
    <LoggedToolbar v-if="this.user.id" :userid="this.user.id" />
    <v-container>
      <ProfileMenu
        v-if="this.user.id"
        :username="this.user.username"
        :budget="this.profile.budget"
        :score="this.profile.score"
      />
    </v-container>
    <hr />
    <br />
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex 
          justify-content-around
          v-for="league in this.leagues"
          :key="league._id"
        >
          <v-card class="mx-auto" dense fixed-header>
            <InfoCard
              class="fill"
              color="blue"
              :text="league.name.toUpperCase()"
            />
            <v-simple-table dense fixed-header>
              <thead>
                <tr>
                  <th class="text-left">Player</th>
                  <th class="text-left">Points</th>
                  <th class="text-left">Position</th>
                </tr>
              </thead>
              <LeagueRow :pl="league.participants" />
            </v-simple-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer color="blue" bottom class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>


<script>
import { api } from "../helpers/helpers";
import { utils } from "../helpers/utils";
import League from "@/models/league";
import ProfileMenu from "@/views/ProfileMenu.vue";
import LoggedToolbar from "@/views/LoggedToolbar.vue";
import InfoCard from "@/views/InfoCard.vue";
import Footer from "@/views/Footer.vue";
import LeagueRow from "@/views/LeagueRow.vue";

export default {
  components: {
    LoggedToolbar,
    Footer,
    ProfileMenu,
    LeagueRow,
    InfoCard,
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Leagues | " + utils.title;
      },
    },
  },
  data: () => ({
    errore: "",
    leagues: [],
    user: utils.newUser(),
    profile: utils.newProfile(),
  }),
  beforeMount() {
    let token = api.readToken("auth");
    api.loadAllData(token, this.$router).then((result) => {
      var error = result.error;
      if (error == "") {
        this.user = result.user;
        this.profile = result.profile;
        this.prov_budget = this.profile.budget;
        this.config = result.config;
      } else {
        this.$router.push(`/unauthorized`);
      }
    });
  },
  created() {
    this.errore = "";
    api.loadLeagues().then((res) => {
      res.forEach((league) => {
        console.log(league);
        this.leagues.push(
          new League(
            league._id,
            league.name,
            league.players,
            league.admin,
            league.max_players
          )
        );
      });
      /* this.leagues.shift().players.forEach((player) => {
        api.loadParticipant(player).then((res) => {
          console.log(res);
        });
      }); */
    });
  },
};
</script>