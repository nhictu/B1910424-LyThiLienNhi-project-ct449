<template>
  <div>
    <div class="wrapper d-flex flex-column min-vh-100">
        <router-view />
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'

export default {
  name: 'RootLayout',
  components: {
    CContainer,
  },
}
</script>
