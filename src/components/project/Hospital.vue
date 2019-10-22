<template>
  <div class="hospital">
    <x-table full-bordered :cell-bordered="false" style="background-color:#fff;">
      <tbody>
      <tr>
        <td width="30%">上海市</td>
        <td>上海市第一人民医院分院</td>
      </tr>
      <tr>
        <td width="30%">上海市</td>
        <td>上海交通大学附属胸科医院</td>
      </tr>
      <tr>
        <td>内蒙古自治区</td>
        <td>内蒙古自治区人民医院</td>
      </tr>
      <tr>
        <td>新疆维吾尔自治区</td>
        <td>新疆维吾尔自治区人民医院</td>
      </tr>
      <tr>
        <td>北京市</td>
        <td>北京朝阳医院</td>
      </tr>
      <tr>
        <td>天津市</td>
        <td>天津市肿瘤医院</td>
      </tr>
      <tr>
        <td>浙江省</td>
        <td>浙江大学医院院附属邵逸夫医院</td>
      </tr>
      <tr>
        <td>新疆维吾尔自治区</td>
        <td>新疆维吾尔自治区人民医院</td>
      </tr>
      <tr>
        <td>北京市</td>
        <td>北京朝阳医院</td>
      </tr>
      <tr>
        <td>天津市</td>
        <td>天津市肿瘤医院</td>
      </tr>
      <tr>
        <td>浙江省</td>
        <td>浙江大学医院院附属邵逸夫医院</td>
      </tr>
      <tr>
        <td>浙江省</td>
        <td>浙江大学医院院附属邵逸夫医院</td>
      </tr>
      <tr>
        <td>浙江省</td>
        <td>浙江大学医院院附属邵逸夫医院</td>
      </tr>
      <tr>
        <td>浙江省</td>
        <td>浙江大学医院院附属邵逸夫医院</td>
      </tr>
      <tr>
        <td>浙江省</td>
        <td>浙江大学医院院附属邵逸夫医院</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
import { XTable } from 'vux'
export default {
  name: "hospital",
  props: ['datas'],
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
</style>
