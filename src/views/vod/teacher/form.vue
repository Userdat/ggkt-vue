<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker v-model="teacher.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"/>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像 -->
     <el-form-item label="讲师头像">
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-error="handleAvatarError"
        :action="BASE_API+'/admin/vod/file/upload'"
        class="avatar-uploader">
        <img v-if="teacher.avatar" :src="teacher.avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
    </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/vod/teacher'
export default {
    data(){
        return{
            teacher: {
                sort: 0,
                level: 1
            },
            BASE_API: 'http://localhost:8301',
        }
    },
    created(){
         if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
    },

    methods:{

       // 上传成功回调
        handleAvatarSuccess(res, file) {
          // console.log(res)
          if (res.code==20000) {
            // console.log(res)
            this.teacher.avatar = res.data
            // 强制重新渲染
            this.$forceUpdate()
          } else {
            this.$message.error('上传失败 （非0）')
          }
        },

        // 错误处理
        handleAvatarError() {
          console.log('error')
          this.$message.error('上传失败（http失败）')
        },

        // 上传校验
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'
          const isLt2M = file.size / 1024 / 1024 < 2

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
        },

        saveOrUpdate(){
            if (!this.teacher.id) {
                this.saveData()
            } else {
                this.updateData()
            }
        },
        // 新增讲师
        saveData() {
        teacherApi.save(this.teacher).then(response => {
            this.$message({
            type: 'success',
            message: response.message
            })
            this.$router.push({ path: '/vod/teacher/list' })
        })
        },
        // 根据id查询记录
        fetchDataById(id) {
            teacherApi.getById(id).then(response => {
            this.teacher = response.data
            })
        },

        // 根据id更新记录
        updateData(){
            teacherApi.updateById(this.teacher).then(response => {
                 this.$message({
                    type: 'success',
                    message: response.message
                })
                this.$router.push({path: '/vod/teacher/list'})
            })
        },

    }
}
</script>