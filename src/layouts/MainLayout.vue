<template>
  <v-app>
    <!-- Your sidebar and navbar -->
    <ResponsiveNavbar />

    <!-- Content changes here -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import ResponsiveNavbar from '@/components/Responsive_Navbar.vue'
</script>
