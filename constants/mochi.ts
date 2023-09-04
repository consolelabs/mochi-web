import UI from '@consolelabs/mochi-ui'
import MochiApi from '@consolelabs/mochi-rest'
const api = new MochiApi({})
api.init()

UI.api = api

export { UI, api }
