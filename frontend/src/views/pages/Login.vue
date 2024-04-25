<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="4">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Staff code" autocomplete="Staff code" v-model="user.MSNV" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" autocomplete="current-password"
                      v-model="user.Password" />
                  </CInputGroup>
                  <CRow>
                    <CCol>
                      <CButton color="primary" class="auth-button" @click="sigIn"> Login </CButton>
                    </CCol>
                    <CCol>
                      <CButton color="secondary" class="auth-button" @click="goSignUp"> Register </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { staffService } from '../../services/index.js'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        MSNV: '',
        Password: '',
      },
    }
  },
  beforeCreate() {
    const userData = this.$store.state.userData
    if (userData && Object.keys(userData).length > 0)
      this.$router.push({ name: 'Home' })
  },
  methods: {
    async sigIn() {
      try {
        const data = await staffService.login(this.user)
        if (data.code == 200) {
          this.$root.openToast('Đăng nhập thành công', data.message, 'success')
          const { token, ...rest } = data.data
          this.$store.dispatch('token', token)
          this.$store.dispatch('userData', rest)
          this.$router.push({ name: 'Home' })
        }
        else {
          if (data.errors) {
            data.errors.forEach((error, index) => {

              this.$root.openToast('Lỗi nhập liệu', error.msg, 'danger')

            })
          } else
            this.$root.openToast('Lỗi nhập liệu', data.message, 'danger')
        }
      } catch (error) {
        this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
      }
    },
    goSignUp() {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>
