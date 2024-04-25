<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-barcode" />
                  </CInputGroupText>
                  <CFormInput v-model="user.MSNV" placeholder="Mã số nhân viên" autocomplete="Mã số nhân viên" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput v-model="user.HoTenNV" placeholder="Họ và tên" autocomplete="Họ và tên" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput v-model="user.Chucvu" placeholder="Chức vụ" autocomplete="Chức vụ" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-address-book" />
                  </CInputGroupText>
                  <CFormInput v-model="user.Diachi" placeholder="Địa chỉ" autocomplete="Địa chỉ" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-phone" />
                  </CInputGroupText>
                  <CFormInput v-model="user.SoDienThoai" placeholder="Số điện thoại" autocomplete="Số điện thoại" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput v-model="user.Password" type="password" placeholder="Password"
                    autocomplete="new-password" />
                </CInputGroup>
                <div class="d-grid">
                  <CRow>
                    <CCol>
                      <CButton color="success" class="auth-button" @click="signUp"> Create Account </CButton>
                    </CCol>
                    <CCol>
                      <CButton color="primary" class="auth-button" @click="goSigIn"> Login </CButton>
                    </CCol>
                  </CRow>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { staffService } from '../../services/index.js'

export default {
  name: 'Register',
  data() {
    return {
      user: {
        MSNV: '',
        HoTenNV: '',
        Password: '',
        Chucvu: '',
        Diachi: '',
        SoDienThoai: '',
      },
    }
  },
  beforeCreate() {
    const userData = this.$store.state.userData
    if (userData && Object.keys(userData).length > 0)
      this.$router.push({ name: 'Home' })
  },
  methods: {
    goSigIn() {
      this.$router.push({ name: 'Login' })
    },
    async signUp() {
      try {
        const data = await staffService.register(this.user)
        if (data.code == 200)
          this.$root.openToast('Đăng ký thành công', 'Bạn đã đăng ký thành công!', 'success')
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
    }
  }
}
</script>
