import { createClient } from 'contentful'
import { ActionTree, MutationTree } from 'vuex'
import { IAuthor } from '~/interfaces/author'
import { IProject } from '~/interfaces/project'

export const state = () => ({
  projects: [] as IProject[],
  author: null as IAuthor | null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  updateProjects: (state, projects: IProject[]) => {
    state.projects = projects
  },
  updateAuthor: (state, author: IAuthor) => {
    state.author = author
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async getProjects({ commit }) {
    const client = createClient({
      space: this.app.$config.ctfSpaceId,
      accessToken: this.app.$config.ctfAccessToken,
    })
    const response = await client.getEntries({
      content_type: this.app.$config.ctfProjectContentType,
      order: 'fields.order',
      locale: this.$i18n.locale,
    })
    if (response.items.length > 0) {
      const projects = response.items.map((i) => {
        return Object.assign({ id: i.sys.id }, i.fields)
      })
      commit('updateProjects', projects)
    }
  },
  async getAuthor({ commit }) {
    const client = createClient({
      space: this.app.$config.ctfSpaceId,
      accessToken: this.app.$config.ctfAccessToken,
    })
    const entry = await client.getEntry(this.app.$config.ctfAuthorEntryId, {
      locale: this.$i18n.locale,
    })
    if (entry) {
      const author = entry.fields as IAuthor
      commit('updateAuthor', author)
    }
  },
}
