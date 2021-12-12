<template>
  <div>about</div>
  <div>title</div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="less" scoped>
.head {
  background-size: 100% 100%;
  width: 100%;
  height: 193px;
}
.table {
  ul {
    width: 100%;
    margin-top: 10%;
    li {
      display: flex;
      width: 100%;
      margin: 0 0 22px 0;
      input {
        font-size: 17px;
        margin-left: 58px;
        color: black;
        width: 70%;
        height: 44px;
        border: 1px solid #b1b6c0;
        border-radius: 2px;
        text-align: center;
        box-shadow: none;
      }
      .awardCode::-webkit-input-placeholder {
        color: #b1b6c0;
        padding-left: 15px;
        text-align: left;
      }
    }
  }
  .err {
    height: 20px;
    padding-left: 15%;
    font-size: 13px;
    color: #ff0000;
    text-align: left;
    margin-top: -10px;
    margin-bottom: 20px;
  }
  .button {
    width: 92%;
    height: 47px;
    background: linear-gradient(90deg, rgba(255,120,0,1) 0%, rgba(255,96,0,1) 22%, rgba(255,72,0,1) 100%);
    background-size: 100% 100%;
    margin-left: 4%;
    border-radius: 4px;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 0;
      height: 100%;
      line-height: 75px;
    }
  }
}
.foot {
  .convert {
    padding: 30px 10px 0 15px;
    font-size: 16px;
    color: #333333;
    text-align: center;
    img {
      width: 60px;
      height: 10px;
      margin-right: 5px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin: 0 30px;
    }
  }
  .tips {
    padding: 5px 15px;
    font-size: 15px;
    color: #333333;
  }
}
.awardTip {
  display: none;
  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  .tip {
    position: fixed;
    background: #fff;
    z-index: 99;
    margin: auto;
    left: 0;
    right: 0;
    top: 120px;
    border-radius: 10px;
    width: 85%;
    .tip_icon {
      text-align: right;
      padding: 19px 19px 0 0;
      img {
        width: 14px;
      }
    }
    .title {
      text-align: center;
      font-size: 20px;
      padding: 29px 10px 26px 10px;
      margin: 0 40px;
      font-weight: bold;
      border-bottom: 1px solid #f2f2f2;
    }
    .subject {
      padding: 19px 25px 10px 25px;
      font-size: 16px;
      color: #000;
      font-weight: bold;
      text-align: justify;
      line-height: 22px;
      display: flex;
      align-items: center;
      .gold-cowry-icon {
        width: 66px;
        margin: 0 5px;
      }
    }
    .tip_content {
      text-align: center;
      img {
        width: 90px;
        height: 90px;
        margin-top: 15px;
      }
      .content {
        font-size: 16px;
        color: #444444;
        text-align: center;
        padding: 10px 49px 23px 49px;
      }
    }
    .tipButton {
      font-size: 18px;
      color: #ff3d00;
      font-weight: bold;
      letter-spacing: 0;
      text-align: center;
      border-top: 1px solid #ededed;
      padding: 11px 0 14px 0;
    }
  }
}
</style>
