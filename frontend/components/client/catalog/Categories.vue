<script setup lang="ts">
import { useCatalog } from '~/store/client/catalog'

const catalogStore = useCatalog()
</script>

<template>
  <article v-if="catalogStore.categories" class="w-full p-2 flex flex-col gap-4 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Каталог
    </h1>
    <section class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="category in catalogStore.categories" :key="category.id" class="flex flex-col gap-3">
        <h2 class="text-xl lg:text-2xl font-bold text-blue-900 select-none cursor-pointer hover:underline active:text-blue-950 transition-all" @click="navigateTo(`/catalog/${category.id}`)">
          {{ category.title }}
        </h2>
        <ul v-if="category.children?.length" class="flex flex-col gap-3">
          <li v-for="child in category.children" :key="child.id" class="text-lg lg:text-xl text-blue-800 select-none cursor-pointer hover:underline active:text-blue-900 transition-all" @click="navigateTo(`/catalog/${child.id}`)">
            {{ child.title }}
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>
