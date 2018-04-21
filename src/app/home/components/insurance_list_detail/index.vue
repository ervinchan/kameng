

 <template>
   <div class="InsuranceListDetails">
       <app-header title="保险详情"></app-header>
       <scroller>
         <div class="InsuranceListDetails_wrap">
            <div class="Insurance_nav">
                <div class="nav-group">
                  <div class="item" :class="{ active:index == num}"  @click="switchState(index)"  v-for="(item,index) in tabs" >
                    <p class="title">{{item}}</p>
                  </div>
                </div>
                <div class="Insurance_guarantee">
                  <div class="guarantee_list"   v-for='(itemCon,index) in tabContents' v-show=" index == num">
                    <p class=" list list_title">意外伤害保障</p>
                    <p class="list" @click="showDetail(index)">
                       意外伤害
                       <span class="price">30万</span>
                       <i class="down"></i>
                     </p>
                    <p class="list_detail"  v-show="index == curIndex">
                      {{itemCon}}
                    </p>
                  </div>
                  <div class="medical_list">
                    <p class=" list list_title">医疗保障</p>
                    <p class="list" >意外伤害<span class="price">30万</span><i class="down"></i></p>
                  </div>
                </div>
                <div class="more_detail" ><p>更多详情，请阅读<span>《投保须知》</span>和<span>《保险条款》</span></p></div>
            </div>
            <div class="Insuranc_introduction">
              <p class="title">产品介绍</p>
              <div class="content">
                <p>1，你是个is那个女生美工都卖给你还没回话顾客们购买吼吼吼。</p>
                <p>2，客户退款还没给发货吗十年后会开门的黑名单</p>
                <p>3，客户退款还没给发货吗十年后会开门的黑名单</p>
              </div>
            </div>
            <div class="Insurance_insure">
              <p class="price"><span>￥353454.00</span>&nbsp;起</p>
              <p class="account">(点击核算保费)</p>
              <p class="insure" @click="insure">立即投保</p>
            </div>
         </div>
       </scroller>
   </div>
 </template>

 <script>
 import Index from "./index.js";
 export default Index;
 </script>
