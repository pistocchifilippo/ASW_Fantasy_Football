<template>
  <v-main>
    <Toolbar title="header"/>
    <h1>users</h1>
    <table id="users" class="ui celled compact table">
      <thead>
        <tr>
         <th>  <i class="calendar plus icon"></i>User</th>
          <th> <i class="info circle icon"></i>Detail</th>
                    <th> <i class="lock open icon"></i></th>
                   <th> <i class="edit icon"></i></th>
                    <th> <i class="trash icon"></i>
          </th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tr v-for="(user, i) in users" :key="i">
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show', params: { id: user._id }}">Show</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit', params: { id: user._id }}">Edit</router-link>
        </td>
        <td width="75" class="center aligned" @click.prevent="onDestroy(user._id)">
          <a :href="`/users/${user._id}`">Delete</a>
        </td>
      </tr>
    </table>
    <v-footer color="blue" app bottom fixed class="justify-center">
      <Footer title="footer"/>
    </v-footer>
  </v-main>
</template>

<script>
import { api } from '../helpers/helpers';
import Toolbar from '@/views/Toolbar.vue';
import Footer from '@/views/Footer.vue';

export default {
  components: {
    Toolbar, Footer
  },
  name: 'users',
  data() {
    return {
      users: []
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleteuser(id);
      this.flash('user deleted sucessfully!', 'success');
      const newusers = this.users.filter(user => user._id !== id);
      this.users = newusers;
    }
  },
  async mounted() {
    this.users = await api.getusers();
  }
};
</script>
