<template>
  <ul class="sidenav app-sidenav grey lighten-3" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>

import localizeFilter from '@/filters/localize.filter';

export default {
  props: ["value"],
  data: () => ({
    links: [
      { title: localizeFilter('Title_Bill'), url: "/", exact: true },  
      { title: localizeFilter('Title_NewRecord'), url: "/record" }, 
      { title: localizeFilter('Title_Category'), url: "/categories" },
      { title: localizeFilter('Title_Planning'), url: "/planning" },
      { title: localizeFilter('Title_History'), url: "/history" },
    ],
  }),
};
</script>