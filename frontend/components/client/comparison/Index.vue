<script setup lang="ts">
import { useComparison } from '~/store/client/comparison'

const comparisonStore = useComparison()
</script>

<template>
  <article class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Список сравнения
    </h1>
    <section v-if="comparisonStore.comparison.length > 0" class="w-full overflow-auto">
      <table class="w-full border-collapse border border-blue-800">
        <thead class="bg-blue-800 text-white text-left">
          <tr>
            <th class="p-2">
              Наименование
            </th>
            <th class="p-2">
              Изображение
            </th>
            <th class="p-2 min-w-[15rem]">
              Характеристика
            </th>
            <th class="p-2 min-w-[10rem]">
              Вес/Фасовка
            </th>
            <th class="p-2 min-w-[6rem] lg:min-w-[5rem] xl:min-w-0">
              Цена
            </th>
            <th class="p-2" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="compareGood in comparisonStore.comparison" :key="compareGood.id" class="border-b border-blue-800 hover:bg-blue-50 transition-colors select-none">
            <td class="p-2">
              {{ compareGood.title }}
            </td>
            <td class="p-2 text-clip">
              <img class="w-full max-w-[150px] aspect-square object-contain max-h-96" :src="compareGood.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
            </td>
            <td class="p-2 whitespace-pre-wrap">
              {{ compareGood.characteristic }}
            </td>
            <td class="p-2">
              {{ compareGood.weight }}
            </td>
            <td class="p-2">
              {{ compareGood.price }} р.
            </td>
            <td class="text-center">
              <div class="flex gap-3 justify-center items-center">
                <NuxtLink :to="`/good/${compareGood.id}`">
                  <ClientUiIconButton name="material-symbols:open-in-new-rounded" />
                </NuxtLink>
                <ClientUiIconButton name="material-symbols:delete-outline-rounded" @click="comparisonStore.removeComparison(compareGood.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section v-else class="m-auto">
      <h2 class="text-xl lg:text-2xl">
        У Вас нет товаров для сравнения...
      </h2>
    </section>
  </article>
</template>
