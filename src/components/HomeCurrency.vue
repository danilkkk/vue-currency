<template>
  <div class="col s12 m6 l8">
    <div class="card indigo darken-2 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'Currency_exchange_rate' | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'Currency' | localize}}</th>
              <th>{{'Rate' | localize}}</th>
              <th>{{'Date' | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(5)}}</td>
              <td>{{date | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates", "date"],
  data: () => ({
    currencies: ["RUB", "USD", "EUR"],
  }),
};
</script>