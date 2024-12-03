export default function ({ store, redirect }: { store: any, redirect: Function }) {
    if (!store.state.auth.isAuthenticated) {
      return redirect('/login')
    }
  }
  