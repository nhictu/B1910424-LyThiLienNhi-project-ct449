<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Account
      </CDropdownHeader>
       <CDropdownItem class="is-pointer-custom">
        <CIcon icon="cil-user" /> Profile
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem class="is-pointer-custom"  @click="logOut">
        <CIcon icon="cil-lock-locked"/> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    logOut(){
      this.$root.openModal({
        title: 'Xác nhận đăng xuất',
        message: 'Bạn có thật sự muốn đăng xuất?',
        onOk: () => {
          this.$store.dispatch('userData', {})
          this.$store.dispatch('token', '')
          this.$router.push({ name: 'Login' })
          this.$root.openToast('Đăng xuất thành công','Bạn đã đăng xuất thành công','success')
        }
      })
    }
  }
}
</script>
