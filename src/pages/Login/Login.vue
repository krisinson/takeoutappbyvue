<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:!isPasswordLogin}" @click="isPasswordLogin=false">短信登录</a>
          <a href="javascript:;" :class="{on:isPasswordLogin}" @click="isPasswordLogin=true">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:!isPasswordLogin}">
            <section class="login_message">
              <input
                v-model="phone"
                name="phone"
                v-validate="'required|mobile'"
                type="tel"
                maxlength="11"
                placeholder="手机号"
              />
              <span style="color:orangered" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
              <button
                @click.prevent="sendCode"
                :disabled="!isRightPhoneNumber||!!countDown"
                class="get_verification"
                :class="isRightPhoneNumber?'right_phone_number':''"
              >{{countDown?`${countDown}s后可以再次获取`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input
                v-model="code"
                name="code"
                v-validate="'required|code'"
                type="tel"
                maxlength="8"
                placeholder="验证码"
              />
              <span
                style="color:orangered"
                v-show="errors.has('code')"
              >{{errors.first('code')}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:isPasswordLogin}">
            <section>
              <section class="login_message">
                <input
                  v-model="username"
                  name="username"
                  v-validate="'required'"
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                />
                <span
                  style="color:orangered"
                  v-show="errors.has('username')"
                >{{errors.first('username')}}</span>
              </section>
              <section class="login_verification">
                <input
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                  :type="isShowPassword?'tel':'password'"
                  maxlength="8"
                  placeholder="密码"
                />
                <span style="color:orangered" v-show="errors.has('pwd')">{{errors.first('pwd')}}</span>
                <div
                  @click="isShowPassword=!isShowPassword"
                  class="switch_button"
                  :class="isShowPassword?'on':'off'"
                >
                  <div class="switch_circle" :class="{right:isShowPassword}"></div>
                  <span class="switch_text">{{isShowPassword?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                />
                <span style="color:orangered" v-show="errors.has('captcha')">{{errors.first('captcha')}}</span>
                <img
                  @click="updateCaptcha"
                  ref="captcha"
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <div class="languages">
      <mt-button type="primary" @click="$i18n.locale= 'Chinese'">中文</mt-button>
      <mt-button type="primary" @click="$i18n.locale= 'English'">英文</mt-button>
      <mt-button type="primary" @click="$i18n.locale= 'Japanese'">日文</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      isPasswordLogin: false,
      isShowPassword: false,
      phone: '',
      captcha: '',
      username: '',
      pwd:'',
      code: '',
      countDown: 0 //倒计时
    };
  },
  methods: {
    updateCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now()
    },
    async login() {
      let { isPasswordLogin ,username,pwd,captcha,phone,code} = this;
      let names = isPasswordLogin? ["username", "pwd", "captcha"]: ["phone", "code"]
      const success = await this.$validator.validateAll(names); // 对所有表单项进行验证
      if (success) {
        Toast("前端校验成功")
          let result
          if(isPasswordLogin){ //密码登录
            result=await this.$API.loginWithPassword(username,pwd,captcha)
            // console.log(username)
            console.log(result)
            if(result.code===0){
              // 清空图形验证码
              this.captcha=''
              //更新图形验证码
              this.updateCaptcha()
            }
          }else{ //手机号验证码登录
            result=await this.$API.loginWithPhone(phone,code)
            console.log(result)

              if(result.code===1){
                //清空验证码
                this.code=''
              }
          }
           //登录成功的处理
            if(result.code===0){
              // 将获取的用户数据存入vuex的state中
              this.$store.dispatch('getUserAction',{user:result.data})
              this.$router.replace('/profile')
            }
      } else {
        Toast("前端校验失败")
      }
    },
    async sendCode() {
      // console.log('发送验证码')
      let result = await this.$API.sendCode(this.phone)
      // console.log(result)
      if(result.code===0){
        Toast('短信发送成功')
      }else{
        Toast('短信发送失败')
      }
      this.countDown = 10;
      this.intervalId = window.setInterval(() => {
        this.countDown--
        this.countDown === 0 && window.clearInterval(this.intervalId)
      }, 1000);
    }
  },
  computed: {
    isRightPhoneNumber() {
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone);
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: deepskyblue;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: deepskyblue;
            font-weight: 700;
            border-bottom: 2px solid deepskyblue;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid deepskyblue;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone_number {
                color: #333;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: deepskyblue;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: deepskyblue;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: deepskyblue;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
  .languages
    margin-top 50px
    display flex
    justify-content space-around
</style>
