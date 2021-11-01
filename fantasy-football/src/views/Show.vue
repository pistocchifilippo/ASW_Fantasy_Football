<template>
  <div>
    <h1>Show users</h1>

   
    <div class="ui labeled input fluid">
      <div class="ui label">
      <i class="users icon"></i>  User
      </div>
      <input type="text" readonly  :value="user.name"/>
    </div>

     <div class="ui labeled inputs fluid">
      <div class="ui lsabel">
        <i class="infos circle icon"></i> Details
      </div>
      <input type="text" readonly  :value="user.username"/>
    </div>
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
        Edit users
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';
export default {
  name: 'show',
  data() {
    return {
      user: ''
    };
  },
  async mounted() {
    this.user = await api.getuser(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>