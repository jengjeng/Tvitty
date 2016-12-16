import router from './../router'

const values = {
  PERMISION_DENIED: 'permission_denied'
}

const handleError = (err) => {
  switch (err.message) {
    case values.PERMISION_DENIED:
      router.push({ path: '/signin', query: { redirect: router.currentRoute.fullPath } })
      break
    default:
      throw err
  }
}

export default {
  values,
  handleError
}
