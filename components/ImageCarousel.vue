<template>
  <div ref="imageList" class="flex overflow-hidden transition-all">
    <div
      v-for="image in images"
      :key="image.sys.id"
      class="min-w-full"
      :style="{ transform: 'translateX(' + -100 * currentIndex + '%)' }"
    >
      <nuxt-img
        class="select-none max-h-full"
        :src="'https:' + image.fields.file.url"
        :alt="image.fields.description"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Asset } from 'contentful'

export default Vue.extend({
  props: {
    images: {
      type: Array,
      required: true,
    } as PropOptions<Asset[]>,
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
})
</script>
