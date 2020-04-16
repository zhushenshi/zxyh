
<template>
  <div class="container">
      <MyHeader ref="header">Formulir Pengajuan Pinjaman</MyHeader>
    <Process :index="0"></Process>
    <div class="scroll-list-wrap" :style="{height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <!-- <div class="title">{{$t('lang.indentity.tipsTitle')}}</div> -->
          <div class="imgBox">
            <div class="img">
              <div @click="uploadImg('0')" class="imgContainer"><img :src="form.icCardImg1" alt=""></div>
              <div>{{$t('lang.indentity.cardFront')}}</div>
            </div>
            <div class="img">
              <div @click="uploadImg('1')" class="imgContainer"><img :src="form.icCardImg2" alt=""></div>
              <div>{{$t('lang.ojk.handCard')}}</div>
            </div>
            <div class="img">
              <div @click="uploadImg('2')" class="imgContainer"><img :src="form.skImg" alt=""></div>
              <div>{{$t('lang.ojk.skzp')}}</div>
            </div>
          </div>
          <div class="tips">{{$t('lang.indentity.tipsBody')}}</div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="label">Nama</div>
            <div class="text"><input type="text" maxlength="25" v-model="form.custName" placeholder="Nama lengkap sesuai KTP"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(0)">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.indentity.sex')}}</div>
            <div class="text"><input type="text" readonly="true" v-model="form.sex" :placeholder="$t('lang.indentity.sex')"></div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <!-- <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="label">{{$t('lang.ojk.age')}}</div>
            <div class="text"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" v-model="form.age" maxlength="2" :placeholder="$t('lang.ojk.age')"></div>
          </div> -->
          <!-- 邮箱 -->
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.email')}}</div>
            <div class="text"><input type="email"  v-model="form.email" maxlength="30" :placeholder="$t('lang.ojk.email')"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(3)">
            <div class="label">{{$t('lang.indentity.birth')}}</div>
            <div class="text"><input type="tel" readonly v-model="form.birthday" maxlength="10" :placeholder="$t('lang.regMsg.birthday')"></div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.indentity.idCard')}}</div>
            <div class="text"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" v-model="form.cardNum" maxlength="16"  :placeholder="$t('lang.indentity.idCard')"></div>
          </div>
          <!-- 税卡 -->
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.skh')}}</div>
            <div class="text"><input type="tel" maxlength="15" oninput="value=value.replace(/[^0-9]/g,'')" v-model="form.skNum"  :placeholder="$t('lang.ojk.skh')"></div>
          </div>

          <!-- 职业 -->
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(6)">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.zy_info')}}</div>
            <div class="text"><input type="text" readonly="true" v-model="form.zy_info" :placeholder="$t('lang.ojk.zy_info')"></div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <!-- 行业 -->
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(5)">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.hy_info')}}</div>
            <div class="text"><input type="text" readonly="true" v-model="form.hy_info" :placeholder="$t('lang.ojk.hy_info')"></div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <!-- 收入 -->
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(4)">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.mysr')}}</div>
            <div class="text"><input type="text" readonly="true" v-model="form.monthIncome" :placeholder="$t('lang.ojk.mysr')"></div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(1)">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.edu')}}</div>
            <div class="text"><input type="text" readonly="true" v-model="form.edu" :placeholder="$t('lang.ojk.edu')"></div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(2)">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.use')}}</div>
            <div class="text"><input type="text" readonly="true" v-model="form.use" :placeholder="$t('lang.ojk.use')"></div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <!-- 住址省市区 -->
          <div class="form form-address area-address" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(7)">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">Wilayah tinggal saat ini</div>
            <div class="text">
              <input v-show="!form.area" :class="{cardAddress:true, hasValue:form.area}" type="text" v-model="form.area" readonly maxlength="100" placeholder="provinsi,kota/kab,kec."/>
              <div v-show="form.area" class="textareaPlace">
                {{form.area}}
              </div>
            </div>
            <span class="iconfont icon-previewright"></span>
          </div>
          <div class="form form-address" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.indentity.adress')}}</div>
            <div class="text"><textarea class="cardAddress" maxlength="80" v-model="form.cardAddress" placeholder="contoh: nama gedung/perumahan, nama jalan dan lantai/nomor rumah"></textarea></div>
          </div>
          <!-- 获取地理位置按钮 -->
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPosition">
            <div class="label" style="text-decoration: underline;color:#ff8351">Hak akses untuk lokasi alamat saat ini</div>
            <!-- <div class="text"><input type="text"  v-model="form.phoneGpsInfo" maxlength="50" placeholder="Diotorisasi untuk mendapatkan lokasi"></div> -->
          </div>
           <!-- 邮编 -->
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="label">{{$t('lang.ojk.postCode')}}</div>
            <div class="text"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" v-model="form.postcode" maxlength="5" :placeholder="$t('lang.ojk.postCode')"></div>
          </div>
          <!-- 企业相关信息 -->
          <div class="enterpriseLoan" v-show="ojkType=='1'">
            <div class="imgBox">
              <div class="img">
                <div @click="uploadImg('3')" class="imgContainer"><img :src="form.yyzzImg" alt=""></div>
                <div>{{$t('lang.ojk.yyzzImg')}}</div>
              </div>
              <div class="img">
                <div @click="uploadImg('4')" class="imgContainer"><img :src="form.yhlsImg1" alt=""></div>
                <div>{{$t('lang.ojk.yhlsImg1')}}1</div>
              </div>
              <div class="img">
                <div @click="uploadImg('7')" class="imgContainer"><img :src="form.yhlsImg11" alt=""></div>
                <div>{{$t('lang.ojk.yhlsImg1')}}2</div>
              </div>
            </div>
            <div class="imgBox">
              <div class="img">
                <div @click="uploadImg('5')" class="imgContainer"><img :src="form.yhlsImg2" alt=""></div>
                <div>{{$t('lang.ojk.yhlsImg2')}}1</div>
              </div>
              <div class="img">
                <div @click="uploadImg('8')" class="imgContainer"><img :src="form.yhlsImg22" alt=""></div>
                <div>{{$t('lang.ojk.yhlsImg2')}}2</div>
              </div>
              <div class="img">
                <div @click="uploadImg('9')" class="imgContainer"><img :src="form.companyImg" alt=""></div>
                <div>Foto tampak depan lokasi usaha</div>
              </div>
            </div>
            <!-- 公司地址省市区 -->
            <div class="form form-address area-address" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(8)">
              <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">Wilayah perusahaan</div>
              <div class="text">
                <input v-show="!form.companyArea" :class="{cardAddress:true, hasValue:form.companyArea}" type="text" v-model="form.companyArea" readonly maxlength="100" placeholder="provinsi,kota/kab,kec."/>
                <div v-show="form.companyArea" class="textareaPlace">
                  {{form.companyArea}}
                </div>                 
              </div>
              <span class="iconfont icon-previewright"></span>
            </div>
            <div class="form form-address" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.gsdz')}}</div>
              <div class="text"><textarea class="cardAddress" maxlength="80" v-model="form.companyAddress" :placeholder="$t('lang.ojk.gsdz')"></textarea></div>
            </div>
            <!-- 公司手机号 -->
            <div class="form form-address" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">Nomor telepon perusahaan</div>
              <div class="text"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" v-model="form.companyTel" maxlength="10" placeholder="Nomor telepon perusahaan"></div>
            </div>
          </div>
          <!-- 单期个人相关 -->
          <div class="enterpriseLoan" v-show="ojkType=='0'">
            <div class="imgBox">
              <div class="img">
                <div @click="uploadImg('6')" class="imgContainer"><img :src="form.gzzSrc" alt=""></div>
                <div>{{$t('lang.ojk.gzzImg')}}</div>
              </div>
            </div>
            <div class="form form-address" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.gsmc')}}</div>
              <div class="text"><textarea class="cardAddress" maxlength="80" v-model="form.companyName" :placeholder="$t('lang.ojk.gsmc')"></textarea></div>
            </div>
            <!-- 公司地址省市区 -->
            <div class="form form-address area-address" style="border-bottom: 1px dashed rgb(241, 241, 241);" @click="getPicker(8)">
              <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">Wilayah perusahaan</div>
              <div class="text">
                <input v-show="!form.companyArea" :class="{cardAddress:true, hasValue:form.companyArea}" type="text" v-model="form.companyArea" readonly maxlength="100" placeholder="provinsi,kota/kab,kec."/>

                <div v-show="form.companyArea" class="textareaPlace">
                  {{form.companyArea}}
                </div>                
              </div>
              <span class="iconfont icon-previewright"></span>
            </div>
            <div class="form form-address" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.ojk.gsdz')}}</div>
              <div class="text"><textarea class="cardAddress" maxlength="80" v-model="form.companyAddress" :placeholder="$t('lang.ojk.gsdz')"></textarea></div>
            </div>
            <!-- 公司手机号 -->
            <div class="form form-address" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">Nomor telepon perusahaan</div>
              <div class="text"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" v-model="form.companyTel" maxlength="10" placeholder="Nomor telepon perusahaan"></div>
            </div>
          </div>
          <div class="warn">
            <i class="iconfont icon-jinggao"></i>{{$t('lang.indentity.tipsFooter')}}
          </div>
          <div class="wrapper"><div class="base-btn" @click="saveRealNameInfo()">Lanjut</div></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
const nameReg=/^[\u4E00-\u9FA5]{2,15}$/
const cardReg=/^(\d{18}$|^\d{17}(\d|X|x))$/
//const emailReg=/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{1,30}$/;
const emailReg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
import { provincesList } from '../../common/js/in-ID'
import idcardFront from './img/id-front.png'
import idcardBack from './img/id-back.png'
import Process from './Process/Process.vue'
export default {
  name: 'Identity',
  data () {
    return {
      height:0,
      form:{
        custName:'',
        cardNum:'',
        sex:'',
        age: '',
        use: '',
        useValue: '',
        edu: '',
        eduValue: '',
        nation:'',
        birthday:'',
        cardAddress:'',
        creditIssueOrg:'',
        cardEffectedDate:'',
        icCardImg1:idcardFront,
        icCardImg2:idcardBack,
        skImg:idcardBack,
        yyzzImg:idcardBack,
        yhlsImg1:idcardBack,
        yhlsImg2: idcardBack,
        yhlsImg11:idcardBack,
        yhlsImg22: idcardBack,
        companyAddress: '',
        skNum: '',
        monthIncome: '',
        postcode: '',//邮编
        email: '',//邮箱
        zy_info: '',//职业信息
        hy_info: '',//行业信息
        gzzSrc: '',//工作证
        companyName: '',//公司名
        area: '',//省市区
        companyTel: '',//公司电话
        companyArea: '',//公司省市区
        companyImg: idcardBack,//公司图片
        phoneGpsInfo: ''//获取地理位置
      },
      scanFront:false,
      scanBack:false,
      type:'',
      innerHeight:'',
      picker0: null,
      picker1: null,
      picker2: null,
      pickerType: 0,
      genderOptions:[
        { text: this.$t('lang.comm.man'), value: 0},
        { text: this.$t('lang.comm.female'), value: 1 }
      ],
      useOptions:[
        {
          text: 'Pengeluaran Harian',
          value: 0
        },
        {
          text: 'Pengobatan',
          value: 1
        },
        {
          text: 'Wisata',
          value: 2
        },
        {
          text: 'Kebutuhan Sehari-Hari',
          value: 3
        }
      ],
      useBusinessOptions:[
        {
          text: 'Uang muka kendaraan',
          value: 0
        },
        {
          text: 'Pembelian alat usaha',
          value: 1
        },
        {
          text: 'Pembelian bahan baku',
          value: 2
        },
        {
          text: 'Penyewaan tempat usaha',
          value: 3
        },
        {
          text: 'Modal usaha lainnya',
          value: 4
        }
      ],
      eduOptions:[
        {
          text: 'SD',
          value: 0
        },
        {
          text: 'SMP',
          value: 1
        },
        {
          text: 'SMA',
          value: 2
        },
        {
          text: 'Diploma',
          value: 3
        },
        {
          text: 'Sarjana',
          value: 4
        },
        {
          text: 'Master',
          value: 5
        },
        {
          text: 'Doktor',
          value: 6
        }
      ],
      monthIncomeOptions:[{
        text: 'kurang dari 2juta',
        value: 0
        },{
          text: '2 sampai 8 juta',
          value: 1
        },{
          text: 'Dan diatas 8juta',
          value: 2
        }],
      personIncomeOptions:[{
        text: '< Rp 4.000.000',
        value: 0
        },{
          text: 'Rp 4.000.000 s/d Rp 8.000.000',
          value: 1
        },{
          text: '> Rp 8.000.000',
          value: 2
        }],
      businessIncomeOptions:[{
        text: '< Rp 9.000.000',
        value: 0
        },{
          text: 'Rp 9.000.000 - Rp 18.000.000',
          value: 1
        },{
          text: '> Rp.18.000.000',
          value: 2
        }],
      ojkType:'0',
      imgValue: {
        cardFront: false,
        handCard: false,
        skCard: false,
        yyzzCard: false,
        yhls1: false,
        yhls2: false,
        gzzSrc: false,
        yhls11: false,
        yhls22: false,
        companyImg: false
      },
      datePicker: null,
      zy_infoOptions:[
        {
          text: 'Pegawai negeri',
          value: 0
        },
        {
          text: 'Pegawai swasta',
          value: 1
        },
        {
          text: 'Pengusaha',
          value: 2
        },
        {
          text: 'Freelance',
          value: 3
        },
        {
          text: 'Staf rumah tangga',
          value: 4
        },
        {
          text: 'lbu rumah tangga',
          value: 5
        }
      ],
      hy_infoOptions:[
        {
          text: 'Teknologi Informasi dan Komunikasi',
          value: 0
        },
        // {
        //   text: 'Komunikasi',
        //   value: 1
        // },
        {
          text: 'Konstruksi',
          value: 2
        },
        {
          text: 'Manufaktur',
          value: 3
        },
        {
          text: 'layanan kesehatan',
          value: 4
        },
        {
          text: 'akomodasi',
          value: 5
        },
        {
          text: 'kuliner',
          value: 6
        },
        {
          text: 'pendidikan',
          value: 7
        },
        {
          text: 'kuliner',
          value: 8
        },
        {
          text: 'Manajemen',
          value: 9
        },
        {
          text: 'Industri kreatif',
          value: 10
        },
        {
          text: 'Industri keuangan',
          value: 11
        },
        {
          text: 'Energi dan pertambangan',
          value: 12
        },
        // {
        //   text: 'IHukum',
        //   value: 13
        // },
         {
          text: 'Pariwisata',
          value: 14
        }
      ]
    }
  },
  created(){
    this.ojkType=this.$store.state.productType
    this.getRealNameInfo()
  },
  mounted (){
    this.height=(window.innerHeight-this.$Header-80)+'px';
    this.innerHeight=window.innerHeight;
    window['faceOcrCallback'] = (msg,second) => {
      this.getMegIDCardQualitySuccess(msg,second)
    }
    window['cameraCallBack'] = (img)=> {//base64
      if(this.type==0){
        this.form.icCardImg1="data:image/png;base64,"+img
        this.imgValue.cardFront=true
      }else if(this.type==1){
        this.form.icCardImg2="data:image/png;base64,"+img
        this.imgValue.handCard=true
      }else if(this.type==2){
        this.form.skImg="data:image/png;base64,"+img
        this.imgValue.skCard=true
      }else if(this.type==3){
        this.form.yyzzImg="data:image/png;base64,"+img
        this.imgValue.yyzzCard=true
      }else if(this.type==4){
        this.form.yhlsImg1="data:image/png;base64,"+img
        this.imgValue.yhls1=true
      }else if(this.type==5){
        this.form.yhlsImg2="data:image/png;base64,"+img
        this.imgValue.yhls2=true
      }else if(this.type==6){
        this.form.gzzSrc="data:image/png;base64,"+img
        this.imgValue.gzzSrc=true
      }else if(this.type==7){
        this.form.yhlsImg11="data:image/png;base64,"+img
        this.imgValue.yhls11=true
      }else if(this.type==8){
        this.form.yhlsImg22="data:image/png;base64,"+img
        this.imgValue.yhls22=true
      }else if(this.type==9){
        this.form.companyImg="data:image/png;base64,"+img
        this.imgValue.companyImg=true
      }
      this.picUploan("data:image/png;base64,"+img)
    }
    window['getLocalCallback'] = (msg)=> {//经度，维度 获取地理 0,0 算失败
      if(msg){
        if(msg=='0,0'){
          this.$Toast({message:'Lokasi akses resmi gagal, silakan coba lagi!',position:'bottom'})
        }else{
          this.$Toast({message:'Hak akses lokasi berhasil',position:'bottom'})
          this.form.phoneGpsInfo=msg
        }
      }else{
        this.$Toast({message:'Lokasi akses resmi gagal, silakan coba lagi!',position:'bottom'})
      }
    }
  },
  beforeDestroy(){
    window.innerHeight=this.innerHeight
  },
  components:{
    Process
  },
  methods:{
    getPosition(){
      var ua = navigator.userAgent.toLowerCase();
      try{
        if (/iphone|ipad|ipod/.test(ua)) {
        }else if(/android/.test(ua)){
          object.getLocal()
        }
      }catch(e){
        console.log(e)
      }
    },
    picUploan(base64){
      let This=this
      this.$ajax('post','/oss/picUploan',{
        base64:base64
      },function(data){
        if(This.type==0){
          This.form.icCardImg1=data.retData
          This.imgValue.cardFront=true
        }else if(This.type==1){
          This.form.icCardImg2=data.retData
          This.imgValue.handCard=true
        }else if(This.type==2){
          This.form.skImg=data.retData
          This.imgValue.skCard=true
        }else if(This.type==3){
          This.form.yyzzImg=data.retData
          This.imgValue.yyzzCard=true
        }else if(This.type==4){
          This.form.yhlsImg1=data.retData
          This.imgValue.yhls1=true
        }else if(This.type==5){
          This.form.yhlsImg2=data.retData
          This.imgValue.yhls2=true
        }else if(This.type==6){
          This.form.gzzSrc=data.retData
          This.imgValue.gzzSrc=true
        }else if(This.type==7){
          This.form.yhlsImg11=data.retData
          This.imgValue.yhls11=true
        }else if(This.type==8){
          This.form.yhlsImg22=data.retData
          This.imgValue.yhls22=true
        }else if(This.type==9){
          This.form.companyImg=data.retData
          This.imgValue.companyImg=true
        }
      },null,null,null,null,true)
    },
    setNumValue(e){
      this.val=e.target.value.replace(/[^\d]/g,'');
    },
    /**选择picker**/
    getPicker(index){
      let _this=this;
      this.pickerType=index;
      if(index==0){
        if (!this.picker0) {
          this.picker0 = this.$createPicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: [_this.genderOptions],
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker0.show()
      }else if(index==1){
        if (!this.picker1) {
          this.picker1 = this.$createPicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: [_this.eduOptions],
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker1.show()
      }else if(index==2){//用图
        if (!this.picker2) {
          this.picker2 = this.$createPicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: [_this.ojkType=='0'?_this.useOptions:_this.useBusinessOptions],
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker2.show()
      }else if(index==3){//日期时间
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            min: new Date(1900, 0, 1),
            max: new Date(),
            value: new Date(1985, 0, 1),
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle,
            columnOrder: ['date', 'month', 'year']
          })
        }
        this.datePicker.show()
      }else if(index==4){//收入
        if (!this.picker4) {
          this.picker4 = this.$createPicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: [_this.ojkType=='0'?_this.personIncomeOptions:_this.businessIncomeOptions],
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker4.show()
      }else if(index==5){//行业
        if (!this.picker5) {
          this.picker5 = this.$createPicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: [_this.hy_infoOptions],
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker5.show()
      }else if(index==6){//职业
        if (!this.picker6) {
          this.picker6 = this.$createPicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: [_this.zy_infoOptions],
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker6.show()
      }else if(index==7){//省市区
        let p = []
        let c = []
        for(let key in provincesList){
          let pobj={
            text: key,
            value: key,
            children:[]
          }
          for(let ckey in provincesList[key]){
            let dobj={}
            let cobj={
              text: ckey,
              value: ckey,
              children:[]
            }
            for(let i=0;i<provincesList[key][ckey].length;i++){
              dobj={
                text: provincesList[key][ckey][i],
                value: provincesList[key][ckey][i]
              }
              cobj.children.push(dobj)
            }
            pobj.children.push(cobj)
          }
          p.push(pobj)
        }
        if (!this.picker7) {
          this.picker7 = this.$createCascadePicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: p,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker7.show()
      }else if(index==8){//公司地址省市区
        let p = []
        let c = []
        for(let key in provincesList){
          let pobj={
            text: key,
            value: key,
            children:[]
          }
          for(let ckey in provincesList[key]){
            let dobj={}
            let cobj={
              text: ckey,
              value: ckey,
              children:[]
            }
            for(let i=0;i<provincesList[key][ckey].length;i++){
              dobj={
                text: provincesList[key][ckey][i],
                value: provincesList[key][ckey][i]
              }
              cobj.children.push(dobj)
            }
            pobj.children.push(cobj)
          }
          p.push(pobj)
        }
        if (!this.picker8) {
          this.picker8 = this.$createCascadePicker({
            title:'',
            cancelTxt: _this.$t('lang.comm.cancel'),
            confirmTxt: _this.$t('lang.comm.confirm'),
            data: p,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker8.show()
      }
    },
    /**选择性别**/
    selectHandle(selectedVal, selectedIndex, selectedText){
      if(this.pickerType==0){
        this.form.sex=selectedText[0]
      }else if(this.pickerType==1){
        this.form.edu=selectedText[0]
        this.form.eduValue=selectedVal[0]
      }else if(this.pickerType==2){
        this.form.use=selectedText[0]
        this.form.useValue=selectedVal[0]
      }else if(this.pickerType==3){
        let mm=selectedText[1]>9?selectedText[1]:'0'+selectedText[1];
        let dd=selectedText[2]>9?selectedText[2]:'0'+selectedText[2];
        this.form.birthday=dd+'-'+mm+'-'+selectedText[0];
      }else if(this.pickerType==4){
        this.form.monthIncome=selectedText[0]
      }else if(this.pickerType==5){
        this.form.hy_info=selectedText[0]
      }else if(this.pickerType==6){
        this.form.zy_info=selectedText[0]
      }else if(this.pickerType==7){
        this.form.area=selectedText.join(',')
      }else if(this.pickerType==8){
        this.form.companyArea=selectedText.join(',')
      }
    },
    /**取消选择**/
    cancelHandle(){},
    /** 身份证识别成功前台回调 **/
    getMegIDCardQualitySuccess (msg,second) {
      this.faceService();
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      let _this=this
      if(typeof(msg)=="string"){
        msg=eval('('+msg+')');
      }
      if(msg.retCode!="SUCCESS"){
        this.$createDialog({type: 'alert',
          content: lang.comm.failure,
          confirmBtn:{
            text: lang.comm.confirm
          },
          onConfirm: () => {}
        }).show()
        return
      }
      var data=msg.retData.data;
      var img=second?second:msg.image?msg.image:msg.retData.image;
      if(data.xh_side=="front"){//人面
        _this.form.icCardImg1="data:image/png;base64,"+img;
        _this.form.custName=data.xh_name  //姓名，
        _this.form.sex=data.xh_gender //性别
        _this.form.birthday=data.xh_birthday//出生日期
        _this.form.cardNum=data.xh_id_card_number //身份证号码
        _this.form.cardAddress=data.xh_address//户籍地址
        _this.form.nation=data.xh_race//名族
        _this.scanFront=true//人像面已扫描
      }else if(data.xh_side=="back"){
        if(!data.xh_valid_date_end) {
          return;
        }
        _this.form.cardEffectedDate=data.xh_valid_date_end//有效期
        _this.form.icCardImg2="data:image/png;base64,"+img;
        _this.scanBack=true//国徽面已扫描
      }
    },
    /** 保存实名认证信息 **/
    saveRealNameInfo(){
      let This=this;
      if(!This.checkInfo()){
        return
      }
      let jsonData = {
          realname:This.form.custName,
          sex_name:This.form.sex,
          card_register_address:This.form.cardAddress,
          Zcard_src:This.form.icCardImg1,
          Fcard_src:This.form.icCardImg2,
          card:This.form.cardNum,
          birth:This.form.birthday,
          identity_complete:'100',
          cardEffectedDate: This.form.cardEffectedDate,
          nation: This.form.nation,
          orderId:'',
          age: This.form.age,
          educational: This.form.eduValue,
          educationalName: This.form.edu,
          loanPurpose: This.form.use,
          monthIncome: This.form.monthIncome,//月收入
          postcode: This.form.postcode,//邮编
          zy_info: This.form.zy_info,//职业信息
          hy_info: This.form.hy_info,//行业信息
          email: This.form.email,//邮箱
          areaAddress: This.form.area,
          phoneGpsInfo: This.form.phoneGpsInfo//定位地理位置
      };
      This.$ajax('post','/authorization/saveIdentityInfo',{data:JSON.stringify(jsonData)},function(data){
        // This.$router.push('/personalInfo')
        This.saveSkImg()
      })
    },
    /**校验信息**/
    checkInfo(){
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      let This=this;
      /**正面**/
      if(!This.imgValue.cardFront){
        This.$Toast({message:lang.regMsg.idCardFront,position:'bottom'})
        return false
      }
      if(!This.imgValue.handCard){
        This.$Toast({message:lang.ojk.handCardMsg,position:'bottom'})
        return false
      }
      if(!This.imgValue.skCard){
        This.$Toast({message:lang.ojk.skzpMsg,position:'bottom'})
        return false
      }
      /**姓名不能为空**//**姓名格式不正确**/
      if(!This.form.custName){
        This.$Toast({message:lang.regMsg.nameEmpty,position:'bottom'})
        return false
      }
      /**性别不能为空**/
      if(!This.form.sex){
        This.$Toast({message:lang.regMsg.sex,position:'bottom'})
        return false
      }
      /**年龄不能为空**/
      // if(!This.form.age){
      //   This.$Toast({message:lang.ojk.agePlc,position:'bottom'})
      //   return false
      // }else if(This.form.age<21){
      //   This.$Toast({message:lang.ojk.ageMin,position:'bottom'})
      //   return false
      // }

      /**邮箱不能为空**/
      if(!This.form.email){
        This.$Toast({message:lang.regMsg.email,position:'bottom'})
        return false
      }
      else if(!emailReg.test(This.form.email)){
         This.$Toast({message:lang.regMsg.emailReg,position:'bottom'})
         return false
      }
      /**出生日期**/
      if(!This.form.birthday){
        This.$Toast({message:lang.regMsg.birth,position:'bottom'})
        return false
      }
      /**身份证号**/
      if(!This.form.cardNum){
        This.$Toast({message:lang.regMsg.idCard,position:'bottom'})
        return false
      }
      /**税卡号**/
      if(!This.form.skNum){
        This.$Toast({message:lang.ojk.skhPlc,position:'bottom'})
        return false
      }
       /**行业**/
      if(!This.form.hy_info){
        This.$Toast({message:lang.ojk.hy_infoPlc,position:'bottom'})
        return false
      }
       /**职业**/
      if(!This.form.zy_info){
        This.$Toast({message:lang.ojk.zy_infoPlc,position:'bottom'})
        return false
      }
       /**收入**/
      if(!This.form.monthIncome){
        This.$Toast({message:lang.ojk.mysr,position:'bottom'})
        return false
      }
      /**学历不能为空**/
      if(!This.form.edu){
        This.$Toast({message:lang.ojk.eduPlc,position:'bottom'})
        return false
      }
      /**用途不能为空**/
      if(!This.form.use){
        This.$Toast({message:lang.ojk.usePlc,position:'bottom'})
        return false
      }
      /**省市区**/
      if(!This.form.area){
        This.$Toast({message:'Province City subCity',position:'bottom'})
        return false
      }


      /**身份证地址**/
      if(!This.form.cardAddress){
        This.$Toast({message:lang.regMsg.cardAddress,position:'bottom'})
        return false
      }
      /**手机地理位置**/
      if(!This.form.phoneGpsInfo||This.form.phoneGpsInfo=='0,0'){
        This.$Toast({message:'Lokasi akses resmi gagal, silakan coba lagi!',position:'bottom'})
        return false
      }

      /**邮政编码不能为空**/
      if(!This.form.postcode){
        This.$Toast({message:lang.ojk.postcodePlc,position:'bottom'})
        return false
      }
      if(This.ojkType=='1'){//多期 企业
        /**营业执照**/
        if(!This.imgValue.yyzzCard){
          This.$Toast({message:lang.ojk.yyzzImgReg,position:'bottom'})
          return false
        }
        /**银行流水1**/
        if(!This.imgValue.yhls1){
          This.$Toast({message:lang.ojk.yhlsImg1+'1',position:'bottom'})
          return false
        }
        if(!This.imgValue.yhls11){
          This.$Toast({message:lang.ojk.yhlsImg1+'2',position:'bottom'})
          return false
        }
        /**银行流水2**/
        if(!This.imgValue.yhls2){
          This.$Toast({message:lang.ojk.yhlsImg2+'1',position:'bottom'})
          return false
        }
        if(!This.imgValue.yhls22){
          This.$Toast({message:lang.ojk.yhlsImg2+'2',position:'bottom'})
          return false
        }
        /**公司公司所在地正视图照片*/
        if(!This.imgValue.companyImg){
          This.$Toast({message:'Foto tampak depan lokasi usaha',position:'bottom'})
          return false
        }
        /**公司省市区地址**/
        if(!This.form.companyArea){
          This.$Toast({message:'Province City subCity',position:'bottom'})
          return false
        }
        /**公司地址**/
        if(!This.form.companyAddress){
          This.$Toast({message:lang.ojk.gsdzReg,position:'bottom'})
          return false
        }
      }else{
        /**工作证**/
        if(!This.imgValue.gzzSrc){
          This.$Toast({message:lang.ojk.gzzImg,position:'bottom'})
          return false
        }
        /**公司名称**/
        if(!This.form.companyName){
          This.$Toast({message:lang.ojk.gsmcPlc,position:'bottom'})
          return false
        }
        /**公司省市区地址**/
        if(!This.form.companyArea){
          This.$Toast({message:'Province City subCity',position:'bottom'})
          return false
        }
        /**公司地址**/
        if(!This.form.companyAddress){
          This.$Toast({message:lang.ojk.gsdzReg,position:'bottom'})
          return false
        }
      }
      /**公司电话**/
      if(!This.form.companyTel){
        This.$Toast({message:'Nomor telepon perusahaan',position:'bottom'})
        return false
      }
      return true
    },
    /** 获取实名认证信息 **/
    getRealNameInfo(){
      let This=this
      This.$ajax('post','/authorization/getIdentityInfoByCustId','',function(data){
        if(data.retData){
          let customer=data.retData[0];
          if(customer){
            This.form.custName=customer.realname?customer.realname:'';//姓名，
            This.form.cardNum=customer.card_no?customer.card_no:'';//身份证号码
            This.form.age=customer.age?customer.age:'';//年龄
            This.form.edu=customer.educational_name?customer.educational_name:'';//学历
            This.form.eduValue=customer.educational?customer.educational:'';//学历code

            This.form.use=customer.loan_purpose?customer.loan_purpose:'';//用途

            This.form.sex=customer.sex_name?customer.sex_name:'';//性别
            This.form.nation=customer.nation?customer.nation:'';//民族
            This.form.birthday=customer.birth?customer.birth:'';//出生日期
            This.form.cardAddress=customer.card_register_address?customer.card_register_address:'';//身份证证件地址
            This.form.cardEffectedDate=customer.card_effective_time?customer.card_effective_time:'';//身份证有效期
            This.form.icCardImg2 = customer.Fcard_src?customer.Fcard_src:idcardBack;
            This.form.icCardImg1 = customer.Zcard_src?customer.Zcard_src:idcardFront;
            This.form.skImg=customer.sk_src?customer.sk_src:idcardBack;
            This.form.phoneGpsInfo=customer.phone_gps_info;

            This.form.monthIncome=customer.month_income?customer.month_income:''
            This.form.area=customer.areaAddress?customer.areaAddress:''
            This.form.postcode=customer.postcode?customer.postcode:''
            This.form.email=customer.email?customer.email:''
            This.form.hy_info=customer.hy_info?customer.hy_info:''
            This.form.zy_info=customer.zy_info?customer.zy_info:''
            This.scanFront=customer.Fcard_src?true:false;
            This.scanBack=customer.Zcard_src?true:false;
            This.form.skNum=customer.sk_number?customer.sk_number: ''
            This.imgValue.cardFront=customer.Fcard_src?true:false;
            This.imgValue.handCard=customer.Zcard_src?true:false;
            This.imgValue.skCard=customer.sk_src?true:false;
            This.imgValue.yyzzCard=customer.blSrc?true:false;
            This.imgValue.yhls1=customer.bfSrc1?true:false;
            This.imgValue.yhls2=customer.bfSrc2?true:false;
          }else{
            This.form.custName='';//姓名，
            This.form.cardNum='';//身份证号码
            This.form.sex='';//性别
            This.form.age='';//年龄
            This.form.edu='';//学历
            This.form.eduValue='';//学历code
            This.form.use='';//用途
            This.form.nation='';//民族
            This.form.birthday='';//出生日期
            This.form.cardAddress='';//身份证证件地址
            This.form.cardEffectedDate='';//身份证有效期
            This.form.icCardImg2 = idcardBack;
            This.form.icCardImg1 = idcardFront;
            This.form.phoneGpsInfo='';

            This.scanFront=false;
            This.scanBack=false;
            This.imgValue.cardFront=false;
            This.imgValue.handCard=false;
            This.imgValue.skCard=false;
            This.imgValue.yyzzCard=false;
            This.imgValue.yhls1=false;
            This.imgValue.yhls2=false;
          }
          This.getCompanyInfo()
        }
      })
    },
    /** ocr获取后台参数调用原生方法 **/
    callHander (index) {
      this.type=index
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.$ajax('get','/otherCofig/getOtherConfigByType?type=OCR',{},(data)=>{
        if(data.retData&&data.retData[0]){
          let param=data.retData[0].param;
          let csConfigType=data.retData[0].csConfigType;//ocr/人脸（400-499）400faceOcr 401 魔蝎Ocr
          let face_key=param.ocr_key,
              face_secret=param.ocr_secrect;
          let ua = navigator.userAgent.toLowerCase();
          //option 1、//0:人像面  1:国徽面
          //option 2、//0:竖屏  1:横屏
          var options=[index,"1",face_key,face_secret];
          try{
            if (/iphone|ipad|ipod/.test(ua)) {
              window.webkit.messageHandlers.faceOCR.postMessage(options);
            }else if(/android/.test(ua)){
              object.faceOCR(Number(index),face_key,face_secret)
            }
          }catch(e){
            console.warn(e)
          }
        }else{
          this.$createDialog({type: 'alert',
            content: lang.comm.sysConfig,
            confirmBtn:{
              text: lang.comm.confirm
            },
            onConfirm: () => {}
          }).show()
        }
      })
    },
    /** ocr扫描调用后台计费 **/
    faceService:function () {
      this.$ajax('post','/authorization/ocrService',{},
        function (response) {}
      )
    },
    uploadImg(index){
      this.type=index
      var ua = navigator.userAgent.toLowerCase();
      let isPrev=0
      if(index==1){
        isPrev=1
      }else{
        isPrev=0
      }
      try{
        if (/iphone|ipad|ipod/.test(ua)) {
          // if(window.webkit.messageHandlers){
          //   // window.webkit.messageHandlers.jumpWebView.postMessage(options);
          // }else{}
        }else if(/android/.test(ua)){
          object.albumCamera('photo',isPrev)////all,photo,album
        }
      }catch(e){
        console.log(e)
      }
    },
    saveSkImg(){
      let This=this
      this.$ajax('post','/authorization/saveSk',{
        skSrc:this.form.skImg,
        skNumber: this.form.skNum
      },function(data){
        This.saveCompanyInfo()
      })
    },
    saveCompanyInfo(){
      let form=this.form
      let imgValue=this.imgValue
      let This=this
      this.$ajax('post','/basicinfo/saveCompanyInfo',{
        blSrc: imgValue.yyzzCard?form.yyzzImg:'',
        bfSrc1: imgValue.yhls1?form.yhlsImg1:'',
        bfSrc2: imgValue.yhls2?form.yhlsImg2:'',
        bfSrc11: imgValue.yhls11?form.yhlsImg11:'',
        bfSrc22: imgValue.yhls22?form.yhlsImg22:'',
        companyAddress: form.companyAddress,
        gzzSrc: imgValue.gzzSrc?form.gzzSrc:'',
        companyName: form.companyName,
        nomorTeleponPerusahaan: form.companyTel,
        companyArea: form.companyArea,
        companyImg: form.companyImg
      },function(data){
        This.$router.push('/personalInfo')
      })
    },
    getCompanyInfo(){
      let This=this
      this.$ajax('post','/basicinfo/getCompanyInfo',{},function(data){
        if(data.retData){
          let yhls=data.retData.bank_flow_src?data.retData.bank_flow_src.split(','):[idcardBack,idcardBack]
          let yhlss=data.retData.last_bank_flow_src?data.retData.last_bank_flow_src.split(','):[idcardBack,idcardBack]
          This.form.yyzzImg=data.retData.business_license_src?data.retData.business_license_src:idcardBack
          This.form.yhlsImg1=yhls[0]?yhls[0]:idcardBack
          This.form.yhlsImg2=yhls[1]?yhls[1]:idcardBack

          This.form.gzzSrc=data.retData.gzz_src?data.retData.gzz_src: idcardBack
          This.imgValue.gzzSrc=data.retData.gzz_src?true: false

          This.form.companyAddress=data.retData.business_address?data.retData.business_address: ''
          This.form.companyName=data.retData.business_name?data.retData.business_name: ''
          This.form.companyTel=data.retData.nomorTeleponPerusahaan?data.retData.nomorTeleponPerusahaan:''
          This.form.companyArea=data.retData.company_area?data.retData.company_area:''
          This.imgValue.yyzzCard=data.retData.business_license_src?true:false
          This.imgValue.yhls1=This.form.yhlsImg1==idcardBack?false:true
          This.imgValue.yhls2=This.form.yhlsImg2==idcardBack?false:true

          This.form.yhlsImg11=yhlss[0]?yhlss[0]:idcardBack
          This.form.yhlsImg22=yhlss[1]?yhlss[1]:idcardBack

          This.imgValue.yhls11=This.form.yhlsImg11==idcardBack?false:true
          This.imgValue.yhls22=This.form.yhlsImg22==idcardBack?false:true

          This.form.companyImg=data.retData.company_img_src?data.retData.company_img_src: idcardBack
          This.imgValue.companyImg=This.form.company_img_src==idcardBack?false:true

        }else{
          This.form.yyzzImg=idcardBack
          This.form.yhlsImg1=idcardBack
          This.form.yhlsImg2=idcardBack
          This.form.companyAddress=''
        }
      },"",true)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  background-color #F6F6F6
  position absolute
  bottom 0
  top 0
  left 0
  right 0
.scroll-list-wrap
  position absolute
  bottom 0
  left 0
  right 0
  background #FFF
  .box
    font-size 14px
    .imgBox
      display flex
      justify-content center
      padding-top 10px
      .img
        width 48%
        line-height 30px
        .imgContainer
          height 100px
          img
            width 82%
            height 92px
  .box
    font-size 14px
    .title
      font-size: 16px;
      text-align: center;
      padding: 27px 0 27px 0;
      color: rgb(51,51,51);
      font-weight: 600;
    .tips
      line-height 50px
      background: #F6F6F6;
      // padding-left 37px
      text-align center
      color #686868
    .form
      font-size 14px
      display flex
      line-height 42px
      height 42px
      padding 3px 0
      border-bottom: 1px dashed rgb(241, 241, 241);
      text-align left
      position relative
      .icon
        flex 1
        padding-left 5px
        text-align center
        i
          font-size 20px
          position relative
          width 40px
      .label
        flex 2
        width 25%
        padding 0 15px
      .lineFeed{
        line-height: 20px;
        margin-top: 4px;
      }
      .text
        flex 6
        width 75%
        position relative
        padding-right 20px
        input
          height 100%
          width 100%
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
          text-align right
        textarea
          padding 0
          margin 0
          vertical-align middle
          width 100%
          line-height 21px
          height 100%
          border none
          text-align right
          font: 400 13.3333px Arial;
          outline:none
          resize:none
        .cardAddress
          line-height 21px
          display inline-block
          height 90px
        .textareaPlace
          position: absolute;
          top: 50%;
          right: 22px;
          transform: translate(0, -50%);
          text-align:right
          line-height 21px   
          color #000   
      .icon-previewright
        padding 0 4px
        position absolute
        right 0
        top 0
        bottom 0
        height:18px
        line-height:18px;
        margin:auto
  .warn
    font-size 14px
    line-height 25px
    color red
    i
      margin 5px
      font-size 20px
      position relative
      bottom -3px
  .wrapper
     margin 0 20px
     height 180px
.enterpriseLoan{
  position relative
  padding 10px 0
  &:before{
    content ""
    position absolute
    top 0
    left 0
    right 0
    height 10px
    background #F6F6F6
  }
}
.scroll-list-wrap .box .form-address {
  height 100px
}
.scroll-list-wrap .box .area-address{
  height 60px
}
.scroll-list-wrap .box .area-address .text .cardAddress{
  height 60px
  line-height 43px
}
.scroll-list-wrap .box .area-address .text .hasValue{
  line-height 21px
}
</style>
