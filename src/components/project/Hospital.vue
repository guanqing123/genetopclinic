<template>
  <div class="hospital">
    <x-table full-bordered style="background-color:#fff;">
      <tbody>
      <!--<template v-for="hospital in hospitals">-->
        <!--<tr class="address">-->
          <!--<td class="title" colspan="2">{{hospital.address}}</td>-->
        <!--</tr>-->
        <!--<template v-for="h in hospital.children">-->
          <!--<tr>-->
            <!--<td width="70%">{{h.hospital}}</td>-->
            <!--<td>{{h.role}}</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td>联系人: {{h.name}}</td>-->
            <!--<td>{{h.phone}}</td>-->
          <!--</tr>-->
        <!--</template>-->
      <!--</template>-->
        <template v-for="hospital in hospitals">
          <tr class="address">
            <td class="title" colspan="2">{{hospital.address}}</td>
          </tr>
          <tr>
            <td width="70%">{{hospital.hospital}}</td>
            <td>{{hospital.role}}</td>
          </tr>
          <tr>
            <td>联系人: {{hospital.name}}</td>
            <td>{{hospital.phone}}</td>
          </tr>
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
      // hospitals : [
      //     {"address":"上海市",children:[
      //         {"hospital":"上海市第一人民医院分院","role":"XX科室A主任","name":"田七",phone:"15868888886"},
      //         {"hospital":"上海市第二人民医院","role":"XX科室B主任","name":"张三",phone:"15888888888"}
      //         ]
      //     },
      //   {"address":"杭州市",children:[
      //       {"hospital":"浙江省第一人民医院","role":"XX科室A主任","name":"王八",phone:"15888000088"},
      //       {"hospital":"杭州市中医院","role":"XX科室B主任","name":"李四",phone:"15888888888"}
      //     ]
      //   }]
      hospitals : [
        {"address":"上海市","hospital":"上海市第一人民医院分院","role":"XX科室A主任","name":"田七",phone:"15868888886"},

        {"address":"上海市","hospital":"上海市第二人民医院","role":"XX科室B主任","name":"张三",phone:"15888888888"},

        {"address":"杭州市","hospital":"浙江省第一人民医院","role":"XX科室A主任","name":"王八",phone:"15888000088"},

        {"address":"杭州市","hospital":"杭州市中医院","role":"XX科室B主任","name":"李四",phone:"15888888888"}
      ]
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
