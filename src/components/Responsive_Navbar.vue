<template>
  <v-app-bar :density="mdAndDown ? 'compact' : 'default'" app color="white">
    <div class="d-flex align-center" style="width: 100%;">
      <div class="d-flex align-center">
        <v-icon :style="mdAndDown ? smallIconStyle : largeIconStyle"
          @click.stop="drawer = !drawer">format_align_left</v-icon>
        <v-img src="../assets/logo.jpg" :width="mdAndDown ? 70 : 100" :height="mdAndDown ? 50 : 100"
          class="ml-4"></v-img>
        <v-img src="../assets/Line 911.png" width="2" :height="mdAndDown ? 24 : 32"
          class="ml-5 d-none d-sm-block"></v-img>
        <span class="font-weight-medium ml-3 d-none d-sm-block" :style="{ fontSize: mdAndDown ? '8px' : '10px' }">Align
          Associate</span>
      </div>
      <!-- Search Bar -->
      <v-text-field placeholder="Search..." prepend-inner-icon="search" variant="plain" hide-details single-line
        density="comfortable" class="custom-search ml-11 pl-4 d-none d-sm-block" />
      <v-spacer></v-spacer>

      <v-card elevation="0" class="pa-0 ma-0">
        <div class="d-flex justify-end align-center">
          <v-badge v-if="mdAndDown" color="error" dot class="mr-2">
            <v-icon icon="notifications" color="grey" :size="mdAndDown ? 'medium' : 'large'"></v-icon>
          </v-badge>

          <v-badge v-else :content="12" color="error" class="mr-4 circle_badge" offset-x="2" offset-y="2">
            <v-icon icon="notifications" color="grey" size="large"></v-icon>
          </v-badge>

          <div class="d-flex align-center ml-3" style="min-width: 140px;">
            <v-avatar rounded="lg" :size="mdAndDown ? 32 : 48">
              <v-img src="../assets/user.png" />
            </v-avatar>
            <div class="ml-2">
              <div class="font-weight-bold" :style="{ fontSize: mdAndDown ? '8px' : '16px' }">Dinesh Kumar</div>
              <div class="font-weight-medium" :style="{ fontSize: mdAndDown ? '7px' : '13px' }">Admin</div>
            </div>
            <v-icon class="ml-1 mb-3" :size="mdAndDown ? '16' : '24'">keyboard_arrow_down</v-icon>
          </div>
        </div>
      </v-card>

    </div>
  </v-app-bar>

  <v-navigation-drawer
  v-model="drawer"
  :permanent="!smAndDown"
  :temporary="smAndDown"
  :expand-on-hover="!smAndDown"
  :rail="!smAndDown"
  rail-width="64"
>
  <v-list nav density="comfortable">
    <template v-for="item in iconItems" :key="item.title">
      <div
        @mouseleave="openGroup = null"
      >
        <v-list-item
          link
          :title="item.title"
          @click="item.children ? toggleGroup(item.title) : $router.push(item.to)"
        >
          <template #prepend>
            <v-icon class="nav-icon">{{ item.icon }}</v-icon>
          </template>

          <template v-if="item.children" #append>
            <v-icon>{{ openGroup === item.title ? 'expand_less' : 'expand_more' }}</v-icon>
          </template>
        </v-list-item>

        <v-expand-transition>
          <div v-if="item.children && openGroup === item.title" class="ml-6" @mouseleave="openGroup = null">
            <v-list-item
              v-for="sub in item.children"
              :key="sub.title"
              :to="sub.to"
              link
            >
              <template #prepend>
                <v-icon size="20" class="align-self-center">{{ sub.icon }}</v-icon>
              </template>
              <v-list-item-title>
                {{ sub.title }}
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-expand-transition>
      </div>
    </template>
  </v-list>
</v-navigation-drawer>



</template>


<style scoped>
.custom-search {
  max-width: 400px;
  background-color: hsl(204, 38%, 97%);
  border-radius: 999px;
  height: 52px;
  font-size: 16px;
  color: #8a8a8a;
}

.custom-search .v-icon {
  font-size: 22px;
  color: #8a8a8a;
}

.nav-icon {
  color: #6b6b6b;
  transition: color 0.3s ease;

}

.v-list-item:hover .nav-icon {
  color: blue;
}
</style>

<style>
.circle_badge .v-badge__badge {
  width: 20px;
}
</style>


<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify';
const { mdAndDown } = useDisplay()
const { smAndDown } = useDisplay()
const drawer = ref(!smAndDown.value)
const openGroup = ref(null)
const toggleGroup = (title) => {
  openGroup.value = openGroup.value === title ? null : title
}

const smallIconStyle = {
  width: '48px',
  height: '48px',
  backgroundColor: 'rgb(42,22,125)',
  borderRadius: '0',
  color: 'white',
}

const largeIconStyle = {
  width: '64px',
  height: '64px',
  backgroundColor: 'rgb(42,22,125)',
  borderRadius: '0',
  color: 'white',
}
const iconItems = [
  { icon: 'widgets', title: 'Dashboard' },
  { icon: 'my_location', title: 'Location' },
  { icon: 'group', title: 'Users', children: [{ title: 'Employee', icon: 'person', to: '/employee-login' }, { title: 'Admin', icon: 'person',to: '/admin-login' }] },
  { icon: 'bolt', title: 'Activity' },
  { icon: 'inventory', title: 'Inventory' },
  { icon: 'military_tech', title: 'Achievements' },
  { icon: 'settings', title: 'Settings' },

]
</script>