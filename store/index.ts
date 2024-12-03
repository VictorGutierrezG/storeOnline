// store/index.ts
export const state = () => ({
    myVariable: '' as string,
  })
  
  export type RootState = ReturnType<typeof state>
  
  export const mutations = {
    setMyVariable(state: RootState, value: string) {
      state.myVariable = value
    }
  }
  
  export const actions = {
    updateMyVariable({ commit }: { commit: Function }, value: string) {
      commit('setMyVariable', value)
    }
  }
  