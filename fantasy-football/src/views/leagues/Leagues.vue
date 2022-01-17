<template>
  <v-main>
    <LoggedToolbar v-if="this.user.id" :userid="this.user.id" />
    <v-container class="back fill">
      <v-container>
        <ProfileMenu
          v-if="this.user.id"
          :username="this.user.username"
          :budget="this.profile.budget"
          :score="this.profile.score"
        />
      </v-container>
      <hr class="blue" />
      <br />
      <v-container>
        <NewLeagueModal
          v-if="this.profile.id"
          :profileID="this.profile.id"
          class="seventyfive"
          @notify="notify"
        />
        <br />
        <SearchLeagueModal
          v-if="this.profile.id"
          :profileID="this.profile.id"
          class="seventyfive"
        />
      </v-container>
      <br />
      <v-container fluid grid-list-md>
        <v-layout wrap>
          <v-flex
            justify-content-around
            v-for="league in this.leagues"
            :key="league._id"
          >
            <v-card class="desktop-lcard" dense fixed-header>
              <InfoCard
                class="fill"
                color="blue"
                :text="league.name.toUpperCase()"
              />
              <v-simple-table class="five-rows scroll" dense fixed-header>
                <thead>
                  <tr>
                    <th class="text-left">Player</th>
                    <th class="text-left">Points</th>
                    <th class="text-left">Position</th>
                  </tr>
                </thead>
                <LeagueRow :pl="league.players" />
              </v-simple-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
    <v-footer color="blue" bottom class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>


<script>
import { api } from "@/helpers/helpers";
import { utils } from "@/helpers/utils";
import League from "@/models/league";
import ProfileMenu from "@/views/user/ProfileMenu.vue";
import LoggedToolbar from "@/views/toolbar/LoggedToolbar.vue";
import InfoCard from "@/views/user/InfoCard.vue";
import Footer from "@/views/toolbar/Footer.vue";
import LeagueRow from "@/views/leagues/LeagueRow.vue";
import NewLeagueModal from "@/views/leagues/NewLeagueModal.vue";
import SearchLeagueModal from "@/views/leagues/SearchLeagueModal.vue";

export default {
  components: {
    LoggedToolbar,
    Footer,
    ProfileMenu,
    LeagueRow,
    InfoCard,
    SearchLeagueModal,
    NewLeagueModal,
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
    dialog: false,
    errore: "",
    leagues: [],
    user: utils.newUser(),
    profile: utils.newProfile(),
  }),
  beforeMount() {
    let token = utils.readToken("auth");
    api.loadAllData(token, this.$router).then((result) => {
      var error = result.error;
      if (error == "") {
        this.user = result.user;
        this.profile = result.profile;
        this.prov_budget = this.profile.budget;
        this.config = result.config;
        api.loadUserLeagues(this.profile.id).then((res) => {
          res.forEach((league) => {
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
        });
      } else {
        this.$router.push(`/unauthorized`);
      }
    });
  },
  created() {
    this.errore = "";
  },
  methods: {
    notify: async function (param) {
      utils.not_insert(this, param);
      if (param == "ok") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.$router.go();
      }
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>