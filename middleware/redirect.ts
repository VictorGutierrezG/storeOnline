import { Middleware } from '@nuxt/types'

const redirect: Middleware = ({ route, redirect }) => {
  if (route.path === '/') {
    return redirect('/products');
  }
}

export default redirect;
