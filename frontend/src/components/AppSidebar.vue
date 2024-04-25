<template>
  <CSidebar class="border-end" colorScheme="dark" position="fixed" :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible" @visible-change="(event) =>
      $store.commit({
        type: 'updateSidebarVisible',
        value: event,
      })
      ">
    <CSidebarHeader class="border-bottom justify-content-center header-sidebar-custom">
      <RouterLink custom to="/" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">
          <img class="d-block logo-size" :src="LogoImg" alt="slide 3" />
        </CSidebarBrand>
      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="$store.commit('toggleSidebar')" />
    </CSidebarHeader>
    <AppSidebarNav />
    <!-- <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="$store.commit('toggleUnfoldable')" />
    </CSidebarFooter> -->
  </CSidebar>
</template>

<script>
import { logo } from '@/assets/brand/logo'
import { sygnet } from '@/assets/brand/sygnet'
import LogoImg from '@/assets/images/Group 1.png'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
    RouterLink,
  },
  setup() {
    const store = useStore()
    return {
      LogoImg,
      logo,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>
