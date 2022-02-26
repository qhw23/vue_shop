<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="querInfo.query" clearable @clear="getGoodsList">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="95px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="95px"
        ></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 查询参数对象
      querInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      // 商品列表
      goodslist: [],
      // 总数居条数
      total: 0,
    }
  },

  created() {
    this.getGoodsList()
  },

  methods: {
    // 根据分页获取相应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.querInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败!')
      }
      this.$message.success('获取商品列表成功!')
      console.log(res.data)
      this.goodslist = res.data.goods
      this.total = res.data.total
    },

    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage
      this.getGoodsList()
    },

    // 根据id删除对应的用户信息
    async removeById(id) {
      // console.log(id)
      // 弹框询问用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      // 如果用户确认删除 则返回字符串 confirm
      // 如果用户取消删除 则返回字符串 cancel
      // console.log(confirmResult);
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败!')
      }
      this.getGoodsList()
      this.$message.success('删除用户成功!')
    },

    goAddpage(){
        this.$router.push('/goods/add')
    }
  },
  components: {},
}
</script>

<style scoped lang="less">
</style>
