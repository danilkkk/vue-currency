<template>
 <div class="blue-grey lighten-4">
   <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
    <Navbar @click="isOpen = !isOpen" />
    <Sidebar v-model="isOpen" :key="locale"/>

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large grey darken-4" to="/record" v-tooltip="'Создать новую запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
 </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import Loader from '../components/app/Loader.vue';
import messages from '@/utils/messages';

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale(){
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что-то пошло не так..");
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    };
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar,
    Loader,
  },
};
</script>
