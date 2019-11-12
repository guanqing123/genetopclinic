<template>
  <div class="hospital">
    <x-table full-bordered style="background-color:#fff;">
      <tbody>
      <template v-for="city in datas.cities">
        <tr class="address">
          <td class="title" colspan="2">{{city.cityName}}</td>
        </tr>
        <tr>
          <td width="60%">联系人: {{city.person}}</td>
          <td>{{city.phone}}</td>
        </tr>
        <template v-for="hospital in city.hospitals">
          <tr>
            <td>{{hospital.hospitalName}}</td>
            <td>{{hospital.departmentName}}</td>
          </tr>
        </template>
      </template>
      </tbody>
    </x-table>
  </div>
</template>

<script>
import { XTable } from 'vux'
export default {
  name: "hospital",
  props: ['datas'],
  data(){
    return {

    }
  },
  components: {
    XTable
  }
}
</script>

<style scoped>
.hospital {
  padding: 10px 15px;
}
.vux-table {
  line-height: 20px;
}
.vux-table td {
  padding: 10px;
  text-align: left;
}
.address {
  background-color: rgba(222,222,222,0.8);
  text-align: center;
}
.title {
  text-align: center !important;
}
</style>
