<template>
  <div>
    <div class="page-title">
      <h3>{{ "Title_History" | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет. <router-link to="/record">Добавьте первую</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <paginate
        :key="locale"
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'waves-effect blue-grey darken-1 marginright'"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import { Pie } from "vue-chartjs";

export default {
  name: "history",

  extends: Pie,

  mixins: [paginationMixin],

  data: () => ({
    loading: true,
    records: [],
  }),

  metaInfo() {
    return { title: this.$title("Title_History") };
  },

  components: {
    HistoryTable,
  },

  computed: {
    locale() {
      return this.$store.getters.info.locale;
    },
  },

  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.setup(categories);

    this.loading = false;
  },

  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((r) => {
          return {
            ...r,
            categoryName: categories.find((c) => c.id === r.categoryId).title,
            typeClass: r.type === "income" ? "green" : "red",
            typeText: r.type === "income" ? "Доход" : "Расход",
          };
        })
      );

      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: "Траты по категориям",
            data: categories.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },
};
</script> 

<style >
.marginright {
  margin-right: 5px !important;
}
</style>