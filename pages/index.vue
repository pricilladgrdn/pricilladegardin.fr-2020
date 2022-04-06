<template>
  <div class="h-full w-full cursor-none">
    <div
      ref="projectList"
      class="snap-y snap-mandatory overflow-auto h-screen w-full no-scrollbar scroll-smooth"
      @scroll="debounce(onScroll, 50)"
    >
      <div
        v-for="project in projects"
        :key="project.id"
        class="snap-center h-screen w-full"
        :style="{ background: project.backgroundColor }"
        @click="incrementImageIndex"
      ></div>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full pr-0 pb-96 md:landscape:pb-0 md:landscape:pr-80 pointer-events-none"
    >
      <ProjectGallery
        :project="projects[currentProjectIndex]"
        :current-index="currentImageIndex"
        :author="author"
      />
    </div>
    <SideBar
      :projects="projects"
      :current-index="currentProjectIndex"
      :author="author"
      class="absolute w-full h-96 bottom-0 left-0 md:landscape:left-auto md:landscape:top-0 md:landscape:right-0 md:landscape:w-80 md:landscape:h-full bg-white"
      @changeProject="onChangeProject"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IAuthor } from '~/interfaces/author'
import { IProject } from '~/interfaces/project'

export default Vue.extend({
  data: () => ({
    currentProjectIndex: 0,
    currentImageIndex: 0,
    lastScrollTop: 0,
  }),
  async fetch({ store, params }) {
    // fetch data from contentful
    await store.dispatch('getProjects', params.slug)
    await store.dispatch('getAuthor', params.slug)
  },
  head(): object {
    const faviconColor = encodeURIComponent(
      this.projects[this.currentProjectIndex].backgroundColor
    )
    const svg = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><circle cx='256' cy='256' r='256' fill='${faviconColor}'/></svg>`
    return {
      title: `${this.author.firstName} ${this.author.lastName}`,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.author.biography,
        },
      ],
      link: [
        {
          rel: 'icon',
          hid: 'icon',
          type: 'image/svg+xml',
          href: svg,
        },
      ],
    }
  },
  computed: {
    projects(): IProject[] {
      return this.$store.state.projects as IProject[]
    },
    author(): IAuthor {
      return this.$store.state.author as IAuthor
    },
  },
  mounted: () => {
    document.onmousemove = function (e) {
      document.body.style.setProperty('--x', e.clientX + 'px')
      document.body.style.setProperty('--y', e.clientY + 'px')
    }
  },
  methods: {
    onScroll() {
      const scrollTop = (this.$refs.projectList as HTMLElement).scrollTop
      let newProjectIndex

      if (scrollTop > this.lastScrollTop) {
        newProjectIndex = Math.floor(scrollTop / window.innerHeight)
      } else {
        newProjectIndex = Math.ceil(scrollTop / window.innerHeight)
      }

      if (this.currentProjectIndex !== newProjectIndex) {
        this.currentProjectIndex = newProjectIndex
        this.currentImageIndex = 0
      }

      this.lastScrollTop = scrollTop
    },
    onChangeProject(newProjectIndex: number) {
      const element = this.$refs.projectList as HTMLElement
      element.scrollTo(0, window.innerHeight * newProjectIndex)
    },
    incrementImageIndex() {
      let newIndex = this.currentImageIndex + 1
      if (newIndex >= this.projects[this.currentProjectIndex].images.length) {
        newIndex = 0
      }
      this.currentImageIndex = newIndex
    },
    debounce(method: any, delay: number) {
      clearTimeout(method._tId)
      method._tId = setTimeout(function () {
        method()
      }, delay)
    },
    updateFavicon() {},
  },
})
</script>
