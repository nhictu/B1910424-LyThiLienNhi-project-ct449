<template>
  <!--Global Modal-->
  <CModal :visible="isShowModal" @close="() => { isShowModal = false }" aria-labelledby="globalModal">
    <CModalHeader>
      <CModalTitle id="globalModal">{{ modalData.title }}</CModalTitle>
    </CModalHeader>
    <CModalBody>{{ modalData.message }}</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="onModalClose">
        Close
      </CButton>
      <CButton color="primary" @click="onModalOk">
        Ok
      </CButton>
    </CModalFooter>
  </CModal>

  <!--Global Toast-->
  <CToaster class="p-3" placement="top-end" :autohide="true">
    <CToast v-for="(toast, index) in toasts" visible :key="index" :color='toast.color' :delay=2500 :autohide="true">
      <CToastHeader closeButton>
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody>{{ toast.content }}</CToastBody>
    </CToast>
  </CToaster>

  <!--Router View-->
  <router-view />

</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useColorModes } from '@coreui/vue'

export default {
  data() {
    return {
      colorScheme: 'primary',
      toasts: [],
      isShowModal: false,
      modalData: {}
    }
  },
  methods: {
    openToast(title, content, color) {
      this.toasts.push({
        title: title,
        content: content,
        color: color
      })
    },
    openModal(data) {
      this.modalData = data
      this.isShowModal = true
    },
    onModalClose() {
      this.isShowModal = false
    },
    onModalOk() {
      this.isShowModal = false
      this.modalData.onOk()
    }
  },
  setup() {
    const { isColorModeSet, setColorMode } = useColorModes('library-template-theme')
    const store = useStore()

    onBeforeMount(() => {
      const urlParams = new URLSearchParams(window.location.href.split('?')[1])
      const theme =
        urlParams.get('theme') &&
        urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
      if (theme) {
        setColorMode(theme)
        return
      }
      if (isColorModeSet())
        return
      setColorMode(store.state.theme)
    })
  },
}
</script>

<style lang="scss">
@import 'styles/style';
@import 'styles/examples';
</style>
