<template>
  <div class="home">
    <div class="mt-1 mb-3">
      <router-link to="createReceipt">입력하기</router-link>
    </div>
    <ul class="receipt-list clearfix row p-0 m-0">
      <receipt-thumbnail 
        v-for="receipt of receiptList" 
        :key="receipt.id" 
        :receipt="receipt"
      >
      </receipt-thumbnail>
    </ul>
  </div>
</template>

<script>
import ReceiptThumbnail from '../../components/Home/ReceiptThumbnail.vue'
import {getReceipts} from '../../utils/firebase'

export default {
  components: {ReceiptThumbnail},
  created () { //컴포넌트는 생성됐으나 템플릿과 가상돔은 마운트 및 랜더링 되지 않은 상태.
    getReceipts().then((data) => {
      data.forEach((item) => {
        let receipt = item.val();

        receipt.id = item.key;

        this.receiptList.push(receipt);
      });
    }).catch((err) => {
      console.error(err);
      alert('데이터를 불러오지 못하였습니다. 잠시후에 다시 시도해주세요.');
    });
  },
  destroyed () { //컴포넌트가 해체됐을 때 호출
    this.receiptList = [];
  },
  name: 'home',
  data () {
    return {
      receiptList: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .receipt-list {
    width: 100%;
  }
</style>
