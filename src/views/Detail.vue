<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Title_History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === "income" ? "Income" : "Outcome" | localize }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              'red darken-1': record.type === 'outcome',
              'green darken-1': record.type === 'income',
            }"
          >
            <div class="card-content blue-grey-text text-lighten-5">
              <h6>{{"Amount" | localize}}: {{ record.amount | currency("RUB") }}</h6>
              <h6>{{"CategoryName" | localize}}: {{ record.categoryName }}</h6>
              <h6>{{"Description" | localize}}: {{ record.description }}</h6>             
              <br>
              <p class="line">{{ record.date | date("datetime") }}</p></div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      {{"No_such_record" | localize}}
      <router-link to="/history">{{"Back_to_history" | localize}}</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "detail",
  metaInfo() {
    return { title: this.$title("Title_Detail") };
  },
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    try {
      const id = this.$route.params.id;
      const record = await this.$store.dispatch("fetchRecordById", id);
      const category = await this.$store.dispatch(
        "fetchCategoryById",
        record.categoryId
      );

      this.record = {
        ...record,
        categoryName: category.title,
      };

      this.loading = false;
    } catch (error) {
      this.record = null;
      this.loading = false;
    }
  },
};
</script>

<style scoped>
 .line{
   border-top: 1px solid #eeeeee !important;
 }
</style>