<template>
  <div class="login_con">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>

      <!-- 登录表单区域 -->
      <!-- ref 获取表单实例对象 -->
      <el-form
        ref="loginRef"
        :model="loginForm"
        :rules="loginRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },

      //   这是表单的验证规则对象
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 重置按钮 重置登录表单
    resetForm() {
      //   console.log(this);
      this.$refs.loginRef.resetFields()
    },

    login() {
      this.$refs.loginRef.validate(async (valid) => {
        // console.log(valid);
        // 不等于true 直接return
        if (!valid) return
        // 发送请求    请求路径   请求对象
        const { data: res } = await this.$http.post('login', this.loginForm)
        // if (res.meta.status != 200) {
        //   console.log("登录失败");
        // }else{console.log("登录成功");}

        if (res.meta.status != 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')

        // 存储token值到sessionStorang        // 名称    值
        window.sessionStorage.setItem('token', res.data.token)
        // 编程式跳转到主页面
        this.$router.push('/home')
      })
    },
  },
  components: {},
}
</script>

<style scoped lang="less">
.login_con {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
