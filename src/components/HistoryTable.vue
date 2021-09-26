<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Amount' | localize}}</th>
        <th>{{'Date' | localize}}</th>
        <th>{{'CategoryName' | localize}}</th>
        <th>{{'Type' | localize}}</th>
        <th>{{'Title_Detail' | localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{idx + 1}}</td>
        <td>{{record.amount | currency('RUB')}}</td>
        <td>{{record.date | date('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge"
          :class="[record.typeClass]">{{record.typeText}}</span>
        </td>
        <td>
          <button 
          v-tooltip="'Посмотреть запись'"
          class="btn-small btn grey darken-4" 
          @click="$router.push('/detail/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
    props: {
        records: {
            required: true,
            type: Array,
        }
    },
}
</script>