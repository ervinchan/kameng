<template>
  <div class="query-credit-report-page">
    <app-header title="信用报告"></app-header>
    <scroller>
      <div class="wrapper">
        <div class="container">

          <div class="banner">
            <img src="~assets/images/query-credit-report-icon01.png" alt="" class="bg">
            <!-- <img src="~assets/images/query-credit-report-icon02.png" alt="" class="image"> -->

            <div class="box">
              <div class="canvas-box">
                <div class="canvas" ref="canvas"></div>
                <div class="total">
                  <div class="line">
                    <div class="money"><span>{{loanInfo.total}}</span>%</div>
                    <div class="text">被拒概率</div>
                  </div>
                </div>
              </div>
            </div>
            <p>您申请贷款被拒的概率：<span>{{loanInfo.text}}</span></p>
          </div>

          <div class="project-box">
            <div class="headline">信贷全流程报告</div>
            <div class="subtitle">
              <div>保镖ID:WF2018012416540415494562</div>
              <div>报告时间:2018-01-24  16:54:01</div>
            </div>
            <div class="info-report">个人信息报告</div>
            <div class="base-info">
              <span>个人基本信息</span>
              <div class="shuiyin1">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </div>
            <ul class="list-box">
              <li class="item-box" v-for="(item, index) in baseInfo" :key="index">
                <div class="item-left item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                </div>
              </li>
            </ul>
          </div>

          <div class="project-box">
            <div class="base-info  d1d1d1 pr">
              <span>归属地解析</span>
              <div class="shuiyin1">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </div>
            <ul class="resolve-list">
              <li class="item">
                <div class="content">
                  <span class="name">身份证所属地: </span>
                  <span class="text">山东省枣庄市峄城区</span>
                </div>
                <div class="content">
                  <span class="name">手机所属地: </span>
                  <span class="text">河北省秦皇岛市</span>
                </div>
                <div class="content">
                  <span class="name">ip所属地: </span>
                  <span class="text">中国广东省广州市</span>
                </div>
              </li>
            </ul>
            <div class="base-info d1d1d1">
              <span>IP解析</span>
            </div>
            <ul class="resolve-list">
              <li class="item">
                <div class="content">
                  <span class="name">地址: </span>
                  <span class="text">中国广东省广州市</span>
                </div>
                <div class="content">
                  <span class="name">经度: </span>
                  <span class="text">113.28064</span>
                </div>
                <div class="content">
                  <span class="name">互联网提供商: </span>
                  <span class="text">电信</span>
                </div>
                <div class="content">
                  <span class="name">纬度: </span>
                  <span class="text">23.125177</span>
                </div>
              </li>
            </ul>
            <div class="base-info d1d1d1">
              <span>真实IP解析</span>
            </div>
            <ul class="resolve-list">
              <li class="item">
                <div class="content">
                  <span class="name">地址: </span>
                  <span class="text">中国广东省广州市</span>
                </div>
                <div class="content">
                  <span class="name">经度: </span>
                  <span class="text">113.28064</span>
                </div>
                <div class="content">
                  <span class="name">互联网提供商: </span>
                  <span class="text">电信</span>
                </div>
                <div class="content">
                  <span class="name">纬度: </span>
                  <span class="text">23.125177</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="project-box">
            <div class="base-info">
              <span>设备信息</span>
              <div class="shuiyin1">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </div>
            <ul class="list-box pr">
              <li class="item-box" v-for="(item, index) in devices" :key="index">
                <div class="item-left item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                </div>
              </li>
                <div class="shuiyin1" style="top:350px;">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2" style="top:350px;">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin1" style="top:700px;">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2" style="top:700px;">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </ul>
          </div>

          <div class="project-box">
            <div class="base-info">
              <span>申请记录</span>
              <div class="shuiyin1">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </div>
            <div class="info-report">办理信用卡申请记录</div>
            <ul class="list-box flex">
              <li class="item-box">
                <div class="item-flex item-content">
                  <div class="name">时间</div>
                </div>
                <div class="item-flex item-content">
                  <div class="name">申请信用卡类目</div>
                </div>
              </li>
              <li class="item-box" v-for="(item, index) in applyRecord" :key="index">
                <div class="item-right item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                </div>
              </li>
            </ul>
            <div class="empty-line"></div>
            <div class="info-report">信用卡下卡记录</div>
            <ul class="list-box in-flex">
              <li class="item-box">
                <div class="item-flex item-content">
                  <div class="name">时间</div>
                </div>
                <div class="item-flex item-content">
                  <div class="name">申请信用卡类目</div>
                </div>
                <div class="item-flex item-content">
                  <div class="name">下卡状态</div>
                </div>
              </li>
              <li class="item-box" v-for="(item, index) in applyRecord" :key="index">
                <div class="item-right item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name" :style="{color:item.color}">{{ item.status }}</div>
                </div>
              </li>
            </ul>
          </div>

          <div class="project-box">
            <div class="base-info">
              <span>车辆信息</span>
              <div class="shuiyin1">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </div>
            <ul class="resolve-list on">
              <li class="item">
                <div class="content">
                  <span class="name">车主姓名：</span>
                  <span class="text">H816555</span>
                </div>
              </li>
              <li class="item">
                <div class="content">
                  <span class="name">品牌型号：</span>
                  <span class="text">丰田GTM7240V-NAVI轿车</span>
                </div>
              </li>
              <li class="item">
                <div class="content">
                  <span class="name">车辆识别代码：</span>
                  <span class="text">lvgbd54k1651515</span>
                </div>
              </li>
              <li class="item">
                <div class="content">
                  <span class="name">车牌号码：</span>
                  <span class="text">赣B30M46</span>
                </div>
              </li>
              <div class="shuiyin1" :style="{top:(index+1) * 350 + 'px'}" v-for="(item,index) in 15">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2" :style="{top:(index+1) * 350 + 'px'}" v-for="(item,index) in 15">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </ul>
            <div class="empty-line"></div>
            <div class="info-report">近3个月汽车违章记录</div>
            <ul class="list-box illegal">
              <li class="item-box" v-for="(item, index) in illegalRecord" :key="index">
                <div class="item-left item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                  <div class="text">{{ item.detail }}</div>
                  <div class="points">
                    <span><i>扣</i>{{ item.points.num }}</span>
                    <span><i>罚</i>{{ item.points.money }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="project-box">
            <div class="info-report">贷前反欺诈报告</div>
            <div class="empty-line"></div>
            <div class="proposal">
              <div>
                <span class="text">扫描建议：1565分， 申请用户检测出高危风险，</span>
                <span class="name">建议拒绝</span>
              </div>
              <div>
                <span class="name">共发现 46 条异常信息</span>
              </div>
            </div>
            <div class="empty-line"></div>
            <ul class="list-box report">
              <li class="item-box title">
                <div class="item-left item-content">
                  <div class="name">规则名称</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">规则详情</div>
                </div>
              </li>
              <li class="item-box" v-for="(item, index) in creditReport" :key="index">
                <div class="item-left item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                  <ul class="report-list">
                    <li class="item" v-for="(detail, i) in item.details" :key="i">{{ detail.content }}</li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="empty-line"></div>
            <div class="info-report">贷前反欺诈报告的附件：法院详情</div>
            <div class="empty-line"></div>
            <ul class="list-box file">
              <li class="item-box" v-for="(item, index) in courtFile" :key="index">
                <div class="item-left item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                </div>
              </li>
            </ul>
            <div class="empty-line"></div>
            <ul class="list-box file">
              <li class="item-box" v-for="(item, index) in courtFile2" :key="index">
                <div class="item-left item-content">
                  <div class="name">{{ item.key }}</div>
                </div>
                <div class="item-right item-content">
                  <div class="name">{{ item.value }}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="project-box padding-none">
            <div class="base-info">
              <span>报告数据说明</span>
              <div class="shuiyin1">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
              <div class="shuiyin2">
                <span>贷前个人信息查询</span>
                <br>
                <span>机密文件</span>
              </div>
            </div>
            <div class="base-box">
              <p>贷前报告数据查询报告由本人授权查询，数据来源包括芝麻信用，各大运营商，各类征信平台，各大网贷平台卡盟科技只做大数据信息的获取及分析，不对原始信息做任何修改，报告仅供参考使用，如果您对报告有异议，出于对平台隐私保护，卡盟科技不做任何解释。</p>
              <p>由于报表生成需要处理大量数据，受网络波动等因素的影响，可能会造成部分数据获取不完善的情况，对此我们深感歉意，同时您的理解和支持</p>
            </div>
          </div>



        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>