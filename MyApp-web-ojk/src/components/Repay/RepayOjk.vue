<template>
  <div class="repay">
    <MyHeader ref="header" :backPath="'repayCode'"><span>{{$t('lang.repayView.payment')}}</span></MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="content">
          <div class="top-item">
            <div class="item-list" v-if="false">
              <div class="item-flex">
                <div class="item-title">Nomor Pinjaman</div>
                <div class="item-value">{{total.loanNo}}</div>
              </div>
              <div class="item-flex">
                <div class="item-title">Tanggal Jatuh Tempo</div>
                <div class="item-value">{{total.repayDate}}</div>
              </div>
            </div>
            <div class="item-list">
              <div class="item-flex">
                <div class="item-value item-value-red">Rp {{total.total | money}}</div>
                <div class="item-title">Total Pembayaran</div>
              </div>
              <div class="item-flex">
                <div class="item-value item-value-red">{{total.periods}}</div>
                <div class="item-title">jumlah periode</div>
              </div>
            </div>
          </div>
          <div class="top-item top-pay"  v-show="expiresIn">
            <div class="pay-type">Metode Pembayaran: Virtual Account {{repayType.search('BNI')=== -1?'ATM':"BNI"}}</div>
            <div class="pay-type">Kode pembayaran:</div>
            <div class="pay-code">
              <div class="code">{{total.repayCode}}</div>
              <span class="copy-btn" @click="copy()">Copy</span>
              <!-- <span class="cubeic-question" @click="goPages('problem')"></span> -->
            </div>
            <div class="code-question" @click="goPages('/repayOjk/problem')">(Cara Pembayaran?)</div>
            <div class="pay-time" v-if="true">Sisa berlaku <span>{{restTime}}</span>,silakan membayer sesegera mungkin</div>
          </div>
          <div class="top-tips">Rincian pembayaran</div>
          <div class="top-rp-content">
            <div class="item-flex-icon"><span class="icon-check"></span></div>
            <div class="item-flex-text">
              <div class="item"><span>Jumlah pokok pinjaman:</span><span>Rp {{total.amountTotal | money}}</span></div>
              <div class="item"><span>Biaya admin dan layanan:</span><span>Rp {{ (Number(total.serviceTotal) + Number(total.trialTotal)) | money}}</span></div>
              <div class="item"><span>Bunga:</span><span>Rp {{total.lixiTotal | money}}</span></div>
              <div class="item"><span>Biaya denda keterlambatan:</span><span>Rp {{total.yuqiTotal|money}}</span></div>
              <div class="item"><span>Total tagihan:</span><span>Rp {{total.total | money}}</span></div>
            </div>
          </div>
          <div class="top-tips-footer">* Biaya denda keterlambatan= jumlah tagihan jatuh tempo* {{total.contract_violate_rate}}%*jumlah hari terlambat</div>
          <div class="repayTips" v-show="expiresIn&&repayType !=='ATM'">
            <li style="">● Cara membayar di ATM</li>
            <li>1. Masukkan PIN</li>
            <li>2. Pilih "Transfer". Apabila menggunakan ATM Bank Lain, pilih "Transaksi lainnya" lalu "Transfer"</li>
            <li>3. Pilih "Ke Rek Bank Lain"</li>
            <li>4. Masukkan Kode Bank Permata (013) diikuti 16 digit kode <span id="NotSplitRepayCode3" style="color: red">{{total.repayCode}}</span> bayar sebagai rekening tujuan, kemudian tekan "Benar"</li>
            <li>5. Masukkan Jumlah pembayaran sesuai dengan yang ditagihkan (Jumlah yang ditransfer harus sama persis, tidak boleh lebih dan kurang). Jumlah nominal yang tidak sesuai dengan tagihan akan menyebabkan transaksi gagal</li>
            <li>6. Muncul Layar Konfirmasi Transfer yang berisi nomor rekening tujuan Bank Permata dan Nama beserta jumlah yang dibayar, jika sudah benar, Tekan "Benar"</li>
            <li>7. Selesai</li>
            <li></li>
            <li style="">● Cara membayar di Internet Banking</li>
            <li>Keterangan: Pembayaran tidak bisa di lakukan di Internet Banking BCA (KlikBCA)</li>
            <li>1. Login ke dalam akun Internet Banking</li>
            <li>2. Pilih "Transfer" dan pilih "Bank Lainnya". Pilih Bank Permata (013) sebagai rekening tujuan</li>
            <li>3. Masukkan jumlah pembayaran sesuai dengan yang di tagihkan</li>
            <li>4. Isi nomor rekening tujuan dengan 16 digit kode pembayaran <span id="NotSplitRepayCode5" style="color: red">{{total.repayCode}}</span></li>
            <li>5. Muncul layar konfirmasi Transfer yang berisi nomor rekening tujuan Bank Permata dan Nama beserta jumlah yang dibayar. Jika sudah benar, tekan "Benar"</li>
            <li>6. Selesai</li>
          </div>
          <div class="repayTips" v-show="expiresIn&&repayType=='ATM'">
            <li style="">●Cara membayar di gerai ALFA Group</li>
            <li>1. Catat kode pembayaran di atas dan datang ke gerai Alfamart, Alfa Midi, Alfa Express,Lawson atau DAN+DAN terdekat</li>
            <li>2. Beritahukan ke kasir bahwa anda ingin melakukan pembayaran ITP Pay</li>
            <li>3. Jika kasir tidak mengetahui mengenai pembayaran ITP Pay, informasikan ke kasir untuk membuka terminal e-transaction, pilih "no. 2 menu Pembayaran atau cari pada menu search"</li>
            <li>4. Minta kasir untuk menekan "Shift" dan "?" lalu ketik ITP Pay, setelah itu klik OK</li>
            <li>5. Minta kasir untuk pilih "no.1 ITP Pay- Pembayaran ITP Pay" dan kode pembayaran <span id="NotSplitRepayCode" style="color: red">{{total.repayCode}}</span></li>
            <li>6. Kasir akan menanyakan kode pembayaran. Berikan kode pembayaran anda <span id="yhze1" style="color: red">{{total.repayCode}}</span>. Kasir akan melakukan konfirmasi data konsumen berupa Nama Merchant, Nama Konsumen, dan Nominal. Lakukan pembayaran ke kasir sejumlah nominal yang disebutkan</li>
            <li>7. Terima struk sebagai bukti pembayaran sudah sukses dilakukan. Notifikasi pembayaran akan langsung diterima oleh Merchant</li>
            <li>8. Selesai</li>
          </div>
          <div class="margin"><div class="base-btn" @click="!expiresIn?getRepayOjkInfo():''" :class="expiresIn != 0?'disable':''">Regenerasi kode pembayaran</div></div>
        </div>
      </cube-scroll>
    </div>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>
</template>

<script>
export default {
  name: 'Repay',
  data () {
    return {
      height:0,
      productId: '',
      periodsId: '',
      total: {
        serviceTotal:'',
        trialTotal:''
      },
      loanId: '',
      repayIds: '',
      repayType:'',
      timer:null,
      restTime:0,
      loanNo:'',
      expiresIn:0,//过期剩余时间的毫秒数
    }
  },
  created(){
  },
  mounted(){
    this.height=64+'px'
    // this.height=(window.innerHeight-50-260)+'px'
    // this.getProductInfo()
    console.log(this.$route.params)
    if(!this.$route.params||!this.$route.params.hasPayCode){//没有还款码 或者是重新选择期数生成还款码
      this.productId=this.$store.state.product_id
      this.periodsId=this.$store.state.periods_id
      this.loanNo=this.$store.state.loan_no
      this.loanId=this.$store.state.loanId
      this.repayIds=this.$store.state.repayIds
      this.repayType=this.$store.state.repayType
      // this.getRepayOjkInfo()
      // ===================================================
      this.total=this.$route.params.data
      // this.restTime=this.dataCount(new Date(data.retData.expiresIn).getTime()-new Date().getTime())
      this.expiresIn =this.total.expiresIn
      this.restTime=this.dataCount(this.total.expiresIn)
      this.timer = setInterval(()=>{
        this.expiresIn=this.expiresIn-1000
        // var now = new Date().getTime();//当前时间
        // var  str = new Date(this.total.expiresIn).getTime() //过期时间
        if(this.expiresIn>0){
          // let time =str-now
          this.restTime=this.dataCount(this.expiresIn)
        }else{
          clearInterval(this.timer)
          this.expiresIn=0
        }
      },1000)
      //====================================================
    }else{
      this.productId=this.$route.params.product_id
      this.periodsId=this.$route.params.periods_id
      this.loanNo=this.$route.params.loan_no
      this.loanId=this.$route.params.loanId
      this.repayIds=this.$route.params.repaymentId
      this.repayType=this.$route.params.repayType
      var data=this.$route.params
        this.total=data
        // this.restTime=this.dataCount(new Date(data.retData.expiresIn).getTime()-new Date().getTime())
        this.expiresIn =data.expiresIn
        this.restTime=this.dataCount(data.expiresIn)
        this.timer = setInterval(()=>{
          this.expiresIn=this.expiresIn-1000
          // var now = new Date().getTime();//当前时间
          // var  str = new Date(this.total.expiresIn).getTime() //过期时间
          if(this.expiresIn>0){
            // let time =str-now
            this.restTime=this.dataCount(this.expiresIn)
          }else{
            clearInterval(this.timer)
            this.expiresIn=0
          }
        },1000)
    }
  },
  methods:{
    getProductInfo(){
      let productId=this.productId
      let periodsId=this.periodsId
      this.$ajax('post','/product/repaymentListPreview',{
        productId: productId,
        periodsId: periodsId
      },(data)=>{
        if(data.retData){
          // this.list=data.retData.list;
          this.total=data.retData.total;
        }
      })
    },
    dataCount(time){
      var days = time/1000/3600/24;
      if(days>0){
        var day = Math.floor(days);
        var hours = (days - day)*24;
        var hour = Math.floor(hours);
        var minutes = (hours - hour)*60;
        var minute = Math.floor(minutes);
        var seconds = (minutes - minute)*60;
        var second = Math.floor(seconds);
        var back = hour+'Jam'+minute+'Menit'+second+'Detik';
      }else{
          var back =0;
      }
      return back;
    },
    getRepayOjkInfo(){
      let params={}
    if(this.total.bankCode){
        params={
            loanNo:this.loan_no,
            loanId:this.loanId,
            repaymentIds:this.repayIds,
            authConfig: this.total.authConfig,
            bankName:this.total.bankName,
            bankCode:this.bankCode
         }
      }
      else{
         params={
           loanNo:this.loan_no,
           loanId:this.loanId,
           repaymentIds:this.repayIds,
           authConfig: this.total.authConfig,
        }
      }
      this.$ajax('post','/payTreasure/cardPay',params,(data) =>{
        this.total=data.retData
        // this.restTime=this.dataCount(new Date(data.retData.expiresIn).getTime()-new Date().getTime())
        this.expiresIn =data.retData.expiresIn
        this.restTime=this.dataCount(data.retData.expiresIn)
        this.timer = setInterval(()=>{
          this.expiresIn=this.expiresIn-1000
          // var now = new Date().getTime();//当前时间
          // var  str = new Date(this.total.expiresIn).getTime() //过期时间
          if(this.expiresIn>0){
            // let time =str-now
            this.restTime=this.dataCount(this.expiresIn)
          }else{
            clearInterval(this.timer)
            this.expiresIn=0
          }
        },1000)
      })
    },
    getDiyType(type){
      //diyType分期方式(1,天,2周,3月)
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      switch(type) {
        case '1':
          return lang.comm.day
          break;
        case '2':
          return lang.comm.week
          break;
        case '3':
          return lang.comm.month
          break;
        default:
          return ''
      }
    },
    copy(){
      let _this=this
      function copy(str){
          var save = function (e){
              e.clipboardData.setData('text/plain',str);//下面会说到clipboardData对象
              e.preventDefault();//阻止默认行为
          }
          document.addEventListener('copy',save);
          document.execCommand("copy");//使文档处于可编辑状态，否则无效
          // layer.msg("Salinan yang berhasil",{time:1000,offset:['50%']});//35%','5%
          _this.$Toast({message:'Salinan yang berhasil',position:'middle'})
      }
      copy(_this.total.repayCode)
    },
    goPages(path){
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import '../../assets/icon/style.css'
.scroll-list-wrap{
  position:absolute
  bottom 0
  left 0
  right 0
}
.repay{
  position absolute
  top 0
  right 0
  left 0
  bottom 0
  background #F6F6F6
}
.top-item{
  background #ffffff
  margin 10px
  border-radius 4px
  .item-list{
    display flex
    padding 10px 0
    .item-flex{
      flex 1
      .item-title{
        font-size 14px
        margin-top 10px
      }
      .item-value{
        font-size 16px
        margin-top 10px
      }
      .item-value-red{
        color #f00
      }
    }
  }
}
.top-pay{
  text-align left
  font-size 14px
  padding 10px 15px
  .pay-type{
    margin-bottom 10px
  }
  .pay-code{
    height 50px
    text-align center
    font-size 18px
    font-weight bold
    line-height 50px
    position relative
    .cubeic-question{
      position absolute
      right 0
      top 0
      font-size 20px
    }
    .copy-btn{
      position absolute
      right 0
      top 0
      font-size 13px
      color $color-link
    }
  }
  .code-question{
    font-size 14px
    // text-decoration underline
    color $color-link
    text-align center
  }
  .pay-time{
    text-align center
    line-height 20px
    margin-top  10px
    span{
      color #f00
    }
  }
}
.top-tips{
  padding 10px 15px
  text-align left
  font-size 14px
}
.top-tips-footer{
  padding 0 15px 10px 15px
  font-size 12px
  color #959595
  text-align left
}
.top-rp-content{
  margin 10px 10px
  background #ffffff
  display flex
  border-radius 4px
  .item-flex-icon{
    flex .2
    background $color-primary
    color #fff
    border-top-left-radius 4px
    border-bottom-left-radius 4px
    position relative
    .icon-check{
      font-size: 40px;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      margin: 0 auto;
      &:before{
        color #fff
      }
    }
  }
  .item-flex-text{
    flex .8
    text-align left
    .item{
      line-height 20px
      margin 10px 10px
      font-size 14px
    }
  }
}
.move-enter-active,
.move-leave-active,
.move-enter-active,
.move-leave-active {
  transition: 0.4s ease;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;

  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
}
.move-enter {
  opacity: 1;
  transform: translateY(100%);
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
}
.move-active {
  opacity: 1;
  transform: translateY(-100%);
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
}
.move-leave-active {
  opacity: 1;
  transform: translateY(100%);
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
}
.repayTips{
  text-align:left;
  margin:10px;
  font-size:14px;
  line-height:25px;
  background-color  #ffffff;
  padding 10px;
  li{
    list-style:none;
    // display:flex
  }
}
.disable{
  background #ccc!important
}
</style>
