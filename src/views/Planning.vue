<template>
  <div>
    <div class="page-title">
      <h3>{{'Title_Planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency('RUB')}} {{"from" | localize}} {{category.limit | currency('RUB')}}
        </p>
        <div class="progress blue-grey lighten-3" v-tooltip="category.tooltip">
          <div class="determinate"
          :class="[category.progressColor]" 
          :style="{width: category.progressPercent + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: "planning",
    metaInfo() {
    return { title: this.$title("Title_Planning") };
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories =  categories.map(category => {
      const spend = records
      .filter(r => r.categoryId === category.id)
      .filter(r => r.type === 'outcome')
      .reduce((total, r) => total += +r.amount, 0);

      const earned =  records
      .filter(r => r.categoryId === category.id)
      .filter(r => r.type === 'income')
      .reduce((total, r) => total += +r.amount, 0);

      const percent = 100*(spend-earned) / category.limit;     
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60 ? 'green accent-4' : percent < 100 ? 'yellow darken-3' : 'red accent-4';     

      const tooltipValue = category.limit - spend + earned;
      const tooltip = `${tooltipValue < 0 ? 'Лимит превышен на ' : 'Остаток: '} ${currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false;
  },
};
</script>