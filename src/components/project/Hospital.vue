<template>
  <div class="hospital">
    <x-table full-bordered style="background-color:#fff;">
      <tbody>
        <!--省-->
        <template v-for="province in datas.provinces">
            <tr class="address">
              <td class="title" colspan="2">{{province.provinceName}}</td>
            </tr>

          <!--市,联系人-->
            <template v-for="city in province.cities">
              <tr class="address">
                <td class="subtitle" colspan="2">{{city.cityName}}</td>
              </tr>
              <tr>
                <td width="60%">联系人: {{city.person}}</td>
                <td>{{city.phone}}</td>
              </tr>

              <!--医院-->
              <template v-show="city.hospitals.length > 0" v-for="hospital in city.hospitals">
                <tr>
                  <td>{{hospital.hospitalName}}</td>
                  <td>{{hospital.departmentName}}</td>
                </tr>
              </template>

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
  text-align: center;
}
.title {
  background-color: rgba(222,222,222,0.8);
  text-align: center !important;
}
.subtitle {
  background-color: rgba(244,244,244,0.8);
  text-align: center !important;
}
</style>
